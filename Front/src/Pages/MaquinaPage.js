import React, { useState, useEffect } from "react";
import {
  getMaquinas,
  createMaquina,
  updateMaquina,
  deleteMaquina,
} from "../Services/maquinaService";
import { getClientes } from "../Services/clienteService";
import { useNavigate } from "react-router-dom";
import MaquinaTable from "../Components/MaquinaTable";
import MaquinaFormModal from "../Components/MaquinaFormModal";
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
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import "../Styles/User.css";

const MaquinaPage = () => {
  const [maquinas, setMaquinas] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("cliente"); // Tipo de búsqueda (cliente o numero_serie)
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const navigate = useNavigate();

  useEffect(() => {
    fetchMaquinas();
    fetchClientes();
  }, []);

  const fetchMaquinas = async () => {
    try {
      const data = await getMaquinas();
      const maquinasOrdenadas = data.sort(
        (a, b) => a.id_maquina - b.id_maquina
      );
      setMaquinas(maquinasOrdenadas);
    } catch (error) {
      console.error("Error al obtener las máquinas", error);
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

  const filteredMaquinas = maquinas.filter((maquina) => {
    if (searchType === "cliente") {
      return getClienteName(maquina.id_cliente)
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    } else if (searchType === "numero_serie") {
      return maquina.numero_serie
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    }
    return false;
  });

  const handleCreateMaquina = async (formData) => {
    try {
      const response = await createMaquina(formData);
      console.log("Máquina creada exitosamente:", response.data);
      setOpen(false);
      fetchMaquinas();

      setSnackbarMessage("Máquina creada exitosamente!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error al crear la máquina:", error);
      setSnackbarMessage("Ha ocurrido un error al crear la máquina.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleUpdateMaquina = async (id, formData) => {
    try {
      const response = await updateMaquina(id, formData);
      console.log("Máquina actualizada exitosamente:", response.data);
      setOpen(false);
      fetchMaquinas();

      setSnackbarMessage("Máquina actualizada exitosamente!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error al actualizar la máquina:", error);
      setSnackbarMessage("Ha ocurrido un error al actualizar la máquina.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (editing) {
        await handleUpdateMaquina(editId, formData);
      } else {
        await handleCreateMaquina(formData);
      }
      setOpen(false);
      fetchMaquinas();
    } catch (error) {
      console.error("Error al guardar la máquina", error);
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
          await deleteMaquina(id);
          await fetchMaquinas();
          Swal.fire(
            "¡Máquina eliminada!",
            "La máquina ha sido eliminada correctamente.",
            "success"
          );
        } catch (error) {
          console.error("Error al eliminar la máquina", error);
          Swal.fire(
            "Error",
            "Ha ocurrido un error al eliminar la máquina.",
            "error"
          );
        }
      }
    });
  };

  const handleOpenModal = (maquina = null) => {
    if (maquina) {
      setEditing(true);
      setEditId(maquina.id_maquina);
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
      <h1>Lista completa de máquinas</h1>

      <div className="search-bar">
        <ToggleButtonGroup
          value={searchType}
          exclusive
          onChange={(event, newSearchType) => setSearchType(newSearchType)}
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
        className="maquina-actions"
        style={{
          display: "flex",
          justifyContent: "flex-start",
          gap: "12px",
          marginBottom: "16px",
        }}
      >
        <Button
          onClick={() => navigate("/cliente")}
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
          Añadir una Máquina
        </Button>
      </div>

      <Card className="maquina-table-container">
        <CardContent>
          <MaquinaTable
            maquinas={filteredMaquinas}
            onDelete={handleDelete}
            onEdit={handleOpenModal}
            getClienteName={getClienteName}
          />
        </CardContent>
      </Card>

      <MaquinaFormModal
        open={open}
        onClose={handleCloseModal}
        onSubmit={handleFormSubmit}
        maquinaData={maquinas.find((maquina) => maquina.id_maquina === editId)}
        clientes={clientes}
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

export default MaquinaPage;
