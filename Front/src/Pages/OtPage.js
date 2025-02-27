import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getOts, deleteOt } from "../Services/otService";
import { getClientes } from "../Services/clienteService";
import OtTable from "../Components/OtTable";
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
import "../Styles/User.css";

const OtPage = () => {
  const [ordenes, setOrdenes] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage] = useState("");
  const [snackbarSeverity] = useState("success");
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrdenes();
    fetchClientes();
  }, []);

  const fetchOrdenes = async () => {
    try {
      const data = await getOts();
      const ordenesOrdenadas = data.sort((a, b) => a.id_ot - b.id_ot);
      setOrdenes(ordenesOrdenadas);
    } catch (error) {
      console.error("Error al obtener las órdenes de trabajo", error);
    }
  };

  const fetchClientes = async () => {
    try {
      const data = await getClientes();
      setClientes(data);
    } catch (error) {
      console.error("Error al obtener los clientes", error);
    }
  };

  const getClienteName = (id_cliente) => {
    const cliente = clientes.find((c) => c.id_cliente === id_cliente);
    return cliente ? cliente.nombre_razon_social : "Sin Cliente";
  };

  // Filtrar las órdenes por el nombre del cliente
  const filteredOrdenes = ordenes.filter((orden) =>
    getClienteName(orden.id_cliente)
      .toLowerCase()
      .includes(searchQuery.toLowerCase()) // Filtra por nombre_razon_social
  );

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
          await deleteOt(id);
          await fetchOrdenes();
          Swal.fire(
            "¡Orden eliminada!",
            "La orden de trabajo ha sido eliminada correctamente.",
            "success"
          );
        } catch (error) {
          console.error("Error al eliminar la orden de trabajo", error);
          Swal.fire(
            "Error",
            "Ha ocurrido un error al eliminar la orden de trabajo.",
            "error"
          );
        }
      }
    });
  };

  return (
    <UserLayout>
      <h1>Lista completa de órdenes de trabajo</h1>

      <div className="search-bar">
        <TextField
          label="Buscar por cliente"
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

      <div className="ot-actions">
        <Button
          onClick={() => navigate("/create-ot")}
          startIcon={<AddIcon />}
          style={{
            backgroundColor: "#f0f0f1",
            borderRadius: "4px",
            padding: "8px 16px",
          }}
        >
          Añadir una OT
        </Button>
      </div>

      <Card className="ot-table-container">
        <CardContent>
          <OtTable
            ordenes={filteredOrdenes}
            onDelete={handleDelete}
            getClienteName={getClienteName}
          />
        </CardContent>
      </Card>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
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

export default OtPage;
