import React, { useState, useEffect, useCallback } from "react";
import { getGastosMensuales } from "../Services/gastoService";
import { getClientes } from "../Services/clienteService";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Snackbar,
  Alert,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Grid,
  Typography,
  Button,
} from "@mui/material";
import { Bar, Pie } from "react-chartjs-2";
import UserLayout from "../Components/Layout/UserLayout";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const GastoMensual = () => {
  const [gastosMensuales, setGastosMensuales] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedClient, setSelectedClient] = useState("");
  const [gastoTotal, setGastoTotal] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const navigate = useNavigate();

  const handleVolver = () => {
    navigate("/gastos");
  };

  const fetchClientes = async () => {
    try {
      const response = await getClientes(); // Asegúrate de tener un servicio que traiga los clientes
      setClientes(response);
    } catch (error) {
      console.error("Error al obtener los clientes", error);
      setSnackbarMessage("Error al obtener los clientes.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const fetchGastosMensuales = useCallback(async () => {
    try {
      const data = await getGastosMensuales(
        selectedYear,
        selectedMonth === "" ? "todos" : selectedMonth,
        selectedClient // Pasar el cliente seleccionado para filtrar
      );
      setGastosMensuales(data);

      const total = data.reduce((acc, gasto) => acc + gasto.total_pagado, 0);
      setGastoTotal(total);
    } catch (error) {
      console.error("Error al obtener los gastos mensuales", error);
      setSnackbarMessage("Error al obtener los gastos.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  }, [selectedYear, selectedMonth, selectedClient]);

  useEffect(() => {
    fetchClientes();
    if (selectedYear) {
      fetchGastosMensuales();
    }
  }, [selectedYear, selectedMonth, selectedClient, fetchGastosMensuales]);

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleClientChange = (event) => {
    setSelectedClient(event.target.value);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          autoSkip: true,
          maxRotation: 45,
          minRotation: 45,
          font: {
            size: 10, // Reducir el tamaño de las etiquetas del eje X
          },
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            size: 12, // Aumentar el tamaño de las etiquetas del eje Y para mayor legibilidad
          },
        },
      },
    },
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  const gastosOrdenados = [...gastosMensuales].sort((a, b) => {
    return new Date(a.fecha_compra) - new Date(b.fecha_compra);
  });

  const meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  // Paleta de colores para los meses
  const coloresMeses = [
    "rgba(255, 99, 132, 0.2)", // Enero
    "rgba(54, 162, 235, 0.2)", // Febrero
    "rgba(255, 206, 86, 0.2)", // Marzo
    "rgba(75, 192, 192, 0.2)", // Abril
    "rgba(153, 102, 255, 0.2)", // Mayo
    "rgba(255, 159, 64, 0.2)", // Junio
    "rgba(75, 192, 192, 0.2)", // Julio
    "rgba(255, 99, 132, 0.2)", // Agosto
    "rgba(54, 162, 235, 0.2)", // Septiembre
    "rgba(255, 206, 86, 0.2)", // Octubre
    "rgba(75, 192, 192, 0.2)", // Noviembre
    "rgba(153, 102, 255, 0.2)", // Diciembre
  ];

  const barChartData = {
    labels: gastosOrdenados.map((gasto) => {
      const fecha = new Date(gasto.fecha_compra);
      const mes = meses[fecha.getMonth()];
      return selectedMonth === ""
        ? `${gasto.item_gasto} - ${mes}`
        : gasto.item_gasto;
    }),
    datasets: [
      {
        label: "Gasto Total",
        data: gastosOrdenados.map((gasto) => gasto.total_pagado),
        backgroundColor: gastosOrdenados.map((gasto) => {
          const mesIndex = new Date(gasto.fecha_compra).getMonth(); // Obtener el mes
          return coloresMeses[mesIndex]; // Asignar el color correspondiente
        }),
        borderColor: gastosOrdenados.map((gasto) => {
          const mesIndex = new Date(gasto.fecha_compra).getMonth();
          return coloresMeses[mesIndex].replace("0.2", "1"); // Usar el mismo color pero con opacidad completa
        }),
        borderWidth: 1,
      },
    ],
  };

  const gastosPorItem = gastosMensuales.reduce((acc, gasto) => {
    const { item_gasto, total_pagado } = gasto;
    if (!acc[item_gasto]) {
      acc[item_gasto] = 0;
    }
    acc[item_gasto] += total_pagado;
    return acc;
  }, {});

  const labels = Object.keys(gastosPorItem);
  const data = Object.values(gastosPorItem);

  // Datos del gráfico
  const pieChartData = {
    labels,
    datasets: [
      {
        label: "Distribución de Gastos",
        data,
        backgroundColor: [
          "#4caf50",
          "#2196f3",
          "#ff9800",
          "#f44336",
          "#9c27b0",
          "#ffeb3b",
          "#00bcd4",
          "#8bc34a",
          "#3f51b5",
          "#e91e63",
          "#795548",
          "#607d8b",
          "#ff5722",
          "#cddc39",
          "#009688",
        ],
        borderColor: "#ffffff",
        borderWidth: 2,
      },
    ],
  };

  // Opciones del gráfico
  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          boxWidth: 20,
          padding: 15,
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || "";
            const value = context.raw || 0;
            const gasto = gastosMensuales[context.dataIndex];
            const mes = new Date(gasto.fecha_compra).toLocaleString("es-CL", {
              month: "long",
            });
            const total = context.dataset.data.reduce(
              (acc, val) => acc + val,
              0
            );
            const percentage = ((value / total) * 100).toFixed(1);

            return `${label} – ${mes}: $${value.toLocaleString()} (${percentage}%)`;
          },
        },
      },
    },
    animation: {
      duration: 1000,
      easing: "easeOutBounce",
    },
    hoverOffset: 20,
  };

  const handleExportExcel = async () => {
    if (!gastosMensuales.length) return;

    const workbook = new ExcelJS.Workbook();

    // Nombres de los meses
    const months = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];

    let fileName = ""; // Declarar fileName fuera del bloque condicional

    if (selectedMonth === "") {
      // Si "Todos los Meses" está seleccionado, crear una hoja por cada mes
      for (let i = 0; i < 12; i++) {
        const worksheet = workbook.addWorksheet(`${months[i]}`);
        const columns = [
          { header: "Item Gasto", key: "item_gasto" },
          { header: "Detalle", key: "detalle" },
          { header: "OT", key: "ot" },
          { header: "Fecha Compra", key: "fecha_compra" },
          { header: "Metodo Pago", key: "metodo_pago" },
          { header: "Pago neto", key: "pago_neto" },
          { header: "Iva", key: "iva" },
          { header: "Total pagado", key: "total_pagado" },
          { header: "N° Factura", key: "nro_factura" },
          { header: "Proveedor", key: "proveedor" },
          { header: "Cliente", key: "cliente" },
          { header: "Observación", key: "observacion" },
        ];

        worksheet.columns = columns.map((col) => ({
          header: col.header,
          key: col.key,
          width: 20,
        }));

        // Aplicar estilo a las celdas de los encabezados
        worksheet.getRow(1).eachCell((cell, colNumber) => {
          cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "FF003366" }, // Color verde oscuro azulado
          };
          cell.font = { color: { argb: "FFFFFFFF" }, bold: true }; // Texto blanco en negrita
          cell.alignment = { horizontal: "center", vertical: "middle" }; // Centrar el texto
        });

        const filteredData = gastosMensuales.filter(
          (gasto) => new Date(gasto.fecha_compra).getMonth() === i
        );
        filteredData.forEach((gasto) => {
          const idOt =
            gasto.ots && gasto.ots.length > 0 ? gasto.ots[0].id_ot : null;
          const otValue = idOt ? `N° ${idOt}` : gasto.sin_ot || "-";

          worksheet.addRow({
            item_gasto: gasto.item_gasto || "-",
            detalle: gasto.detalle || "-",
            ot: otValue,
            fecha_compra: gasto.fecha_compra || "-",
            metodo_pago: gasto.metodo_pago || "-",
            pago_neto: gasto.pago_neto
              ? `$${gasto.pago_neto.toLocaleString("es-CL")}`
              : "$-",
            iva: gasto.iva ? `$${gasto.iva.toLocaleString("es-CL")}` : "$-",
            total_pagado: gasto.total_pagado
              ? `$${gasto.total_pagado.toLocaleString("es-CL")}`
              : "$-",
            nro_factura: gasto.nro_factura || "-",
            proveedor: gasto.proveedor || "-",
            cliente:
              typeof gasto.cliente === "object"
                ? gasto.cliente?.nombre_razon_social || "-"
                : gasto.cliente || "-",
            observacion: gasto.observacion || "-",
          });
        });
      }

      fileName = `Gastos_Todos-${selectedYear}.xlsx`;
    } else {
      const worksheet = workbook.addWorksheet(`${months[selectedMonth - 1]}`);
      const columns = [
        { header: "Item Gasto", key: "item_gasto" },
        { header: "Detalle", key: "detalle" },
        { header: "OT", key: "ot" },
        { header: "Fecha Compra", key: "fecha_compra" },
        { header: "Metodo Pago", key: "metodo_pago" },
        { header: "Pago neto", key: "pago_neto" },
        { header: "Iva", key: "iva" },
        { header: "Total pagado", key: "total_pagado" },
        { header: "N° Factura", key: "nro_factura" },
        { header: "Proveedor", key: "proveedor" },
        { header: "Cliente", key: "cliente" },
        { header: "Observación", key: "observacion" },
      ];

      worksheet.columns = columns.map((col) => ({
        header: col.header,
        key: col.key,
        width: 20,
      }));

      // Aplicar estilo a las celdas de los encabezados
      worksheet.getRow(1).eachCell((cell, colNumber) => {
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FF003366" }, // Color verde oscuro azulado
        };
        cell.font = { color: { argb: "FFFFFFFF" }, bold: true }; // Texto blanco en negrita
        cell.alignment = { horizontal: "center", vertical: "middle" }; // Centrar el texto
      });

      gastosMensuales.forEach((gasto) => {
        const idOt =
          gasto.ots && gasto.ots.length > 0 ? gasto.ots[0].id_ot : null;
        const otValue = idOt ? `N° ${idOt}` : gasto.sin_ot || "-";

        worksheet.addRow({
          item_gasto: gasto.item_gasto || "-",
          detalle: gasto.detalle || "-",
          ot: otValue,
          fecha_compra: gasto.fecha_compra || "-",
          metodo_pago: gasto.metodo_pago || "-",
          pago_neto: gasto.pago_neto
            ? `$${gasto.pago_neto.toLocaleString("es-CL")}`
            : "$-",
          iva: gasto.iva ? `$${gasto.iva.toLocaleString("es-CL")}` : "$-",
          total_pagado: gasto.total_pagado
            ? `$${gasto.total_pagado.toLocaleString("es-CL")}`
            : "$-",
          nro_factura: gasto.nro_factura || "-",
          proveedor: gasto.proveedor || "-",
          cliente:
            typeof gasto.cliente === "object"
              ? gasto.cliente?.nombre_razon_social || "-"
              : gasto.cliente || "-",
          observacion: gasto.observacion || "-",
        });
      });

      fileName = `Gastos_${months[selectedMonth - 1]}-${selectedYear}.xlsx`;
    }

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, fileName); // Usamos el nombre de archivo dinámico
  };

  return (
    <UserLayout>
      <Typography variant="h4" gutterBottom>
        Gastos Mensuales
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleVolver}
        style={{ marginBottom: 16 }}
      >
        Volver
      </Button>
      <Grid container spacing={3} style={{ marginBottom: "16px" }}>
        <Grid item xs={12} sm={6} md={2}>
          <FormControl fullWidth>
            <InputLabel>
              {selectedMonth === "" ? "Todos los Meses" : "Mes"}
            </InputLabel>
            <Select
              value={selectedMonth}
              onChange={handleMonthChange}
              label={selectedMonth === "" ? "Todos los Meses" : "Mes"}
            >
              <MenuItem value="">Todos los Meses</MenuItem>
              {[
                "Enero",
                "Febrero",
                "Marzo",
                "Abril",
                "Mayo",
                "Junio",
                "Julio",
                "Agosto",
                "Septiembre",
                "Octubre",
                "Noviembre",
                "Diciembre",
              ].map((month, index) => (
                <MenuItem key={month} value={index + 1}>
                  {month}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <FormControl fullWidth>
            <InputLabel>Año</InputLabel>
            <Select
              value={selectedYear}
              onChange={handleYearChange}
              label="Año"
            >
              {[2023, 2024, 2025].map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <FormControl fullWidth>
            <InputLabel>Seleccionar Cliente</InputLabel>
            <Select
              value={selectedClient}
              onChange={handleClientChange}
              label="Seleccionar Cliente"
            >
              <MenuItem value="">Seleccionar Cliente</MenuItem>
              {clientes.map((cliente) => (
                <MenuItem key={cliente.id_cliente} value={cliente.id_cliente}>
                  {cliente.nombre_razon_social}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid
          item
          xs={12}
          sm={6}
          md={3}
          style={{ display: "flex", alignItems: "center" }}
        >
          <Button
            variant="contained"
            onClick={handleExportExcel}
            disabled={!selectedYear || !gastosMensuales.length}
            sx={{
              backgroundColor: "#4caf50",
              color: "#fff",
              "&:hover": { backgroundColor: "#388e3c" },
              width: "100%",
            }}
          >
            Generar Excel
          </Button>
        </Grid>
      </Grid>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom align="center">
            Gasto Total: ${gastoTotal.toLocaleString("es-CL")}
          </Typography>

          <div style={{ width: "100%", height: "600px" }}>
            <Bar options={barChartOptions} data={barChartData} />
          </div>
        </CardContent>
      </Card>
      <Card style={{ marginTop: "16px", width: "100%", height: "620px" }}>
        <CardContent>
          <Typography variant="h5" gutterBottom align="center">
            Comparación de Gasto por Producto
          </Typography>
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Pie
              data={pieChartData}
              options={pieChartOptions}
              style={{ height: "60%", width: "60%" }}
            />
          </div>
        </CardContent>
      </Card>
      ;
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </UserLayout>
  );
};

export default GastoMensual;
