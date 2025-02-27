import React, { useState, useEffect } from "react";
import {
  getInsumos,
  createInsumo,
  updateInsumo,
  deleteInsumo,
  toggleInsumoStatus,
} from "../Services/insumoService";
import { useNavigate } from "react-router-dom";
import { getCategorias } from "../Services/categoriaService";
import InsumoTable from "../Components/InsumoTable";
import InsumoFormModal from "../Components/InsumoFormModal";
import {
  Button,
  TextField,
  InputAdornment,
  Card,
  CardContent,
  Snackbar,
  Alert,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Swal from "sweetalert2";
import SearchIcon from "@mui/icons-material/Search";
import UserLayout from "../Components/Layout/UserLayout";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import "../Styles/User.css";

const InsumoPage = () => {
  const [insumos, setInsumos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const navigate = useNavigate();

  useEffect(() => {
    fetchInsumos();
    fetchCategorias();
  }, []);

  const fetchInsumos = async () => {
    try {
      const data = await getInsumos();
      const insumosOrdenados = data.sort((a, b) => a.id_insumo - b.id_insumo);
      setInsumos(insumosOrdenados);
    } catch (error) {
      console.error("Error al obtener los insumos", error);
    }
  };

  const fetchCategorias = async () => {
    try {
      const data = await getCategorias();
      setCategorias(data);
    } catch (error) {
      console.error("Error al obtener los categorias", error);
    }
  };

  const getCategoriaName = (id_categoria) => {
    const categoria = categorias.find((c) => c.id_categoria === id_categoria);
    return categoria ? categoria.nombre_categoria : "Sin Categoria";
  };

  const filteredInsumos = insumos.filter((insumo) =>
    insumo.nombre_insumo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateInsumo = async (formData) => {
    try {
      const response = await createInsumo(formData);
      console.log("Insumo creado exitosamente:", response.data);
      setOpen(false);
      fetchInsumos();

      setSnackbarMessage("Insumo creado exitosamente!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error al crear el insumo:", error);
      setSnackbarMessage("Ha ocurrido un error al crear el insumo.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleUpdateInsumo = async (id, formData) => {
    try {
      const response = await updateInsumo(id, formData);
      console.log("Insumo actualizado exitosamente:", response.data);
      setOpen(false);
      fetchInsumos();

      setSnackbarMessage("Insumo actualizado exitosamente!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error al actualizar el insumo:", error);
      setSnackbarMessage("Ha ocurrido un error al actualizar el insumo.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (editing) {
        await handleUpdateInsumo(editId, formData);
      } else {
        await handleCreateInsumo(formData);
      }
      setOpen(false);
      fetchInsumos();
    } catch (error) {
      console.error("Error al guardar el insumo", error);
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
          await deleteInsumo(id);
          await fetchInsumos();
          Swal.fire(
            "¡Insumo eliminado!",
            "El insumo ha sido eliminado correctamente.",
            "success"
          );
        } catch (error) {
          console.error("Error al eliminar el insumo", error);
          Swal.fire(
            "Error",
            "Ha ocurrido un error al eliminar el insumo.",
            "error"
          );
        }
      }
    });
  };

  const handleToggleStatus = async (id_insumo, nuevoEstado) => {
    try {
      const estadoNumerico = nuevoEstado ? 1 : 0;
      await toggleInsumoStatus(id_insumo, estadoNumerico);

      setInsumos((prevInsumos) =>
        prevInsumos.map((insumo) =>
          insumo.id_insumo === id_insumo
            ? { ...insumo, estado_insumo: nuevoEstado }
            : insumo
        )
      );

      setSnackbarMessage(
        `El insumo ha sido $(
          nuevoEstado ? "activado" : "desactivado"
        ) exitosamente.`
      );
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error al activar/desactivar el insumo:", error);
    }
  };

  const handleOpenModal = (insumo = null) => {
    if (insumo) {
      setEditing(true);
      setEditId(insumo.id_insumo);
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
    <UserLayout>
      <h1>Lista completa de insumos</h1>

      <div className="search-bar">
        <TextField
          label="Buscar insumo"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          fullWidth
          margin="normal"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" style={{ margin: "0 10px" }}>
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </div>

      <div
        className="insumo-actions"
        style={{
          display: "flex",
          justifyContent: "flex-start",
          gap: "12px",
          marginBottom: "16px",
        }}
      >
        <Button
          onClick={() => navigate("/user")}
          startIcon={<ExitToAppIcon />}
          style={{
            backgroundColor: "#d32f2f",
            color: "white",
            borderRadius: "4px",
            padding: "8px 16px",
          }}
        >
          Volver
        </Button>

        <Button
          onClick={() => handleOpenModal()}
          startIcon={<AddIcon />}
          style={{
            backgroundColor: "#f0f0f1",
            borderRadius: "4px",
            padding: "8px 16px",
          }}
        >
          Añadir un Insumo
        </Button>
      </div>

      <Card className="insumo-table-container">
        <CardContent>
          <InsumoTable
            insumos={filteredInsumos}
            onDelete={handleDelete}
            onToggleStatus={handleToggleStatus}
            onEdit={handleOpenModal}
            getCategoriaName={getCategoriaName}
          />
        </CardContent>
      </Card>

      <InsumoFormModal
        open={open}
        onClose={handleCloseModal}
        onSubmit={handleFormSubmit}
        insumoData={insumos.find((insumo) => insumo.id_insumo === editId)}
        editing={editing}
        setEditing={setEditing}
        setEditId={setEditId}
        categorias={categorias}
      />

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{
            width: "auto",
            fontSize: "1.2rem",
            padding: "16px",
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </UserLayout>
  );
};

export default InsumoPage;
