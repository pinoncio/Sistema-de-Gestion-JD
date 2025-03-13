import React, { useState } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  TableSortLabel,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";

const ItTable = ({ informes, onDelete }) => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("fecha_control_tiempo");
  const navigate = useNavigate();
  const handlePdfRedirect = (id_it) => {
    navigate(`/pdf-preview/${id_it}`);
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const stableSort = (array, comparator) => {
    if (!orderBy) return array;

    // Asegúrate de que control_tiempo esté definido y sea un array en cada informe
    const stabilizedArray = array.map((el, index) => {
      // Asegurándote de que control_tiempo siempre sea un array
      el.control_tiempo = Array.isArray(el.control_tiempo)
        ? el.control_tiempo
        : [];
      return [el, index];
    });

    stabilizedArray.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });

    return stabilizedArray.map((el) => el[0]);
  };

  // Compara las fechas de control_tiempo
  const comparator = (a, b) => {
    if (!orderBy) return 0;

    // Obtener la primera fecha de control_tiempo para comparar
    const controlA =
      a.control_tiempo.length > 0 ? a.control_tiempo[0].fecha : null;
    const controlB =
      b.control_tiempo.length > 0 ? b.control_tiempo[0].fecha : null;

    const dateA = moment(controlA);
    const dateB = moment(controlB);

    if (!dateA.isValid()) return 1; // Si no hay fecha válida en A, lo coloca al final
    if (!dateB.isValid()) return -1; // Si no hay fecha válida en B, lo coloca al final

    if (dateA.isBefore(dateB)) return order === "asc" ? -1 : 1;
    if (dateA.isAfter(dateB)) return order === "asc" ? 1 : -1;
    return 0;
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>N° OT</TableCell>
          <TableCell>Cliente</TableCell>
          <TableCell>
            <TableSortLabel
              active={orderBy === "fecha_control_tiempo"}
              direction={orderBy === "fecha_control_tiempo" ? order : "asc"}
              onClick={() => handleRequestSort("fecha_control_tiempo")}
            >
              Fecha Control Tiempo
            </TableSortLabel>
          </TableCell>
          <TableCell>Máquina</TableCell>
          <TableCell>Modelo</TableCell>
          <TableCell>Numero de Serie</TableCell>
          <TableCell>Queja/Síntoma</TableCell>
          <TableCell>Observación</TableCell>
          <TableCell>Insumo</TableCell>
          <TableCell>Solución</TableCell>
          <TableCell>Acciones</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {stableSort(informes, comparator).map((informe, index) => (
          <TableRow key={informe.id_it || index}>
            <TableCell>
              {informe.ot ? informe.ot.id_ot : "No disponible"}
            </TableCell>
            <TableCell>
              {informe.cliente
                ? informe.cliente.nombre_razon_social
                : "No disponible"}
            </TableCell>
            <TableCell>
              {informe.control_tiempo && informe.control_tiempo.length > 0 ? (
                informe.control_tiempo.map((control, idx) => (
                  <div key={idx}>{control.fecha}</div>
                ))
              ) : (
                <span>No hay control de tiempo</span>
              )}
            </TableCell>
            <TableCell>{informe.maquina}</TableCell>
            <TableCell>{informe.modelo}</TableCell>
            <TableCell>{informe.numero_serie}</TableCell>
            <TableCell>{informe.queja_sintoma}</TableCell>
            <TableCell>{informe.observacion}</TableCell>
            <TableCell>{informe.insumo}</TableCell>
            <TableCell>{informe.solucion}</TableCell>

            <TableCell>
              <Link to={`/itProfile/${informe.id_it}`}>
                <IconButton>
                  <VisibilityIcon />
                </IconButton>
              </Link>
              <Link to={`/update-it/${informe.id_it}`}>
                <IconButton color="warning" sx={{ ml: 1 }}>
                  <EditIcon />
                </IconButton>
              </Link>
              <IconButton
                color="error"
                sx={{ ml: 1 }}
                onClick={() => onDelete(informe.id_it)}
              >
                <DeleteIcon />
              </IconButton>
              <IconButton color="primary" sx={{ ml: 1 }}
                onClick={() => handlePdfRedirect(informe.id_it)}>
                <PictureAsPdfIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ItTable;
