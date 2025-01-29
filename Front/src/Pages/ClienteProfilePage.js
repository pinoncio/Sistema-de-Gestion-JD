import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCliente } from "../Services/clienteService";
import { getMetodosPago } from "../Services/metodoPagoService";
import { addMetodoPagoCliente } from "../Services/ClientePagoService";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  Divider,
  Box,
  TextField,
  Snackbar,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import AdminLayout from "../Components/Layout/AdminLayout";
import "../Styles/UserProfilePage.css";

const ClientProfilePage = () => {
  const { id_cliente } = useParams();
  const [client, setClient] = useState(null);
  const [metodosPago, setMetodosPago] = useState([]); // Estado para los métodos de pago
  const [selectedMetodoPago, setSelectedMetodoPago] = useState(""); // Estado para el método de pago seleccionado
  const [reference, setReference] = useState(""); // Estado para la referencia
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const fetchClient = useCallback(async () => {
    try {
      const data = await getCliente(id_cliente);
      setClient(data);

      // Llamar a los métodos de pago después de obtener el cliente
      const metodosData = await getMetodosPago();
      setMetodosPago(metodosData);
    } catch (error) {
      setError("Error al obtener el cliente o los métodos de pago.");
      console.error("Error al obtener el cliente", error);
    } finally {
      setLoading(false);
    }
  }, [id_cliente]);

  useEffect(() => {
    if (id_cliente) {
      fetchClient();
    } else {
      setError("ID de cliente no válido");
      setLoading(false);
    }
  }, [id_cliente, fetchClient]);

  const handleMetodoPagoChange = (event) => {
    setSelectedMetodoPago(event.target.value);
  };

  const handleReferenceChange = (event) => {
    setReference(event.target.value);
  };

  const handleAddMetodoPago = async () => {
    if (!selectedMetodoPago || !reference) {
      setError(
        "Por favor selecciona un método de pago y proporciona una referencia."
      );
      setOpenSnackbar(true);
      return;
    }

    const metodoPagoData = {
      id_cliente,
      id_metodo_pago: selectedMetodoPago,
      referencia: reference,
    };

    try {
      // Llamar al servicio para agregar el método de pago
      await addMetodoPagoCliente(metodoPagoData);

      // Limpiar el estado del formulario y restablecer el select
      setReference("");
      setSelectedMetodoPago(""); // Restablecer el select
      setSuccessMessage("Método de pago agregado correctamente."); // Mostrar mensaje de éxito

      // Actualizar el cliente para reflejar el nuevo método de pago
      fetchClient(); // Llamar a fetchClient para obtener el cliente actualizado

      setOpenSnackbar(true);
    } catch (error) {
      console.log(error);
      setError("Error al agregar el método de pago.");
      setOpenSnackbar(true);
    }
  };

  const snackbarStyle = successMessage
    ? { backgroundColor: "green" }
    : { backgroundColor: "red" };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <CircularProgress />
        <Typography variant="body1">Cargando...</Typography>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <Typography variant="body1" color="error">
          {error}
        </Typography>
        <Button onClick={() => navigate("/cliente")}>
          Volver a la lista de clientes
        </Button>
      </div>
    );
  }

  if (!client) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <Typography variant="body1" color="error">
          Cliente no encontrado.
        </Typography>
        <Button onClick={() => navigate("/cliente")}>
          Volver a la lista de clientes
        </Button>
      </div>
    );
  }

  return (
    <AdminLayout>
      <div className="profile-container">
        <Card className="profile-card">
          <CardContent>
            <Typography variant="h5" className="profile-title">
              Detalles del Cliente
            </Typography>
            <Divider sx={{ marginBottom: 2 }} />
            <Box
              component="form"
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 2,
              }}
            >
              <TextField
                label="Código Cliente"
                value={client.CODIGO_CLIENTE || ""}
                variant="outlined"
                fullWidth
                readOnly
              />
              <TextField
                label="Razón Social"
                value={client.NOMBRE_RAZON_SOCIAL || ""}
                variant="outlined"
                fullWidth
                readOnly
              />
              <TextField
                label="Nombre Fantasía"
                value={client.NOMBRE_FANTASIA || ""}
                variant="outlined"
                fullWidth
                readOnly
              />
              <TextField
                label="RUT"
                value={client.RUT || ""}
                variant="outlined"
                fullWidth
                readOnly
              />
              <TextField
                label="Giro"
                value={client.GIRO || ""}
                variant="outlined"
                fullWidth
                readOnly
              />
              <TextField
                label="Dirección"
                value={client.DIRECCION || ""}
                variant="outlined"
                fullWidth
                readOnly
              />
              <TextField
                label="Ciudad"
                value={client.CIUDAD || ""}
                variant="outlined"
                fullWidth
                readOnly
              />
              <TextField
                label="Comuna"
                value={client.COMUNA || ""}
                variant="outlined"
                fullWidth
                readOnly
              />
              <TextField
                label="Teléfono Fijo"
                value={client.TELEFONO_FIJO || ""}
                variant="outlined"
                fullWidth
                readOnly
              />
              <TextField
                label="Teléfono Celular"
                value={client.TELEFONO_CELULAR || ""}
                variant="outlined"
                fullWidth
                readOnly
              />
              <TextField
                label="Correo Electrónico"
                value={client.CORREO_ELECTRONICO || ""}
                variant="outlined"
                fullWidth
                readOnly
              />
            </Box>
            <Typography variant="h6" sx={{ marginTop: 2 }}>
              Métodos de Pago
            </Typography>
            <Divider sx={{ marginBottom: 3 }} />
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap", // Permite que los elementos se ajusten a nuevas filas si es necesario
                gap: 3, // Espacio entre los elementos
              }}
            >
              {client.clienteMetodosPago &&
              client.clienteMetodosPago.length > 0 ? (
                client.clienteMetodosPago.map((metodo, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      marginRight: 3, // Espacio entre los métodos de pago
                    }}
                  >
                    <TextField
                      label="Método de Pago"
                      value={metodo.metodoPago.NOMBRE_METODO}
                      variant="outlined"
                      fullWidth
                      readOnly
                      sx={{ marginBottom: 2, width: "100%" }}
                    />
                    <TextField
                      label="Referencia"
                      value={metodo.REFERENCIA}
                      variant="outlined"
                      fullWidth
                      readOnly
                      sx={{ width: "250px" }}
                    />
                  </Box>
                ))
              ) : (
                <Typography variant="body1">
                  No hay métodos de pago registrados.
                </Typography>
              )}
            </Box>

            <Typography variant="h6" sx={{ marginTop: 3 }}>
              Métodos de Pago
            </Typography>
            <Divider sx={{ marginBottom: 2 }} />
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <InputLabel id="select-metodo-label">Método de Pago</InputLabel>
              <Select
                labelId="select-metodo-label"
                value={selectedMetodoPago}
                onChange={handleMetodoPagoChange}
                label="Método de Pago"
              >
                {metodosPago.map((metodo) => (
                  <MenuItem
                    key={metodo.ID_METODO_PAGO}
                    value={metodo.ID_METODO_PAGO}
                  >
                    {metodo.NOMBRE_METODO}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Referencia"
              value={reference}
              onChange={handleReferenceChange}
              variant="outlined"
              fullWidth
            />

            <Button
              variant="contained"
              color="primary"
              onClick={handleAddMetodoPago}
              sx={{ marginTop: 2 }}
            >
              Agregar Método de Pago
            </Button>
          </CardContent>
        </Card>

        <div className="profile-button">
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/cliente")}
          >
            Volver a la lista de clientes
          </Button>
        </div>
      </div>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        message={successMessage || error}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }} // Cambio aquí
        ContentProps={{
          style: snackbarStyle, // Aplica el color según el tipo de mensaje
        }}
      />
    </AdminLayout>
  );
};

export default ClientProfilePage;
