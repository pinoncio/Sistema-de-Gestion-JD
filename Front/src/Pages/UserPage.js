import React, { useState, useEffect } from "react";
import {
  getUsuarios,
  deleteUsuario,
  toggleUsuarioStatus,
  createUsuario,
  updateUsuario,
} from "../Services/userService";
import UserTable from "../Components/Layout/UserTable";
import UserFormModal from "../Components/Layout/UserFormModal";
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
import SearchIcon from "@mui/icons-material/Search";
import AdminLayout from "../Components/Layout/AdminLayout";
import "../Styles/User.css";

const UserPage = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      const data = await getUsuarios();
      setUsuarios(data);
    } catch (error) {
      console.error("Error al obtener los usuarios", error);
    }
  };

  const filteredUsuarios = usuarios.filter(
    (user) =>
      user.NOMBRE_USUARIO.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.APELLIDO_USUARIO.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.EMAIL_USUARIO.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFormSubmit = async (formData) => {
    try {
      if (editing) {
        await updateUsuario(editId, formData);
      } else {
        await createUsuario(formData);
      }
      setOpen(false);
      fetchUsuarios();
    } catch (error) {
      console.error("Error al guardar el usuario", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUsuario(id);
      fetchUsuarios();
    } catch (error) {
      console.error("Error al eliminar el usuario", error);
    }
  };

  const handleToggleStatus = async (id_usuario, nuevoEstado) => {
    try {
      const estadoNumerico = nuevoEstado ? 1 : 0;
      await toggleUsuarioStatus(id_usuario, estadoNumerico);

      // Actualizamos el estado localmente para reflejar el cambio
      setUsuarios((prevUsuarios) =>
        prevUsuarios.map((usuario) =>
          usuario.ID_USUARIO === id_usuario
            ? { ...usuario, ESTADO_USUARIO: nuevoEstado }
            : usuario
        )
      );

      // Mostrar el mensaje de éxito
      setSnackbarMessage(
        `El usuario ha sido ${nuevoEstado ? "activado" : "desactivado"} exitosamente.`
      );
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error al activar/desactivar la cuenta:", error);
    }
  };

  const handleOpenModal = (user = null) => {
    if (user) {
      setEditing(true);
      setEditId(user.ID_USUARIO);
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
      <h1>Lista completa de usuarios</h1>

      {/* Campo de búsqueda con icono de lupa */}
      <div className="search-bar">
        <TextField
          label="Buscar usuario"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          fullWidth
          margin="normal"
          InputAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
        />
      </div>

      <div className="user-actions">
        <Button
          onClick={() => handleOpenModal()}
          startIcon={<AddIcon />}
          style={{
            backgroundColor: "#f0f0f0",
            borderRadius: "4px",
            padding: "8px 16px",
          }}
        >
          Crear Usuario
        </Button>
      </div>

      {/* Contenedor sutil para la tabla de usuarios */}
      <Card className="user-table-container">
        <CardContent>
          <UserTable
            usuarios={filteredUsuarios}
            onDelete={handleDelete}
            onToggleStatus={handleToggleStatus} // Aquí se asegura de pasar handleToggleStatus
            onEdit={handleOpenModal}
          />
        </CardContent>
      </Card>

      {/* Modal para crear/editar usuario */}
      <UserFormModal
        open={open}
        onClose={handleCloseModal}
        onSubmit={handleFormSubmit}
        userData={usuarios.find((user) => user.ID_USUARIO === editId)}
        editing={editing}
        setEditing={setEditing}
        setEditId={setEditId}
      />

      {/* Snackbar para mostrar mensajes */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </AdminLayout>
  );
};

export default UserPage;
