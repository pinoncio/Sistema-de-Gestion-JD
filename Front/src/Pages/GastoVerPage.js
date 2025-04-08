import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
import { getGasto } from "../Services/gastoService";

const GastoVerPage = () => {
  const { id_gasto } = useParams();
  const [gasto, setGasto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchGasto = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getGasto(id_gasto);
      setGasto(data);
    } catch (error) {
      console.error("Error al obtener el gasto", error);
      setError("Error al obtener la información del gasto.");
    } finally {
      setLoading(false);
    }
  }, [id_gasto]);

  useEffect(() => {
    if (id_gasto) {
      fetchGasto();
    } else {
      setError("ID de gasto no válido");
      setLoading(false);
    }
  }, [id_gasto, fetchGasto]);

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
        <Button onClick={() => navigate("/gastos")}>
          Volver a la lista de gastos
        </Button>
      </div>
    );
  }

  if (!gasto) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <Typography variant="body1" color="error">
          Gasto no encontrado.
        </Typography>
        <Button onClick={() => navigate("/gastos")}>
          Volver a la lista de gastos
        </Button>
      </div>
    );
  }

  // Obtener el primer id_ot si existe
  const otAsociada =
    gasto.ots && gasto.ots.length > 0 ? gasto.ots[0].id_ot : null;

  return (
    <UserLayout>
      <div className="profile-container">
        <Card className="profile-card">
          <CardContent>
            <Typography variant="h5" className="profile-title">
              Detalles del Gasto
            </Typography>
            <Divider sx={{ marginBottom: 3 }} />
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 2,
              }}
            >
              <TextField
                label="Item Gasto"
                value={gasto.item_gasto || ""}
                fullWidth
                readOnly
              />
              <TextField
                label="Detalle"
                value={gasto.detalle || ""}
                fullWidth
                readOnly
              />
              <TextField
                label="Fecha Compra"
                value={gasto.fecha_compra || ""}
                fullWidth
                readOnly
              />
              <TextField
                label="Método de Pago"
                value={gasto.metodo_pago || ""}
                fullWidth
                readOnly
              />
              <TextField
                label="Pago Neto"
                value={`$${gasto.pago_neto?.toLocaleString() || ""}`}
                fullWidth
                readOnly
              />
              <TextField
                label="IVA"
                value={`$${gasto.iva?.toLocaleString() || ""}`}
                fullWidth
                readOnly
              />
              <TextField
                label="Total Pagado"
                value={`$${gasto.total_pagado?.toLocaleString() || ""}`}
                fullWidth
                readOnly
              />
              <TextField
                label="N° Factura"
                value={gasto.nro_factura || ""}
                fullWidth
                readOnly
              />
              <TextField
                label="Proveedor"
                value={gasto.proveedor || ""}
                fullWidth
                readOnly
              />
              <TextField
                label="Cliente"
                value={gasto.cliente?.nombre_razon_social || ""}
                fullWidth
                readOnly
              />
              <TextField
                label={otAsociada ? "OT Asociada" : "Sin OT asignada"}
                value={otAsociada || gasto.sin_ot || "Sin OT"}
                fullWidth
                InputProps={{ readOnly: true }}
              />

              <TextField
                label="Observación"
                value={gasto.observacion || ""}
                fullWidth
                readOnly
              />
            </Box>
          </CardContent>
        </Card>

        <div
          className="profile-button"
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "10px",
            marginTop: "16px",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/gastos")}
          >
            Volver a la lista de Gastos
          </Button>

          {otAsociada && (
            <Button
              variant="contained"
              color="secondary"
              onClick={() => navigate(`/otProfile/${otAsociada}`)}
            >
              Ver OT Asociada
            </Button>
          )}
        </div>
      </div>
    </UserLayout>
  );
};

export default GastoVerPage;
