import React, { useState } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableSortLabel,
  Switch,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link } from "react-router-dom";

const ClienteTable = ({ clientes, onDelete, onToggleStatus, onEdit }) => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const stableSort = (array, comparator) => {
    const stabilizedArray = array.map((el, index) => [el, index]);
    stabilizedArray.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedArray.map((el) => el[0]);
  };

  const comparator = (a, b) => {
    if (a[orderBy] < b[orderBy]) {
      return order === "asc" ? -1 : 1;
    }
    if (a[orderBy] > b[orderBy]) {
      return order === "asc" ? 1 : -1;
    }
    return 0;
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          {[
            "Código",
            "Razón Social",
            "Nombre Fantasía",
            "RUT",
            "Giro",
            "Estado Vigente",
            "Acciones",
          ].map((header) => (
            <TableCell key={header}>
              <TableSortLabel
                active={orderBy === header}
                direction={orderBy === header ? order : "asc"}
                onClick={() => handleRequestSort(header)}
              >
                {header}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {stableSort(clientes, comparator).map((cliente) => (
          <TableRow key={cliente.ID_CLIENTE}>
            <TableCell>{cliente.CODIGO_CLIENTE}</TableCell>
            <TableCell>{cliente.NOMBRE_RAZON_SOCIAL}</TableCell>
            <TableCell>{cliente.NOMBRE_FANTASIA}</TableCell>
            <TableCell>{cliente.RUT}</TableCell>
            <TableCell>{cliente.GIRO}</TableCell>
            <TableCell>
              <Switch
                checked={cliente.CLIENTE_VIGENTE}
                onChange={() =>
                  onToggleStatus(cliente.ID_CLIENTE, !cliente.CLIENTE_VIGENTE)
                }
              />
            </TableCell>
            <TableCell>
              <Link to={`/${cliente.ID_CLIENTE}`}>
                <IconButton>
                  <VisibilityIcon />
                </IconButton>
              </Link>
              <IconButton onClick={() => onEdit(cliente)}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => onDelete(cliente.ID_CLIENTE)}>
                <DeleteIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ClienteTable;
