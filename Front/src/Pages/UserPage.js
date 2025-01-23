import React, { useState, useEffect } from "react";
import {
  getUsuarios,
  deleteUsuario,
  toggleUsuarioStatus,
  createUsuario,
  updateUsuario,
} from "../Services/userService";
import { getRoles } from "../Services/roleService";
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
import Swal from "sweetalert2";
import SearchIcon from "@mui/icons-material/Search";
import AdminLayout from "../Components/Layout/AdminLayout";
import "../Styles/User.css";

const UserPage = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [roles, setRoles] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    fetchUsuarios();
    fetchRoles();
  }, []);

  const fetchUsuarios = async () => {
    try {
        const data = await getUsuarios();

        const usuariosOrdenados = data.sort((a, b) => a.ID_USUARIO - b.ID_USUARIO);

        setUsuarios(usuariosOrdenados);
    } catch (error) {
        console.error("Error al obtener los usuarios", error);
    }
};

  const fetchRoles = async () => {
    try {
      const data = await getRoles();
      setRoles(data);
    } catch (error) {
      console.error("Error al obtener los roles", error);
    }
  };

  const getRoleName = (id_rol) => {
    const role = roles.find((r) => r.ID_ROL === id_rol);
    return role ? role.NOMBRE_ROL : "Sin Rol";
  };

  const filteredUsuarios = usuarios.filter(
    (user) =>
      user.NOMBRE_USUARIO.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.APELLIDO_USUARIO.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.EMAIL_USUARIO.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const HandleCreateUsuario = async (formData) => {
    try {
      const response = await createUsuario(formData);
      console.log("Usuario creado exitosamente:", response.data);
      setOpen(false); // Close modal
      fetchUsuarios(); // Refresh user list

      // Display success message using snackbar
      setSnackbarMessage("Usuario creado exitosamente!");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error al crear el usuario:", error);
      // Handle creation error (e.g., display error message using snackbar)
      setSnackbarMessage("Ha ocurrido un error al crear el usuario.");
      setSnackbarOpen(true);
    }
  };

  const handleUpdateUsuario = async (id, formData) => {
    try {
      const response = await updateUsuario(id, formData);
      console.log("Usuario actualizado exitosamente:", response.data);
      setOpen(false); // Close modal
      fetchUsuarios(); // Refresh user list

      // Display success message using snackbar
      setSnackbarMessage("Usuario actualizado exitosamente!");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
      // Handle update error (e.g., display error message using snackbar)
      setSnackbarMessage("Ha ocurrido un error al actualizar el usuario.");
      setSnackbarOpen(true);
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (editing) {
        await handleUpdateUsuario(editId, formData);
      } else {
        await HandleCreateUsuario(formData);
      }
      setOpen(false);
      fetchUsuarios();
    } catch (error) {
      console.error("Error al guardar el usuario", error);
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
          await deleteUsuario(id);
          await fetchUsuarios();
          Swal.fire("Eliminado!", "El usuario ha sido eliminado.", "success");
        } catch (error) {
          console.error("Error al eliminar el usuario", error);
          Swal.fire(
            "Error",
            "Ha ocurrido un error al eliminar el usuario.",
            "error"
          );
        }
      }
    });
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
        `El usuario ha sido ${
          nuevoEstado ? "activado" : "desactivado"
        } exitosamente.`
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
            onToggleStatus={handleToggleStatus}
            onEdit={handleOpenModal}
            getRoleName={getRoleName}
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
        roles={roles}
      />

      {/* Snackbar para mostrar mensajes */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </AdminLayout>
  );
};

export default UserPage;
