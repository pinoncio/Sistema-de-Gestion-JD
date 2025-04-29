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
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link } from "react-router-dom";

const ClienteTable = ({ clientes, onDelete, onToggleStatus, onEdit }) => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");

  // Obtener rol desde localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const userRol = user ? user.rol : null;

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
    <Box sx={{ overflowX: "auto" }}>
      {" "}
      {/* Contenedor para habilitar desplazamiento horizontal */}
      <Table>
        <TableHead>
          <TableRow>
            {[
              "código",
              "razón social",
              "nombre fantasía",
              "rut",
              "giro",
              "estado vigente",
              "acciones",
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
            <TableRow key={cliente.id_cliente}>
              <TableCell>{cliente.codigo_cliente}</TableCell>
              <TableCell>{cliente.nombre_razon_social}</TableCell>
              <TableCell>{cliente.nombre_fantasia}</TableCell>
              <TableCell>{cliente.rut}</TableCell>
              <TableCell>{cliente.giro}</TableCell>
              <TableCell>
                <Switch
                  checked={cliente.cliente_vigente}
                  onChange={() =>
                    onToggleStatus(cliente.id_cliente, !cliente.cliente_vigente)
                  }
                  disabled={userRol === 3}
                />
              </TableCell>
              <TableCell>
                <Link to={`/clienteProfile/${cliente.id_cliente}`}>
                  <IconButton>
                    <VisibilityIcon />
                  </IconButton>
                </Link>
                {userRol !== 3 && userRol !== 5 && (
                  <IconButton color="warning" onClick={() => onEdit(cliente)}>
                    <EditIcon />
                  </IconButton>
                )}

                {userRol === 2 && ( 
                  <IconButton
                    color="error"
                    onClick={() => onDelete(cliente.id_cliente)}
                  >
                    <DeleteIcon />
                  </IconButton>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default ClienteTable;
