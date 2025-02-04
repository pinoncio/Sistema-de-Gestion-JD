import React, { useState, useEffect } from "react";
import {
  getRoles,
  deleteRole,
  createRole,
  updateRole,
} from "../Services/roleService";
import RoleTable from "../Components/RoleTable";
import RoleFormModal from "../Components/RoleFormModal";
import { Button, Card, CardContent, Snackbar, Alert } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Swal from "sweetalert2";
import AdminLayout from "../Components/Layout/AdminLayout";
import "../Styles/Role.css";

const RolePage = () => {
  const [roles, setRoles] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const data = await getRoles();
      const rolesOrdenados = data.sort((a, b) => a.ID_ROL - b.ID_ROL);
      setRoles(rolesOrdenados);
    } catch (error) {
      console.error("Error al obtener los roles", error);
    }
  };

  const handleCreateRole = async (nombre_rol) => {
    try {
      await createRole({ nombre_rol });
      setOpen(false);
      fetchRoles();
      setSnackbarMessage("Rol creado exitosamente!");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error al crear el rol:", error);
      setSnackbarMessage("Error al crear el rol.");
      setSnackbarOpen(true);
    }
  };

  const handleUpdateRole = async (id, nombre_rol) => {
    try {
      await updateRole(id, { nombre_rol });
      setOpen(false);
      fetchRoles();
      setSnackbarMessage("Rol actualizado exitosamente!");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error al actualizar el rol:", error);
      setSnackbarMessage("Error al actualizar el rol.");
      setSnackbarOpen(true);
    }
  };

  const handleFormSubmit = async (nombre_rol) => {
    if (editing) {
      await handleUpdateRole(editId, nombre_rol);
    } else {
      await handleCreateRole(nombre_rol);
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
          await deleteRole(id);
          await fetchRoles();
          Swal.fire("Eliminado!", "El rol ha sido eliminado.", "success");
        } catch (error) {
          console.error("Error al eliminar el rol", error);
          Swal.fire("Error", "Error al eliminar el rol.", "error");
        }
      }
    });
  };

  const handleOpenModal = (role = null) => {
    if (role) {
      setEditing(true);
      setEditId(role.ID_ROL);
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
      <h1>Lista completa de roles</h1>

      <div className="role-actions">
        <Button
          onClick={() => handleOpenModal()}
          startIcon={<AddIcon />}
          style={{
            backgroundColor: "#f0f0f1",
            borderRadius: "4px",
            padding: "8px 16px",
          }}
        >
          Añadir un Rol
        </Button>
      </div>

      {/* Contenedor para la tabla de roles */}
      <Card className="role-table-container">
        <CardContent>
          <RoleTable
            roles={roles}
            onDelete={handleDelete}
            onEdit={handleOpenModal}
          />
        </CardContent>
      </Card>

      {/* Modal para crear/editar rol */}
      <RoleFormModal
        open={open}
        onClose={handleCloseModal}
        onSubmit={handleFormSubmit}
        roleData={roles.find((role) => role.ID_ROL === editId)}
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

export default RolePage;
