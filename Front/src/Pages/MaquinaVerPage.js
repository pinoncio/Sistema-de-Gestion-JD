import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMaquina } from "../Services/maquinaService";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Divider,
  Box,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import UserLayout from "../Components/Layout/UserLayout";
import "../Styles/UserProfilePage.css";

const MaquinaVerPage = () => {
  const { id_maquina } = useParams();
  const [maquina, setMaquina] = useState(null);
  const [cliente, setCliente] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchMaquina = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getMaquina(id_maquina);
      setMaquina(data);

      if (data.cliente) {
        setCliente(data.cliente.nombre_razon_social);
      }
    } catch (error) {
      setError("Error al obtener la información de la máquina.");
      console.error("Error al obtener datos", error);
    } finally {
      setLoading(false);
    }
  }, [id_maquina]);

  useEffect(() => {
    if (id_maquina) {
      fetchMaquina();
    } else {
      setError("ID de máquina no válido");
      setLoading(false);
    }
  }, [id_maquina, fetchMaquina]);

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
        <Button onClick={() => navigate("/maquinas")}>
          Volver a la lista de máquinas
        </Button>
      </div>
    );
  }

  if (!maquina) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <Typography variant="body1" color="error">
          Máquina no encontrada.
        </Typography>
        <Button onClick={() => navigate("/maquinas")}>
          Volver a la lista de máquinas
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
              Detalles de la Máquina
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
                label="Cliente"
                value={cliente || "Cargando..."}
                variant="outlined"
                fullWidth
                readOnly
              />
              <TextField
                label="Nombre Máquina"
                value={maquina.nombre_maquina || ""}
                variant="outlined"
                fullWidth
                readOnly
              />
              <TextField
                label="Número de Serie"
                value={maquina.numero_serie || ""}
                variant="outlined"
                fullWidth
                readOnly
              />
              <TextField
                label="Modelo"
                value={maquina.modelo_maquina || ""}
                variant="outlined"
                fullWidth
                readOnly
              />
              <TextField
                label="Motor"
                value={maquina.numero_motor || ""}
                variant="outlined"
                fullWidth
                readOnly
              />
            </Box>
          </CardContent>
          <CardContent>
            <Divider sx={{ marginY: 3 }} />
            <Typography variant="h6" sx={{ textAlign: "center" }}>
              Órdenes de Trabajo Asignadas a Esta Máquina
            </Typography>
            {maquina.ots && maquina.ots.length > 0 ? (
              <TableContainer
                sx={{
                  boxShadow: 2,
                  borderRadius: 2,
                  overflow: "hidden",
                }}
              >
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>N° OT</TableCell>
                      <TableCell>Tipo OT</TableCell>
                      <TableCell>Fecha Solicitud</TableCell>
                      <TableCell>Fecha Entrega</TableCell>
                      <TableCell>Total</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {maquina.ots.map((ot, index) => (
                      <TableRow key={index}>
                        <TableCell>N°{ot.id_ot}</TableCell>
                        <TableCell>{ot.tipo_ot}</TableCell>
                        <TableCell>{ot.fecha_solicitud}</TableCell>
                        <TableCell>{ot.fecha_entrega}</TableCell>
                        <TableCell>{ot.total.toLocaleString()} CLP</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Typography variant="body1">
                No hay órdenes de trabajo disponibles.
              </Typography>
            )}
            <Divider sx={{ marginY: 3 }} />
            <Typography variant="h6" sx={{ textAlign: "center" }}>
              Informes de Trabajo Asignados a Esta Máquina
            </Typography>
            {maquina.informe_trabajos && maquina.informe_trabajos.length > 0 ? (
              <TableContainer
                sx={{
                  boxShadow: 2,
                  borderRadius: 2,
                  overflow: "hidden",
                }}
              >
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>N° IT</TableCell>
                      <TableCell>Técnico </TableCell>
                      <TableCell>Fecha Visita</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {maquina.informe_trabajos.map((it, index) => (
                      <>
                        <TableRow key={index}>
                          <TableCell>N°{it.id_it}</TableCell>
                          <TableCell>{it.tecnico}</TableCell>
                          <TableCell>
                            {it.control_tiempo && it.control_tiempo.length > 0
                              ? new Intl.DateTimeFormat("es-CL", {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                }).format(new Date(it.control_tiempo[0].fecha))
                              : "Sin fecha"}
                          </TableCell>
                        </TableRow>
                        <TableRow key={`${index}-diagnostico`}>
                          <TableCell colSpan={6}>
                            <Typography variant="body1">
                              <strong>Diagnóstico:</strong> {it.diagnostico}
                            </Typography>
                          </TableCell>
                        </TableRow>
                        <TableRow key={`${index}-solucion`}>
                          <TableCell colSpan={6}>
                            <Typography variant="body1">
                              <strong>Solución:</strong> {it.solucion}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      </>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Typography variant="body1">
                No hay informes de trabajo disponibles.
              </Typography>
            )}
          </CardContent>
        </Card>
        <div className="profile-button">
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/maquina")}
          >
            Volver a la lista de Máquinas
          </Button>
        </div>
      </div>
    </UserLayout>
  );
};

export default MaquinaVerPage;
