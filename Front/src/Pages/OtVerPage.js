import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOt } from "../Services/otService";
import { getCliente } from "../Services/clienteService";
import { getMetodosPagoCliente } from "../Services/ClientePagoService";
import { getMetodoPago } from "../Services/metodoPagoService";
import { getInsumo } from "../Services/insumoService";
import { getInsumosByOT } from "../Services/otInsumoService";
import { getProductosByOt } from "../Services/productoService";
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

const OtProfilePage = () => {
  const { id_ot } = useParams();
  const [ot, setOt] = useState(null);
  const [clientes, setCliente] = useState(null);
  const [insumos, setInsumo] = useState([]);
  const [ot_insumos, setOtInsumo] = useState([]);
  const [productos, setProducto] = useState([]);
  const [metodoPago, setMetodoPago] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchOt = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const otData = await getOt(id_ot);
      setOt(otData);

      if (otData.id_cliente) {
        const clienteData = await getCliente(otData.id_cliente);
        setCliente(clienteData);

        const clienteMetodoPago = await getMetodosPagoCliente(
          otData.id_cliente
        );
        const metodoPagoData = clienteMetodoPago?.[0];
        if (metodoPagoData?.id_metodo_pago) {
          const metodoPagoDetails = await getMetodoPago(
            metodoPagoData.id_metodo_pago
          );
          setMetodoPago(metodoPagoDetails);
        }
      }

      // Obtener insumos de la OT y luego obtener cada insumo completo
      const otInsumosData = await getInsumosByOT(id_ot);
      setOtInsumo(otInsumosData);

      // Obtener detalles completos de los insumos
      const insumosData = await Promise.all(
        otInsumosData.map(async (otInsumo) => {
          const insumoDetails = await getInsumo(otInsumo.id_insumo);
          return { ...otInsumo, ...insumoDetails }; // Unimos los datos de OT con los detalles del insumo
        })
      );
      setInsumo(insumosData); // Guardamos los insumos completos

      // Obtener productos de la OT
      const productosData = await getProductosByOt(id_ot);
      setProducto(productosData);
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

  const getInsumoName = (id_insumo) => {
    const insumo = insumos.find((i) => i.id_insumo === id_insumo);
    return insumo ? insumo.nombre_insumo : "Sin Insumo";
  };

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
        <Button onClick={() => navigate("/ots")}>Volver a la lista</Button>
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
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                gap: 2,
                mb: 3,
                padding: "10px",
              }}
            >
              <TextField
                label="Fecha de Emisión"
                value={ot?.fecha_solicitud || ""}
                fullWidth
                readOnly
                sx={{
                  gridColumn: "span 2",
                  textAlign: "right",
                  backgroundColor: "#f9f9f9",
                  borderRadius: "4px",
                }}
              />
              <TextField
                label="Razón Social"
                value={clientes?.nombre_razon_social || ""}
                fullWidth
                readOnly
                sx={{
                  backgroundColor: "#f9f9f9",
                  borderRadius: "4px",
                }}
              />
              <TextField
                label="RUT"
                value={clientes?.rut || ""}
                fullWidth
                readOnly
                sx={{
                  backgroundColor: "#f9f9f9",
                  borderRadius: "4px",
                }}
              />
              <TextField
                label="Dirección"
                value={clientes?.direccion || ""}
                fullWidth
                readOnly
                sx={{
                  backgroundColor: "#f9f9f9",
                  borderRadius: "4px",
                }}
              />
              <TextField
                label="Giro"
                value={clientes?.giro || ""}
                fullWidth
                readOnly
                sx={{
                  backgroundColor: "#f9f9f9",
                  borderRadius: "4px",
                }}
              />
              <TextField
                label="Comuna"
                value={clientes?.comuna || ""}
                fullWidth
                readOnly
                sx={{
                  backgroundColor: "#f9f9f9",
                  borderRadius: "4px",
                }}
              />
              <TextField
                label="Ciudad"
                value={clientes?.ciudad || ""}
                fullWidth
                readOnly
                sx={{
                  backgroundColor: "#f9f9f9",
                  borderRadius: "4px",
                }}
              />
              <TextField
                label="Tipo de OT"
                value={ot?.tipo_ot || ""}
                fullWidth
                readOnly
                sx={{
                  backgroundColor: "#f9f9f9",
                  borderRadius: "4px",
                }}
              />
              <TextField
                label="Entrega"
                value={ot?.fecha_entrega || ""}
                fullWidth
                readOnly
                sx={{
                  backgroundColor: "#f9f9f9",
                  borderRadius: "4px",
                }}
              />
              <TextField
                label="Forma de Pago"
                value={metodoPago?.nombre_metodo || ""}
                fullWidth
                readOnly
                sx={{
                  backgroundColor: "#f9f9f9",
                  borderRadius: "4px",
                }}
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
                multiline
                rows={4}
                sx={{
                  gridColumn: "span 2",
                  height: 125,
                  backgroundColor: "#f9f9f9",
                  borderRadius: "4px",
                }}
              />
            </Box>

            <Divider sx={{ marginBottom: 1 }} />
            <Box component="form" sx={{ display: "grid", gap: 3 }}>
              {/* Tabla OT Insumos */}
              <Typography variant="h6" sx={{ marginBottom: 2 }}>
                Insumos
              </Typography>
              <TableContainer
                component={Paper}
                sx={{ maxHeight: "400px", overflowX: "auto" }}
              >
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Insumo</TableCell>
                      <TableCell>Cantidad</TableCell>
                      <TableCell>Precio Unitario</TableCell>
                      <TableCell>Descuento</TableCell>
                      <TableCell>Recargo</TableCell>
                      <TableCell>AF/EX</TableCell>
                      <TableCell>Precio Total</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {ot_insumos.map((insumo) => (
                      <TableRow key={insumo.id_insumo}>
                        <TableCell
                          sx={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                          title={getInsumoName(insumo.id_insumo)}
                        >
                          {getInsumoName(insumo.id_insumo)}
                        </TableCell>
                        <TableCell>{insumo.cantidad_insumo}</TableCell>
                        <TableCell>
                          ${insumo.precio_unitario?.toLocaleString() || ""}
                        </TableCell>
                        <TableCell>
                          ${insumo.descuento_insumo?.toLocaleString() || ""}
                        </TableCell>
                        <TableCell>
                          ${insumo.recargo_insumo?.toLocaleString() || ""}
                        </TableCell>
                        <TableCell>{insumo.af_ex_insumo}</TableCell>
                        <TableCell>
                          ${insumo.precio_total?.toLocaleString() || ""}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* Tabla Productos */}
              <Typography variant="h6" sx={{ marginBottom: 2 }}>
                Productos
              </Typography>
              <TableContainer
                component={Paper}
                sx={{ maxHeight: "400px", overflowX: "auto" }}
              >
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Producto</TableCell>
                      <TableCell>Cantidad</TableCell>
                      <TableCell>Precio Unitario</TableCell>
                      <TableCell>Descuento</TableCell>
                      <TableCell>Recargo</TableCell>
                      <TableCell>AF/EX</TableCell>
                      <TableCell>Precio Total</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {productos.map((producto) => (
                      <TableRow key={producto.nombre_producto}>
                        <TableCell
                          sx={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                          title={producto.nombre_producto}
                        >
                          {producto.nombre_producto}
                        </TableCell>
                        <TableCell>{producto.cantidad_producto}</TableCell>
                        <TableCell>
                          ${producto.precio_unitario?.toLocaleString() || ""}
                        </TableCell>
                        <TableCell>
                          ${producto.descuento_producto?.toLocaleString() || ""}
                        </TableCell>
                        <TableCell>
                          ${producto.recargo_producto?.toLocaleString() || ""}
                        </TableCell>
                        <TableCell>{producto.af_ex || ""}</TableCell>
                        <TableCell>
                          ${producto.precio_total?.toLocaleString() || ""}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>

            {/* Nueva sección de totales */}
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
                label="Subtotal"
                value={`$${ot?.sub_total?.toLocaleString() || ""}`}
                fullWidth
                readOnly
                sx={{
                  backgroundColor: "#f9f9f9",
                  borderRadius: "4px",
                }}
              />
              <TextField
                label="Monto Neto"
                value={`$${ot?.monto_neto?.toLocaleString() || ""}`}
                fullWidth
                readOnly
                sx={{
                  backgroundColor: "#f9f9f9",
                  borderRadius: "4px",
                }}
              />
              <TextField
                label="IVA"
                value={`$${ot?.iva?.toLocaleString() || ""}`}
                fullWidth
                readOnly
                sx={{
                  backgroundColor: "#f9f9f9",
                  borderRadius: "4px",
                }}
              />
              <TextField
                label="Total"
                value={`$${ot?.total?.toLocaleString() || ""}`}
                fullWidth
                readOnly
                sx={{
                  backgroundColor: "#f9f9f9",
                  borderRadius: "4px",
                }}
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
            Volver a la lista de Órdenes de trabajo
          </Button>
        </div>
      </div>
    </UserLayout>
  );
};

export default OtProfilePage;
