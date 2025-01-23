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
  Alert,
} from "@mui/material";

import "../../Styles/FormUser.css";

const UserFormModal = ({
  open,
  onClose,
  onSubmit,
  userData,
  editing,
  setEditing,
  setEditId,
  roles,
}) => {
  const [formData, setFormData] = useState({
    NOMBRE_USUARIO: "",
    APELLIDO_USUARIO: "",
    RUT_USUARIO: "",
    EMAIL_USUARIO: "",
    CONTRASENIA_USUARIO: "",
    FECHA_NACIMIENTO_USUARIO: "",
    ROL_USUARIO: "",
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    if (userData) {
      setFormData({
        NOMBRE_USUARIO: userData.NOMBRE_USUARIO || "",
        APELLIDO_USUARIO: userData.APELLIDO_USUARIO || "",
        RUT_USUARIO: userData.RUT_USUARIO || "",
        EMAIL_USUARIO: userData.EMAIL_USUARIO || "",
        CONTRASENIA_USUARIO: userData.CONTRASENIA_USUARIO || "",
        FECHA_NACIMIENTO_USUARIO: userData.FECHA_NACIMIENTO_USUARIO || "",
        ROL_USUARIO: userData.ROL_USUARIO || "",
      });
    } else {
      setFormData({
        NOMBRE_USUARIO: "",
        APELLIDO_USUARIO: "",
        RUT_USUARIO: "",
        EMAIL_USUARIO: "",
        CONTRASENIA_USUARIO: "",
        FECHA_NACIMIENTO_USUARIO: "",
        ROL_USUARIO: "",
      });
    }
  }, [userData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const lowerCaseFormData = Object.fromEntries(
      Object.entries(formData).map(([key, value]) => [key.toLowerCase(), value])
    );

    // Basic validation
    if (!validateEmail(lowerCaseFormData.email_usuario)) {
      setSnackbarMessage("El correo electrónico no es válido.");
      setSnackbarOpen(true);
      return;
    }

    if (
      !lowerCaseFormData.nombre_usuario ||
      !lowerCaseFormData.apellido_usuario ||
      !lowerCaseFormData.contrasenia_usuario
    ) {
      setSnackbarMessage("Todos los campos obligatorios deben ser llenados.");
      setSnackbarOpen(true);
      return;
    }

    try {
      await onSubmit(lowerCaseFormData);
      onClose();
      setEditing(false);
      setEditId(null);
      setSnackbarMessage("Usuario creado/actualizado exitosamente!");
      setSnackbarOpen(true); // Open success snackbar
    } catch (error) {
      console.error("Error al crear/actualizar usuario:", error);
      // Check for specific errors from the backend (if applicable)
      if (error.response && error.response.data) {
        setSnackbarMessage(
          error.response.data.message || "Ha ocurrido un error."
        );
      } else {
        setSnackbarMessage("Ha ocurrido un error. Intente nuevamente.");
      }
      setSnackbarOpen(true); // Open error snackbar
    }
  };

  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="modal-content">
        <h2>{editing ? "Formulario para editar Usuario" : "Formulario para crear Usuario"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <TextField
                label="Nombre"
                value={formData.NOMBRE_USUARIO}
                onChange={(e) =>
                  setFormData({ ...formData, NOMBRE_USUARIO: e.target.value })
                }
                fullWidth
                margin="normal"
                required // Mark required field
                helperText={
                  !formData.NOMBRE_USUARIO ? "El nombre es obligatorio." : ""
                } // Error helper text
              />
              <TextField
                label="Apellido"
                value={formData.APELLIDO_USUARIO}
                onChange={(e) =>
                  setFormData({ ...formData, APELLIDO_USUARIO: e.target.value })
                }
                fullWidth
                margin="normal"
                required
                helperText={
                  !formData.APELLIDO_USUARIO
                    ? "El apellido es obligatorio."
                    : ""
                }
              />
              <TextField
                label="Rut"
                value={formData.RUT_USUARIO}
                onChange={(e) =>
                  setFormData({ ...formData, RUT_USUARIO: e.target.value })
                }
                fullWidth
                margin="normal"
                required

                helperText={
                  !formData.RUT_USUARIO ? "El Rut es obligatorio." : ""
                }
              />
            </div>
            <div className="form-group">
              <TextField
                label="Correo electrónico"
                value={formData.EMAIL_USUARIO}
                onChange={(e) =>
                  setFormData({ ...formData, EMAIL_USUARIO: e.target.value })
                }
                fullWidth
                margin="normal"
                required

                helperText={
                  !formData.EMAIL_USUARIO
                    ? "El correo electrónico es obligatorio."
                    : ""
                }
              />
              <TextField
                label="Contraseña"
                type="password"
                value={formData.CONTRASENIA_USUARIO}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    CONTRASENIA_USUARIO: e.target.value,
                  })
                }
                fullWidth
                margin="normal"
                required

                helperText={
                  !formData.CONTRASENIA_USUARIO
                    ? "La contraseña es obligatoria."
                    : ""
                }
              />
              <TextField
                label=""
                type="date"
                value={formData.FECHA_NACIMIENTO_USUARIO}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    FECHA_NACIMIENTO_USUARIO: e.target.value,
                  })
                }
                fullWidth
                margin="normal"
                required

                helperText={
                  !formData.FECHA_NACIMIENTO_USUARIO
                    ? "La fecha de nacimiento es obligatoria."
                    : ""
                }
              />
            </div>
          </div>
          <div className="form-group">
            <FormControl fullWidth margin="normal">
              <InputLabel>Rol</InputLabel>
              <Select
                label="Rol"
                value={formData.ROL_USUARIO}
                onChange={(e) =>
                  setFormData({ ...formData, ROL_USUARIO: e.target.value })
                }
                
              >
                {roles.map((role) => (
                  <MenuItem key={role.ID_ROL} value={role.ID_ROL}>
                    {role.NOMBRE_ROL}
                  </MenuItem>
                ))}
                
              </Select>
              
              
            </FormControl>
          </div>
          <div className="form-actions">
            <Button type="submit">{editing ? "Actualizar" : "Crear"}</Button>
          </div>
        </form>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={() => setSnackbarOpen(false)}
        >
          <Alert severity="error">{snackbarMessage}</Alert>
        </Snackbar>
      </div>
    </Modal>
  );
};

export default UserFormModal;
