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
import { Link } from "react-router-dom";
import moment from "moment";
import { generatePdf } from "../Services/GenerateOt";

const OtTable = ({ ordenes, onDelete, getClienteName }) => {
  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("fecha_solicitud");

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const stableSort = (array, comparator) => {
    if (!orderBy) return array;
    const stabilizedArray = array.map((el, index) => [el, index]);
    stabilizedArray.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedArray.map((el) => el[0]);
  };

  const comparator = (a, b) => {
    if (!orderBy) return 0;
    const dateA = moment(a[orderBy]);
    const dateB = moment(b[orderBy]);
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
          <TableCell>Tipo documento</TableCell>
          <TableCell>
            <TableSortLabel
              active={orderBy === "fecha_solicitud"}
              direction={orderBy === "fecha_solicitud" ? order : "asc"}
              onClick={() => handleRequestSort("fecha_solicitud")}
            >
              Fecha solicitud
            </TableSortLabel>
          </TableCell>
          <TableCell>
            <TableSortLabel
              active={orderBy === "fecha_entrega"}
              direction={orderBy === "fecha_entrega" ? order : "asc"}
              onClick={() => handleRequestSort("fecha_entrega")}
            >
              Fecha entrega
            </TableSortLabel>
          </TableCell>
          <TableCell>Tipo OT</TableCell>
          <TableCell>N° de serie</TableCell>
          <TableCell>Observacion final</TableCell>
          <TableCell>Total</TableCell>
          <TableCell>Acciones</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {stableSort(ordenes, comparator).map((orden, index) => (
          <TableRow key={orden.id_ot || index}>
            <TableCell>N°{orden.id_ot}</TableCell>
            <TableCell>{getClienteName(orden.id_cliente)}</TableCell>
            <TableCell>{orden.tipo_documento}</TableCell>
            <TableCell>
              {moment(orden.fecha_solicitud).format("DD/MM/YYYY")}
            </TableCell>
            <TableCell>
              {moment(orden.fecha_entrega).format("DD/MM/YYYY")}
            </TableCell>
            <TableCell>{orden.tipo_ot}</TableCell>
            <TableCell>{orden.numero_serie}</TableCell>
            <TableCell>{orden.observacion_final}</TableCell>
            <TableCell>
              {new Intl.NumberFormat("es-CL", {
                style: "currency",
                currency: "CLP",
              }).format(orden.total)}
            </TableCell>
            <TableCell>
              <Link to={`/otProfile/${orden.id_ot}`}>
                <IconButton>
                  <VisibilityIcon />
                </IconButton>
              </Link>
              <Link to={`/update-ot/${orden.id_ot}`}>
                <IconButton color="warning" sx={{ ml: 1 }}>
                  <EditIcon />
                </IconButton>
              </Link>
              <IconButton
                color="error"
                sx={{ ml: 1 }}
                onClick={() => onDelete(orden.id_ot)}
              >
                <DeleteIcon />
              </IconButton>
              <IconButton
                color="primary"
                sx={{ ml: 1 }}
                onClick={() => generatePdf(orden.id_ot)}
              >
                <PictureAsPdfIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default OtTable;
