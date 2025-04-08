import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getOts, deleteOt } from "../Services/otService";
import { getClientes } from "../Services/clienteService";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import OtTable from "../Components/OtTable";
import {
  Button,
  TextField,
  InputAdornment,
  Card,
  CardContent,
  Snackbar,
  Alert,
  ToggleButton,
  ToggleButtonGroup,
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
  const [searchType, setSearchType] = useState("cliente");
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
      const ordenesOrdenadas = data.sort((a, b) => b.id_ot - a.id_ot);
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

  // Filtro dinámico dependiendo del tipo de búsqueda
  const filteredOrdenes = ordenes.filter((orden) => {
    if (searchType === "cliente") {
      return getClienteName(orden.id_cliente)
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    } else if (searchType === "numero_serie") {
      return orden.numero_serie
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    }
    return false;
  });

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
          // Llamada a la función deleteOt sin asignar la respuesta
          await deleteOt(id);

          // Si no hay errores, eliminar con éxito
          await fetchOrdenes();
          Swal.fire(
            "¡Orden eliminada!",
            "La orden de trabajo ha sido eliminada correctamente.",
            "success"
          );
        } catch (error) {
          console.error("Error al eliminar la orden de trabajo", error);

          // Mostrar el mensaje de error con Swal
          const errorMessage =
            error.message || "Ha ocurrido un error inesperado";
          Swal.fire("Error", errorMessage, "error");
        }
      }
    });
  };

  const handleSearchTypeChange = (event, newSearchType) => {
    if (newSearchType) {
      setSearchType(newSearchType);
    }
  };

  return (
    <UserLayout>
      <h1>Lista completa de órdenes de trabajo</h1>

      <div className="search-bar">
        {/* Botones para seleccionar el tipo de búsqueda */}
        <ToggleButtonGroup
          value={searchType}
          exclusive
          onChange={handleSearchTypeChange}
          aria-label="Tipo de búsqueda"
        >
          <ToggleButton value="cliente" aria-label="Buscar por cliente">
            Buscar por Cliente
          </ToggleButton>
          <ToggleButton
            value="numero_serie"
            aria-label="Buscar por número de serie"
          >
            Buscar por Número de Serie
          </ToggleButton>
        </ToggleButtonGroup>

        {/* Campo de búsqueda */}
        <TextField
          label={`Buscar por ${
            searchType === "cliente" ? "cliente" : "número de serie"
          }`}
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
        className="ot-actions"
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
