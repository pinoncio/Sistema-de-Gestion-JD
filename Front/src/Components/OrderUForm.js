import { useCallback, useEffect, useState } from "react";
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
  SnackbarContent,
} from "@mui/material";
import { getOt, updateOt } from "../Services/otService";
import { getClientes } from "../Services/clienteService";
import { getInsumos } from "../Services/insumoService";
import { getInsumosByOT } from "../Services/otInsumoService";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import UserLayout from "./Layout/UserLayout";
import { useNavigate, useParams } from "react-router-dom";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const OrderUForm = () => {
  const { id_ot } = useParams();
  const [clientes, setClientes] = useState([]);
  const [insumos, setInsumos] = useState([]);
  const [setOtInsumos] = useState([]);
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedInsumo, setEditedInsumo] = useState({});
  const [editingIndexProducto, setEditingIndexProducto] = useState(null);
  const [editedProducto, setEditedProducto] = useState({});
  const [formData, setFormData] = useState({
    id_cliente: "",
    tipo_documento: "Orden de Trabajo",
    fecha_solicitud: today,
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
    ot_insumo: [],
    productos: [],
  });

  const [currentOtInsumo, setCurrentOtInsumo] = useState({
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

  const fetchOtInsumos = useCallback(
    async (id_ot) => {
      try {
        setOtInsumos(await getInsumosByOT(id_ot));
      } catch (error) {
        console.error("Error al obtener los insumos de la OT:", error);
      }
    },
    [setOtInsumos]
  );

  useEffect(() => {
    fetchClientes();
    fetchInsumos();
    if (id_ot) {
      fetchOt(id_ot);
      fetchOtInsumos(id_ot);
    }
  }, [id_ot, fetchOtInsumos]);

  const fetchOt = async (id_ot) => {
    try {
      const otData = await getOt(id_ot);
      setFormData({
        ...otData,
      });
    } catch (error) {
      console.error("Error al obtener la OT:", error);
    }
  };

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

  const getInsumoName = (id_insumo) => {
    const insumo = insumos.find((i) => i.id_insumo === id_insumo);
    return insumo ? insumo.nombre_insumo : "Sin Insumo";
  };

  const [errors, setErrors] = useState({});
  const validateName = (value) => /^[A-Za-zÁáÉéÍíÓóÚúÑñ\s]+$/.test(value);
  const validateNumber = (value) => /^[0-9]+(\.[0-9]{1,2})?$/.test(value);
  const handleChange = (e, field) => {
    const { value } = e.target;
    if (validateNumber(value) || value === "") {
      setFormData({ ...formData, [field]: value });
      setErrors({ ...errors, [field]: "" });
    } else
      setErrors({
        ...errors,
        [field]: "Solo se permiten números y puntos, con hasta dos decimales.",
      });
  };

  const handleNameChange = (e, field) => {
    const { value } = e.target;
    if (validateName(value) || value === "") {
      setFormData({ ...formData, [field]: value });
      setErrors({ ...errors, [field]: "" });
    } else
      setErrors({ ...errors, [field]: "Solo se permiten letras y espacios." });
  };

  const handleAlphanumericChange = (e, field) => {
    const { value } = e.target;
    if (/^[A-Za-z0-9-]+$/.test(value) || value === "") {
      setFormData({ ...formData, [field]: value });
      setErrors({ ...errors, [field]: "" });
    } else
      setErrors({
        ...errors,
        [field]: "Solo se permiten letras, números y guiones.",
      });
  };

  const handleDateChange = (e, field) => {
    const { value } = e.target;
    if (!isNaN(Date.parse(value))) {
      setFormData({ ...formData, [field]: value });
      setErrors({ ...errors, [field]: "" });
    } else
      setErrors({
        ...errors,
        [field]: "Ingrese una fecha válida en formato YYYY-MM-DD.",
      });
  };

  const handleUpdateOt = async (data) => {
    try {
      await updateOt(id_ot, data); // Actualizar la OT
      setOpenSnackbar(true); // Muestra el Snackbar en caso de éxito
      setErrors({});
      setTimeout(() => {
        navigate("/ots");
      }, 2000); // Redirige a /ots después de 2 segundos
    } catch (error) {
      console.error("Error al actualizar la orden de trabajo:", error);
      setErrors({
        ...errors,
        generales:
          error.response?.data?.message ||
          "Ha ocurrido un error al actualizar la orden de trabajo.",
      });
      setOpenSnackbar(true);
    }
  };

  const handleCurrentInsumoChange = (e, field) => {
    const { value } = e.target;

    // Validación del valor para asegurarse de que solo contenga números y un punto
    if (!validateNumber(value) && value !== "") return; // Si no es válido, no actualiza

    setCurrentOtInsumo((prev) => {
      const updated = { ...prev, [field]: value };

      // Si se selecciona un insumo, actualizar el precio_unitario con el costo_unidad del insumo seleccionado
      if (field === "id_insumo") {
        const selectedInsumo = insumos.find((i) => i.id_insumo === value);
        updated.precio_unitario = selectedInsumo
          ? selectedInsumo.costo_unidad
          : "";
      }

      // Calcular el precio total con los valores actualizados
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

    // Si el campo es 'nombre_producto', no se valida el valor, se permite cualquier cosa
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
    if (!validateNumber(value) && value !== "") return; // Si no es válido, no actualiza

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
      !currentOtInsumo.id_insumo ||
      !currentOtInsumo.cantidad_insumo ||
      !currentOtInsumo.precio_unitario
    )
      return;
    setFormData((prevData) => ({
      ...prevData,
      ot_insumo: [...prevData.ot_insumo, currentOtInsumo],
    }));
    setCurrentOtInsumo({
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
      ot_insumo: prevData.ot_insumo.filter((_, i) => i !== index),
    }));
  const handleRemoveProducto = (index) =>
    setFormData((prevData) => ({
      ...prevData,
      productos: prevData.productos.filter((_, i) => i !== index),
    }));

  const handleEditInsumo = (index) => {
    const insumoToEdit = formData.ot_insumo[index];
    setEditingIndex(index); // Marca la fila como editada
    setEditedInsumo(insumoToEdit); // Carga los datos actuales en el estado para editarlos
  };

  const handleSaveInsumo = (index) => {
    const updatedInsumo = {
      ...editedInsumo,
      precio_total: calculateTotal(editedInsumo),
    };
    setFormData((prevData) => ({
      ...prevData,
      ot_insumo: prevData.ot_insumo.map((item, i) =>
        i === index ? updatedInsumo : item
      ),
    }));
    setEditingIndex(null); // Sale del modo de edición
  };

  const handleCancelEdit = () => {
    setEditingIndex(null); // Sale del modo de edición sin guardar
  };

  const handleInputChange = (e, field) => {
    const { value } = e.target;
    setEditedInsumo((prev) => ({ ...prev, [field]: value }));
  };

  const calculateTotal = (insumo) => {
    const cantidad = parseFloat(insumo.cantidad_insumo) || 0;
    const precioUnitario = parseFloat(insumo.precio_unitario) || 0;
    const descuento = parseFloat(insumo.descuento_insumo) || 0;
    const recargo = parseFloat(insumo.recargo_insumo) || 0;
    const afEx = insumo.af_ex_insumo === "Exento" ? 0 : 1;
    return (cantidad * precioUnitario * (1 - descuento / 100) + recargo) * afEx;
  };

  const handleEditProducto = (index) => {
    const productoToEdit = formData.productos[index];
    setEditingIndexProducto(index); // Marca la fila como editada
    setEditedProducto(productoToEdit); // Carga los datos actuales en el estado para editarlos
  };

  const handleSaveProducto = (index) => {
    const updatedProducto = {
      ...editedProducto,
      precio_total: calculateTotalProducto(editedProducto),
    };
    setFormData((prevData) => ({
      ...prevData,
      productos: prevData.productos.map((item, i) =>
        i === index ? updatedProducto : item
      ),
    }));
    setEditingIndexProducto(null); // Sale del modo de edición
  };

  const handleCancelEditProducto = () => {
    setEditingIndexProducto(null); // Sale del modo de edición sin guardar
  };

  const handleInputChangeProducto = (e, field) => {
    const { value } = e.target;
    setEditedProducto((prev) => ({ ...prev, [field]: value }));
  };

  const calculateTotalProducto = (producto) => {
    const cantidad = parseFloat(producto.cantidad_producto) || 0;
    const precioUnitario = parseFloat(producto.precio_unitario) || 0;
    const descuento = parseFloat(producto.descuento_producto) || 0;
    const recargo = parseFloat(producto.recargo_producto) || 0;
    const afEx = producto.af_ex_producto === "Exento" ? 0 : 1;
    return (cantidad * precioUnitario * (1 - descuento / 100) + recargo) * afEx;
  };

  useEffect(() => {
    const { descuento_global, monto_exento, ot_insumo, productos } = formData;
    const subtotal =
      ot_insumo.reduce(
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

    console.log("Inicio de handleSubmit");

    const allOtInsumos = currentOtInsumo.id_insumo
      ? [...formData.ot_insumo, currentOtInsumo]
      : formData.ot_insumo;
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

    const otInsumosFormateados = allOtInsumos.map((otInsumo) => ({
      id_insumo: parseInt(otInsumo.id_insumo),
      cantidad_insumo: parseFloat(otInsumo.cantidad_insumo),
      precio_unitario: parseFloat(otInsumo.precio_unitario),
      descuento_insumo: parseFloat(otInsumo.descuento_insumo),
      recargo_insumo: parseFloat(otInsumo.recargo_insumo),
      af_ex_insumo: otInsumo.af_ex_insumo,
      precio_total: parseFloat(otInsumo.precio_total),
    }));

    const dataToSubmit = {
      ...formData,
      productos: productosFormateados,
      ot_insumo: otInsumosFormateados,
    };

    const lowerCaseFormData = Object.fromEntries(
      Object.entries(dataToSubmit).map(([key, value]) => [
        key.toLowerCase(),
        value,
      ])
    );

    console.log("Datos formateados a enviar:", lowerCaseFormData);

    if (
      Object.values(lowerCaseFormData).some(
        (val) => val === "" || val === null || val === undefined
      )
    ) {
      console.warn("Error: Hay campos vacíos o nulos");
      setErrors({
        ...errors,
        generales: "Todos los campos obligatorios deben ser llenados.",
      });
      return;
    }

    try {
      console.log("Enviando datos a handleUpdateOt...");
      await handleUpdateOt(lowerCaseFormData);
      console.log("Actualización exitosa");

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
        ot_insumo: [],
        productos: [],
      });

      setCurrentOtInsumo({
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

      setTimeout(() => {
        console.log("Redirigiendo a /ots");
        navigate("/ots", { replace: true });
      }, 2000);
    } catch (error) {
      console.error("Error al crear/actualizar OT:", error?.response || error);
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
                onChange={(e) => handleChange(e, "id_cliente")}
                name="id_cliente"
                fullWidth
                required
                error={!!errors.id_cliente}
                helperText={errors.id_cliente || "Campo obligatorio."}
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
                helperText={errors.fecha_entrega || "Campó obligatorio"}
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
                name="numero_serie"
                value={formData.numero_serie}
                onChange={(e) => handleAlphanumericChange(e, "numero_serie")}
                fullWidth
                required
                helperText={
                  errors.numero_serie ||
                  (!formData.numero_serie ? "Campó obligatorio" : "")
                }
                error={!!errors.numero_serie}
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
                onChange={(e) => handleChange(e, "horas_trabajo")}
                fullWidth
                type="number"
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
                  shrink: true, // Hace que el label siempre esté visible
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

            <Grid item xs={12}>
              <TextField
                label="Insumo Fijo"
                select
                value={currentOtInsumo.id_insumo}
                onChange={(e) => handleCurrentInsumoChange(e, "id_insumo")}
                fullWidth
                InputLabelProps={{
                  shrink: true, // Hace que el label siempre esté visible
                }}
              >
                <MenuItem value="">Seleccionar</MenuItem>
                {insumos.map((i) => (
                  <MenuItem key={i.id_insumo} value={i.id_insumo}>
                    {getInsumoName(i.id_insumo)}{" "}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Campos del insumo */}
            <Grid item xs={2}>
              <TextField
                label="Cantidad"
                type="number"
                value={currentOtInsumo.cantidad_insumo}
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
                value={currentOtInsumo.precio_unitario}
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
                value={currentOtInsumo.descuento_insumo}
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
                value={currentOtInsumo.recargo_insumo}
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
                value={currentOtInsumo.af_ex_insumo}
                fullWidth
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                label="Precio Total"
                value={currentOtInsumo.precio_total}
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
                    {formData.ot_insumo.map((otInsumo, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          {getInsumoName(otInsumo.id_insumo)}
                        </TableCell>
                        <TableCell>
                          {editingIndex === index ? (
                            <TextField
                              value={editedInsumo.cantidad_insumo || ""}
                              onChange={(e) =>
                                handleInputChange(e, "cantidad_insumo")
                              }
                              type="number"
                              size="small"
                            />
                          ) : (
                            otInsumo.cantidad_insumo
                          )}
                        </TableCell>
                        <TableCell>
                          {editingIndex === index ? (
                            <TextField
                              value={editedInsumo.precio_unitario || ""}
                              onChange={(e) =>
                                handleInputChange(e, "precio_unitario")
                              }
                              type="number"
                              size="small"
                            />
                          ) : (
                            `$${otInsumo.precio_unitario}`
                          )}
                        </TableCell>
                        <TableCell>
                          {editingIndex === index ? (
                            <TextField
                              value={editedInsumo.descuento_insumo || ""}
                              onChange={(e) =>
                                handleInputChange(e, "descuento_insumo")
                              }
                              type="number"
                              size="small"
                            />
                          ) : (
                            `${otInsumo.descuento_insumo}%`
                          )}
                        </TableCell>
                        <TableCell>
                          {editingIndex === index ? (
                            <TextField
                              value={editedInsumo.recargo_insumo || ""}
                              onChange={(e) =>
                                handleInputChange(e, "recargo_insumo")
                              }
                              type="number"
                              size="small"
                            />
                          ) : (
                            `$${otInsumo.recargo_insumo}`
                          )}
                        </TableCell>
                        <TableCell>{otInsumo.af_ex_insumo}</TableCell>
                        <TableCell>
                          {editingIndex === index
                            ? `$${calculateTotal(editedInsumo)}`
                            : `$${otInsumo.precio_total}`}
                        </TableCell>
                        <TableCell>
                          {editingIndex === index ? (
                            <>
                              <IconButton
                                color="primary"
                                onClick={() => handleSaveInsumo(index)}
                              >
                                <SaveIcon />
                              </IconButton>
                              <IconButton
                                color="secondary"
                                onClick={handleCancelEdit}
                              >
                                <CancelIcon />
                              </IconButton>
                            </>
                          ) : (
                            <IconButton
                              color="primary"
                              onClick={() => handleEditInsumo(index)}
                            >
                              <EditIcon />
                            </IconButton>
                          )}
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
                        <TableCell>
                          {editingIndexProducto === index ? (
                            <TextField
                              value={editedProducto.cantidad_producto || ""}
                              onChange={(e) =>
                                handleInputChangeProducto(
                                  e,
                                  "cantidad_producto"
                                )
                              }
                              type="number"
                              size="small"
                            />
                          ) : (
                            producto.cantidad_producto
                          )}
                        </TableCell>
                        <TableCell>
                          {editingIndexProducto === index ? (
                            <TextField
                              value={editedProducto.precio_unitario || ""}
                              onChange={(e) =>
                                handleInputChangeProducto(e, "precio_unitario")
                              }
                              type="number"
                              size="small"
                            />
                          ) : (
                            `$${producto.precio_unitario}`
                          )}
                        </TableCell>
                        <TableCell>
                          {editingIndexProducto === index ? (
                            <TextField
                              value={editedProducto.descuento_producto || ""}
                              onChange={(e) =>
                                handleInputChangeProducto(
                                  e,
                                  "descuento_producto"
                                )
                              }
                              type="number"
                              size="small"
                            />
                          ) : (
                            `${producto.descuento_producto}%`
                          )}
                        </TableCell>
                        <TableCell>
                          {editingIndexProducto === index ? (
                            <TextField
                              value={editedProducto.recargo_producto || ""}
                              onChange={(e) =>
                                handleInputChangeProducto(e, "recargo_producto")
                              }
                              type="number"
                              size="small"
                            />
                          ) : (
                            `$${producto.recargo_producto}`
                          )}
                        </TableCell>
                        <TableCell>{producto.af_ex_producto}</TableCell>
                        <TableCell>
                          {editingIndexProducto === index
                            ? `$${calculateTotalProducto(editedProducto)}`
                            : `$${producto.precio_total}`}
                        </TableCell>
                        <TableCell>
                          {editingIndexProducto === index ? (
                            <>
                              <IconButton
                                color="primary"
                                onClick={() => handleSaveProducto(index)}
                              >
                                <SaveIcon />
                              </IconButton>
                              <IconButton
                                color="secondary"
                                onClick={handleCancelEditProducto}
                              >
                                <CancelIcon />
                              </IconButton>
                            </>
                          ) : (
                            <IconButton
                              color="primary"
                              onClick={() => handleEditProducto(index)}
                            >
                              <EditIcon />
                            </IconButton>
                          )}
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
                  (!formData.descuento_global ? "Campó obligatorio" : "")
                }
                error={!!errors.DESCUENTO_GLOBAL}
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
                fullWidth
                type="number"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Monto Exento"
                name="monto_exento"
                value={formData.monto_exento}
                fullWidth
                type="number"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="IVA"
                name="iva"
                value={formData.iva}
                fullWidth
                type="number"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Total"
                name="total"
                value={formData.total}
                fullWidth
                type="number"
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
              Actualizar OT
            </Button>
          </Box>
        </Box>
      </form>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{
          vertical: "top", // Posición vertical: arriba
          horizontal: "right", // Posición horizontal: derecha
        }}
      >
        <SnackbarContent
          message={
            errors.generales || "Orden de trabajo Actualizada exitosamente!"
          }
          sx={{
            backgroundColor: errors.generales ? "red" : "green", // Color rojo para error, verde para éxito
            color: "white", // Texto blanco para mayor contraste
          }}
        />
      </Snackbar>
    </UserLayout>
  );
};

export default OrderUForm;
