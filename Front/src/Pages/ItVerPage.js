import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getIt } from "../Services/itService";
import {
  Card,
  CardContent,
  Typography,
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
  Paper,
  CircularProgress,
} from "@mui/material";
import UserLayout from "../Components/Layout/UserLayout";

const ItProfilePage = () => {
  const { id_it } = useParams();
  const [it, setIt] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchIt = async () => {
      try {
        setLoading(true);
        setError(null);
        const itData = await getIt(id_it);
        setIt(itData);
      } catch (error) {
        setError("Error al obtener la información de la IT.");
      } finally {
        setLoading(false);
      }
    };

    if (id_it) {
      fetchIt();
    } else {
      setError("ID de IT no válido");
      setLoading(false);
    }
  }, [id_it]);

  if (loading) {
    return (
      <CircularProgress
        sx={{ display: "block", margin: "auto", padding: "20px" }}
      />
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <Typography variant="body1" color="error">
          {error}
        </Typography>
        <Button onClick={() => navigate("/its")}>Volver a la lista</Button>
      </div>
    );
  }

  return (
    <UserLayout>
      <div className="profile-container">
        <Card className="profile-card">
          <CardContent>
            <Typography variant="h5" className="profile-title">
              Detalles del Informe de Trabajo
            </Typography>
            <Divider sx={{ marginBottom: 3 }} />
            <Box
              component="form"
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                gap: 2,
                mb: 3,
                padding: "10px",
              }}
            >
              <TextField
                label="Fecha Visita"
                value={it?.control_tiempo?.[0]?.fecha || ""}
                fullWidth
                readOnly
                sx={{
                  gridColumn: "span 2",
                  textAlign: "right",
                  backgroundColor: "#f9f9f9",
                  borderRadius: "4px",
                }}
              />
              <Box
                sx={{ gridColumn: "span 2", textAlign: "center", mt: 2, mb: 1 }}
              >
                <Typography variant="h6" fontWeight="bold">
                  Servicio de Atención
                </Typography>
                <Divider sx={{ mt: 1 }} />
              </Box>

              <TextField
                label="Tecnico"
                value={it?.tecnico || ""}
                fullWidth
                readOnly
                sx={{
                  backgroundColor: "#f9f9f9",
                  borderRadius: "4px",
                }}
              />
              <TextField
                label="Cliente"
                value={it?.cliente?.nombre_razon_social || ""}
                fullWidth
                readOnly
                sx={{
                  backgroundColor: "#f9f9f9",
                  borderRadius: "4px",
                }}
              />
              <TextField
                label="Rut"
                value={it?.cliente?.rut || ""}
                fullWidth
                readOnly
                sx={{
                  backgroundColor: "#f9f9f9",
                  borderRadius: "4px",
                }}
              />
              <TextField
                label="Dirección"
                value={it?.cliente?.direccion || ""}
                fullWidth
                readOnly
                sx={{
                  backgroundColor: "#f9f9f9",
                  borderRadius: "4px",
                }}
              />
              <TextField
                label="Correo electronico"
                value={
                  it?.cliente?.informacion_de_pago?.correo_electronico || ""
                }
                fullWidth
                readOnly
                sx={{
                  backgroundColor: "#f9f9f9",
                  borderRadius: "4px",
                }}
              />
              <TextField
                label="Telefono"
                value={
                  it?.cliente?.informacion_de_pago?.telefono_responsable || ""
                }
                fullWidth
                readOnly
                sx={{
                  backgroundColor: "#f9f9f9",
                  borderRadius: "4px",
                }}
              />
              <TextField
                label="Orden de trabajo"
                value={`N°${it?.id_ot || ""}`}
                fullWidth
                readOnly
                sx={{
                  backgroundColor: "#f9f9f9",
                  borderRadius: "4px",
                }}
              />
              <TextField
                label="Maquina"
                value={it?.maquina || ""}
                fullWidth
                readOnly
                sx={{
                  backgroundColor: "#f9f9f9",
                  borderRadius: "4px",
                }}
              />
              <TextField
                label="Horometro"
                value={it?.horometro || ""}
                fullWidth
                readOnly
                sx={{
                  backgroundColor: "#f9f9f9",
                  borderRadius: "4px",
                }}
              />
              <TextField
                label="N° Serie"
                value={it?.numero_serie || ""}
                fullWidth
                readOnly
                sx={{
                  backgroundColor: "#f9f9f9",
                  borderRadius: "4px",
                }}
              />
              <TextField
                label="N° Motor"
                value={it?.numero_motor || ""}
                fullWidth
                readOnly
                sx={{
                  backgroundColor: "#f9f9f9",
                  borderRadius: "4px",
                }}
              />
              <TextField
                label="Kilometro de salida"
                value={`${it?.km_salida || ""} Km`}
                fullWidth
                readOnly
                sx={{
                  backgroundColor: "#f9f9f9",
                  borderRadius: "4px",
                }}
              />
              <TextField
                label="Kilometro de retorno"
                value={`${it?.km_retorno || ""} Km`}
                fullWidth
                readOnly
                sx={{
                  backgroundColor: "#f9f9f9",
                  borderRadius: "4px",
                }}
              />

              <Box
                sx={{ gridColumn: "span 2", textAlign: "center", mt: 2, mb: 1 }}
              >
                <Typography variant="h6" fontWeight="bold">
                  Informe Técnico
                </Typography>
                <Divider sx={{ mt: 1 }} />
              </Box>

              <TextField
                label="Solución"
                value={it?.solucion || ""}
                fullWidth
                readOnly
                multiline
                rows={7.5}
                sx={{
                  backgroundColor: "#f9f9f9",
                  borderRadius: "4px",
                  gridColumn: { xs: "span 2", sm: "span 1" },
                }}
              />
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 2, 1fr)",
                  gap: 2,
                  gridColumn: { xs: "span 2", sm: "span 1" },
                }}
              >
                <TextField
                  label="Total HH"
                  value={it?.total_hh || ""}
                  fullWidth
                  readOnly
                  sx={{
                    backgroundColor: "#f9f9f9",
                    borderRadius: "4px",
                  }}
                />
                <TextField
                  label="Total Km"
                  value={it?.total_km || ""}
                  fullWidth
                  readOnly
                  sx={{
                    backgroundColor: "#f9f9f9",
                    borderRadius: "4px",
                  }}
                />
                <TextField
                  label="Insumo"
                  value={it?.insumo || ""}
                  fullWidth
                  readOnly
                  sx={{
                    backgroundColor: "#f9f9f9",
                    borderRadius: "4px",
                  }}
                />
              </Box>
            </Box>
            <Box
              sx={{ gridColumn: "span 2", textAlign: "center", mt: 2, mb: 1 }}
            >
              <Typography variant="h6" fontWeight="bold">
                Control Tiempo
              </Typography>
              <Divider sx={{ mt: 1 }} />
            </Box>
            <Box component="form" sx={{ display: "grid", gap: 3 }}>
              <TableContainer
                component={Paper}
                sx={{ maxHeight: "400px", overflowX: "auto" }}
              >
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Fecha Visita</TableCell>
                      <TableCell>Viaje de Ida</TableCell>
                      <TableCell>Trabajo</TableCell>
                      <TableCell>Viaje de Vuelta</TableCell>
                      <TableCell>Total Horas de Viaje</TableCell>
                      <TableCell>Total Horas de Trabajo</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {it?.control_tiempo?.map((control) => (
                      <TableRow key={control.id_control_tiempo}>
                        <TableCell>{control.id_control_tiempo}</TableCell>
                        <TableCell>{control.fecha}</TableCell>
                        <TableCell>{control.viaje_ida}</TableCell>
                        <TableCell>{control.trabajo}</TableCell>
                        <TableCell>{control.viaje_vuelta}</TableCell>
                        <TableCell>{control.total_hh_viaje}</TableCell>
                        <TableCell>{control.total_hh_trabajo}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>

            <Divider sx={{ marginBottom: 5 }} />
            <Box
              component="form"
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr 1fr",
                gap: 2,
                mb: 3,
              }}
            >
              <TextField
                label="Observación"
                value={it?.observacion || ""}
                fullWidth
                readOnly
                multiline
                rows={3}
                sx={{
                  backgroundColor: "#f9f9f9",
                  borderRadius: "4px",
                  gridColumn: "span 4",
                }}
              />
            </Box>
          </CardContent>
        </Card>
        <div className="profile-button">
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/its")}
          >
            Volver a la lista de Informes de trabajo
          </Button>
        </div>
      </div>
    </UserLayout>
  );
};

export default ItProfilePage;
