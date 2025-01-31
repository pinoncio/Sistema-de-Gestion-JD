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
    TIPO_INSUMO: "",
    NOMBRE_INSUMO: "",
    UBICACION: "",
    CANTIDAD: "",
    COSTO_UNIDAD: "",
    SUB_TOTAL: "",
    AJUSTE_ACTUAL: "",
    ID_CATEGORIA: "",
  });

  const [errors, setErrors] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    if (insumoData) {
      setFormData({
        TIPO_INSUMO: insumoData.TIPO_INSUMO || "",
        NOMBRE_INSUMO: insumoData.NOMBRE_INSUMO || "",
        UBICACION: insumoData.UBICACION || "",
        CANTIDAD: insumoData.CANTIDAD || "",
        COSTO_UNIDAD: insumoData.COSTO_UNIDAD || "",
        SUB_TOTAL: insumoData.SUB_TOTAL || "",
        AJUSTE_ACTUAL: insumoData.AJUSTE_ACTUAL || "",
        ID_CATEGORIA: insumoData.ID_CATEGORIA || "",
      });
    } else {
      setFormData({
        TIPO_INSUMO: "",
        NOMBRE_INSUMO: "",
        UBICACION: "",
        CANTIDAD: "",
        COSTO_UNIDAD: "",
        SUB_TOTAL: "",
        AJUSTE_ACTUAL: "",
        ID_CATEGORIA: "",
      });
    }
  }, [insumoData]);

  useEffect(() => {
    const calculateSubtotal = () => {
      const cantidad = parseFloat(formData.CANTIDAD) || 0;
      const costoUnidad = parseFloat(formData.COSTO_UNIDAD) || 0;
      const ajusteActual = parseFloat(formData.AJUSTE_ACTUAL) || 0;
      const subtotal = cantidad * costoUnidad + ajusteActual; // Formula del subtotal
      setFormData((prevData) => ({
        ...prevData,
        SUB_TOTAL: subtotal.toFixed(2), // Guardamos el subtotal con 2 decimales
      }));
    };

    if (formData.CANTIDAD && formData.COSTO_UNIDAD && formData.AJUSTE_ACTUAL) {
      calculateSubtotal();
    }
  }, [formData.CANTIDAD, formData.COSTO_UNIDAD, formData.AJUSTE_ACTUAL]);

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
      onClose();
      setEditing(false);
      setEditId(null);
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
                  value={formData.ID_CATEGORIA}
                  onChange={(e) =>
                    setFormData({ ...formData, ID_CATEGORIA: e.target.value })
                  }
                >
                  {categorias.map((categoria) => (
                    <MenuItem
                      key={categoria.ID_CATEGORIA}
                      value={categoria.ID_CATEGORIA}
                    >
                      {categoria.NOMBRE_CATEGORIA}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                label="Tipo de Insumo"
                value={formData.TIPO_INSUMO}
                onChange={(e) => handleNameChange(e, "TIPO_INSUMO")}
                fullWidth
                margin="normal"
                required
                helperText={
                  errors.TIPO_INSUMO ||
                  (!formData.TIPO_INSUMO
                    ? "El tipo de insumo es obligatorio."
                    : "")
                }
                error={!!errors.TIPO_INSUMO}
              />
              <TextField
                label="Nombre del Insumo"
                value={formData.NOMBRE_INSUMO}
                onChange={(e) => handleNameChange(e, "NOMBRE_INSUMO")}
                fullWidth
                margin="normal"
                required
                helperText={
                  errors.NOMBRE_INSUMO ||
                  (!formData.NOMBRE_INSUMO
                    ? "El nombre del insumo es obligatorio."
                    : "")
                }
                error={!!errors.NOMBRE_INSUMO}
              />
              <TextField
                label="Ubicación"
                value={formData.UBICACION}
                onChange={(e) => handleNameChange(e, "UBICACION")}
                fullWidth
                margin="normal"
                required
                helperText={
                  errors.UBICACION ||
                  (!formData.UBICACION
                    ? "La ubicacion del insumo es obligatorio."
                    : "")
                }
                error={!!errors.UBICACION}
              />
            </div>
            <div className="form-group">
              <TextField
                label="Cantidad"
                value={formData.CANTIDAD}
                onChange={(e) => handleChange(e, "CANTIDAD")}
                fullWidth
                margin="normal"
                required
                helperText={
                  errors.CANTIDAD ||
                  (!formData.CANTIDAD ? "La cantidad es obligatoria." : "")
                }
                error={!!errors.CANTIDAD}
              />
              <TextField
                label="Costo por Unidad"
                value={formData.COSTO_UNIDAD}
                onChange={(e) => handleChange(e, "COSTO_UNIDAD")}
                fullWidth
                margin="normal"
                required
                helperText={
                  errors.COSTO_UNIDAD ||
                  (!formData.COSTO_UNIDAD
                    ? "El costo por unidad es obligatorio."
                    : "")
                }
                error={!!errors.COSTO_UNIDAD}
              />
              <TextField
                label="Ajuste Actual"
                value={formData.AJUSTE_ACTUAL}
                onChange={(e) => handleChange(e, "AJUSTE_ACTUAL")}
                fullWidth
                margin="normal"
                required
                helperText={
                  errors.AJUSTE_ACTUAL ||
                  (!formData.AJUSTE_ACTUAL
                    ? "El ajuste actual es obligatorio."
                    : "")
                }
                error={!!errors.AJUSTE_ACTUAL}
              />
              <TextField
                label="Sub Total"
                value={formData.SUB_TOTAL}
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
          message={errors.GENERALES}
        />
      </div>
    </Modal>
  );
};

export default InsumoFormModal;
