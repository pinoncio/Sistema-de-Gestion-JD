import React, { useState, useEffect } from "react";
import {
  getUsuarios,
  deleteUsuario,
  toggleUsuarioStatus,
  createUsuario,
  updateUsuario,
} from "../Services/userService";
import { getRoles } from "../Services/roleService";
import { useNavigate } from "react-router-dom";
import UserTable from "../Components/UserTable";
import UserFormModal from "../Components/UserFormModal";
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
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
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
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsuarios();
    fetchRoles();
  }, []);

  const fetchUsuarios = async () => {
    try {
      const data = await getUsuarios();
      const usuariosOrdenados = data.sort(
        (a, b) => b.id_usuario - a.id_usuario // Changed ID_USUARIO to id_usuario
      );
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
    const role = roles.find((r) => r.id_rol === id_rol); // Changed ID_ROL to id_rol
    return role ? role.nombre_rol : "Sin Rol"; // Changed NOMBRE_ROL to nombre_rol
  };

  const filteredUsuarios = usuarios.filter(
    (user) =>
      (user.nombre_usuario?.toLowerCase() || "").includes(
        searchQuery.toLowerCase()
      ) ||
      (user.apellido_usuario?.toLowerCase() || "").includes(
        searchQuery.toLowerCase()
      ) ||
      (user.email_usuario?.toLowerCase() || "").includes(
        searchQuery.toLowerCase()
      )
  );

  const HandleCreateUsuario = async (formData) => {
    try {
      const response = await createUsuario(formData);
      console.log("Usuario creado exitosamente:", response.data);
      setOpen(false);
      fetchUsuarios();

      // Display success message using snackbar
      setSnackbarMessage("Usuario creado exitosamente!");
      setSnackbarSeverity("success"); // Set severity to success
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error al crear el usuario:", error);

      // Verifica si el error tiene una respuesta del backend
      if (error.response && error.response.data) {
        const errorMsg =
          error.response.data.msg ||
          "Ha ocurrido un error al crear el usuario.";
        setSnackbarMessage(errorMsg); // Usa el mensaje específico del backend
      } else {
        setSnackbarMessage("Ha ocurrido un error al crear el usuario.");
      }

      setSnackbarSeverity("error"); // Set severity to error
      setSnackbarOpen(true);
    }
  };

  const handleUpdateUsuario = async (id, formData) => {
    try {
      const response = await updateUsuario(id, formData);
      console.log("Usuario actualizado exitosamente:", response.data);
      setOpen(false);
      fetchUsuarios();

      setSnackbarMessage("Usuario actualizado exitosamente!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
      setSnackbarMessage("Ha ocurrido un error al actualizar el usuario.");
      setSnackbarSeverity("error");
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

      setUsuarios((prevUsuarios) =>
        prevUsuarios.map((usuario) =>
          usuario.id_usuario === id_usuario // Changed ID_USUARIO to id_usuario
            ? { ...usuario, estado_usuario: nuevoEstado } // Changed ESTADO_USUARIO to estado_usuario
            : usuario
        )
      );

      setSnackbarMessage(
        `El usuario ha sido ${
          nuevoEstado ? "activado" : "desactivado"
        } exitosamente.`
      );
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error al activar/desactivar la cuenta:", error);
    }
  };

  const handleOpenModal = (user = null) => {
    if (user) {
      setEditing(true);
      setEditId(user.id_usuario); // Changed ID_USUARIO to id_usuario
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

      <div className="search-bar">
        <TextField
          label="Buscar usuario"
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
        className="user-actions"
        style={{
          display: "flex",
          justifyContent: "flex-start",
          gap: "12px",
          marginBottom: "16px",
        }}
      >
        <Button
          onClick={() => navigate("/admin")}
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
          Añadir un Usuario
        </Button>
      </div>

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

      <UserFormModal
        open={open}
        onClose={handleCloseModal}
        onSubmit={handleFormSubmit}
        userData={usuarios.find((user) => user.id_usuario === editId)} // Changed ID_USUARIO to id_usuario
        editing={editing}
        setEditing={setEditing}
        setEditId={setEditId}
        roles={roles}
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
    </AdminLayout>
  );
};

export default UserPage;
