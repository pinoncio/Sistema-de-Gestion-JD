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

      if (data.ID_CATEGORIA) {
        const categoriaData = await getCategoria(data.ID_CATEGORIA);
        setCategoria(categoriaData.NOMBRE_CATEGORIA); // Ajustar según la estructura de la respuesta
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
        <Button onClick={() => navigate("/insumos")}>
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
                value={insumo.TIPO_INSUMO || ""}
                variant="outlined"
                fullWidth
                readOnly
              />
              <TextField
                label="Nombre Insumo"
                value={insumo.NOMBRE_INSUMO || ""}
                variant="outlined"
                fullWidth
                readOnly
              />
              <TextField
                label="Ubicación"
                value={insumo.UBICACION || ""}
                variant="outlined"
                fullWidth
                readOnly
              />
              <TextField
                label="Cantidad"
                value={insumo.CANTIDAD || ""}
                variant="outlined"
                fullWidth
                readOnly
              />
              <TextField
                label="Costo Unidad"
                value={insumo.COSTO_UNIDAD ? `$${insumo.COSTO_UNIDAD.toLocaleString()}` : ""}
                variant="outlined"
                fullWidth
                readOnly
              />
              <TextField
                label="Sub Total"
                value={insumo.SUB_TOTAL ? `$${insumo.SUB_TOTAL.toLocaleString()}` : ""}
                variant="outlined"
                fullWidth
                readOnly
              />
              <TextField
                label="Ajuste Actual"
                value={insumo.AJUSTE_ACTUAL ? `$${insumo.AJUSTE_ACTUAL.toLocaleString()}` : ""}
                variant="outlined"
                fullWidth
                readOnly
              />
              <TextField
                label="Stock Disponible"
                value={insumo.STOCK_DISPONIBLE || ""}
                variant="outlined"
                fullWidth
                readOnly
              />
              <TextField
                label="Precio Neto"
                value={insumo.PRECIO_NETO ? `$${insumo.PRECIO_NETO.toLocaleString()}` : ""}
                variant="outlined"
                fullWidth
                readOnly
              />
              <TextField
                label="Total"
                value={insumo.PRECIO_VENTA ? `$${insumo.PRECIO_VENTA.toLocaleString()}` : ""}
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
