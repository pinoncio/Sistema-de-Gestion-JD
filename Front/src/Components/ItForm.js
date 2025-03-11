import { useEffect, useState } from "react";
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
} from "@mui/material";
import { createOt } from "../Services/otService";
import { getClientes } from "../Services/clienteService";
import { getOts } from "../Services/otService";
import { getAllTiempos } from "../Services/tiempoService";
import DeleteIcon from "@mui/icons-material/Delete";
import UserLayout from "./Layout/UserLayout";
import { useNavigate } from "react-router-dom";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const ItForm = () => {
  const [clientes, setClientes] = useState([]);
  const [control_tiempo, setTiempos] = useState([]);
  const [ot, setOt] = useState([]);
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [formData, setFormData] = useState({
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

  const [currentTiempo, setCurrentTiempo] = useState({
    dia: "",
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
      informacionesdepago: {
        correo_electronico: "",
        telefono_responsable: "",
      },
    },
  });

  useEffect(() => {
    fetchClientes();
    fetchTiempos();
    fetchOt();
  }, []);

  const fetchClientes = async () => {
    try {
      setClientes(await getClientes());
    } catch (error) {
      console.error("Error al obtener los clientes:", error);
    }
  };

  const fetchOt = async () => {
    try {
      setOt(await getOts());
    } catch (error) {
      console.error("Error al obtener las Ot:", error);
    }
  };

  const fetchTiempos = async () => {
    try {
      setTiempos(await getAllTiempos());
    } catch (error) {
      console.error("Error al obtener los tiempos:", error);
    }
  };

  const [errors, setErrors] = useState({});
  const validateName = (value) => /^[A-Za-zÁáÉéÍíÓóÚúÑñ\s]+$/.test(value);
  const validateNumber = (value) => /^[0-9]+(\.[0-9]{1,2})?$/.test(value);

  const handleChange = (e, field) => {
    const { value } = e.target;

    // Validación numérica para campos que lo requieran
    if (!validateNumber(value) && value !== "") {
      setErrors({
        ...errors,
        [field]: "Solo se permiten números y puntos, con hasta dos decimales.",
      });
      return;
    }

    if (field === "id_cliente") {
      const selectedCliente = clientes.find((c) => c.id_cliente === value);

      if (selectedCliente) {
        // Aquí es donde accedes a informacionesdepago correctamente
        setCurrentCliente({
          cliente: {
            nombre_razon_social: selectedCliente.nombre_razon_social || "",
            rut: selectedCliente.rut || "",
            direccion: selectedCliente.direccion || "",
            informacionesdepago: {
              correo_electronico:
                selectedCliente.informacionesdepago?.correo_electronico || "", 
              telefono_responsable:
                selectedCliente.informacionesdepago?.telefono_responsable || "", 
            },
          },
        });
      }
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

  const handleCreateIt = async (data) => {
    try {
      await createOt(data);
      setSnackbarMessage("IT creada correctamente.");
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
        cliente: [],
      });

      setCurrentTiempo({
        dia: "",
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
          informacionesdepago: {
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

  const handleCurrentTiempoChange = (e, field, index) => {
    const { value } = e.target;

    setCurrentTiempo((prev) => {
      const updatedControlTiempo = [...prev];
      updatedControlTiempo[index] = {
        ...updatedControlTiempo[index],
        [field]: value,
      };

      return updatedControlTiempo;
    });
  };

  const handleAddTiempo = () => {
    if (
      !currentTiempo.dia ||
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
      dia: "",
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
      control_tiempo: prevData.control_tiempo.filter((_, i) => i !== index), // Elimina el control de tiempo
    }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verifica que haya al menos un cliente y un control de tiempo
    if (formData.clientes.length === 0) {
      setSnackbarMessage("Debe agregar al menos un cliente.");
      setOpenSnackbar(true);
      return;
    }

    if (formData.control_tiempo.length === 0) {
      setSnackbarMessage("Debe agregar al menos un control de tiempo.");
      setOpenSnackbar(true);
      return;
    }

    // Los datos a enviar se toman tal cual están en el estado del formulario
    const dataToSubmit = {
      ...formData,
      // Agrega el cliente actual solo si tiene datos
      clientes: currentCliente.nombre_razon_social
        ? [...formData.clientes, currentCliente]
        : formData.clientes,
      // Agrega el control de tiempo actual solo si tiene datos
      control_tiempo: currentTiempo.dia
        ? [...formData.control_tiempo, currentTiempo]
        : formData.control_tiempo,
    };

    // Validación de campos obligatorios
    const missingFields = Object.values(dataToSubmit).some(
      (val) => !val && val !== 0
    );
    if (missingFields) {
      setErrors({
        ...errors,
        generales: "Todos los campos obligatorios deben ser llenados.",
      });
      return;
    }

    try {
      // Llamada al servicio para crear la IT (Informe de Trabajo)
      await handleCreateIt(dataToSubmit);
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
      setSnackbarMessage("IT creada correctamente.");
      setOpenSnackbar(true);
      setTimeout(() => {
        navigate("/its");
      }, 2000);
    } catch (error) {
      console.error("Error al crear/actualizar la IT:", error);
      setErrors({
        ...errors,
        generales:
          error.response?.data?.message ||
          "Ha ocurrido un error al crear la IT. Intente nuevamente.",
      });
      setSnackbarMessage("Error al crear la IT.");
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
          <Grid container spacing={2.5}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Tecnico"
                name="tecnico"
                value={formData.tecnico}
                onChange={(e) => handleChange(e, "tecnico")}
                fullWidth
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
                label="Nombre / Razón Social"
                type="text"
                value={currentCliente.cliente.nombre_razon_social}
                fullWidth
                disabled
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="RUT"
                type="text"
                value={currentCliente.cliente.rut}
                fullWidth
                disabled
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Dirección"
                type="text"
                value={currentCliente.cliente.direccion}
                fullWidth
                disabled
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Correo Electrónico"
                type="text"
                value={
                  currentCliente.cliente.informacionesdepago.correo_electronico
                }
                fullWidth
                disabled
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Teléfono Responsable"
                type="text"
                value={
                  currentCliente.cliente.informacionesdepago
                    .telefono_responsable
                }
                fullWidth
                disabled
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Orden de Trabajo (id_ot)"
                select
                value={formData.id_ot}
                onChange={(e) => handleChange(e, "id_ot")}
                name="id_ot"
                fullWidth
                required
                error={!!errors.id_ot}
                helperText={errors.id_ot || "Campo obligatorio."}
                InputLabelProps={{
                  shrink: true,
                }}
              >
                <MenuItem value="">Seleccionar</MenuItem>
                {ot.map((ot) => (
                  <MenuItem key={ot.id_ot} value={ot.id_ot}>
                    N°{ot.id_ot}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Maquina"
                name="maquina"
                value={formData.maquina}
                onChange={(e) => handleNameChange(e, "maquina")}
                fullWidth
                required
                error={!!errors.maquina}
                helperText={
                  errors.maquina ||
                  (!formData.maquina ? "Campo obligatorio" : "")
                }
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
                onChange={(e) => handleNameChange(e, "modelo")}
                fullWidth
                required
                helperText={
                  errors.modelo || (!formData.modelo ? "Campó obligatorio" : "")
                }
                error={!!errors.modelo}
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
                required
                helperText={
                  errors.horometro ||
                  (!formData.horometro ? "Campó obligatorio" : "")
                }
                error={!!errors.horometro}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Numero_serie"
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
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="numero_motor"
                name="numero_motor"
                value={formData.numero_motor}
                onChange={(e) => handleNameChange(e, "numero_motor")}
                fullWidth
                required
                error={!!errors.numero_motor}
                helperText={errors.numero_motor}
                InputLabelProps={{
                  shrink: true,
                }}
              ></TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="km_salida"
                name="km_salida"
                value={formData.km_salida}
                onChange={(e) => handleChange(e, "km_salida")}
                fullWidth
                required
                helperText={
                  errors.km_salida ||
                  (!formData.km_salida ? "Campó obligatorio" : "")
                }
                error={!!errors.km_salida}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="km_retorno"
                name="km_retorno"
                value={formData.km_retorno}
                onChange={(e) => handleChange(e, "km_retorno")}
                fullWidth
                required
                helperText={
                  errors.km_retorno ||
                  (!formData.km_retorno ? "Campó obligatorio" : "")
                }
                error={!!errors.km_retorno}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="queja_sintoma"
                name="queja_sintoma"
                value={formData.queja_sintoma}
                onChange={(e) => handleNameChange(e, "queja_sintoma")}
                fullWidth
                required
                helperText={
                  errors.queja_sintoma ||
                  (!formData.queja_sintoma ? "Campó obligatorio" : "")
                }
                error={!!errors.queja_sintoma}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="diagnostico"
                name="diagnostico"
                value={formData.diagnostico}
                onChange={(e) => handleNameChange(e, "diagnostico")}
                fullWidth
                required
                helperText={
                  errors.diagnostico ||
                  (!formData.diagnostico ? "Campó obligatorio" : "")
                }
                error={!!errors.diagnostico}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="pieza_falla"
                name="pieza_falla"
                value={formData.pieza_falla}
                onChange={(e) => handleNameChange(e, "pieza_falla")}
                fullWidth
                required
                helperText={
                  errors.pieza_falla ||
                  (!formData.pieza_falla ? "Campó obligatorio" : "")
                }
                error={!!errors.pieza_falla}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="solucion"
                name="solucion"
                value={formData.solucion}
                onChange={(e) => handleNameChange(e, "solucion")}
                fullWidth
                required
                helperText={
                  errors.solucion ||
                  (!formData.solucion ? "Campó obligatorio" : "")
                }
                error={!!errors.solucion}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="total_hh"
                name="total_hh"
                value={formData.total_hh}
                onChange={(e) => handleNameChange(e, "total_hh")}
                fullWidth
                required
                helperText={
                  errors.total_hh ||
                  (!formData.total_hh ? "Campó obligatorio" : "")
                }
                error={!!errors.total_hh}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="total_km"
                name="total_km"
                value={formData.total_km}
                onChange={(e) => handleNameChange(e, "total_km")}
                fullWidth
                required
                helperText={
                  errors.total_km ||
                  (!formData.total_km ? "Campó obligatorio" : "")
                }
                error={!!errors.total_km}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="insumo"
                name="insumo"
                value={formData.insumo}
                onChange={(e) => handleNameChange(e, "insumo")}
                fullWidth
                required
                helperText={
                  errors.insumo || (!formData.insumo ? "Campó obligatorio" : "")
                }
                error={!!errors.insumo}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={2.4}>
              <TextField
                label="dia"
                fullWidth
                value={currentTiempo.dia}
                onChange={(e) => handleCurrentTiempoChange(e, "dia")}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={2.4}>
              <TextField
                label="fecha"
                fullWidth
                value={currentTiempo.fecha}
                onChange={(e) => handleCurrentTiempoChange(e, "fecha")}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={2.4}>
              <TextField
                label="viaje_ida"
                fullWidth
                value={currentTiempo.viaje_ida}
                onChange={(e) => handleCurrentTiempoChange(e, "viaje_ida")}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={2.4}>
              <TextField
                label="trabajo"
                fullWidth
                value={currentTiempo.trabajo}
                onChange={(e) => handleCurrentTiempoChange(e, "trabajo")}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={2.4}>
              <TextField
                label="viaje_vuelta"
                fullWidth
                value={currentTiempo.viaje_vuelta}
                onChange={(e) => handleCurrentTiempoChange(e, "viaje_vuelta")}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={2.4}>
              <TextField
                label="total_hh_viaje"
                fullWidth
                value={currentTiempo.total_hh_viaje}
                onChange={(e) => handleCurrentTiempoChange(e, "total_hh_viaje")}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={2.4}>
              <TextField
                label="total_hh_trabajo"
                fullWidth
                value={currentTiempo.total_hh_trabajo}
                onChange={(e) =>
                  handleCurrentTiempoChange(e, "total_hh_trabajo")
                }
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddTiempo}
              >
                Agregar Control de Tiempo
              </Button>
            </Grid>
            <Grid item xs={12}>
              <TableContainer component={Paper} sx={{ marginTop: 2 }}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Dia</TableCell>
                      <TableCell>fecha</TableCell>
                      <TableCell>viaje_ida</TableCell>
                      <TableCell>trabajo</TableCell>
                      <TableCell>viaje_vuelta</TableCell>
                      <TableCell>total_hh_viaje</TableCell>
                      <TableCell>total_hh_trabajo</TableCell>
                      <TableCell>Acciones</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {formData.control_tiempo.map((tiempo, index) => (
                      <TableRow key={index}>
                        <TableCell>{tiempo.dia}</TableCell>
                        <TableCell>{tiempo.fecha}</TableCell>
                        <TableCell>${tiempo.viaje_ida}</TableCell>
                        <TableCell>{tiempo.trabajo}%</TableCell>
                        <TableCell>${tiempo.viaje_vuelta}</TableCell>
                        <TableCell>{tiempo.total_hh_viaje}</TableCell>
                        <TableCell>${tiempo.total_hh_trabajo}</TableCell>
                        <TableCell>
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
              Crear IT
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

export default ItForm;
