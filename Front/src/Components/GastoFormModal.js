import React, { useState, useEffect } from "react";
import {
  Modal,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Snackbar,
  Checkbox,
  FormControlLabel,
  InputAdornment,
} from "@mui/material";

import "../Styles/FormUser.css";

const GastoFormModal = ({
  open,
  onClose,
  onSubmit,
  gastoData,
  editing,
  setEditing,
  setEditId,
  clientes,
  ots,
}) => {
  const [formData, setFormData] = useState({
    id_ot: "",
    sin_ot: "",
    item_gasto: "",
    detalle: "",
    fecha_compra: "",
    metodo_pago: "",
    pago_neto: "",
    iva: "",
    total_pagado: "",
    nro_factura: "",
    proveedor: "",
    observacion: "",
    id_cliente: "",
  });

  const [errors, setErrors] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [isAssociatedWithOt, setIsAssociatedWithOt] = useState(false);

  useEffect(() => {
    if (open) {
      if (editing && gastoData) {
        setFormData({
          id_ot:
            gastoData.ots && gastoData.ots.length > 0
              ? gastoData.ots[0].id_ot
              : "",
          item_gasto: gastoData.item_gasto || "",
          detalle: gastoData.detalle || "",
          fecha_compra: gastoData.fecha_compra || "",
          metodo_pago: gastoData.metodo_pago || "",
          pago_neto: gastoData.pago_neto || "",
          iva: gastoData.iva || "",
          total_pagado: gastoData.total_pagado || "",
          nro_factura: gastoData.nro_factura || "",
          proveedor: gastoData.proveedor || "",
          id_cliente: gastoData.id_cliente || "",
          observacion: gastoData.observacion || "",
        });
        setIsAssociatedWithOt(gastoData.ots && gastoData.ots.length > 0);
      } else {
        setFormData((prevState) => ({
          ...prevState,
          fecha_compra: "",
        }));
        resetForm();
      }
    }
  }, [open, editing, gastoData]);

  const resetForm = () => {
    setFormData({
      id_ot: "",
      sin_ot: "",
      item_gasto: "",
      detalle: "",
      fecha_compra: "",
      metodo_pago: "",
      pago_neto: "",
      iva: "",
      total_pagado: "",
      nro_factura: "",
      proveedor: "",
      observacion: "",
      id_cliente: "",
    });
    setErrors({});
    setIsAssociatedWithOt(false); // Reset checkbox state
  };

  const handleChangeOt = (e) => {
    const { value } = e.target;

    // Buscar la OT seleccionada
    const selectedOt = ots.find((ot) => ot.id_ot === value);

    // Si se encuentra una OT, asignamos el id_cliente de esa OT
    if (selectedOt) {
      setFormData({
        ...formData,
        id_ot: value,
        id_cliente: selectedOt.id_cliente,
      });
    } else {
      setFormData({
        ...formData,
        id_ot: value,
        id_cliente: "",
      });
    }
  };

  const handleDateChange = (e, field) => {
    const { value } = e.target;
    const today = new Date().toISOString().split("T")[0];

    if (value < today) {
      setErrors({
        ...errors,
        [field]: "No se permiten fechas pasadas.",
      });
    } else {
      setFormData({ ...formData, [field]: value });
      setErrors({ ...errors, [field]: "" });
    }
  };

  const handleChangeName = (e, field) => {
    const { value } = e.target;

    // Expresión regular para permitir letras, espacios, comas, tildes y caracteres especiales comunes
    const regex = /^[A-Za-zÀ-ÿ\s,.'-]*$/;

    // Validamos si el valor ingresado cumple con la expresión regular
    if (regex.test(value) || value === "") {
      setFormData({ ...formData, [field]: value });
      setErrors({ ...errors, [field]: "" });
    } else {
      // Si no es válido, puedes dejar el campo en blanco o mostrar un error
      setErrors({
        ...errors,
        [field]: "Solo se permiten letras, espacios, comas y tildes.",
      });
    }
  };

  const handleChangeNumber = (e, field) => {
    let { value } = e.target;

    // Si el valor está vacío, limpiamos el campo
    if (value === "") {
      setFormData({ ...formData, [field]: value });
      setErrors({ ...errors, [field]: "" });
      return;
    }

    // Eliminar caracteres no numéricos (esto asegura que no se guarden caracteres no deseados)
    value = value.replace(/\D/g, "");

    // Si es nro_factura, guardar solo el número sin puntos
    if (field === "nro_factura") {
      setFormData({ ...formData, [field]: value });
      setErrors({ ...errors, [field]: "" });
      return;
    }

    // Si es pago_neto, aplicar formato con puntos de miles para visualización,
    // pero guardar el valor sin puntos
    if (field === "pago_neto") {
      const pagoNeto = parseInt(value, 10) || 0; // Convertir a número sin puntos
      const iva = pagoNeto * 0.19;
      const totalPagado = pagoNeto + iva;

      // Guardar valores sin puntos
      setFormData({
        ...formData,
        pago_neto: pagoNeto, // Almacenar sin puntos
        iva: iva.toFixed(0), // Redondeado sin decimales
        total_pagado: totalPagado.toFixed(0), // Redondeado sin decimales
      });
      return;
    }

    // Si no es un campo especial, solo actualizar el valor
    setFormData({ ...formData, [field]: value });
    setErrors({ ...errors, [field]: "" });
  };

  const formatNumberWithDots = (number) => {
    if (number === undefined || number === null || isNaN(number)) return "";

    // Convertir el número a string y agregar los puntos de miles
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.item_gasto ||
      !formData.detalle ||
      !formData.fecha_compra ||
      !formData.metodo_pago ||
      !formData.pago_neto ||
      !formData.iva ||
      !formData.total_pagado ||
      !formData.nro_factura ||
      !formData.proveedor ||
      !formData.id_cliente ||
      !formData.observacion
    ) {
      setErrors({
        ...errors,
        GENERALES: "Todos los campos obligatorios deben ser llenados.",
      });
      return;
    }

    try {
      console.log("Enviando datos:", formData);
      await onSubmit(formData);
      resetForm();
      setEditing(false);
      setEditId(null);
      onClose();
    } catch (error) {
      console.error("Error al crear/actualizar gasto:", error);
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

  const handleCheckboxChange = (e) => {
    setIsAssociatedWithOt(e.target.checked);
    if (e.target.checked) {
      setFormData({ ...formData, sin_ot: "" }); // Clear sin_ot when OT is selected
    } else {
      setFormData({ ...formData, id_ot: "" }); // Clear id_ot when "sin_ot" is selected
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="modal-content">
        <h2>
          {editing
            ? "Formulario para editar Gasto"
            : "Formulario para ingresar Gasto"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <FormControl fullWidth margin="normal">
                <InputLabel>Seleccionar N° OT</InputLabel>
                <Select
                  label="Seleccionar N° OT"
                  value={formData.id_ot}
                  onChange={handleChangeOt}
                  disabled={!isAssociatedWithOt}
                >
                  {ots.map((ot) => (
                    <MenuItem key={ot.id_ot} value={ot.id_ot}>
                      N°{ot.id_ot}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControlLabel
                control={
                  <Checkbox
                    checked={isAssociatedWithOt}
                    onChange={handleCheckboxChange}
                  />
                }
                label="¿El gasto está asociado a una OT?"
              />
              {!isAssociatedWithOt && (
                <TextField
                  label="Referencia (sin OT)"
                  value={formData.sin_ot}
                  onChange={(e) => handleChangeName(e, "sin_ot")}
                  fullWidth
                  required
                  error={!!errors.sin_ot}
                  helperText={errors.sin_ot && errors.sin_ot}
                  margin="normal"
                />
              )}

              <TextField
                label="Nombre del Gasto"
                value={formData.item_gasto}
                onChange={(e) => handleChangeName(e, "item_gasto")}
                fullWidth
                margin="normal"
                required
                error={!!errors.item_gasto}
                helperText={errors.item_gasto && errors.item_gasto}
                InputLabelProps={{ shrink: true }}
              />

              <TextField
                label="Detalle"
                value={formData.detalle}
                onChange={(e) => handleChangeName(e, "detalle")}
                fullWidth
                margin="normal"
                required
                error={!!errors.detalle}
                helperText={errors.detalle && errors.detalle}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="Fecha de Compra"
                value={formData.fecha_compra}
                onChange={(e) => handleDateChange(e, "fecha_compra")}
                fullWidth
                margin="normal"
                type="date"
                required
                InputLabelProps={{ shrink: true }}
                error={!!errors.fecha_compra}
                inputProps={{
                  min: new Date().toISOString().split("T")[0],
                }}
              />
              <TextField
                label="Método de Pago"
                value={formData.metodo_pago}
                onChange={(e) => handleChangeName(e, "metodo_pago")}
                fullWidth
                margin="normal"
                required
                error={!!errors.metodo_pago}
                helperText={errors.metodo_pago && errors.metodo_pago}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="Número de Factura"
                type="number"
                value={formData.nro_factura}
                onChange={(e) => handleChangeNumber(e, "nro_factura")}
                fullWidth
                margin="normal"
                required
                error={!!errors.nro_factura}
                helperText={errors.nro_factura && errors.nro_factura}
                InputLabelProps={{ shrink: true }}
              />
            </div>
            <div className="form-group">
              <TextField
                label="Pago Neto"
                value={formatNumberWithDots(formData.pago_neto)} // Mostrar con puntos de miles
                onChange={(e) => handleChangeNumber(e, "pago_neto")}
                fullWidth
                margin="normal"
                required
                error={!!errors.pago_neto}
                helperText={errors.pago_neto && errors.pago_neto}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ), // Agregar el símbolo "$" a la izquierda
                }}
              />

              <TextField
                label="IVA"
                value={formData.iva}
                fullWidth
                margin="normal"
                required
                type="number"
                disabled
                error={!!errors.iva}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ), // Agregar el símbolo "$" a la izquierda
                }}
              />

              <TextField
                label="Total Pagado"
                value={formData.total_pagado}
                fullWidth
                margin="normal"
                required
                type="number"
                disabled
                error={!!errors.total_pagado}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ), // Agregar el símbolo "$" a la izquierda
                }}
              />
              <TextField
                label="Proveedor"
                value={formData.proveedor}
                onChange={(e) => handleChangeName(e, "proveedor")}
                fullWidth
                margin="normal"
                required
                error={!!errors.proveedor}
                helperText={errors.proveedor && errors.proveedor}
                InputLabelProps={{ shrink: true }}
              />

              <FormControl fullWidth margin="normal">
                <InputLabel>Seleccionar Cliente</InputLabel>
                <Select
                  label="Seleccionar Cliente"
                  value={formData.id_cliente}
                  onChange={(e) =>
                    setFormData({ ...formData, id_cliente: e.target.value })
                  }
                  InputLabelProps={{ shrink: !!formData.id_cliente }}
                >
                  {clientes.map((cliente) => (
                    <MenuItem
                      key={cliente.id_cliente}
                      value={cliente.id_cliente}
                    >
                      {cliente.nombre_razon_social}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                label="observacion"
                value={formData.observacion}
                onChange={(e) => handleChangeName(e, "observacion")}
                fullWidth
                margin="normal"
                required
                error={!!errors.observacion}
                InputLabelProps={{ shrink: true }}
              />
            </div>
          </div>

          <div className="form-actions">
            <Button type="submit">{editing ? "Actualizar" : "Crear"}</Button>
            <Button onClick={onClose}>Cancelar</Button>
          </div>
        </form>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          message={errors.generales}
        />
      </div>
    </Modal>
  );
};

export default GastoFormModal;
