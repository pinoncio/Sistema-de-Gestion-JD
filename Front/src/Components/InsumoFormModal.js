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
} from "@mui/material";

import "../Styles/FormUser.css";

const InsumoFormModal = ({
  open,
  onClose,
  onSubmit,
  insumoData,
  editing,
  setEditing,
  setEditId,
  categorias,
}) => {
  const [formData, setFormData] = useState({
    tipo_insumo: "",
    nombre_insumo: "",
    ubicacion: "",
    cantidad: "",
    costo_unidad: "",
    sub_total: "",
    ajuste_actual: "",
    id_categoria: "",
  });

  const [errors, setErrors] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    if (open) {
      if (editing && insumoData) {
        setFormData({
          tipo_insumo: insumoData.tipo_insumo || "",
          nombre_insumo: insumoData.nombre_insumo || "",
          ubicacion: insumoData.ubicacion || "",
          cantidad: insumoData.cantidad || "",
          costo_unidad: insumoData.costo_unidad || "",
          sub_total: insumoData.sub_total || "",
          ajuste_actual: insumoData.ajuste_actual || "",
          id_categoria: insumoData.id_categoria || "",
        });
      } else {
        resetForm();
      }
    }
  }, [open, editing, insumoData]);

  const resetForm = () => {
    setFormData({
      tipo_insumo: "",
      nombre_insumo: "",
      ubicacion: "",
      cantidad: "",
      costo_unidad: "",
      sub_total: "",
      ajuste_actual: "",
      id_categoria: "",
    });
    setErrors({});
  };

  useEffect(() => {
    const calculateSubtotal = () => {
      const cantidad = parseFloat(formData.cantidad) || 0;
      const costoUnidad = parseFloat(formData.costo_unidad) || 0;
      const subtotal = cantidad * costoUnidad;
      setFormData((prevData) => ({
        ...prevData,
        sub_total: subtotal.toFixed(2), // Guardamos el subtotal con 2 decimales
      }));
    };

    if (formData.cantidad && formData.costo_unidad) {
      calculateSubtotal();
    }
  }, [formData.cantidad, formData.costo_unidad]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const lowerCaseFormData = Object.fromEntries(
      Object.entries(formData).map(([key, value]) => [key.toLowerCase(), value])
    );

    if (
      !lowerCaseFormData.tipo_insumo ||
      !lowerCaseFormData.nombre_insumo ||
      !lowerCaseFormData.ubicacion ||
      !lowerCaseFormData.cantidad ||
      !lowerCaseFormData.costo_unidad ||
      !lowerCaseFormData.ajuste_actual ||
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
      console.error("Error al crear/actualizar insumo:", error);
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
        <h2>
          {editing
            ? "Formulario para editar Insumo"
            : "Formulario para crear Insumo"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <FormControl fullWidth margin="normal">
                <InputLabel>Categoria</InputLabel>
                <Select
                  label="Categoria"
                  value={formData.id_categoria}
                  onChange={(e) =>
                    setFormData({ ...formData, id_categoria: e.target.value })
                  }
                >
                  {categorias.map((categoria) => (
                    <MenuItem
                      key={categoria.id_categoria}
                      value={categoria.id_categoria}
                    >
                      {categoria.nombre_categoria}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                label="Tipo de Insumo"
                value={formData.tipo_insumo}
                onChange={(e) => handleNameChange(e, "tipo_insumo")}
                fullWidth
                margin="normal"
                required
                helperText={
                  errors.tipo_insumo ||
                  (!formData.tipo_insumo
                    ? "El tipo de insumo es obligatorio."
                    : "")
                }
                error={!!errors.tipo_insumo}
              />
              <TextField
                label="Nombre del Insumo"
                value={formData.nombre_insumo}
                onChange={(e) => handleNameChange(e, "nombre_insumo")}
                fullWidth
                margin="normal"
                required
                helperText={
                  errors.nombre_insumo ||
                  (!formData.nombre_insumo
                    ? "El nombre del insumo es obligatorio."
                    : "")
                }
                error={!!errors.nombre_insumo}
              />
              <TextField
                label="Ubicación"
                value={formData.ubicacion}
                onChange={(e) => handleNameChange(e, "ubicacion")}
                fullWidth
                margin="normal"
                required
                helperText={
                  errors.ubicacion ||
                  (!formData.ubicacion
                    ? "La ubicacion del insumo es obligatorio."
                    : "")
                }
                error={!!errors.ubicacion}
              />
            </div>
            <div className="form-group">
              <TextField
                label="Cantidad"
                value={formData.cantidad}
                onChange={(e) => handleChange(e, "cantidad")}
                fullWidth
                margin="normal"
                required
                helperText={
                  errors.cantidad ||
                  (!formData.cantidad ? "La cantidad es obligatoria." : "")
                }
                error={!!errors.cantidad}
              />
              <TextField
                label="Costo por Unidad"
                value={formData.costo_unidad}
                onChange={(e) => handleChange(e, "costo_unidad")}
                fullWidth
                margin="normal"
                required
                helperText={
                  errors.costo_unidad ||
                  (!formData.costo_unidad
                    ? "El costo por unidad es obligatorio."
                    : "")
                }
                error={!!errors.costo_unidad}
              />
              <TextField
                label="Ajuste Actual"
                value={formData.ajuste_actual}
                onChange={(e) => handleChange(e, "ajuste_actual")}
                fullWidth
                margin="normal"
                required
                helperText={
                  errors.ajuste_actual ||
                  (!formData.ajuste_actual
                    ? "El ajuste actual es obligatorio."
                    : "")
                }
                error={!!errors.ajuste_actual}
              />
              <TextField
                label="Sub Total"
                value={formData.sub_total}
                fullWidth
                margin="normal"
                required
                disabled
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

export default InsumoFormModal;
