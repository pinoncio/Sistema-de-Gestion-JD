import React, { useState, useEffect } from "react";
import {
  Modal,
  TextField,
  Button,
  Snackbar,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
} from "@mui/material";

import "../Styles/FormUser.css";

const MaquinaFormModal = ({
  open,
  onClose,
  onSubmit,
  maquinaData,
  editing,
  setEditing,
  setEditId,
  clientes,
}) => {
  const [formData, setFormData] = useState({
    id_cliente: "",
    nombre_maquina: "",
    modelo_maquina: "",
    numero_serie: "",
    numero_motor: "",
  });

  const [errors, setErrors] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    if (open) {
      if (editing && maquinaData) {
        setFormData({
          id_cliente: maquinaData.id_cliente || "",
          nombre_maquina: maquinaData.nombre_maquina || "",
          modelo_maquina: maquinaData.modelo_maquina || "",
          numero_serie: maquinaData.numero_serie || "",
          numero_motor: maquinaData.numero_motor || "",
        });
      } else {
        resetForm();
      }
    }
  }, [open, editing, maquinaData]);

  const resetForm = () => {
    setFormData({
      id_cliente: "",
      nombre_maquina: "",
      modelo_maquina: "",
      numero_serie: "",
      numero_motor: "",
    });
    setErrors({});
  };

  const handleAlphanumericChange = (e, field) => {
    const { value } = e.target;
    if (/^[A-Za-z0-9áéíóúÁÉÍÓÚñÑ-\s]+$/.test(value) || value === "") {
      setFormData({ ...formData, [field]: value });
      setErrors({ ...errors, [field]: "" });
    } else {
      setErrors({
        ...errors,
        [field]:
          "Solo se permiten letras, números, guiones, tildes y espacios.",
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
      !lowerCaseFormData.nombre_maquina ||
      !lowerCaseFormData.modelo_maquina ||
      !lowerCaseFormData.numero_serie ||
      !lowerCaseFormData.numero_motor
    ) {
      setErrors({
        ...errors,
        GENERALES: "Todos los campos obligatorios deben ser llenados.",
      });
      setOpenSnackbar(true);
      return;
    }

    try {
      await onSubmit(lowerCaseFormData);
      resetForm();
      setEditing(false);
      setEditId(null);
      onClose();
    } catch (error) {
      console.error("Error al crear/actualizar máquina:", error);
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
            ? "Formulario para editar Máquina"
            : "Formulario para crear Máquina"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <FormControl fullWidth margin="normal">
                <InputLabel id="cliente-label">Cliente</InputLabel>
                <Select
                  labelId="cliente-label"
                  id="cliente-select"
                  label="Cliente"
                  value={formData.id_cliente}
                  onChange={(e) =>
                    setFormData({ ...formData, id_cliente: e.target.value })
                  }
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
                label="Nombre de la Máquina"
                value={formData.nombre_maquina}
                onChange={(e) => handleAlphanumericChange(e, "nombre_maquina")}
                fullWidth
                margin="normal"
                required
                helperText={
                  errors.nombre_maquina ||
                  (!formData.nombre_maquina
                    ? "El nombre de la máquina es obligatorio."
                    : "")
                }
                error={!!errors.nombre_maquina}
              />
              <TextField
                label="Modelo de la Máquina"
                value={formData.modelo_maquina}
                onChange={(e) => handleAlphanumericChange(e, "modelo_maquina")}
                fullWidth
                margin="normal"
                required
                helperText={
                  errors.modelo_maquina ||
                  (!formData.modelo_maquina
                    ? "El modelo de la máquina es obligatorio."
                    : "")
                }
                error={!!errors.modelo_maquina}
              />
            </div>
            <div className="form-group">
              <TextField
                label="Número de Serie"
                value={formData.numero_serie}
                onChange={(e) => handleAlphanumericChange(e, "numero_serie")}
                fullWidth
                margin="normal"
                required
                helperText={
                  errors.numero_serie ||
                  (!formData.numero_serie
                    ? "El número de serie es obligatorio."
                    : "")
                }
                error={!!errors.numero_serie}
              />
              <TextField
                label="Número de Motor"
                value={formData.numero_motor}
                onChange={(e) => handleAlphanumericChange(e, "numero_motor")}
                fullWidth
                margin="normal"
                required
                helperText={
                  errors.numero_motor ||
                  (!formData.numero_motor
                    ? "El número de motor es obligatorio."
                    : "")
                }
                error={!!errors.numero_motor}
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

export default MaquinaFormModal;
