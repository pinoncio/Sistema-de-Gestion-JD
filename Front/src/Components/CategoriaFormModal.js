import React, { useState, useEffect } from "react";
import { Modal, TextField, Button, Snackbar, Alert } from "@mui/material";
import "../Styles/FormCategoria.css";

const CategoriaFormModal = ({
  open,
  onClose,
  onSubmit,
  categoriaData,
  editing,
  setEditing,
  setEditId,
}) => {
  const [nombreCategoria, setNombreCategoria] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    if (categoriaData) {
      setNombreCategoria(categoriaData.nombre_categoria || ""); // Cambiado a minúsculas
    } else {
      setNombreCategoria("");
    }
  }, [categoriaData]);

  // Validar que el nombre de la categoría no contenga caracteres no permitidos (solo letras y espacios)
  const validateNombreCategoria = (nombre) => {
    const regex = /^[a-zA-Z\s]*$/; // Cambié el regex para permitir borrar completamente el campo (vacío)
    return regex.test(nombre);
  };

  const handleChange = (e) => {
    const { value } = e.target;

    // Solo actualizar el estado si el valor es válido
    if (validateNombreCategoria(value)) {
      setNombreCategoria(value);
    } else if (value === "") {
      // Permitir borrar el contenido sin mostrar el mensaje de error
      setNombreCategoria(value);
    } else {
      // Mostrar mensaje de error en el Snackbar solo si no es válido
      setSnackbarMessage(
        "El nombre de la categoría solo puede contener letras y espacios."
      );
      setSnackbarOpen(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombreCategoria.trim()) {
      return; // No hacer nada si el nombre de la categoría está vacío
    }

    try {
      await onSubmit(nombreCategoria); // Aquí se mantuvo igual
      // Limpiar el formulario y cerrar el modal
      setNombreCategoria(""); // Reinicia el valor del input
      onClose();
      setEditing(false);
      setEditId(null);
    } catch (error) {
      console.error("Error al crear/actualizar categoría:", error);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <div className="categoria-form-modal-content">
          <h2>{editing ? "Editar Categoría" : "Crear Categoría"}</h2>
          <form onSubmit={handleSubmit}>
            <div className="categoria-form-group">
              <TextField
                label="Nombre de la Categoría"
                value={nombreCategoria}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
                helperText={
                  !nombreCategoria.trim() &&
                  "El nombre de la categoría es obligatorio."
                }
              />
            </div>
            <div className="categoria-form-actions">
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
        anchorOrigin={{ vertical: "top", horizontal: "right" }} // Ubicación a la derecha superior
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

export default CategoriaFormModal;
