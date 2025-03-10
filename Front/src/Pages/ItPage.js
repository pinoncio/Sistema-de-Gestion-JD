import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getIts, deleteIt } from "../Services/itService";
import { getClientes } from "../Services/clienteService";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ItTable from "../Components/ItTable";
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

const ItPage = () => {
  const [informes, setInformes] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage] = useState("");
  const [snackbarSeverity] = useState("success");
  const navigate = useNavigate();

  useEffect(() => {
    fetchIt();
    fetchClientes();
  }, []);

  const fetchIt = async () => {
    try {
      const data = await getIts();
      const informesOrdenadas = data.sort((a, b) => a.id_it - b.id_it);
      setInformes(informesOrdenadas);
    } catch (error) {
      console.error("Error al obtener los informes de trabajo", error);
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

  const filteredInformes = informes.filter(
    (informe) =>
    getClienteName(informe.id_cliente)
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
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
          await deleteIt(id);
          await fetchIt();
          Swal.fire(
            "¡Informe eliminado!",
            "El Informe de trabajo ha sido eliminada correctamente.",
            "success"
          );
        } catch (error) {
          console.error("Error al eliminar el informe de trabajo", error);
          Swal.fire(
            "Error",
            "Ha ocurrido un error al eliminar el informe de trabajo.",
            "error"
          );
        }
      }
    });
  };

  return (
    <UserLayout>
      <h1>Lista completa de Informes de trabajo</h1>

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

      <div
        className="It-actions"
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
          onClick={() => navigate("/create-it")}
          startIcon={<AddIcon />}
          style={{
            backgroundColor: "#f0f0f1",
            borderRadius: "4px",
            padding: "8px 16px",
          }}
        >
          Añadir una It
        </Button>
      </div>

      <Card className="It-table-container">
        <CardContent>
          <ItTable
            informes={filteredInformes}
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

export default ItPage;
