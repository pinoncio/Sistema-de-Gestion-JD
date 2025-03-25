import { useCallback, useEffect, useState } from "react";
import React from "react";
import {
  TextField,
  MenuItem,
  Button,
  Grid,
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
  Divider,
} from "@mui/material";
import { getIt, getIts, updateIt } from "../Services/itService";
import { getClientes } from "../Services/clienteService";
import { getOts, getOt } from "../Services/otService";
import { getAllTiempos, getTiempoByIt } from "../Services/tiempoService";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import UserLayout from "./Layout/UserLayout";
import { useNavigate, useParams } from "react-router-dom";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const ItUForm = () => {
  const { id_it } = useParams();
  const [clientes, setClientes] = useState([]);
  const [tiempos, setTiempos] = useState([]);
  const [ot, setOt] = useState([]);
  const [it, setIt] = useState([]);
  const [filteredOt, setFilteredOt] = useState([]);
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [editingIndexTiempo, setEditingIndexTiempo] = useState(null);
  const [editedTiempo, setEditedTiempo] = useState({});

  const user = JSON.parse(localStorage.getItem("user")) || {
    nombre: "",
    apellido: "",
  };
  const [formData, setFormData] = useState({
    id_cliente: "",
    id_ot: "",
    tecnico: `${user.nombre} ${user.apellido}`,
    maquina: "",
    modelo: "",
    horometro: "",
    numero_serie: "",
    numero_motor: "",
    km_salida: "",
    km_retorno: "",
    queja_sintoma: "",
    diagnostico: "",
    pieza_falla: "",
    solucion: "",
    total_hh: "",
    total_km: "",
    insumo: "",
    observacion: "",
    control_tiempo: [],
    clientes: [],
  });

  const [currentTiempo, setCurrentTiempo] = useState({
    fecha: "",
    viaje_ida: "",
    trabajo: "",
    viaje_vuelta: "",
    total_hh_viaje: "",
    total_hh_trabajo: "",
  });
  const [currentCliente, setCurrentCliente] = useState({
    cliente: {
      nombre_razon_social: "",
      rut: "",
      direccion: "",
      informacion_de_pago: {
        correo_electronico: "",
        telefono_responsable: "",
      },
    },
  });

  useEffect(() => {
    fetchClientes();
    fetchTiempos();
    fetchIts();
    fetchOt();
    if (id_it) {
      fetchIt(id_it);
      fetchTiempoByIt(id_it);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id_it]);

  useEffect(() => {
    if (ot.length > 0 && it.length > 0) {
      const otSinIt = ot.filter(
        (otItem) =>
          !it.some((itItem) => itItem.id_ot === otItem.id_ot) ||
          otItem.id_ot === formData.id_ot
      );
      setFilteredOt(otSinIt);
    }
  }, [ot, it, formData.id_ot]);

  const fetchIts = async () => {
    try {
      const its = await getIts();
      setIt(its);
    } catch (error) {
      console.error("Error al obtener las It:", error);
    }
  };

  const fetchIt = async (id) => {
    try {
      const itData = await getIt(id);
      setFormData({
        ...itData,
        id_ot: itData.ot.id_ot || "",
      });

      if (itData?.id_ot) {
        fetchOtById(itData.id_ot);
      }

      if (itData?.id_cliente) {
        handleClienteSeleccionado(itData.id_cliente);
      }
    } catch (error) {
      console.error("Error al obtener la IT:", error);
    }
  };

  const fetchOt = async () => {
    try {
      const otData = await getOts();
      setOt(Array.isArray(otData) ? otData : []);
    } catch (error) {
      console.error("Error al obtener las OTs:", error);
    }
  };

  const fetchOtById = async (id_ot) => {
    try {
      const otData = await getOt(id_ot);
      if (otData) {
        setOt((prevOt) => {
          const newOt = prevOt.filter((item) => item.id_ot !== id_ot);
          return [...newOt, otData]; // Agregar la OT sin perder las demás
        });
      }
    } catch (error) {
      console.error("Error al obtener la OT:", error);
    }
  };

  const fetchTiempoByIt = async (id) => {
    try {
      const tiempoData = await getTiempoByIt(id);
      setTiempos(tiempoData);
    } catch (error) {
      console.error("Error al obtener los tiempos por IT:", error);
    }
  };

  const fetchClientes = async () => {
    try {
      setClientes(await getClientes());
    } catch (error) {
      console.error("Error al obtener los clientes:", error);
    }
  };

  const fetchTiempos = async () => {
    try {
      setTiempos(await getAllTiempos());
    } catch (error) {
      console.error("Error al obtener los tiempos:", error);
    }
  };

  useEffect(() => {
    if (tiempos.length > 0) {
    }
  }, [tiempos]);

  const handleClienteSeleccionado = useCallback(
    (id_cliente) => {
      const selectedCliente = clientes.find((c) => c.id_cliente === id_cliente);

      if (selectedCliente) {
        setCurrentCliente({
          cliente: {
            nombre_razon_social: selectedCliente.nombre_razon_social || "",
            rut: selectedCliente.rut || "",
            direccion: selectedCliente.direccion || "",
            informacion_de_pago: {
              correo_electronico:
                selectedCliente.informacion_de_pago?.correo_electronico || "",
              telefono_responsable:
                selectedCliente.informacion_de_pago?.telefono_responsable || "",
            },
          },
        });

        // Filtrar OTs asociadas al cliente seleccionado, excluyendo aquellas ya asociadas a una IT
        const filteredData = ot.filter(
          (o) =>
            o.id_cliente === id_cliente &&
            (!tiempos.some((t) => t.id_ot === o.id_ot) ||
              o.id_ot === formData.id_ot)
        );

        setFilteredOt(filteredData);
      } else {
        setCurrentCliente({
          cliente: {
            nombre_razon_social: "",
            rut: "",
            direccion: "",
            informacion_de_pago: {
              correo_electronico: "",
              telefono_responsable: "",
            },
          },
        });
        setFilteredOt([]);
      }
    },
    [clientes, ot, tiempos, formData.id_ot]
  );

  useEffect(() => {
    if (formData.id_cliente && clientes.length > 0) {
      handleClienteSeleccionado(formData.id_cliente);
    }
  }, [formData.id_cliente, clientes, handleClienteSeleccionado]);

  const [errors, setErrors] = useState({});
  const validateName = (value) => /^[A-Za-zÁáÉéÍíÓóÚúÑñ\s]+$/.test(value);
  const validateNumber = (value) => /^[0-9]+(\.[0-9]{1,2})?$/.test(value);

  const handleChange = (e, field) => {
    const { value } = e.target;

    if (field === "id_ot") {
      setFormData({ ...formData, [field]: value });
      return;
    }

    if (!validateNumber(value) && value !== "") {
      setErrors({
        ...errors,
        [field]: "Solo se permiten números y puntos",
      });
      return;
    }

    // Actualizar el valor del campo actual
    const updatedFormData = { ...formData, [field]: value };

    // 🔹 Si los valores de km_salida y km_retorno son válidos, calcular total_km
    const kmSalida = parseFloat(updatedFormData.km_salida) || 0;
    const kmRetorno = parseFloat(updatedFormData.km_retorno) || 0;

    if (kmSalida > 0 && kmRetorno > 0) {
      updatedFormData.total_km = `${kmRetorno - kmSalida} km`;
    }

    setFormData(updatedFormData);
    setErrors({ ...errors, [field]: "" });
  };

  const handleNameChange = (e, field) => {
    const { value } = e.target;
    if (validateName(value) || value === "") {
      setFormData((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => ({ ...prev, [field]: "" }));
    } else {
      setErrors((prev) => ({
        ...prev,
        [field]: "Solo se permiten letras y espacios.",
      }));
    }
  };

  const isAlphanumericWithDash = (value) => {
    return /^[A-Za-z0-9-]*$/.test(value);
  };

  const isNumberEndingWithHOrM = (value) => {
    return /^[0-9]*$/.test(value) || /^[0-9]+[hHmM]$/.test(value);
  };

  const handleInputChange = (e, field, validationFn) => {
    const { value } = e.target;

    if (field === "total_hh") {
      setFormData({ ...formData, [field]: value });
      return;
    }

    if (validationFn(value)) {
      setFormData({ ...formData, [field]: value });
      setErrors({ ...errors, [field]: "" });
    } else {
      setErrors({
        ...errors,
        [field]: "Formato incorrecto.",
      });
    }
  };

  const handleEditTiempo = (index) => {
    const tiempoToEdit = formData.control_tiempo[index];
    setEditingIndexTiempo(index);
    setEditedTiempo(tiempoToEdit);
  };

  const handleSaveTiempo = () => {
    setFormData((prevData) => ({
      ...prevData,
      control_tiempo: prevData.control_tiempo.map((item, i) =>
        i === editingIndexTiempo ? { ...item, ...editedTiempo } : item
      ),
    }));
    setEditingIndexTiempo(null);
    setEditedTiempo({});
  };

  const handleCancelEditTiempo = () => {
    setEditingIndexTiempo(null);
    setEditedTiempo({});
  };

  const formatFecha = (fecha) => {
    if (!fecha) return "";

    const dateObj = new Date(fecha);
    if (isNaN(dateObj)) return fecha;

    // Asegurarse de que la fecha esté en el formato correcto, considerando UTC
    const day = String(dateObj.getUTCDate()).padStart(2, "0");
    const month = String(dateObj.getUTCMonth() + 1).padStart(2, "0"); // Meses comienzan en 0
    const year = String(dateObj.getUTCFullYear()).slice(-2); // Año de 2 dígitos

    return `${day}/${month}/${year}`;
  };

  // Calcular la fecha límite (7 días antes de la fecha actual)
  const getDateLimit = () => {
    const today = new Date();
    today.setDate(today.getDate() - 7); // Restar 7 días
    return today.toISOString().split("T")[0]; // Formato "YYYY-MM-DD"
  };

  const handleInputChangeTiempo = (e, field) => {
    const { value } = e.target;

    const parseTime = (timeString) => {
      const regex = /(\d+)h\s*(\d*)m?/;
      const match = timeString.match(regex);

      if (match) {
        const hours = parseInt(match[1]) || 0;
        const minutes = parseInt(match[2]) || 0;
        return { hours, minutes };
      }

      // Si solo hay minutos ("30m")
      const minutesOnlyMatch = timeString.match(/(\d+)m/);
      if (minutesOnlyMatch) {
        return { hours: 0, minutes: parseInt(minutesOnlyMatch[1]) };
      }

      return { hours: 0, minutes: 0 };
    };

    setEditedTiempo((prev) => {
      const updatedData = { ...prev, [field]: value };

      // Si el campo es "fecha", aseguramos que esté en formato "yyyy-mm-dd"
      if (field === "fecha") {
        const dateObj = new Date(value);
        updatedData[field] = dateObj.toISOString().split("T")[0]; // Convertir a formato "yyyy-mm-dd"
      }

      // Convertir las entradas de tiempo a horas y minutos
      const viajeIda = parseTime(updatedData.viaje_ida || "0");
      const viajeVuelta = parseTime(updatedData.viaje_vuelta || "0");
      const trabajo = parseTime(updatedData.trabajo || "0");

      // Sumar las horas y minutos de viaje
      const totalViajeHours = viajeIda.hours + viajeVuelta.hours;
      const totalViajeMinutes = viajeIda.minutes + viajeVuelta.minutes;

      // Sumar las horas y minutos de trabajo
      const totalTrabajoHours = trabajo.hours;
      const totalTrabajoMinutes = trabajo.minutes;

      // Convertir minutos a horas si es necesario
      const totalMinutesViaje = totalViajeHours * 60 + totalViajeMinutes;
      const totalHoursViaje = Math.floor(totalMinutesViaje / 60);
      const totalMinutesRestanteViaje = totalMinutesViaje % 60;

      const totalMinutesTrabajo = totalTrabajoHours * 60 + totalTrabajoMinutes;
      const totalHoursTrabajo = Math.floor(totalMinutesTrabajo / 60);
      const totalMinutesRestanteTrabajo = totalMinutesTrabajo % 60;

      // Formatear los valores de total_hh
      const totalViajeFormatted = `${totalHoursViaje}h ${totalMinutesRestanteViaje}m`;
      const totalTrabajoFormatted = `${totalHoursTrabajo}h ${totalMinutesRestanteTrabajo}m`;

      updatedData.total_hh_viaje = totalViajeFormatted;
      updatedData.total_hh_trabajo = totalTrabajoFormatted;

      // 🔹 Aquí también actualizamos `formData.total_hh`
      setFormData((prevFormData) => ({
        ...prevFormData,
        total_hh: totalTrabajoFormatted,
      }));

      return updatedData;
    });
  };

  const handleUpdateIt = async (data) => {
    const { id_it, ...itData } = data;
    try {
      await updateIt(id_it, itData);
      setSnackbarMessage("IT actualizada correctamente.");
      setOpenSnackbar(true);
      setFormData({
        id_cliente: "",
        id_ot: "",
        tecnico: "",
        maquina: "",
        modelo: "",
        horometro: "",
        numero_serie: "",
        numero_motor: "",
        km_salida: "",
        km_retorno: "",
        queja_sintoma: "",
        diagnostico: "",
        pieza_falla: "",
        solucion: "",
        total_hh: "",
        total_km: "",
        insumo: "",
        observacion: "",
        control_tiempo: [],
        clientes: [],
      });
      setCurrentTiempo({
        fecha: "",
        viaje_ida: "",
        trabajo: "",
        viaje_vuelta: "",
        total_hh_viaje: "",
        total_hh_trabajo: "",
      });
      setCurrentCliente({
        cliente: {
          nombre_razon_social: "",
          rut: "",
          direccion: "",
          informacion_de_pago: {
            correo_electronico: "",
            telefono_responsable: "",
          },
        },
      });
      setErrors({});
    } catch (error) {
      setErrors({
        ...errors,
        generales:
          error.response?.data?.message ||
          "Ha ocurrido un error al crear el informe de trabajo.",
      });
      setSnackbarMessage("Error al crear la IT");
      setOpenSnackbar(true);
    }
  };

  const handleFechaChange = (e, field) => {
    const { value } = e.target;
    const currentDate = new Date().toISOString().split("T")[0];
    if (value >= currentDate || value === "") {
      setCurrentTiempo((prev) => ({
        ...prev,
        [field]: value,
      }));
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        [field]: "La fecha no puede ser anterior a hoy.",
      }));
    }
  };

  const handleCurrentTiempoChange = (e, field) => {
    const { value } = e.target;

    // Función para parsear tiempo (h y m)
    const parseTime = (timeString) => {
      const regex = /(\d+)h\s*(\d*)m?/;
      const match = timeString.match(regex);

      if (match) {
        const hours = parseInt(match[1]) || 0;
        const minutes = parseInt(match[2]) || 0;
        return { hours, minutes };
      }

      // Si solo hay minutos ("30m")
      const minutesOnlyMatch = timeString.match(/(\d+)m/);
      if (minutesOnlyMatch) {
        return { hours: 0, minutes: parseInt(minutesOnlyMatch[1]) };
      }

      return { hours: 0, minutes: 0 };
    };

    // Si es la fecha, la registramos normalmente
    if (field === "fecha") {
      setCurrentTiempo((prev) => ({
        ...prev,
        [field]: value,
      }));
      handleFechaChange(e, field); // Llama a la función correspondiente
      return;
    }

    // Actualizamos los valores de los campos de tiempo
    setCurrentTiempo((prev) => {
      const updatedData = { ...prev, [field]: value };

      // Parsear las entradas de tiempo (viaje_ida, viaje_vuelta y trabajo)
      const viajeIda = parseTime(updatedData.viaje_ida || "0");
      const viajeVuelta = parseTime(updatedData.viaje_vuelta || "0");
      const trabajo = parseTime(updatedData.trabajo || "0");

      // Sumar las horas y minutos de viaje
      const totalViajeHours = viajeIda.hours + viajeVuelta.hours;
      const totalViajeMinutes = viajeIda.minutes + viajeVuelta.minutes;

      // Sumar las horas y minutos de trabajo
      const totalTrabajoHours = trabajo.hours;
      const totalTrabajoMinutes = trabajo.minutes;

      // Convertir minutos a horas si es necesario
      const totalMinutesViaje = totalViajeHours * 60 + totalViajeMinutes;
      const totalHoursViaje = Math.floor(totalMinutesViaje / 60);
      const totalMinutesRestanteViaje = totalMinutesViaje % 60;

      const totalMinutesTrabajo = totalTrabajoHours * 60 + totalTrabajoMinutes;
      const totalHoursTrabajo = Math.floor(totalMinutesTrabajo / 60);
      const totalMinutesRestanteTrabajo = totalMinutesTrabajo % 60;

      // Formatear los valores de total_hh
      const totalViajeFormatted = `${totalHoursViaje}h ${totalMinutesRestanteViaje}m`;
      const totalTrabajoFormatted = `${totalHoursTrabajo}h ${totalMinutesRestanteTrabajo}m`;

      updatedData.total_hh_viaje = totalViajeFormatted;
      updatedData.total_hh_trabajo = totalTrabajoFormatted;

      // Actualizamos `formData.total_hh`
      setFormData((prevFormData) => ({
        ...prevFormData,
        total_hh: totalTrabajoFormatted,
      }));

      return updatedData;
    });
  };

  const getMinDate = () => {
    const today = new Date();
    today.setDate(today.getDate() - 7); // Fecha mínima: hace 7 días
    return today.toISOString().split("T")[0]; // Formato YYYY-MM-DD
  };

  const handleAddTiempo = () => {
    if (
      !currentTiempo.fecha ||
      !currentTiempo.viaje_ida ||
      !currentTiempo.trabajo ||
      !currentTiempo.viaje_vuelta
    ) {
      setOpenSnackbar(true);
      return;
    }

    setFormData((prevData) => ({
      ...prevData,
      control_tiempo: [...prevData.control_tiempo, currentTiempo],
    }));

    setCurrentTiempo({
      fecha: "",
      viaje_ida: "",
      trabajo: "",
      viaje_vuelta: "",
      total_hh_viaje: "",
      total_hh_trabajo: "",
    });
    setSnackbarMessage("Control de tiempo agregado correctamente.");
    setOpenSnackbar(true);
  };

  const handleRemoveTiempo = (index) =>
    setFormData((prevData) => ({
      ...prevData,
      control_tiempo: prevData.control_tiempo.filter((_, i) => i !== index),
    }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.id_cliente) {
      setSnackbarMessage("Debe seleccionar un cliente.");
      setOpenSnackbar(true);
      return;
    }
    if (formData.control_tiempo.length === 0) {
      setSnackbarMessage("Debe agregar al menos un control de tiempo.");
      setOpenSnackbar(true);
      return;
    }
    const clienteSeleccionado = clientes.find(
      (c) => c.id_cliente === formData.id_cliente
    );

    if (!clienteSeleccionado) {
      setSnackbarMessage("Cliente no válido.");
      setOpenSnackbar(true);
      return;
    }
    const clienteEstructurado = {
      cliente: {
        nombre_razon_social: clienteSeleccionado.nombre_razon_social,
        rut: clienteSeleccionado.rut,
        direccion: clienteSeleccionado.direccion,
        informacion_de_pago: {
          correo_electronico: clienteSeleccionado.correo_electronico || "",
          telefono_responsable: clienteSeleccionado.telefono_responsable || "",
        },
      },
    };
    const dataToSubmit = {
      ...formData,
      cliente: clienteEstructurado,
      control_tiempo: currentTiempo.fecha
        ? [...formData.control_tiempo, currentTiempo]
        : formData.control_tiempo,
    };
    console.log("Datos a enviar:", dataToSubmit);
    try {
      await handleUpdateIt(dataToSubmit);
      setFormData({
        id_cliente: "",
        id_ot: "",
        tecnico: "",
        maquina: "",
        modelo: "",
        horometro: "",
        numero_serie: "",
        numero_motor: "",
        km_salida: "",
        km_retorno: "",
        queja_sintoma: "",
        diagnostico: "",
        pieza_falla: "",
        solucion: "",
        total_hh: "",
        total_km: "",
        insumo: "",
        observacion: "",
        control_tiempo: [],
        clientes: [],
      });
      setSnackbarMessage("IT actualizada correctamente.");
      setOpenSnackbar(true);
      setTimeout(() => {
        navigate("/its");
      }, 2000);
    } catch (error) {
      console.error("Error al actualizar la IT:", error);
      setErrors({
        ...errors,
        generales:
          error.response?.data?.message ||
          "Ha ocurrido un error al actualizar la IT. Intente nuevamente.",
      });
      setSnackbarMessage("Error al actualizar la IT.");
      setOpenSnackbar(true);
    }
  };

  const handleGoBack = () => navigate("/its");

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
            Formulario Informe de Trabajo (IT)
          </Typography>
          <Grid item xs={12} sx={{ textAlign: "center" }}>
            <Divider sx={{ marginY: 2 }} />
            <h2>Servicio de Atención</h2>
          </Grid>
          <Grid container spacing={2.5}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Técnico"
                name="tecnico"
                value={formData.tecnico}
                onChange={(e) => handleNameChange(e, "tecnico")}
                fullWidth
                error={!!errors.tecnico}
                helperText={errors.tecnico}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Cliente"
                select
                value={formData.id_cliente}
                onChange={(e) => handleChange(e, "id_cliente")}
                name="id_cliente"
                fullWidth
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
                label="Nombre Razón Social"
                type="text"
                value={currentCliente.cliente.nombre_razon_social}
                fullWidth
                disabled
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="RUT"
                type="text"
                value={currentCliente.cliente.rut}
                fullWidth
                disabled
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Dirección"
                type="text"
                value={currentCliente.cliente.direccion}
                fullWidth
                disabled
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Correo Electrónico"
                type="text"
                value={
                  currentCliente.cliente.informacion_de_pago.correo_electronico
                }
                fullWidth
                disabled
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Teléfono Responsable"
                type="text"
                value={
                  currentCliente.cliente.informacion_de_pago
                    .telefono_responsable
                }
                fullWidth
                disabled
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Orden de Trabajo"
                select
                value={formData.id_ot} // Asegúrate de que formData.id_ot esté correctamente asignado
                onChange={(e) => handleChange(e, "id_ot")}
                name="id_ot"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              >
                <MenuItem value="">Seleccionar</MenuItem>
                {filteredOt.length > 0 ? (
                  filteredOt.map((otItem) => (
                    <MenuItem key={otItem.id_ot} value={otItem.id_ot}>
                      N°{otItem.id_ot}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No hay OTs disponibles</MenuItem>
                )}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Maquina"
                name="maquina"
                value={formData.maquina}
                onChange={(e) => handleNameChange(e, "maquina")}
                fullWidth
                error={!!errors.maquina}
                helperText={errors.maquina}
                InputLabelProps={{
                  shrink: true,
                }}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Modelo"
                name="modelo"
                value={formData.modelo}
                onChange={(e) =>
                  handleInputChange(e, "modelo", isAlphanumericWithDash)
                }
                fullWidth
                error={!!errors.modelo}
                helperText={errors.modelo}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Horometro"
                name="horometro"
                value={formData.horometro}
                onChange={(e) => handleChange(e, "horometro")}
                fullWidth
                error={!!errors.horometro}
                helperText={errors.horometro}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Numero de serie"
                name="numero_serie"
                value={formData.numero_serie}
                onChange={(e) =>
                  handleInputChange(e, "numero_serie", isAlphanumericWithDash)
                }
                fullWidth
                error={!!errors.numero_serie}
                helperText={errors.numero_serie}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Numero motor"
                name="numero_motor"
                value={formData.numero_motor}
                onChange={(e) =>
                  handleInputChange(e, "numero_motor", isAlphanumericWithDash)
                }
                fullWidth
                error={!!errors.numero_motor}
                helperText={errors.numero_motor}
                InputLabelProps={{
                  shrink: true,
                }}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Kilometro de salida"
                name="km_salida"
                value={formData.km_salida}
                onChange={(e) => handleChange(e, "km_salida")}
                fullWidth
                error={!!errors.km_salida}
                helperText={errors.km_salida}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Kilometro de retorno"
                name="km_retorno"
                value={formData.km_retorno}
                onChange={(e) => handleChange(e, "km_retorno")}
                fullWidth
                error={!!errors.km_retorno}
                helperText={errors.km_retorno}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sx={{ textAlign: "center" }}>
              <Divider sx={{ marginY: 2 }} />
              <h2>Informe Técnico</h2>
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                label="Queja y/o Sintoma"
                name="queja_sintoma"
                value={formData.queja_sintoma}
                onChange={(e) => handleNameChange(e, "queja_sintoma")}
                fullWidth
                multiline
                rows={3}
                error={!!errors.queja_sintoma}
                helperText={errors.queja_sintoma}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                label="Diagnostico"
                name="diagnostico"
                value={formData.diagnostico}
                onChange={(e) => handleNameChange(e, "diagnostico")}
                fullWidth
                multiline
                rows={3}
                error={!!errors.diagnostico}
                helperText={errors.diagnostico}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                label="Pieza falla"
                name="pieza_falla"
                value={formData.pieza_falla}
                onChange={(e) => handleNameChange(e, "pieza_falla")}
                fullWidth
                multiline
                rows={3}
                error={!!errors.pieza_falla}
                helperText={errors.pieza_falla}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                label="Solución"
                name="solucion"
                value={formData.solucion}
                onChange={(e) => handleNameChange(e, "solucion")}
                fullWidth
                multiline
                rows={3}
                error={!!errors.solucion}
                helperText={errors.solucion}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Total horas hombre"
                name="total_hh"
                value={formData.total_hh}
                onChange={(e) =>
                  handleInputChange(e, "total_hh", isNumberEndingWithHOrM)
                }
                fullWidth
                error={!!errors.total_hh}
                helperText={errors.total_hh}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Total Kilometros"
                name="total_km"
                value={formData.total_km}
                onChange={(e) =>
                  handleInputChange(e, "total_km", isNumberEndingWithHOrM)
                }
                fullWidth
                error={!!errors.total_km}
                helperText={errors.total_km}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Insumo"
                name="insumo"
                value={formData.insumo}
                onChange={(e) => handleNameChange(e, "insumo")}
                fullWidth
                error={!!errors.insumo}
                helperText={errors.insumo}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sx={{ textAlign: "center" }}>
              <Divider sx={{ marginY: 2 }} />
              <h2>Control Tiempo</h2>
            </Grid>
            <Grid item xs={2}>
              <TextField
                label="Fecha de visita"
                type="date"
                fullWidth
                value={currentTiempo.fecha}
                onChange={(e) => handleCurrentTiempoChange(e, "fecha")}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  min: getMinDate(), // Fecha mínima permitida: 7 días atrás
                }}
              />
            </Grid>

            <Grid item xs={2}>
              <TextField
                label="Viaje de ida"
                fullWidth
                value={currentTiempo.viaje_ida}
                onChange={(e) => handleCurrentTiempoChange(e, "viaje_ida")}
                error={!!errors.viaje_ida}
                helperText={errors.viaje_ida}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                label="Horas de trabajo"
                fullWidth
                value={currentTiempo.trabajo}
                onChange={(e) => handleCurrentTiempoChange(e, "trabajo")}
                error={!!errors.trabajo}
                helperText={errors.trabajo}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                label="Viaje de vuelta"
                fullWidth
                value={currentTiempo.viaje_vuelta}
                onChange={(e) => handleCurrentTiempoChange(e, "viaje_vuelta")}
                error={!!errors.viaje_vuelta}
                helperText={errors.viaje_vuelta}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                label="Total horas de viaje"
                fullWidth
                value={currentTiempo.total_hh_viaje}
                error={!!errors.total_hh_viaje}
                helperText={errors.total_hh_viaje}
                InputLabelProps={{
                  shrink: true,
                }}
                disabled
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                label="Total de horas hombre"
                fullWidth
                value={currentTiempo.total_hh_trabajo}
                error={!!errors.total_hh_trabajo}
                helperText={errors.total_hh_trabajo}
                InputLabelProps={{
                  shrink: true,
                }}
                disabled
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddTiempo}
              >
                Agendar Visita
              </Button>
            </Grid>
            <Grid item xs={12}>
              <TableContainer component={Paper} sx={{ marginTop: 2 }}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Fecha</TableCell>
                      <TableCell>Viaje ida</TableCell>
                      <TableCell>Trabajo</TableCell>
                      <TableCell>Viaje vuelta</TableCell>
                      <TableCell>Total hh viaje</TableCell>
                      <TableCell>Total hh trabajo</TableCell>
                      <TableCell>Acciones</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {formData.control_tiempo.map((tiempo, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          {editingIndexTiempo === index ? (
                            <TextField
                              value={editedTiempo.fecha || ""}
                              onChange={(e) =>
                                handleInputChangeTiempo(e, "fecha")
                              }
                              type="date"
                              size="small"
                              inputProps={{
                                min: getDateLimit(), 
                              }}
                            />
                          ) : (
                            formatFecha(tiempo.fecha)
                          )}
                        </TableCell>

                        <TableCell>
                          {editingIndexTiempo === index ? (
                            <TextField
                              value={editedTiempo.viaje_ida || ""}
                              onChange={(e) =>
                                handleInputChangeTiempo(e, "viaje_ida")
                              }
                              size="small"
                            />
                          ) : (
                            tiempo.viaje_ida
                          )}
                        </TableCell>
                        <TableCell>
                          {editingIndexTiempo === index ? (
                            <TextField
                              value={editedTiempo.trabajo || ""}
                              onChange={(e) =>
                                handleInputChangeTiempo(e, "trabajo")
                              }
                              size="small"
                            />
                          ) : (
                            tiempo.trabajo
                          )}
                        </TableCell>
                        <TableCell>
                          {editingIndexTiempo === index ? (
                            <TextField
                              value={editedTiempo.viaje_vuelta || ""}
                              onChange={(e) =>
                                handleInputChangeTiempo(e, "viaje_vuelta")
                              }
                              size="small"
                            />
                          ) : (
                            tiempo.viaje_vuelta
                          )}
                        </TableCell>
                        <TableCell>
                          {editingIndexTiempo === index
                            ? editedTiempo.total_hh_viaje ||
                              tiempo.total_hh_viaje
                            : tiempo.total_hh_viaje}
                        </TableCell>
                        <TableCell>
                          {editingIndexTiempo === index
                            ? editedTiempo.total_hh_trabajo ||
                              tiempo.total_hh_trabajo
                            : tiempo.total_hh_trabajo}
                        </TableCell>
                        <TableCell>
                          {editingIndexTiempo === index ? (
                            <>
                              <IconButton
                                color="primary"
                                onClick={() => handleSaveTiempo(index)}
                              >
                                <SaveIcon />
                              </IconButton>
                              <IconButton
                                color="secondary"
                                onClick={handleCancelEditTiempo}
                              >
                                <CancelIcon />
                              </IconButton>
                            </>
                          ) : (
                            <IconButton
                              color="primary"
                              onClick={() => handleEditTiempo(index)}
                            >
                              <EditIcon />
                            </IconButton>
                          )}
                          <IconButton
                            color="error"
                            onClick={() => handleRemoveTiempo(index)}
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
              <Divider sx={{ marginY: 2 }} />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                label="Observación"
                name="observacion"
                value={formData.observacion}
                onChange={(e) => handleNameChange(e, "observacion")}
                fullWidth
                multiline
                rows={3}
                InputLabelProps={{
                  shrink: true,
                }}
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
              Actualizar IT
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

export default ItUForm;
