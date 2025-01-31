import React, { useState, useEffect } from "react";
import {
  getCategorias,
  deleteCategoria,
  createCategoria,
  updateCategoria,
} from "../Services/categoriaService";
import CategoriaTable from "../Components/CategoriaTable";
import CategoriaFormModal from "../Components/CategoriaFormModal";
import { Button, Card, CardContent, Snackbar, Alert } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Swal from "sweetalert2";
import AdminLayout from "../Components/Layout/AdminLayout";
import "../Styles/Categoria.css";

const CategoriaPage = () => {
  const [categorias, setCategorias] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    fetchCategorias();
  }, []);

  const fetchCategorias = async () => {
    try {
      const data = await getCategorias();
      const categoriasOrdenadas = data.sort((a, b) => a.ID_CATEGORIA - b.ID_CATEGORIA);
      setCategorias(categoriasOrdenadas);
    } catch (error) {
      console.error("Error al obtener las categorías", error);
    }
  };

  const handleCreateCategoria = async (nombre_categoria) => {
    try {
      await createCategoria({ nombre_categoria });
      setOpen(false);
      fetchCategorias();
      setSnackbarMessage("Categoría creada exitosamente!");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error al crear la categoría:", error);
      setSnackbarMessage("Error al crear la categoría.");
      setSnackbarOpen(true);
    }
  };

  const handleUpdateCategoria = async (id, nombre_categoria) => {
    try {
      await updateCategoria(id, { nombre_categoria });
      setOpen(false);
      fetchCategorias();
      setSnackbarMessage("Categoría actualizada exitosamente!");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error al actualizar la categoría:", error);
      setSnackbarMessage("Error al actualizar la categoría.");
      setSnackbarOpen(true);
    }
  };

  const handleFormSubmit = async (nombre_categoria) => {
    if (editing) {
      await handleUpdateCategoria(editId, nombre_categoria);
    } else {
      await handleCreateCategoria(nombre_categoria);
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esta acción",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteCategoria(id);
          await fetchCategorias();
          Swal.fire("Eliminado!", "La categoría ha sido eliminada.", "success");
        } catch (error) {
          console.error("Error al eliminar la categoría", error);
          Swal.fire("Error", "Error al eliminar la categoría.", "error");
        }
      }
    });
  };

  const handleOpenModal = (categoria = null) => {
    if (categoria) {
      setEditing(true);
      setEditId(categoria.ID_CATEGORIA);
    } else {
      setEditing(false);
      setEditId(null);
    }
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setEditing(false);
    setEditId(null);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <AdminLayout>
      <h1>Lista completa de categorías</h1>

      <div className="categoria-actions">
        <Button
          onClick={() => handleOpenModal()}
          startIcon={<AddIcon />}
          style={{
            backgroundColor: "#f0f0f1",
            borderRadius: "4px",
            padding: "8px 16px",
          }}
        >
          Añadir una Categoría
        </Button>
      </div>

      {/* Contenedor para la tabla de categorías */}
      <Card className="categoria-table-container">
        <CardContent>
          <CategoriaTable
            categorias={categorias}
            onDelete={handleDelete}
            onEdit={handleOpenModal}
          />
        </CardContent>
      </Card>

      {/* Modal para crear/editar categoría */}
      <CategoriaFormModal
        open={open}
        onClose={handleCloseModal}
        onSubmit={handleFormSubmit}
        categoriaData={categorias.find((categoria) => categoria.ID_CATEGORIA === editId)}
        editing={editing}
        setEditing={setEditing}
        setEditId={setEditId}
      />

      {/* Snackbar para mostrar mensajes */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{
            width: "400px",
            fontSize: "1.2rem",
            padding: "16px",
            backgroundColor: "#4caf50",
            color: "white",
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </AdminLayout>
  );
};

export default CategoriaPage;
