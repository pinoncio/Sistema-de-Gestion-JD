import React, { useState } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableSortLabel,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link } from "react-router-dom";

const GastoTable = ({ gastos, onDelete, onEdit, getClienteName }) => {
  const [order, setOrder] = useState("desc"); // Orden descendente por defecto
  const [orderBy, setOrderBy] = useState("id_gasto"); // Ordenar por id_gasto por defecto
  const [filterByDate, setFilterByDate] = useState("none"); // Filtro de fecha

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleDateSort = () => {
    if (filterByDate === "none") {
      setFilterByDate("asc"); // Ascendente por fecha
      setOrderBy("fecha_compra");
    } else if (filterByDate === "asc") {
      setFilterByDate("desc"); // Descendente por fecha
    } else {
      setFilterByDate("none"); // Sin filtro
      setOrderBy("id_gasto"); // Volver a ordenar por id_gasto por defecto
    }
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

    // Si estamos ordenando por id_gasto, ordenar por número
    if (orderBy === "id_gasto") {
      if (a[orderBy] < b[orderBy]) return order === "asc" ? -1 : 1;
      if (a[orderBy] > b[orderBy]) return order === "asc" ? 1 : -1;
      return 0;
    }

    // Si estamos ordenando por fecha_compra
    if (orderBy === "fecha_compra") {
      const dateA = new Date(a[orderBy]);
      const dateB = new Date(b[orderBy]);
      if (dateA < dateB) return filterByDate === "asc" ? -1 : 1;
      if (dateA > dateB) return filterByDate === "asc" ? 1 : -1;
      return 0;
    }

    // Para otros campos (orden normal)
    if (a[orderBy] < b[orderBy]) return order === "asc" ? -1 : 1;
    if (a[orderBy] > b[orderBy]) return order === "asc" ? 1 : -1;
    return 0;
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>
            <TableSortLabel
              active={orderBy === "item_gasto"}
              direction={orderBy === "item_gasto" ? order : "asc"}
              onClick={() => handleRequestSort("item_gasto")}
            >
              Ítem de Gasto
            </TableSortLabel>
          </TableCell>
          <TableCell>ID Gasto</TableCell>
          <TableCell>OT</TableCell>
          <TableCell>Detalle</TableCell>
          <TableCell>
            <TableSortLabel
              active={orderBy === "fecha_compra"}
              direction={filterByDate === "asc" ? "asc" : "desc"}
              onClick={handleDateSort}
            >
              Fecha de Compra
            </TableSortLabel>
          </TableCell>
          <TableCell>Método de Pago</TableCell>
          <TableCell>Pago Neto</TableCell>
          <TableCell>IVA</TableCell>
          <TableCell>Total Pagado</TableCell>
          <TableCell>N° Factura</TableCell>
          <TableCell>Proveedor</TableCell>
          <TableCell>Cliente</TableCell>
          <TableCell>Acciones</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {stableSort(gastos, comparator).map((gasto) => {
          const ot = gasto.ots && gasto.ots[0];

          return (
            <TableRow key={gasto.id_gasto}>
              <TableCell>N°{gasto.id_gasto}</TableCell>
              <TableCell>{gasto.item_gasto}</TableCell>
              <TableCell>
                {ot ? `N°${ot.id_ot}` : gasto.sin_ot || "No disponible"}
              </TableCell>
              <TableCell>{gasto.detalle}</TableCell>
              <TableCell>{gasto.fecha_compra}</TableCell>
              <TableCell>{gasto.metodo_pago}</TableCell>
              <TableCell>
                {new Intl.NumberFormat("es-CL", {
                  style: "currency",
                  currency: "CLP",
                }).format(gasto.pago_neto)}
              </TableCell>
              <TableCell>
                {new Intl.NumberFormat("es-CL", {
                  style: "currency",
                  currency: "CLP",
                }).format(gasto.iva)}
              </TableCell>
              <TableCell>
                {new Intl.NumberFormat("es-CL", {
                  style: "currency",
                  currency: "CLP",
                }).format(gasto.total_pagado)}
              </TableCell>
              <TableCell>{gasto.nro_factura}</TableCell>
              <TableCell>{gasto.proveedor}</TableCell>
              <TableCell>{getClienteName(gasto.id_cliente)}</TableCell>
              <TableCell>
                <Link to={`/gastoProfile/${gasto.id_gasto}`}>
                  <IconButton>
                    <VisibilityIcon />
                  </IconButton>
                </Link>
                <IconButton
                  color="warning"
                  sx={{ ml: 1 }}
                  onClick={() => onEdit(gasto)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  color="error"
                  sx={{ ml: 1 }}
                  onClick={() => onDelete(gasto.id_gasto)}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default GastoTable;
