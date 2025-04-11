import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getClientes,
  deleteCliente,
  toggleClienteStatus,
  createCliente,
  updateCliente,
} from "../Services/clienteService";
import ClienteTable from "../Components/ClienteTable";
import ClienteFormModal from "../Components/ClienteFormModal";
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
import "../Styles/User.css";
import UserLayout from "../Components/Layout/UserLayout";

const ClientePage = () => {
  const [clientes, setClientes] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const userRol = user?.rol;

  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = async () => {
    try {
      const data = await getClientes();
      const clientesOrdenados = data.sort(
        (a, b) => b.id_cliente - a.id_cliente
      );
      setClientes(clientesOrdenados);
    } catch (error) {
      console.error("Error al obtener los clientes", error);
    }
  };

  const filteredClientes = clientes.filter(
    (cliente) =>
      cliente.nombre_razon_social
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      cliente.nombre_fantasia
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      cliente.rut.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateCliente = async (formData) => {
    try {
      const response = await createCliente(formData);
      console.log("Cliente creado exitosamente:", response.data);
      setOpen(false);
      fetchClientes();
      setSnackbarMessage("Cliente creado exitosamente!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error al crear el cliente:", error);
      setSnackbarMessage("Ha ocurrido un error al crear el cliente.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleUpdateCliente = async (id_cliente, formData) => {
    try {
      const response = await updateCliente(id_cliente, formData);
      console.log("Cliente actualizado exitosamente:", response.data);
      setOpen(false);
      fetchClientes();

      setSnackbarMessage("Cliente actualizado exitosamente!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error al actualizar el cliente:", error);
      setSnackbarMessage("Ha ocurrido un error al actualizar el cliente.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (editing) {
        await handleUpdateCliente(editId, formData);
      } else {
        await handleCreateCliente(formData);
      }
      setOpen(false);
      fetchClientes();
    } catch (error) {
      console.error("Error al guardar el cliente", error);
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
          await deleteCliente(id);
          await fetchClientes();
          Swal.fire("Eliminado!", "El cliente ha sido eliminado.", "success");
        } catch (error) {
          console.error("Error al eliminar el cliente", error);
          Swal.fire(
            "Error",
            "Ha ocurrido un error al eliminar el cliente.",
            "error"
          );
        }
      }
    });
  };

  const handleToggleStatus = async (id_cliente, nuevoEstado) => {
    try {
      await toggleClienteStatus(id_cliente, nuevoEstado);
      setClientes((prevClientes) =>
        prevClientes.map((cliente) =>
          cliente.id_cliente === id_cliente
            ? { ...cliente, cliente_vigente: nuevoEstado }
            : cliente
        )
      );

      setSnackbarMessage(
        `El cliente ha sido ${
          nuevoEstado ? "activado" : "desactivado"
        } exitosamente.`
      );
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error al activar/desactivar el cliente:", error);
    }
  };

  const handleOpenModal = (cliente = null) => {
    if (cliente) {
      setEditing(true);
      setEditId(cliente.id_cliente);
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
      <h1>Lista completa de clientes</h1>

      <div className="search-bar">
        <TextField
          label="Buscar cliente"
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
        className="cliente-actions"
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

        {userRol !== 3 && (
          <>
            <Button
              onClick={() => handleOpenModal()}
              startIcon={<AddIcon />}
              style={{
                backgroundColor: "#f0f0f1",
                borderRadius: "4px",
                padding: "8px 16px",
              }}
            >
              Añadir un Cliente
            </Button>
          </>
        )}
        <Button
          onClick={() => navigate("/maquina")}
          startIcon={<AddIcon />}
          style={{
            backgroundColor: "#4caf50",
            color: "white",
            borderRadius: "4px",
            padding: "8px 16px",
          }}
        >
          Ver Listado de maquinas
        </Button>
      </div>

      <Card className="cliente-table-container">
        <CardContent>
          <ClienteTable
            clientes={filteredClientes}
            onDelete={handleDelete}
            onToggleStatus={handleToggleStatus}
            onEdit={handleOpenModal}
          />
        </CardContent>
      </Card>

      <ClienteFormModal
        open={open}
        onClose={handleCloseModal}
        onSubmit={handleFormSubmit}
        clienteData={clientes.find((cliente) => cliente.id_cliente === editId)}
        editing={editing}
        setEditing={setEditing}
        setEditId={setEditId}
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

export default ClientePage;
