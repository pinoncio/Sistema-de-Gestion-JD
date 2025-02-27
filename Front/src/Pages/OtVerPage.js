import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOt } from "../Services/otService";
import { getCliente } from "../Services/clienteService";
import { getMetodosPagoCliente } from "../Services/ClientePagoService";
import { getMetodoPago } from "../Services/metodoPagoService";
import { getInsumo } from "../Services/insumoService";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Divider,
  Box,
  TextField,
  Button,
} from "@mui/material";
import UserLayout from "../Components/Layout/UserLayout";

const OtProfilePage = () => {
  const { id_ot } = useParams();
  const [ot, setOt] = useState(null);
  const [cliente, setCliente] = useState(null);
  const [metodoPago, setMetodoPago] = useState(null);
  const [insumo, setInsumo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchOt = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const otData = await getOt(id_ot);
      setOt(otData);

      if (otData.id_insumo) {
        const insumoData = await getInsumo(otData.id_insumo);
        setInsumo(insumoData);
      }

      if (otData.id_cliente) {
        const clienteData = await getCliente(otData.id_cliente);
        setCliente(clienteData);

        const clienteMetodoPago = await getMetodosPagoCliente(
          otData.id_cliente
        );
        const metodoPagoData = clienteMetodoPago?.[0];
        if (metodoPagoData?.id_metodo_pago) {
          const metodoPagoDetails = await getMetodoPago(metodoPagoData.id_metodo_pago);
          setMetodoPago(metodoPagoDetails);
        }
      }
    } catch (error) {
      setError("Error al obtener la información de la OT.");
    } finally {
      setLoading(false);
    }
  }, [id_ot]);

  useEffect(() => {
    if (id_ot) {
      fetchOt();
    } else {
      setError("ID de OT no válido");
      setLoading(false);
    }
  }, [id_ot, fetchOt]);

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
        <Button onClick={() => navigate("/ordenes-trabajo")}>
          Volver a la lista
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
              Detalles de la Orden de Trabajo
            </Typography>
            <Divider sx={{ marginBottom: 3 }} />
            <Box
              component="form"
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 2,
                mb: 3,
              }}
            >
              <TextField
                label="Fecha de Emisión"
                value={ot?.fecha_solicitud || ""}
                fullWidth
                readOnly
                sx={{ gridColumn: "span 2", textAlign: "right" }}
              />
              <TextField
                label="Razón Social"
                value={cliente?.nombre_razon_social || ""}
                fullWidth
                readOnly
              />
              <TextField
                label="RUT"
                value={cliente?.rut || ""}
                fullWidth
                readOnly
              />
              <TextField
                label="Dirección"
                value={cliente?.direccion || ""}
                fullWidth
                readOnly
              />
              <TextField
                label="Giro"
                value={cliente?.giro || ""}
                fullWidth
                readOnly
              />
              <TextField
                label="Comuna"
                value={cliente?.comuna || ""}
                fullWidth
                readOnly
              />
              <TextField
                label="Ciudad"
                value={cliente?.ciudad || ""}
                fullWidth
                readOnly
              />
              <TextField
                label="Tipo de OT"
                value={ot?.tipo_ot || ""}
                fullWidth
                readOnly
              />
              <TextField
                label="Entrega"
                value={ot?.fecha_entrega || ""}
                fullWidth
                readOnly
              />
              <TextField
                label="Forma de Pago"
                value={metodoPago?.nombre_metodo || ""}
                fullWidth
                readOnly
              />
              <TextField
                label="Prioridad"
                value={ot?.prioridad || ""}
                fullWidth
                readOnly
              />
            </Box>

            {/* Nueva sección */}
            <Divider sx={{ marginBottom: 3 }} />
            <Box
              component="form"
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 2,
                mb: 3,
              }}
            >
              <TextField
                label="Observación Final"
                value={ot?.observacion_final || ""}
                fullWidth
                readOnly
                sx={{ gridColumn: "span 2", height: 120 }}
              />
            </Box>

            {/* Nueva sección de insumos */}
            <Divider sx={{ marginBottom: 3 }} />
            <Box
              component="form"
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
                gap: 2,
                mb: 3,
              }}
            >
              <TextField
                label="Código Insumo"
                value={ot?.id_insumo || ""}
                fullWidth
                readOnly
              />
              <TextField
                label="Descripción"
                value={insumo?.nombre_insumo || ""}
                fullWidth
                readOnly
              />
              <TextField
                label="Cantidad"
                value={ot?.cantidad || ""}
                fullWidth
                readOnly
              />
              <TextField
                label="Precio"
                value={`$${ot?.precio_neto?.toLocaleString() || ""}`}
                fullWidth
                readOnly
              />
              <TextField
                label="Af/Ex"
                value={ot?.af_ex || ""}
                fullWidth
                readOnly
              />
            </Box>

            {/* Nueva sección de totales */}
            <Divider sx={{ marginBottom: 3 }} />
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
                label="Subtotal"
                value={`$${ot?.sub_total?.toLocaleString() || ""}`}
                fullWidth
                readOnly
              />
              <TextField
                label="Monto Neto"
                value={`$${ot?.monto_neto?.toLocaleString() || ""}`}
                fullWidth
                readOnly
              />
              <TextField
                label="IVA"
                value={`$${ot?.iva?.toLocaleString() || ""}`}
                fullWidth
                readOnly
              />
              <TextField
                label="Total"
                value={`$${ot?.total?.toLocaleString() || ""}`}
                fullWidth
                readOnly
              />
            </Box>
          </CardContent>
        </Card>
        <div className="profile-button">
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/ots")}
          >
            Volver a la lista de OTs
          </Button>
        </div>
      </div>
    </UserLayout>
  );
};

export default OtProfilePage;
