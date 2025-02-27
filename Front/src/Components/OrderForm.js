import { useEffect, useState } from "react";
import React from "react";
import {
  TextField,
  MenuItem,
  Button,
  Grid,
  InputAdornment,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
} from "@mui/material";
import { createOt } from "../Services/otService";
import { getClientes } from "../Services/clienteService";
import { getInsumos } from "../Services/insumoService";
import DeleteIcon from "@mui/icons-material/Delete";
import UserLayout from "./Layout/UserLayout";
import { useNavigate } from "react-router-dom";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const OrderForm = () => {
  const [clientes, setClientes] = useState([]);
  const [insumos, setInsumos] = useState([]);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id_cliente: "",
    tipo_documento: "Orden de Trabajo",
    fecha_solicitud: "",
    fecha_entrega: "",
    tipo_ot: "",
    equipo: "",
    numero_serie: "",
    horas_trabajo: "",
    observacion_final: "",
    descripcion: "",
    comentario: "",
    descuento_global: "",
    sub_total: "0",
    monto_neto: "0",
    monto_exento: "1",
    iva: "19",
    total: "0",
    insumos: [],
    productos: [],
  });

  const [currentInsumo, setCurrentInsumo] = useState({
    id_insumo: "",
    cantidad_insumo: "",
    precio_unitario: "",
    descuento_insumo: "",
    recargo_insumo: "",
    af_ex_insumo: "Afecto",
    precio_total: "",
  });
  const [currentProducto, setCurrentProducto] = useState({
    nombre_producto: "",
    cantidad_producto: "",
    precio_unitario: "",
    descuento_producto: "",
    recargo_producto: "",
    af_ex: "Afecto",
    precio_total: "",
  });

  useEffect(() => {
    fetchClientes();
    fetchInsumos();
  }, []);
  const fetchClientes = async () => {
    try {
      setClientes(await getClientes());
    } catch (error) {
      console.error("Error al obtener los clientes:", error);
    }
  };
  const fetchInsumos = async () => {
    try {
      setInsumos(await getInsumos());
    } catch (error) {
      console.error("Error al obtener los insumos:", error);
    }
  };

  const [errors, setErrors] = useState({});
  const handleChange = ({ target: { name, value } }) =>
    setFormData((prev) => ({ ...prev, [name]: value }));

  const handleCreateOt = async (data) => {
    try {
      await createOt(data);
      alert("Orden de trabajo creada exitosamente!");
      setFormData({
        id_cliente: "",
        tipo_documento: "Orden de Trabajo",
        fecha_solicitud: "",
        fecha_entrega: "",
        tipo_ot: "",
        equipo: "",
        numero_serie: "",
        horas_trabajo: "",
        observacion_final: "",
        descripcion: "",
        comentario: "",
        descuento_global: "",
        sub_total: "0",
        monto_neto: "0",
        monto_exento: "1",
        iva: "19",
        total: "0",
        ot_insumos: [
          {
            id_insumo: "",
            cantidad_insumo: "",
            precio_unitario: "",
            descuento_insumo: "",
            recargo_insumo: "",
            af_ex_insumo: "Afecto",
            precio_total: "",
          },
        ],
        productos: [
          {
            nombre_producto: "",
            cantidad_producto: "",
            precio_unitario: "",
            descuento_producto: "",
            recargo_producto: "",
            af_ex_producto: "Afecto",
            precio_total: "",
          },
        ],
      });
    } catch (error) {
      console.error("Error al crear la orden de trabajo:", error);
      alert("Ha ocurrido un error al crear la orden de trabajo.");
    }
  };

  const handleCurrentInsumoChange = (e, field) => {
    const { value } = e.target;
    setCurrentInsumo((prev) => {
      const updated = { ...prev, [field]: value };
      updated.precio_total = (
        parseFloat(updated.cantidad_insumo || 0) *
          parseFloat(updated.precio_unitario || 0) *
          (1 - parseFloat(updated.descuento_insumo || 0) / 100) +
        parseFloat(updated.recargo_insumo || 0)
      ).toFixed(2);
      return updated;
    });
  };

  const handleCurrentProductoChange = (e, field) => {
    const { value } = e.target;
    setCurrentProducto((prev) => {
      const updated = { ...prev, [field]: value };
      updated.precio_total = (
        parseFloat(updated.cantidad_producto || 0) *
          parseFloat(updated.precio_unitario || 0) *
          (1 - parseFloat(updated.descuento_producto || 0) / 100) +
        parseFloat(updated.recargo_producto || 0)
      ).toFixed(2);
      return updated;
    });
  };

  const handleAddInsumo = () => {
    if (
      !currentInsumo.id_insumo ||
      !currentInsumo.cantidad_insumo ||
      !currentInsumo.precio_unitario
    )
      return;
    setFormData((prevData) => ({
      ...prevData,
      insumos: [...prevData.insumos, currentInsumo],
    }));
    setCurrentInsumo({
      id_insumo: "",
      cantidad_insumo: "",
      precio_unitario: "",
      descuento_insumo: "",
      recargo_insumo: "",
      af_ex_insumo: "Afecto",
      precio_total: "",
    });
  };

  const handleAddProducto = () => {
    if (
      !currentProducto.nombre_producto ||
      !currentProducto.cantidad_producto ||
      !currentProducto.precio_unitario
    )
      return;
    setFormData((prevData) => ({
      ...prevData,
      productos: [...prevData.productos, currentProducto],
    }));
    setCurrentProducto({
      nombre_producto: "",
      cantidad_producto: "",
      precio_unitario: "",
      descuento_producto: "",
      recargo_producto: "",
      af_ex: "Afecto",
      precio_total: "",
    });
  };

  const handleRemoveInsumo = (index) =>
    setFormData((prevData) => ({
      ...prevData,
      insumos: prevData.insumos.filter((_, i) => i !== index),
    }));
  const handleRemoveProducto = (index) =>
    setFormData((prevData) => ({
      ...prevData,
      productos: prevData.productos.filter((_, i) => i !== index),
    }));

  useEffect(() => {
    const { descuento_global, monto_exento, insumos, productos } = formData;
    const subtotal =
      insumos.reduce(
        (acc, { precio_total }) => acc + (parseFloat(precio_total) || 0),
        0
      ) +
      productos.reduce(
        (acc, { precio_total }) => acc + (parseFloat(precio_total) || 0),
        0
      );
    const montoNeto =
      subtotal * (1 - (parseFloat(descuento_global) || 0) / 100);
    const iva = montoNeto * 0.19;
    const total = montoNeto + iva + (parseFloat(monto_exento) || 0);
    setFormData((prevData) => {
      if (
        prevData.sub_total === subtotal.toFixed(0) &&
        prevData.monto_neto === montoNeto.toFixed(0) &&
        prevData.iva === iva.toFixed(0) &&
        prevData.total === total.toFixed(0)
      )
        return prevData;
      return {
        ...prevData,
        sub_total: subtotal.toFixed(0),
        monto_neto: montoNeto.toFixed(0),
        iva: iva.toFixed(0),
        total: total.toFixed(0),
      };
    });
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const allInsumos = currentInsumo.id_insumo
      ? [...formData.insumos, currentInsumo]
      : formData.insumos;
    const allProductos = currentProducto.nombre_producto
      ? [...formData.productos, currentProducto]
      : formData.productos;


    const productosFormateados = allProductos.map((producto) => ({
      nombre_producto: producto.nombre_producto,
      cantidad_producto: parseFloat(producto.cantidad_producto), 
      precio_unitario: parseFloat(producto.precio_unitario),
      descuento_producto: parseFloat(producto.descuento_producto), 
      recargo_producto: parseFloat(producto.recargo_producto), 
      af_ex: producto.af_ex,
      precio_total: parseFloat(producto.precio_total), 
    }));

    // Transformar los insumos al formato esperado
    const insumosFormateados = allInsumos.map((insumo) => ({
      id_insumo: parseInt(insumo.id_insumo), 
      cantidad_insumo: parseFloat(insumo.cantidad_insumo), 
      precio_unitario: parseFloat(insumo.precio_unitario), 
      descuento_insumo: parseFloat(insumo.descuento_insumo), 
      recargo_insumo: parseFloat(insumo.recargo_insumo), 
      af_ex_insumo: insumo.af_ex_insumo, 
      precio_total: parseFloat(insumo.precio_total), 
    }));

    // Estructura final a enviar
    const dataToSubmit = {
      ...formData,
      productos: productosFormateados,
      insumos: insumosFormateados,
    };

    const lowerCaseFormData = Object.fromEntries(
      Object.entries(dataToSubmit).map(([key, value]) => [
        key.toLowerCase(),
        value,
      ])
    );

    // Validación de los campos obligatorios
    if (Object.values(lowerCaseFormData).some((val) => !val)) {
      setErrors({
        ...errors,
        generales: "Todos los campos obligatorios deben ser llenados.",
      });
      return;
    }

    try {
      await handleCreateOt(lowerCaseFormData); // Llamada a la función para crear la OT
      // Limpiar formulario después de la creación
      setFormData({
        id_cliente: "",
        tipo_documento: "Orden de Trabajo",
        fecha_solicitud: "",
        fecha_entrega: "",
        tipo_ot: "",
        equipo: "",
        numero_serie: "",
        horas_trabajo: "",
        observacion_final: "",
        descripcion: "",
        comentario: "",
        descuento_global: "",
        sub_total: "0",
        monto_neto: "0",
        monto_exento: "1",
        iva: "19",
        total: "0",
        insumos: [],
        productos: [],
      });
      setCurrentInsumo({
        id_insumo: "",
        cantidad_insumo: "",
        precio_unitario: "",
        descuento_insumo: "",
        recargo_insumo: "",
        af_ex_insumo: "Afecto",
        precio_total: "",
      });
      setCurrentProducto({
        nombre_producto: "",
        cantidad_producto: "",
        precio_unitario: "",
        descuento_producto: "",
        recargo_producto: "",
        af_ex: "Afecto",
        precio_total: "",
      });
      setErrors({});
      console.log(lowerCaseFormData);
    } catch (error) {
      console.error("Error al crear/actualizar OT:", error);
      setErrors({
        ...errors,
        generales:
          error.response?.data?.message ||
          "Ha ocurrido un error. Intente nuevamente.",
      });
    }
  };

  const handleGoBack = () => navigate("/ots");

  return (
    <UserLayout>
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            maxWidth: "1400px",
            margin: "auto",
            padding: 3,
            boxShadow: 2,
            borderRadius: 2,
            backgroundColor: "#fff",
            marginTop: "40px",
          }}
        >
          <Button
            variant="outlined"
            color="error"
            onClick={handleGoBack}
            startIcon={<ExitToAppIcon />}
            sx={{
              width: "auto",
              marginTop: 2,
              "&:hover": {
                backgroundColor: "red",
                borderColor: "red",
                color: "white",
              },
            }}
          >
            Volver
          </Button>
          <Typography
            variant="h4"
            sx={{
              marginBottom: 3,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Formulario Orden de Trabajo (OT)
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Cliente"
                select
                value={formData.id_cliente}
                onChange={handleChange}
                name="id_cliente"
                fullWidth
                required
                InputLabelProps={{
                  shrink: true,
                }}
              >
                <MenuItem value="">Seleccionar</MenuItem>
                {clientes.map((c) => (
                  <MenuItem key={c.id_cliente} value={c.id_cliente}>
                    {c.nombre_razon_social}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Tipo de Documento"
                name="tipo_documento"
                value={formData.tipo_documento}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{
                  shrink: true, // Hace que el label siempre esté visible
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Fecha de Solicitud"
                name="fecha_solicitud"
                type="date"
                value={formData.fecha_solicitud}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Fecha de Entrega"
                name="fecha_entrega"
                type="date"
                value={formData.fecha_entrega}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Tipo de OT"
                name="tipo_ot"
                value={formData.tipo_ot}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{
                  shrink: true, // Hace que el label siempre esté visible
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Equipo"
                name="equipo"
                value={formData.equipo}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{
                  shrink: true, // Hace que el label siempre esté visible
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Número de Serie"
                name="numero_serie"
                value={formData.numero_serie}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{
                  shrink: true, // Hace que el label siempre esté visible
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Horas de Trabajo"
                name="horas_trabajo"
                value={formData.horas_trabajo}
                onChange={handleChange}
                fullWidth
                type="number"
                InputLabelProps={{
                  shrink: true, // Hace que el label siempre esté visible
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Observación Final"
                name="observacion_final"
                value={formData.observacion_final}
                onChange={handleChange}
                fullWidth
                multiline
                rows={4}
                InputLabelProps={{
                  shrink: true, // Hace que el label siempre esté visible
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Descripción"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{
                  shrink: true, // Hace que el label siempre esté visible
                }}
              />
            </Grid>

            {/* Fila para seleccionar el Insumo */}
            <Grid item xs={12}>
              <TextField
                label="Insumo Fijo"
                select
                value={currentInsumo.id_insumo}
                onChange={(e) => handleCurrentInsumoChange(e, "id_insumo")}
                fullWidth
                InputLabelProps={{
                  shrink: true, // Hace que el label siempre esté visible
                }}
              >
                <MenuItem value="">Seleccionar</MenuItem>
                {insumos.map((i) => (
                  <MenuItem key={i.id_insumo} value={i.id_insumo}>
                    {i.nombre_insumo}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Campos del insumo */}
            <Grid item xs={2}>
              <TextField
                label="Cantidad"
                type="number"
                value={currentInsumo.cantidad_insumo}
                onChange={(e) =>
                  handleCurrentInsumoChange(e, "cantidad_insumo")
                }
                fullWidth
                InputLabelProps={{
                  shrink: true, // Hace que el label siempre esté visible
                }}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                label="Precio Unitario"
                type="number"
                value={currentInsumo.precio_unitario}
                onChange={(e) =>
                  handleCurrentInsumoChange(e, "precio_unitario")
                }
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                label="Desc. %"
                type="number"
                value={currentInsumo.descuento_insumo}
                onChange={(e) =>
                  handleCurrentInsumoChange(e, "descuento_insumo")
                }
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">%</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                label="Recargo"
                type="number"
                value={currentInsumo.recargo_insumo}
                onChange={(e) => handleCurrentInsumoChange(e, "recargo_insumo")}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                label="AF/EX"
                type="text"
                value={currentInsumo.af_ex_insumo}
                fullWidth
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                label="Precio Total"
                value={currentInsumo.precio_total}
                fullWidth
                InputProps={{
                  readOnly: true,
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Button variant="contained" onClick={handleAddInsumo}>
                Agregar Insumo
              </Button>
            </Grid>

            {/* Tabla para listar los insumos agregados */}
            <Grid item xs={12}>
              <TableContainer component={Paper} sx={{ marginTop: 2 }}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Insumo</TableCell>
                      <TableCell>Cantidad</TableCell>
                      <TableCell>Precio Unitario</TableCell>
                      <TableCell>Desc. (%)</TableCell>
                      <TableCell>Rec. ($)</TableCell>
                      <TableCell>AF/EX</TableCell>
                      <TableCell>Precio Total</TableCell>
                      <TableCell>Acciones</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {formData.insumos.map((insumo, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          {insumos.find((i) => i.id_insumo === insumo.id_insumo)
                            ?.nombre_insumo || ""}
                        </TableCell>
                        <TableCell>{insumo.cantidad_insumo}</TableCell>
                        <TableCell>${insumo.precio_unitario}</TableCell>
                        <TableCell>{insumo.descuento_insumo}%</TableCell>
                        <TableCell>${insumo.recargo_insumo}</TableCell>
                        <TableCell>{insumo.af_ex_insumo}</TableCell>
                        <TableCell>${insumo.precio_total}</TableCell>
                        <TableCell>
                          <IconButton
                            color="error"
                            onClick={() => handleRemoveInsumo(index)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Nombre del Producto"
                fullWidth
                value={currentProducto.nombre_producto}
                onChange={(e) =>
                  handleCurrentProductoChange(e, "nombre_producto")
                }
                InputLabelProps={{
                  shrink: true, // Hace que el label siempre esté visible
                }}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                label="Cantidad"
                type="number"
                fullWidth
                value={currentProducto.cantidad_producto}
                onChange={(e) =>
                  handleCurrentProductoChange(e, "cantidad_producto")
                }
                InputLabelProps={{
                  shrink: true, // Hace que el label siempre esté visible
                }}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                label="Precio Unitario"
                type="number"
                fullWidth
                value={currentProducto.precio_unitario}
                onChange={(e) =>
                  handleCurrentProductoChange(e, "precio_unitario")
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                label="Descuento (%)"
                type="number"
                fullWidth
                value={currentProducto.descuento_producto}
                onChange={(e) =>
                  handleCurrentProductoChange(e, "descuento_producto")
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">%</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                label="Recargo"
                type="number"
                fullWidth
                value={currentProducto.recargo_producto}
                onChange={(e) =>
                  handleCurrentProductoChange(e, "recargo_producto")
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                label="AF/EX"
                type="text"
                value={currentProducto.af_ex}
                fullWidth
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                label="Precio Total"
                value={currentProducto.precio_total}
                fullWidth
                InputProps={{
                  readOnly: true,
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddProducto}
              >
                Agregar Producto
              </Button>
            </Grid>
            <Grid item xs={12}>
              <TableContainer component={Paper} sx={{ marginTop: 2 }}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Producto</TableCell>
                      <TableCell>Cantidad</TableCell>
                      <TableCell>Precio Unitario</TableCell>
                      <TableCell>Desc. (%)</TableCell>
                      <TableCell>Rec. ($)</TableCell>
                      <TableCell>AF/EX</TableCell>
                      <TableCell>Precio Total</TableCell>
                      <TableCell>Acciones</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {formData.productos.map((producto, index) => (
                      <TableRow key={index}>
                        <TableCell>{producto.nombre_producto}</TableCell>
                        <TableCell>{producto.cantidad_producto}</TableCell>
                        <TableCell>${producto.precio_unitario}</TableCell>
                        <TableCell>{producto.descuento_producto}%</TableCell>
                        <TableCell>${producto.recargo_producto}</TableCell>
                        <TableCell>{producto.af_ex_producto}</TableCell>
                        <TableCell>${producto.precio_total}</TableCell>
                        <TableCell>
                          <IconButton
                            color="error"
                            onClick={() => handleRemoveProducto(index)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Sub Total"
                name="sub_total"
                value={formData.sub_total}
                onChange={handleChange}
                fullWidth
                type="number"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Descuento Global"
                name="descuento_global"
                value={formData.descuento_global}
                onChange={handleChange}
                fullWidth
                type="number"
                InputLabelProps={{
                  shrink: true, // Hace que el label siempre esté visible
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Monto Neto"
                name="monto_neto"
                value={formData.monto_neto}
                onChange={handleChange}
                fullWidth
                type="number"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Monto Exento"
                name="monto_exento"
                value={formData.monto_exento}
                onChange={handleChange}
                fullWidth
                type="number"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="IVA"
                name="iva"
                value={formData.iva}
                onChange={handleChange}
                fullWidth
                type="number"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Total"
                name="total"
                value={formData.total}
                onChange={handleChange}
                fullWidth
                type="number"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Comentario"
                name="comentario"
                value={formData.comentario}
                onChange={handleChange}
                fullWidth
                multiline
                rows={4}
              />
            </Grid>
          </Grid>

          <Box
            sx={{
              display: "flex", // Para poner los botones en una fila
              justifyContent: "space-between", // Distribuye el espacio entre los botones
              gap: 2, // Espacio entre los botones
              marginTop: 4, // Espacio superior para los botones
            }}
          >
            <Button
              type="submit"
              variant="contained"
              color="primary" // Azul
              sx={{ flex: 1 }} // Ocupa el 50% del espacio disponible
            >
              Crear OT
            </Button>
          </Box>
        </Box>
      </form>
    </UserLayout>
  );
};

export default OrderForm;
