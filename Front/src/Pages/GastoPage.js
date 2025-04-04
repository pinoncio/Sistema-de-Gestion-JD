import React, { useState, useEffect } from "react";
import {
  getGastos,
  createGasto,
  updateGasto,
  deleteGasto,
} from "../Services/gastoService";
import { getClientes } from "../Services/clienteService";
import { useNavigate } from "react-router-dom";
import GastoTable from "../Components/GastoTable";
import GastoFormModal from "../Components/GastoFormModal";
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
import SearchIcon from "@mui/icons-material/Search";
import UserLayout from "../Components/Layout/UserLayout";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Swal from "sweetalert2";
import "../Styles/User.css";
import { getOts } from "../Services/otService";

const GastoPage = () => {
  const [gastos, setGastos] = useState([]);
  const [ots, setOts] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("item_gasto");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const navigate = useNavigate();

  useEffect(() => {
    fetchGastos();
    fetchOts();
    fetchClientes();
  }, []);

  const fetchGastos = async () => {
    try {
      const data = await getGastos();
      setGastos(data);
    } catch (error) {
      console.error("Error al obtener los gastos", error);
    }
  };

  const fetchOts = async () => {
    try {
      const data = await getOts();
      setOts(data);
    } catch (error) {
      console.error("Error al obtener las OTs", error);
    }
  };

  const fetchClientes = async () => {
    try {
      const data = await getClientes();
      setClientes(data);
    } catch (error) {
      console.error("Error al obtener los Clientes", error);
    }
  };

  const getClienteName = (id_cliente) => {
    const cliente = clientes.find((c) => c.id_cliente === id_cliente);
    return cliente ? cliente.nombre_razon_social : "Sin Cliente";
  };

  // Filtro dinámico dependiendo del tipo de búsqueda
  const filteredGastos = gastos.filter((gasto) => {
    if (searchType === "item_gasto") {
      return gasto.item_gasto.toLowerCase().includes(searchQuery.toLowerCase());
    } else if (searchType === "proveedor") {
      return gasto.proveedor.toLowerCase().includes(searchQuery.toLowerCase());
    } else if (searchType === "cliente") {
      return getClienteName(gasto.id_cliente)
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    }
    return false;
  });

  const handleCreateGasto = async (formData) => {
    try {
      await createGasto(formData);
      setOpen(false);
      fetchGastos();
      setSnackbarMessage("Gasto creado exitosamente!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error al crear el gasto:", error);
      setSnackbarMessage("Ha ocurrido un error al crear el gasto.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleUpdateGasto = async (id_gasto, formData) => {
    console.log("ID Gasto:", id_gasto); // Asegúrate de que esto sea un número o cadena
    console.log("Formulario:", formData); // Verifica el contenido de formData

    try {
      await updateGasto(id_gasto, formData);
      setOpen(false);
      fetchGastos();
      setSnackbarMessage("Gasto actualizado exitosamente!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error al actualizar el gasto:", error);
      setSnackbarMessage("Ha ocurrido un error al actualizar el gasto.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (editing) {
        await handleUpdateGasto(editId, formData);
      } else {
        await handleCreateGasto(formData);
      }
      setOpen(false);
      fetchGastos();
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
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteGasto(id);
          fetchGastos();
          Swal.fire("¡Eliminado!", "El gasto ha sido eliminado.", "success");
        } catch (error) {
          console.error("Error al eliminar el gasto", error);
          Swal.fire("Error", "No se pudo eliminar el gasto.", "error");
        }
      }
    });
  };

  const handleOpenModal = (gasto = null) => {
    if (gasto) {
      setEditing(true);
      setEditId(gasto.id_gasto);
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

  const handleSearchTypeChange = (event, newSearchType) => {
    if (newSearchType) {
      setSearchType(newSearchType);
    }
  };

  return (
    <UserLayout>
      <h1>Lista de Gastos</h1>
      <div className="search-bar">
        <ToggleButtonGroup
          value={searchType}
          exclusive
          onChange={handleSearchTypeChange}
          aria-label="Tipo de búsqueda"
        >
          <ToggleButton value="item_gasto" aria-label="Buscar por item_gasto">
            Buscar por Item de Gasto
          </ToggleButton>
          <ToggleButton value="proveedor" aria-label="Buscar por proveedor">
            Buscar por Proveedor
          </ToggleButton>
          <ToggleButton value="cliente" aria-label="Buscar por cliente">
            Buscar por Cliente
          </ToggleButton>
        </ToggleButtonGroup>

        <TextField
          label={`Buscar por ${
            searchType === "item_gasto"
              ? "item de gasto"
              : searchType === "proveedor"
              ? "proveedor"
              : "cliente"
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
        className="gasto-actions"
        style={{ display: "flex", gap: "12px", marginBottom: "16px" }}
      >
        <Button
          onClick={() => navigate("/user")}
          startIcon={<ExitToAppIcon />}
          style={{ backgroundColor: "#d32f2f", color: "white" }}
        >
          Volver
        </Button>
        <Button
          onClick={() => handleOpenModal()}
          startIcon={<AddIcon />}
          style={{ backgroundColor: "#f0f0f1" }}
        >
          Añadir un Gasto
        </Button>
      </div>

      <Card>
        <CardContent>
          <GastoTable
            gastos={filteredGastos}
            onDelete={handleDelete}
            onEdit={handleOpenModal}
            ots={ots}
            clientes={clientes}
            getClienteName={getClienteName}
          />
        </CardContent>
      </Card>

      <GastoFormModal
        open={open}
        onClose={handleCloseModal}
        onSubmit={handleFormSubmit}
        gastoData={gastos.find((gasto) => gasto.id_gasto === editId)}
        ots={ots}
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
          sx={{ width: "auto", fontSize: "1.2rem" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </UserLayout>
  );
};

export default GastoPage;
