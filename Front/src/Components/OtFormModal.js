import React, { useState, useEffect } from "react";
import {
  Modal,
  MenuItem,
  TextField,
  Button,
  Snackbar,
  Grid,
  InputAdornment,
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
        setFormData({
          ...otData,
          FECHA_SOLICITUD: otData.FECHA_SOLICITUD
            ? new Date(otData.FECHA_SOLICITUD).toISOString().split("T")[0]
            : "",
          FECHA_ENTREGA: otData.FECHA_ENTREGA
            ? new Date(otData.FECHA_ENTREGA).toISOString().split("T")[0]
            : "",
          SUB_TOTAL: otData.SUB_TOTAL || "0",
        });
      } else {
        resetForm();
      }
    }
  }, [open, editing, otData]);

  const resetForm = () => {
    const today = new Date().toISOString().split("T")[0]; // Obtiene la fecha en formato YYYY-MM-DD
    setFormData({
      ID_CLIENTE: "",
      ID_INSUMO: "",
      TIPO_DOCUMENTO: "Orden de Trabajo",
      FECHA_SOLICITUD: today,
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
      SUB_TOTAL: subtotal.toFixed(0), // Sin decimales
      MONTO_NETO: montoNeto.toFixed(0), // Sin decimales
      IVA: iva.toFixed(0), // Sin decimales
      TOTAL: total.toFixed(0), // Sin decimales
    }));
  }, [
    formData.CANTIDAD,
    formData.RECARGO,
    formData.PRECIO_NETO,
    formData.DESCUENTO,
    formData.DESCUENTO_GLOBAL,
    formData.MONTO_EXENTO,
  ]);

  const validateName = (value) => {
    const regex = /^[A-Za-zÁáÉéÍíÓóÚúÑñ\s]+$/;
    return regex.test(value);
  };

  const validateNumber = (value) => {
    const regex = /^[0-9]+(\.[0-9]{1,2})?$/; // Permite solo números y hasta dos decimales
    return regex.test(value);
  };

  const handleChange = (e, field) => {
    const { value } = e.target;

    // Validar si el valor es un número válido con formato decimal (hasta 2 decimales)
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

  const handleNameChange = (e, field) => {
    const { value } = e.target;
    if (validateName(value) || value === "") {
      setFormData({ ...formData, [field]: value });
      setErrors({ ...errors, [field]: "" });
    } else {
      setErrors({ ...errors, [field]: "Solo se permiten letras y espacios." });
    }
  };

  const validateAlphanumeric = (value) => /^[A-Za-z0-9-]+$/.test(value);

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
      !lowerCaseFormData.equipo ||
      !lowerCaseFormData.numero_serie ||
      !lowerCaseFormData.horas_trabajo ||
      !lowerCaseFormData.observacion_final ||
      !lowerCaseFormData.descripcion ||
      !lowerCaseFormData.cantidad ||
      !lowerCaseFormData.precio_neto ||
      !lowerCaseFormData.descuento ||
      !lowerCaseFormData.recargo ||
      !lowerCaseFormData.comentario ||
      !lowerCaseFormData.descuento_global ||
      !lowerCaseFormData.af_ex ||
      !lowerCaseFormData.sub_total ||
      !lowerCaseFormData.monto_neto ||
      !lowerCaseFormData.monto_exento ||
      !lowerCaseFormData.iva ||
      !lowerCaseFormData.total
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
      if (error.response && error.response.data) {
        setErrors({
          ...errors,
          GENERALES: error.response.data.message || "Ha ocurrido un error.",
        });
      } else {
        setErrors({
          ...errors,
          GENERALES: "Ha ocurrido un error. Intente nuevamente.",
        });
      }
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
                required
                error={!!errors.ID_CLIENTE}
                helperText={errors.ID_CLIENTE || "Campo obligatorio."}
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
                required
                error={!!errors.FECHA_ENTREGA}
                helperText={errors.FECHA_ENTREGA || "Campó obligatorio"}
              />
            </Grid>

            <Grid item xs={2.2}>
              <TextField
                label="Tipo OT"
                value={formData.TIPO_OT}
                onChange={(e) => handleNameChange(e, "TIPO_OT")}
                fullWidth
                required
                helperText={
                  errors.TIPO_OT ||
                  (!formData.TIPO_OT ? "Campó obligatorio" : "")
                }
                error={!!errors.TIPO_OT}
              />
            </Grid>

            <Grid item xs={2.2}>
              <TextField
                label="Equipo"
                value={formData.EQUIPO}
                onChange={(e) => handleNameChange(e, "EQUIPO")}
                fullWidth
                required
                helperText={
                  errors.EQUIPO || (!formData.EQUIPO ? "Campó obligatorio" : "")
                }
                error={!!errors.EQUIPO}
              />
            </Grid>

            <Grid item xs={2.6}>
              <TextField
                label="Número de Serie"
                value={formData.NUMERO_SERIE}
                onChange={(e) => handleAlphanumericChange(e, "NUMERO_SERIE")}
                fullWidth
                required
                helperText={
                  errors.NUMERO_SERIE ||
                  (!formData.NUMERO_SERIE ? "Campó obligatorio" : "")
                }
                error={!!errors.NUMERO_SERIE}
              />
            </Grid>

            <Grid item xs={2.5}>
              <TextField
                label="Horas de Trabajo"
                type="number"
                value={formData.HORAS_TRABAJO}
                onChange={(e) => handleChange(e, "HORAS_TRABAJO")}
                fullWidth
                required
                helperText={
                  errors.HORAS_TRABAJO ||
                  (!formData.HORAS_TRABAJO ? "Campó obligatorio" : "")
                }
                error={!!errors.HORAS_TRABAJO}
              />
            </Grid>
            <Grid item xs={2.5}>
              <TextField
                label="Observación Final"
                value={formData.OBSERVACION_FINAL}
                onChange={(e) => handleNameChange(e, "OBSERVACION_FINAL")}
                fullWidth
                required
                helperText={
                  errors.OBSERVACION_FINAL ||
                  (!formData.OBSERVACION_FINAL ? "Campó obligatorio" : "")
                }
                error={!!errors.OBSERVACION_FINAL}
              />
            </Grid>

            {/* Tercera Fila */}
            <Grid item xs={13}>
              <TextField
                label="Descripción"
                value={formData.DESCRIPCION}
                onChange={(e) => handleNameChange(e, "DESCRIPCION")}
                minRows={3}
                maxRows={7}
                multiline
                fullWidth
                required
                helperText={
                  errors.DESCRIPCION ||
                  (!formData.DESCRIPCION ? "Campó obligatorio" : "")
                }
                error={!!errors.DESCRIPCION}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                label="Insumo"
                select
                value={formData.ID_INSUMO}
                onChange={(e) => handleChange(e, "ID_INSUMO")}
                fullWidth
                required
                error={!!errors.ID_INSUMO}
                helperText={errors.ID_INSUMO || "Campo obligatorio."}
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
                onChange={(e) => handleChange(e, "CANTIDAD")}
                fullWidth
                required
                helperText={
                  errors.CANTIDAD ||
                  (!formData.CANTIDAD ? "Campó obligatorio" : "")
                }
                error={!!errors.CANTIDAD}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                label="Precio Neto"
                type="number"
                value={formData.PRECIO_NETO}
                onChange={(e) => handleChange(e, "PRECIO_NETO")}
                fullWidth
                required
                helperText={
                  errors.PRECIO_NETO ||
                  (!formData.PRECIO_NETO ? "Campo obligatorio" : "")
                }
                error={!!errors.PRECIO_NETO}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                label="Descuento"
                type="number"
                value={formData.DESCUENTO}
                onChange={(e) => handleChange(e, "DESCUENTO")}
                fullWidth
                required
                helperText={
                  errors.DESCUENTO ||
                  (!formData.DESCUENTO ? "Campo obligatorio" : "")
                }
                error={!!errors.DESCUENTO}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">%</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                label="Recargo"
                type="number"
                value={formData.RECARGO}
                onChange={(e) => handleChange(e, "RECARGO")}
                fullWidth
                required
                helperText={
                  errors.RECARGO ||
                  (!formData.RECARGO ? "Campo obligatorio" : "")
                }
                error={!!errors.RECARGO}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
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
                minRows={3}
                maxRows={7}
                multiline
                fullWidth
                required
                helperText={
                  errors.COMENTARIO ||
                  (!formData.COMENTARIO ? "Campó obligatorio" : "")
                }
                error={!!errors.COMENTARIO}
              />
            </Grid>

            {/* Quinta Fila */}
            <Grid item xs={2}>
              <TextField
                label="Sub Total"
                value={formData.SUB_TOTAL}
                fullWidth
                InputProps={{
                  readOnly: true,
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                label="descuento global"
                value={formData.DESCUENTO_GLOBAL}
                onChange={(e) => handleChange(e, "DESCUENTO_GLOBAL")}
                fullWidth
                required
                helperText={
                  errors.DESCUENTO_GLOBAL ||
                  (!formData.DESCUENTO_GLOBAL ? "Campó obligatorio" : "")
                }
                error={!!errors.DESCUENTO_GLOBAL}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">%</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                label="Monto Neto"
                value={formData.MONTO_NETO}
                fullWidth
                InputProps={{
                  readOnly: true,
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                label="Monto Exento"
                type="number"
                value={formData.MONTO_EXENTO}
                fullWidth
                InputProps={{
                  readOnly: true,
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                label="IVA (19%)"
                value={formData.IVA}
                fullWidth
                InputProps={{
                  readOnly: true,
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={2}>
              <TextField
                label="Total"
                value={formData.TOTAL}
                fullWidth
                InputProps={{
                  readOnly: true,
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
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
