import React, { useState, useEffect } from "react";
import { Modal, TextField, Button, Snackbar, Alert, Box } from "@mui/material";
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
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: { xs: 2, sm: 3, md: 4 },
            borderRadius: 2,
            width: { xs: "90%", sm: 600 },
            maxWidth: "90%",
          }}
        >
          <h2>{editing ? "Editar Categoría" : "Crear Categoría"}</h2>
          <form onSubmit={handleSubmit}>
            <Box
              sx={{
                marginBottom: 2,
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
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
                sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 2,
              }}
            >
              <Button type="submit" variant="contained" color="primary">
                {editing ? "Actualizar" : "Crear"}
              </Button>
              <Button onClick={onClose} variant="outlined" color="secondary">
                Cancelar
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>

      {/* Snackbar para mostrar el mensaje de error */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
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
