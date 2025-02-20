import React, { useState, useEffect } from "react";
import {
  Modal,
  MenuItem,
  TextField,
  Button,
  Snackbar,
  Grid,
} from "@mui/material";

import "../Styles/Ot.css";

const OtFormModal = ({
  open,
  onClose,
  onSubmit,
  otData,
  editing,
  setEditing,
  setEditId,
  clientes,
  insumos,
}) => {
  const [formData, setFormData] = useState({
    ID_CLIENTE: "",
    ID_INSUMO: "",
    TIPO_DOCUMENTO: "Orden de Trabajo",
    FECHA_SOLICITUD: "",
    FECHA_ENTREGA: "",
    TIPO_OT: "",
    EQUIPO: "",
    NUMERO_SERIE: "",
    HORAS_TRABAJO: "",
    OBSERVACION_FINAL: "",
    DESCRIPCION: "",
    CANTIDAD: "",
    PRECIO_NETO: "",
    DESCUENTO: "",
    RECARGO: "",
    COMENTARIO: "",
    DESCUENTO_GLOBAL: "",
    AF_EX: "1",
    SUB_TOTAL: "0",
    MONTO_NETO: "0",
    MONTO_EXENTO: "1",
    IVA: "19",
    TOTAL: "0",
  });

  const [errors, setErrors] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    if (open) {
      if (editing && otData) {
        setFormData({ ...otData, SUB_TOTAL: otData.SUB_TOTAL || "0" });
      } else {
        resetForm();
      }
    }
  }, [open, editing, otData]);

  const resetForm = () => {
    setFormData({
      ID_CLIENTE: "",
      ID_INSUMO: "",
      TIPO_DOCUMENTO: "Orden de Trabajo",
      FECHA_SOLICITUD: "",
      FECHA_ENTREGA: "",
      TIPO_OT: "",
      EQUIPO: "",
      NUMERO_SERIE: "",
      HORAS_TRABAJO: "",
      OBSERVACION_FINAL: "",
      DESCRIPCION: "",
      CANTIDAD: "",
      PRECIO_NETO: "",
      DESCUENTO: "",
      RECARGO: "",
      COMENTARIO: "",
      DESCUENTO_GLOBAL: "",
      AF_EX: "1",
      SUB_TOTAL: "0",
      MONTO_NETO: "0",
      MONTO_EXENTO: "1",
      IVA: "19",
      TOTAL: "0",
    });
  };

  useEffect(() => {
    const cantidad = parseFloat(formData.CANTIDAD) || 0;
    const recargo = parseFloat(formData.RECARGO) || 0;
    const precioNeto = parseFloat(formData.PRECIO_NETO) || 0;
    const descuento = parseFloat(formData.DESCUENTO) || 0;
    const descuentoGlobal = parseFloat(formData.DESCUENTO_GLOBAL) || 0;
    const montoExento = parseFloat(formData.MONTO_EXENTO) || 0;

    // Cálculo del subtotal: cantidad * precioNeto, luego aplica el descuento y luego el recargo
    const subtotal = cantidad * precioNeto * (1 - descuento / 100) + recargo;

    // Cálculo del monto neto: aplica el descuento global sobre el subtotal
    const montoNeto = subtotal * (1 - descuentoGlobal / 100);

    // IVA sobre el monto neto
    const iva = montoNeto * 0.19;

    // Total: monto neto + IVA + monto exento
    const total = montoNeto + iva + montoExento;

    // Actualiza los valores en el estado
    setFormData((prevData) => ({
      ...prevData,
      SUB_TOTAL: subtotal.toFixed(2),
      MONTO_NETO: montoNeto.toFixed(2),
      IVA: iva.toFixed(2),
      TOTAL: total.toFixed(2),
    }));
  }, [
    formData.CANTIDAD,
    formData.RECARGO,
    formData.PRECIO_NETO,
    formData.DESCUENTO,
    formData.DESCUENTO_GLOBAL,
    formData.MONTO_EXENTO,
  ]);

  const validateName = (value) => /^[A-Za-zÁáÉéÍíÓóÚúÑñ\s]+$/.test(value);

  const validateNumber = (value) => /^[0-9]+(\.[0-9]{1,2})?$/.test(value);

  const handleChange = (e, field) => {
    const { value } = e.target;
    if (validateNumber(value) || value === "") {
      setFormData({ ...formData, [field]: value });
      setErrors({ ...errors, [field]: "" });
    } else {
      setErrors({
        ...errors,
        [field]: "Solo se permiten números y puntos, con hasta dos decimales.",
      });
    }
  };

  const validateAlphanumeric = (value) => /^[A-Za-z0-9\-]+$/.test(value);

  const handleAlphanumericChange = (e, field) => {
    const { value } = e.target;
    if (validateAlphanumeric(value) || value === "") {
      setFormData({ ...formData, [field]: value });
      setErrors({ ...errors, [field]: "" });
    } else {
      setErrors({
        ...errors,
        [field]: "Solo se permiten letras, números y guiones.",
      });
    }
  };

  const handleNameChange = (e, field) => {
    const { value } = e.target;
    if (validateName(value) || value === "") {
      setFormData({ ...formData, [field]: value });
      setErrors({ ...errors, [field]: "" });
    } else {
      setErrors({ ...errors, [field]: "Solo se permiten letras y espacios." });
    }
  };

  const handleDateChange = (e, field) => {
    const { value } = e.target;

    // Validar que el valor sea una fecha válida en formato YYYY-MM-DD
    if (!isNaN(Date.parse(value))) {
      setFormData({ ...formData, [field]: value });
      setErrors({ ...errors, [field]: "" });
    } else {
      setErrors({
        ...errors,
        [field]: "Ingrese una fecha válida en formato YYYY-MM-DD.",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const lowerCaseFormData = Object.fromEntries(
      Object.entries(formData).map(([key, value]) => [key.toLowerCase(), value])
    );

    if (
      !lowerCaseFormData.id_cliente ||
      !lowerCaseFormData.id_insumo ||
      !lowerCaseFormData.tipo_documento ||
      !lowerCaseFormData.fecha_solicitud ||
      !lowerCaseFormData.fecha_entrega ||
      !lowerCaseFormData.tipo_ot ||
      !lowerCaseFormData.cantidad ||
      !lowerCaseFormData.precio_neto ||
      !lowerCaseFormData.sub_total
    ) {
      setErrors({
        ...errors,
        GENERALES: "Todos los campos obligatorios deben ser llenados.",
      });
      return;
    }

    try {
      await onSubmit(lowerCaseFormData);
      resetForm();
      setEditing(false);
      setEditId(null);
      onClose();
    } catch (error) {
      console.error("Error al crear/actualizar OT:", error);
      setErrors({
        ...errors,
        GENERALES: error.response?.data?.message || "Ha ocurrido un error.",
      });
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="modal-content">
        <h1>{editing ? "Editar OT" : "Crear OT"}</h1>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* Primera Fila */}
            <Grid item xs={2.2}>
              <TextField
                label="Cliente"
                select
                value={formData.ID_CLIENTE}
                onChange={(e) => handleChange(e, "ID_CLIENTE")}
                fullWidth
              >
                <MenuItem value="">Seleccionar</MenuItem>
                {clientes.map((c) => (
                  <MenuItem key={c.ID_CLIENTE} value={c.ID_CLIENTE}>
                    {c.NOMBRE_RAZON_SOCIAL}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={2.6}>
              <TextField
                label="Tipo de Documento"
                type="text"
                value={formData.TIPO_DOCUMENTO}
                onChange={(e) => handleChange(e, "TIPO_DOCUMENTO")}
                fullWidth
              />
            </Grid>
            <Grid item xs={2.5}>
              <TextField
                label="Fecha de Solicitud"
                type="date"
                value={formData.FECHA_SOLICITUD}
                onChange={(e) => handleDateChange(e, "FECHA_SOLICITUD")}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={2.5}>
              <TextField
                label="Fecha de Entrega"
                type="date"
                value={formData.FECHA_ENTREGA}
                onChange={(e) => handleDateChange(e, "FECHA_ENTREGA")}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            {/* Segunda Fila */}
            <Grid item xs={2.2}>
              <TextField
                label="Tipo OT"
                value={formData.TIPO_OT}
                onChange={(e) => handleNameChange(e, "TIPO_OT")}
                fullWidth
              />
            </Grid>
            <Grid item xs={2.2}>
              <TextField
                label="Equipo"
                value={formData.EQUIPO}
                onChange={(e) => handleNameChange(e, "EQUIPO")}
                fullWidth
              />
            </Grid>
            <Grid item xs={2.6}>
              <TextField
                label="Número de Serie"
                value={formData.NUMERO_SERIE}
                onChange={(e) => handleAlphanumericChange(e, "NUMERO_SERIE")}
                fullWidth
              />
            </Grid>
            <Grid item xs={2.5}>
              <TextField
                label="Horas de Trabajo"
                type="number"
                value={formData.HORAS_TRABAJO}
                onChange={(e) => handleChange(e, "HORAS_TRABAJO")}
                fullWidth
              />
            </Grid>
            <Grid item xs={2.5}>
              <TextField
                label="Observación Final"
                value={formData.OBSERVACION_FINAL}
                onChange={(e) => handleNameChange(e, "OBSERVACION_FINAL")}
                fullWidth
              />
            </Grid>

            {/* Tercera Fila */}
            <Grid item xs={13}>
              <TextField
                label="Descripción"
                value={formData.DESCRIPCION}
                onChange={(e) => handleNameChange(e, "DESCRIPCION")}
                fullWidth
                minRows={3}
                maxRows={7}
                multiline
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                label="Insumo"
                select
                value={formData.ID_INSUMO}
                onChange={(e) => handleChange(e, "ID_INSUMO")}
                fullWidth
              >
                <MenuItem value="">Seleccionar</MenuItem>
                {insumos.map((i) => (
                  <MenuItem key={i.ID_INSUMO} value={i.ID_INSUMO}>
                    {i.NOMBRE_INSUMO}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={2}>
              <TextField
                label="Cantidad"
                type="number"
                value={formData.CANTIDAD}
                onChange={(e) =>
                  setFormData({ ...formData, CANTIDAD: e.target.value })
                }
                fullWidth
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                label="Precio Neto"
                type="number"
                value={formData.PRECIO_NETO}
                onChange={(e) =>
                  setFormData({ ...formData, PRECIO_NETO: e.target.value })
                }
                fullWidth
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                label="Descuento"
                type="number"
                value={formData.DESCUENTO}
                onChange={(e) =>
                  setFormData({ ...formData, DESCUENTO: e.target.value })
                }
                fullWidth
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                label="Recargo"
                type="number"
                value={formData.RECARGO}
                onChange={(e) => handleChange(e, "RECARGO")}
                fullWidth
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                label="AF/EX"
                type="number"
                value={formData.AF_EX}
                InputProps={{ readOnly: true }}
                fullWidth
              />
            </Grid>
            <Grid item xs={13}>
              <TextField
                label="Comentario"
                value={formData.COMENTARIO}
                onChange={(e) => handleNameChange(e, "COMENTARIO")}
                fullWidth
                minRows={3}
                maxRows={7}
                multiline
              />
            </Grid>

            {/* Quinta Fila */}
            <Grid item xs={2}>
              <TextField
                label="Sub Total"
                value={formData.SUB_TOTAL}
                fullWidth
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                label="descuento global"
                value={formData.DESCUENTO_GLOBAL}
                onChange={(e) => handleChange(e, "DESCUENTO_GLOBAL")}
                fullWidth
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                label="Monto Neto"
                value={formData.MONTO_NETO}
                fullWidth
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                label="Monto Exento"
                type="number"
                value={formData.MONTO_EXENTO}
                fullWidth
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                label="IVA (19%)"
                value={formData.IVA}
                fullWidth
                InputProps={{ readOnly: true }}
              />
            </Grid>

            <Grid item xs={2}>
              <TextField
                label="Total"
                value={formData.TOTAL}
                fullWidth
                InputProps={{ readOnly: true }}
              />
            </Grid>
          </Grid>

          {/* Botones */}
          <div className="form-actions">
            <Button type="submit">{editing ? "Actualizar" : "Crear"}</Button>
            <Button onClick={onClose}>Cancelar</Button>
          </div>
        </form>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          message={errors.GENERALES}
        />
      </div>
    </Modal>
  );
};

export default OtFormModal;
