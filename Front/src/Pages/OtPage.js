import React, { useState, useEffect } from "react";
import { getOts, createOt, updateOt, deleteOt } from "../Services/otService";
import { getClientes } from "../Services/clienteService";
import { getInsumos } from "../Services/insumoService";
import OtTable from "../Components/OtTable";
import OtFormModal from "../Components/OtFormModal";
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
  const [insumos, setInsumos] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    fetchOrdenes();
    fetchClientes();
    fetchInsumos();
  }, []);

  const fetchOrdenes = async () => {
    try {
      const data = await getOts();
      const ordenesOrdenadas = data.sort((a, b) => a.ID_OT - b.ID_OT);
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

  const fetchInsumos = async () => {
    try {
      const data = await getInsumos();
      setInsumos(data);
    } catch (error) {
      console.error("Error al obtener los insumos", error);
    }
  };

  const getClienteName = (id_cliente) => {
    const cliente = clientes.find((c) => c.ID_CLIENTE === id_cliente);
    return cliente ? cliente.NOMBRE_RAZON_SOCIAL : "Sin Cliente";
  };

  const getInsumoName = (id_insumo) => {
    const insumo = insumos.find((i) => i.ID_INSUMO === id_insumo);
    return insumo ? insumo.NOMBRE_INSUMO : "Sin Insumo";
  };

  const filteredOrdenes = ordenes.filter((orden) =>
    orden.ID_OT.toString().includes(searchQuery.toLowerCase())
  );
  

  const handleCreateOt = async (formData) => {
    try {
      await createOt(formData);
      setOpen(false);
      fetchOrdenes();

      setSnackbarMessage("Orden de trabajo creada exitosamente!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error al crear la orden de trabajo:", error);
      setSnackbarMessage("Ha ocurrido un error al crear la orden de trabajo.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleUpdateOt = async (id, formData) => {
    try {
      await updateOt(id, formData);
      setOpen(false);
      fetchOrdenes();

      setSnackbarMessage("Orden de trabajo actualizada exitosamente!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error al actualizar la orden de trabajo:", error);
      setSnackbarMessage(
        "Ha ocurrido un error al actualizar la orden de trabajo."
      );
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (editing) {
        await handleUpdateOt(editId, formData);
      } else {
        await handleCreateOt(formData);
      }
      setOpen(false);
      fetchOrdenes();
    } catch (error) {
      console.error("Error al guardar la orden de trabajo", error);
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

  const handleOpenModal = (orden = null) => {
    if (orden) {
      setEditing(true);
      setEditId(orden.ID_OT);
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
      <h1>Lista completa de órdenes de trabajo</h1>

      <div className="search-bar">
        <TextField
          label="Buscar OT"
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
          onClick={() => handleOpenModal()}
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
            onEdit={handleOpenModal}
            getClienteName={getClienteName}
            getInsumoName={getInsumoName}
          />
        </CardContent>
      </Card>

      <OtFormModal
        open={open}
        onClose={handleCloseModal}
        onSubmit={handleFormSubmit}
        otData={ordenes.find((orden) => orden.ID_OT === editId)}
        editing={editing}
        setEditing={setEditing}
        setEditId={setEditId}
        clientes={clientes}
        insumos={insumos}
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

export default OtPage;
