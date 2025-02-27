import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getInsumo } from "../Services/insumoService";
import { getCategoria } from "../Services/categoriaService"; // Importamos la función
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
import "../Styles/UserProfilePage.css";

const InsumoProfilePage = () => {
  const { id_insumo } = useParams();
  const [insumo, setInsumo] = useState(null);
  const [categoria, setCategoria] = useState(null); // Estado para la categoría
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchInsumo = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getInsumo(id_insumo);
      setInsumo(data);

      if (data.id_categoria) {
        const categoriaData = await getCategoria(data.id_categoria);
        setCategoria(categoriaData.nombre_categoria); // Ajustar según la estructura de la respuesta
      }
    } catch (error) {
      setError("Error al obtener la información del insumo.");
      console.error("Error al obtener datos", error);
    } finally {
      setLoading(false);
    }
  }, [id_insumo]);

  useEffect(() => {
    if (id_insumo) {
      fetchInsumo();
    } else {
      setError("ID de insumo no válido");
      setLoading(false);
    }
  }, [id_insumo, fetchInsumo]);

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
        <Button onClick={() => navigate("/insumo")}>
          Volver a la lista de insumos
        </Button>
      </div>
    );
  }

  if (!insumo) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <Typography variant="body1" color="error">
          Insumo no encontrado.
        </Typography>
        <Button onClick={() => navigate("/insumos")}>
          Volver a la lista de insumos
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
              Detalles del Insumo
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
                label="Categoría"
                value={categoria || "Cargando..."}
                variant="outlined"
                fullWidth
                readOnly
              />
              <TextField
                label="Tipo Insumo"
                value={insumo.tipo_insumo || ""}
                variant="outlined"
                fullWidth
                readOnly
              />
              <TextField
                label="Nombre Insumo"
                value={insumo.nombre_insumo || ""}
                variant="outlined"
                fullWidth
                readOnly
              />
              <TextField
                label="Ubicación"
                value={insumo.ubicacion || ""}
                variant="outlined"
                fullWidth
                readOnly
              />
              <TextField
                label="Cantidad"
                value={insumo.cantidad || ""}
                variant="outlined"
                fullWidth
                readOnly
              />
              <TextField
                label="Costo Unidad"
                value={
                  insumo.costo_unidad
                    ? `$${insumo.costo_unidad.toLocaleString()}`
                    : ""
                }
                variant="outlined"
                fullWidth
                readOnly
              />
              <TextField
                label="Sub Total"
                value={
                  insumo.sub_total
                    ? `$${insumo.sub_total.toLocaleString()}`
                    : ""
                }
                variant="outlined"
                fullWidth
                readOnly
              />
              <TextField
                label="Ajuste Actual"
                value={
                  insumo.ajuste_actual
                    ? `$${insumo.ajuste_actual.toLocaleString()}`
                    : ""
                }
                variant="outlined"
                fullWidth
                readOnly
              />
              <TextField
                label="Stock Disponible"
                value={insumo.stock_disponible || ""}
                variant="outlined"
                fullWidth
                readOnly
              />
              <TextField
                label="Precio Neto"
                value={
                  insumo.precio_neto
                    ? `$${insumo.precio_neto.toLocaleString()}`
                    : ""
                }
                variant="outlined"
                fullWidth
                readOnly
              />
              <TextField
                label="Total"
                value={
                  insumo.precio_venta
                    ? `$${insumo.precio_venta.toLocaleString()}`
                    : ""
                }
                variant="outlined"
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
            onClick={() => navigate("/insumo")}
          >
            Volver a la lista de Insumos
          </Button>
        </div>
      </div>
    </UserLayout>
  );
};

export default InsumoProfilePage;
