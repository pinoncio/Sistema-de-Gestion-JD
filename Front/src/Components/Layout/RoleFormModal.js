import React, { useState, useEffect } from "react";
import {
  Modal,
  TextField,
  Button,
  Snackbar,
  Alert
} from "@mui/material";
import "../../Styles/FormRole.css";

const RoleFormModal = ({
  open,
  onClose,
  onSubmit,
  roleData,
  editing,
  setEditing,
  setEditId,
}) => {
  const [nombreRol, setNombreRol] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    if (roleData) {
      setNombreRol(roleData.NOMBRE_ROL || "");
    } else {
      setNombreRol("");
    }
  }, [roleData]);

  // Validar que el nombre del rol no contenga caracteres no permitidos (solo letras y espacios)
  const validateNombreRol = (nombre) => {
    const regex = /^[a-zA-Z\s]*$/;  // Cambié el regex para permitir borrar completamente el campo (vacío)
    return regex.test(nombre);
  };

  const handleChange = (e) => {
    const { value } = e.target;

    // Solo actualizar el estado si el valor es válido
    if (validateNombreRol(value)) {
      setNombreRol(value);  
    } else if (value === "") {
      // Permitir borrar el contenido sin mostrar el mensaje de error
      setNombreRol(value);
    } else {
      // Mostrar mensaje de error en el Snackbar solo si no es válido
      setSnackbarMessage("El nombre del rol solo puede contener letras y espacios.");
      setSnackbarOpen(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombreRol.trim()) {
      return;  // No hacer nada si el nombre del rol está vacío
    }

    try {
      await onSubmit(nombreRol);
      // Limpiar el formulario y cerrar el modal
      setNombreRol("");  // Reinicia el valor del input
      onClose();
      setEditing(false);
      setEditId(null);
    } catch (error) {
      console.error("Error al crear/actualizar rol:", error);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <div className="role-form-modal-content">
          <h2>{editing ? "Editar Rol" : "Crear Rol"}</h2>
          <form onSubmit={handleSubmit}>
            <div className="role-form-group">
              <TextField
                label="Nombre del Rol"
                value={nombreRol}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
                helperText={!nombreRol.trim() && "El nombre del rol es obligatorio."}
              />
            </div>
            <div className="role-form-actions">
              <Button type="submit">{editing ? "Actualizar" : "Crear"}</Button>
              <Button onClick={onClose}>Cancelar</Button>
            </div>
          </form>
        </div>
      </Modal>

      {/* Snackbar para mostrar el mensaje de error */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}  // Ubicación a la derecha superior
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default RoleFormModal;
