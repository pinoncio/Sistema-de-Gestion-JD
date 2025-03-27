import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCliente } from "../Services/clienteService";
import { getMetodosPago } from "../Services/metodoPagoService";
import {
  addMetodoPagoCliente,
  deleteMetodoPagoCliente,
} from "../Services/ClientePagoService";
import { getContactoComercial } from "../Services/contactoService";
import { getInformacionDePago } from "../Services/informacionService";
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
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import UserLayout from "../Components/Layout/UserLayout";
import "../Styles/UserProfilePage.css";

const ClientProfilePage = () => {
  const { id_cliente } = useParams();
  const [client, setClient] = useState(null);
  const [metodosPago, setMetodosPago] = useState([]);
  const [selectedMetodoPago, setSelectedMetodoPago] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [informacionPago, setInformacionPago] = useState(null);
  const [contactoComercial, setContactoComercial] = useState(null);
  const navigate = useNavigate();

  const fetchClient = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      console.log("Iniciando fetchClient para id_cliente:", id_cliente);

      // Obtener cliente
      let data;
      try {
        data = await getCliente(id_cliente);
        console.log("Cliente obtenido:", data);
        setClient(data);
      } catch (error) {
        console.error("Error al obtener cliente:", error);
        setError("No se pudo obtener el cliente.");
        setClient(null);
        return; // Detener ejecución si falla la carga del cliente
      }

      // Obtener métodos de pago
      try {
        const metodosData = await getMetodosPago(id_cliente);
        console.log("Métodos de pago obtenidos:", metodosData);
        setMetodosPago(metodosData);
      } catch (error) {
        console.warn("No se pudieron obtener los métodos de pago.", error);
        setMetodosPago([]);
      }

      // Obtener información de pago
      try {
        const informacionPagoData = await getInformacionDePago(id_cliente);
        console.log("Información de pago obtenida:", informacionPagoData);
        setInformacionPago(informacionPagoData || {});
      } catch (error) {
        console.warn("No se pudo obtener la información de pago.", error);
        setInformacionPago(null);
      }

      // Obtener contacto comercial
      try {
        if (data?.id_cliente) {
          const contactoData = await getContactoComercial(data.id_cliente);
          console.log("Contacto comercial obtenido:", contactoData);
          setContactoComercial(contactoData || null);
        } else {
          console.warn("ID de cliente no disponible para contacto comercial.");
          setContactoComercial(null);
        }
      } catch (error) {
        console.warn("No se pudo obtener el contacto comercial.", error);
        setContactoComercial(null);
      }
    } catch (error) {
      console.error("Error general en fetchClient:", error);
      setError("Error al obtener la información del cliente.");
    } finally {
      setLoading(false);
    }
  }, [id_cliente]);

  useEffect(() => {
    if (id_cliente) {
      console.log("useEffect ejecutado con id_cliente:", id_cliente);
      fetchClient();
    } else {
      console.warn("ID de cliente no válido:", id_cliente);
      setError("ID de cliente no válido");
      setLoading(false);
    }
  }, [id_cliente, fetchClient]);

  const handleMetodoPagoChange = (event) => {
    setSelectedMetodoPago(event.target.value);
  };

  const handleAddMetodoPago = async () => {
    if (!selectedMetodoPago) {
      setError("Por favor selecciona un método de pago.");
      setOpenSnackbar(true);
      return;
    }

    const metodoPagoData = {
      id_cliente,
      id_metodo_pago: selectedMetodoPago,
    };

    try {
      await addMetodoPagoCliente(metodoPagoData);

      setSelectedMetodoPago("");
      setSuccessMessage("Método de pago agregado correctamente.");
      fetchClient();

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

  // Función para eliminar un método de pago
  const handleDeleteMetodoPago = async (id_cliente, id_metodo_pago) => {
    try {
      // Llamar al servicio para eliminar el método de pago
      await deleteMetodoPagoCliente(id_cliente, id_metodo_pago);

      // Actualizar el cliente para reflejar el cambio
      fetchClient();

      setSuccessMessage("Método de pago eliminado correctamente.");
      setOpenSnackbar(true);
    } catch (error) {
      console.log(error);
      setError("Error al eliminar el método de pago.");
      setOpenSnackbar(true);
    }
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
    <UserLayout>
      <div className="profile-container">
        <Card className="profile-card">
          <CardContent>
            <Typography variant="h5" className="profile-title">
              Detalles del Cliente
            </Typography>
            <Divider sx={{ marginBottom: 3 }} />
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
                value={client.codigo_cliente || ""}
                variant="outlined"
                fullWidth
                readOnly
              />
              <TextField
                label="Razón Social"
                value={client.nombre_razon_social || ""}
                variant="outlined"
                fullWidth
                readOnly
              />
              <TextField
                label="Nombre Fantasía"
                value={client.nombre_fantasia || ""}
                variant="outlined"
                fullWidth
                readOnly
              />
              <TextField
                label="RUT"
                value={client.rut || ""}
                variant="outlined"
                fullWidth
                readOnly
              />
              <TextField
                label="Giro"
                value={client.giro || ""}
                variant="outlined"
                fullWidth
                readOnly
              />
              <TextField
                label="Dirección"
                value={client.direccion || ""}
                variant="outlined"
                fullWidth
                readOnly
              />
              <TextField
                label="Ciudad"
                value={client.ciudad || ""}
                variant="outlined"
                fullWidth
                readOnly
              />
              <TextField
                label="Comuna"
                value={client.comuna || ""}
                variant="outlined"
                fullWidth
                readOnly
              />
              <TextField
                label="Cliente Vigente"
                value={client.cliente_vigente ? "Sí" : "No"}
                variant="outlined"
                fullWidth
                readOnly
              />
            </Box>
            <Divider sx={{ marginBottom: 2 }} />
            {/* Mostrar la información del cliente aquí */}
            <Box
              component="form"
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 3,
                marginBottom: 4,
              }}
            >
              {/* Información de Pago */}
              {informacionPago && (
                <Box
                  sx={{
                    padding: 3,
                  }}
                >
                  <Typography variant="h6" sx={{ marginBottom: 2 }}>
                    Información de Pago
                  </Typography>
                  <Divider sx={{ marginBottom: 2 }} />
                  <TextField
                    label="Nombre Responsable"
                    value={
                      informacionPago.nombre_responsable || "No disponible"
                    }
                    variant="outlined"
                    fullWidth
                    readOnly
                    sx={{ marginBottom: 2 }}
                  />
                  <TextField
                    label="Correo Electrónico"
                    value={
                      informacionPago.correo_electronico || "No disponible"
                    }
                    variant="outlined"
                    fullWidth
                    readOnly
                    sx={{ marginBottom: 2 }}
                  />
                  <TextField
                    label="Teléfono Responsable"
                    value={
                      informacionPago.telefono_responsable || "No disponible"
                    }
                    variant="outlined"
                    fullWidth
                    readOnly
                  />
                </Box>
              )}

              {/* Contacto Comercial */}
              {contactoComercial && (
                <Box
                  sx={{
                    padding: 3,
                  }}
                >
                  <Typography variant="h6" sx={{ marginBottom: 2 }}>
                    Contacto Comercial
                  </Typography>
                  <Divider sx={{ marginBottom: 2 }} />
                  <TextField
                    label="Contacto Comercial"
                    value={
                      contactoComercial.contacto_comercial || "No disponible"
                    }
                    variant="outlined"
                    fullWidth
                    readOnly
                    sx={{ marginBottom: 2 }}
                  />
                  <TextField
                    label="Correo Electrónico Comercial"
                    value={
                      contactoComercial.correo_electronico_comercial ||
                      "No disponible"
                    }
                    variant="outlined"
                    fullWidth
                    readOnly
                    sx={{ marginBottom: 2 }}
                  />
                  <TextField
                    label="Teléfono Fijo"
                    value={contactoComercial.telefono_fijo || "No disponible"}
                    variant="outlined"
                    fullWidth
                    readOnly
                    sx={{ marginBottom: 2 }}
                  />
                  <TextField
                    label="Teléfono Celular"
                    value={
                      contactoComercial.telefono_celular || "No disponible"
                    }
                    variant="outlined"
                    fullWidth
                    readOnly
                  />
                </Box>
              )}
            </Box>

            <Typography variant="h6" sx={{ marginTop: 3 }}>
              Métodos de Pago Registrados
            </Typography>
            <Divider sx={{ marginBottom: 2 }} />
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 3,
              }}
            >
              {client.clientemetodospago &&
              client.clientemetodospago.length > 0 ? (
                client.clientemetodospago.map((metodo, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      marginRight: 3,
                    }}
                  >
                    <TextField
                      label="Método de Pago"
                      value={metodo.metodopago.nombre_metodo}
                      fullWidth
                      sx={{ marginBottom: 2 }}
                    />
                    <Box sx={{ display: "flex", gap: 2 }}>
                      <IconButton
                        variant="outlined"
                        color="error"
                        onClick={() =>
                          handleDeleteMetodoPago(
                            client.id_cliente, // Pasando el id_cliente
                            metodo.id_metodo_pago // Pasando el id_metodo_pago
                          )
                        }
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Box>
                ))
              ) : (
                <Typography variant="body1">
                  No hay métodos de pago registrados.
                </Typography>
              )}
            </Box>

            <Typography variant="h6" sx={{ marginTop: 3 }}>
              Formas de Pago
            </Typography>
            <Divider sx={{ marginBottom: 2 }} />
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <InputLabel id="select-metodo-label">Formas de Pago</InputLabel>
              <Select
                labelId="select-metodo-label"
                value={selectedMetodoPago}
                onChange={handleMetodoPagoChange}
                label="Método de Pago"
              >
                {metodosPago.map((metodo) => (
                  <MenuItem
                    key={metodo.id_metodo_pago}
                    value={metodo.id_metodo_pago}
                  >
                    {metodo.nombre_metodo}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button
              variant="contained"
              color="primary"
              onClick={handleAddMetodoPago}
              sx={{ marginTop: 2 }}
            >
              Agregar Método de Pago
            </Button>

            {client?.maquinas && client.maquinas.length > 0 && (
              <>
                <Typography variant="h6" sx={{ marginTop: 3 }}>
                  Máquinas Asociadas
                </Typography>
                <Divider sx={{ marginBottom: 2 }} />
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <strong>Nombre de la Máquina</strong>
                        </TableCell>
                        <TableCell>
                          <strong>Modelo</strong>
                        </TableCell>
                        <TableCell>
                          <strong>Número de Serie</strong>
                        </TableCell>
                        <TableCell>
                          <strong>Número de Motor</strong>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {client.maquinas.map((maquina) => (
                        <TableRow key={maquina.id_maquina}>
                          <TableCell>{maquina.nombre_maquina}</TableCell>
                          <TableCell>{maquina.modelo_maquina}</TableCell>
                          <TableCell>{maquina.numero_serie}</TableCell>
                          <TableCell>{maquina.numero_motor}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </>
            )}
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
    </UserLayout>
  );
};

export default ClientProfilePage;
