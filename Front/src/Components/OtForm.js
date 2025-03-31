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
  Snackbar,
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
  const today = new Date().toISOString().split("T")[0];
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [maquinasCliente, setMaquinasCliente] = useState([]);
  const [formData, setFormData] = useState({
    id_cliente: "",
    tipo_documento: "Orden de Trabajo",
    fecha_solicitud: today,
    fecha_entrega: "",
    tipo_ot: "",
    equipo: "",
    numero_serie: "",
    horas_trabajo: "",
    prioridad: "",
    observacion_inicial: "",
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
  const validateName = (value) => /^[A-Za-zÁáÉéÍíÓóÚúÑñ\s]+$/.test(value);
  const validateNumber = (value) => /^[0-9]+(\.[0-9]{1,2})?$/.test(value);

  const handleChange = (e, field) => {
    const { value } = e.target;

    // Validar que solo sean números y puntos
    if (!validateNumber(value) && value !== "") {
      setErrors({
        ...errors,
        [field]: "Solo se permiten números y puntos, con hasta dos decimales.",
      });
      return;
    }

    let numericValue = parseFloat(value);

    // Validar que descuento_global esté entre 0 y 99
    if (
      field === "descuento_global" &&
      (numericValue < 0 || numericValue > 99)
    ) {
      setErrors({
        ...errors,
        [field]: "El descuento debe estar entre 0 y 99.",
      });
      return;
    }

    setFormData({ ...formData, [field]: value });
    setErrors({ ...errors, [field]: "" });
  };

  const handleNameChange = (e, field) => {
    const { value } = e.target;
    if (validateName(value) || value === "") {
      setFormData({ ...formData, [field]: value });
      setErrors({ ...errors, [field]: "" });
    } else
      setErrors({ ...errors, [field]: "Solo se permiten letras y espacios." });
  };

  const handleDateChange = (e, field) => {
    const { value } = e.target;
    const today = new Date().toISOString().split("T")[0];

    if (value < today) {
      setErrors({
        ...errors,
        [field]: "No se permiten fechas pasadas.",
      });
    } else {
      setFormData({ ...formData, [field]: value });
      setErrors({ ...errors, [field]: "" });
    }
  };

  const handleCreateOt = async (data) => {
    try {
      await createOt(data);
      setSnackbarMessage("OT creada correctamente.");
      setOpenSnackbar(true);
      setFormData({
        id_cliente: "",
        tipo_documento: "Orden de Trabajo",
        fecha_solicitud: "",
        fecha_entrega: "",
        tipo_ot: "",
        equipo: "",
        numero_serie: "",
        horas_trabajo: "",
        prioridad: "",
        observacion_inicial: "",
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
    } catch (error) {
      setErrors({
        ...errors,
        generales:
          error.response?.data?.message ||
          "Ha ocurrido un error al crear la orden de trabajo.",
      });
      setSnackbarMessage("Error al crear la OT");
      setOpenSnackbar(true);
    }
  };

  const handleCurrentInsumoChange = (e, field) => {
    const { value } = e.target;

    if (!validateNumber(value) && value !== "") return;

    let numericValue = parseFloat(value);

    if (
      field === "descuento_insumo" &&
      (numericValue < 0 || numericValue > 99)
    ) {
      return;
    }

    setCurrentInsumo((prev) => {
      const updated = { ...prev, [field]: value };

      if (field === "id_insumo") {
        const selectedInsumo = insumos.find((i) => i.id_insumo === value);
        updated.precio_unitario = selectedInsumo
          ? selectedInsumo.costo_unidad
          : "";
      }

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

    // Si el campo es 'nombre_producto', no se valida el valor
    if (field === "nombre_producto") {
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
      return;
    }

    // Validación para los demás campos (solo números y punto)
    if (!validateNumber(value) && value !== "") return;

    let numericValue = parseFloat(value);

    if (
      field === "descuento_producto" &&
      (numericValue < 0 || numericValue > 99)
    ) {
      return; // No actualiza si está fuera de rango
    }

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
    ) {
      setOpenSnackbar(true);
      return;
    }

    const selectedInsumo = insumos.find(
      (i) => i.id_insumo === currentInsumo.id_insumo
    );

    if (!selectedInsumo) {
      setSnackbarMessage("Insumo no encontrado.");
      setOpenSnackbar(true);
      return;
    }

    const stockDisponible = selectedInsumo.cantidad;
    const cantidadSolicitada = parseFloat(currentInsumo.cantidad_insumo);

    if (cantidadSolicitada > stockDisponible) {
      setSnackbarMessage(
        `Stock insuficiente. Disponible: ${stockDisponible}, Solicitado: ${cantidadSolicitada}`
      );
      setOpenSnackbar(true);
      return;
    }

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

    setSnackbarMessage("Insumo agregado correctamente.");
    setOpenSnackbar(true);
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

    const insumosFormateados = allInsumos.map((insumo) => ({
      id_insumo: parseInt(insumo.id_insumo),
      cantidad_insumo: parseFloat(insumo.cantidad_insumo),
      precio_unitario: parseFloat(insumo.precio_unitario),
      descuento_insumo: parseFloat(insumo.descuento_insumo),
      recargo_insumo: parseFloat(insumo.recargo_insumo),
      af_ex_insumo: insumo.af_ex_insumo,
      precio_total: parseFloat(insumo.precio_total),
    }));

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
      await handleCreateOt(lowerCaseFormData);
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
        prioridad: "",
        observacion_inicial: "",
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

      setTimeout(() => {
        navigate("/ots");
      }, 2000); // Redirige a /ots después de 3 segundos
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

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleClienteChange = (e) => {
    const idCliente = e.target.value;
    setFormData({ ...formData, id_cliente: idCliente, numero_serie: "" });

    // Buscar las máquinas del cliente seleccionado
    const clienteSeleccionado = clientes.find(
      (c) => c.id_cliente === idCliente
    );
    setMaquinasCliente(
      clienteSeleccionado ? clienteSeleccionado.maquinas || [] : []
    );
  };

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
                onChange={handleClienteChange}
                name="id_cliente"
                fullWidth
                required
                error={!!errors.id_cliente}
                helperText={errors.id_cliente || "Campo obligatorio."}
                InputLabelProps={{ shrink: true }}
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
                onChange={(e) => handleChange(e, "tipo_documento")}
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
                onChange={(e) => handleDateChange(e, "fecha_solicitud")}
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
                onChange={(e) => handleDateChange(e, "fecha_entrega")}
                fullWidth
                InputLabelProps={{ shrink: true }}
                required
                error={!!errors.fecha_entrega}
                helperText={errors.fecha_entrega || "Campo obligatorio"}
                inputProps={{
                  min: new Date().toISOString().split("T")[0], // Solo permite desde hoy en adelante
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Tipo de OT"
                name="tipo_ot"
                value={formData.tipo_ot}
                onChange={(e) => handleNameChange(e, "tipo_ot")}
                fullWidth
                required
                error={!!errors.tipo_ot}
                helperText={
                  errors.tipo_ot ||
                  (!formData.tipo_ot ? "Campo obligatorio" : "")
                }
                InputLabelProps={{
                  shrink: true, // Hace que el label siempre esté visible
                }}
                select // Indica que este TextField es un select
              >
                <MenuItem value="">Seleccionar</MenuItem>
                <MenuItem value="Correctiva">Correctiva</MenuItem>
                <MenuItem value="Reparación">Reparación</MenuItem>
                <MenuItem value="Garantía">Garantía</MenuItem>
                <MenuItem value="Mantenimiento">Mantenimiento</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Equipo"
                name="equipo"
                value={formData.equipo}
                onChange={(e) => handleNameChange(e, "equipo")}
                fullWidth
                required
                helperText={
                  errors.equipo || (!formData.equipo ? "Campó obligatorio" : "")
                }
                error={!!errors.equipo}
                InputLabelProps={{
                  shrink: true, // Hace que el label siempre esté visible
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Número de Serie"
                select
                name="numero_serie"
                value={formData.numero_serie}
                onChange={(e) =>
                  setFormData({ ...formData, numero_serie: e.target.value })
                }
                fullWidth
                required
                error={!!errors.numero_serie}
                helperText={errors.numero_serie || "Campo obligatorio."}
                InputLabelProps={{ shrink: true }}
              >
                <MenuItem value="">Seleccionar</MenuItem>
                {maquinasCliente.map((m) => (
                  <MenuItem key={m.numero_serie} value={m.numero_serie}>
                    {m.numero_serie}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Horas de Trabajo"
                name="horas_trabajo"
                value={formData.horas_trabajo}
                onChange={(e) => handleChange(e, "horas_trabajo")}
                fullWidth
                required
                helperText={
                  errors.horas_trabajo ||
                  (!formData.horas_trabajo ? "Campó obligatorio" : "")
                }
                error={!!errors.horas_trabajo}
                InputLabelProps={{
                  shrink: true, // Hace que el label siempre esté visible
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Prioridad"
                name="prioridad"
                value={formData.prioridad}
                onChange={(e) => handleNameChange(e, "prioridad")}
                fullWidth
                required
                error={!!errors.prioridad}
                helperText={errors.prioridad}
                InputLabelProps={{
                  shrink: true,
                }}
                select
              >
                <MenuItem value="">Seleccionar</MenuItem>
                <MenuItem value="Alta">Alta</MenuItem>
                <MenuItem value="Media">Media</MenuItem>
                <MenuItem value="Baja">Baja</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Observación Inicial"
                name="observacion_inicial"
                value={formData.observacion_inicial}
                onChange={(e) => handleNameChange(e, "observacion_inicial")}
                fullWidth
                multiline
                rows={4}
                required
                helperText={
                  errors.observacion_inicial ||
                  (!formData.observacion_inicial ? "Campó obligatorio" : "")
                }
                error={!!errors.observacion_inicial}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Observación Final"
                name="observacion_final"
                value={formData.observacion_final}
                onChange={(e) => handleNameChange(e, "observacion_final")}
                fullWidth
                multiline
                rows={4}
                required
                helperText={
                  errors.observacion_final ||
                  (!formData.observacion_final ? "Campó obligatorio" : "")
                }
                error={!!errors.observacion_final}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Descripción"
                name="descripcion"
                value={formData.descripcion}
                onChange={(e) => handleNameChange(e, "descripcion")}
                fullWidth
                required
                helperText={
                  errors.descripcion ||
                  (!formData.descripcion ? "Campó obligatorio" : "")
                }
                error={!!errors.descripcion}
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
                label="Descuento %"
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
                inputProps={{ min: 0, max: 99 }}
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
                      <TableCell>Insumo Fijo</TableCell>
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
                label="Insumo"
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
                inputProps={{ min: 0, max: 99 }}
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
                fullWidth
                type="number"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Descuento Global"
                name="descuento_global"
                value={formData.descuento_global}
                onChange={(e) => handleChange(e, "descuento_global")}
                fullWidth
                required
                helperText={
                  errors.descuento_global ||
                  (!formData.descuento_global ? "Campo obligatorio" : "")
                }
                error={!!errors.descuento_global}
                type="number"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">%</InputAdornment>
                  ),
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{ min: 0, max: 99 }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Monto Neto"
                name="monto_neto"
                value={formData.monto_neto}
                fullWidth
                type="number"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Monto Exento"
                name="monto_exento"
                value={formData.monto_exento}
                fullWidth
                type="number"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="IVA"
                name="iva"
                value={formData.iva}
                fullWidth
                type="number"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Total"
                name="total"
                value={formData.total}
                fullWidth
                type="number"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Comentario"
                name="comentario"
                value={formData.comentario}
                onChange={(e) => handleNameChange(e, "comentario")}
                fullWidth
                multiline
                rows={4}
                required
                helperText={
                  errors.comentario ||
                  (!formData.comentario ? "Campó obligatorio" : "")
                }
                error={!!errors.comentario}
              />
            </Grid>
          </Grid>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: 2,
              marginTop: 4,
            }}
          >
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ flex: 1 }}
            >
              Crear OT
            </Button>
          </Box>
        </Box>
      </form>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      ></Snackbar>
    </UserLayout>
  );
};

export default OrderForm;
