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

const MaquinaTable = ({ maquinas, onDelete, onEdit, getClienteName }) => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const userRole = user ? user.rol : null;

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
              active={orderBy === "nombre_maquina"}
              direction={orderBy === "nombre_maquina" ? order : "asc"}
              onClick={() => handleRequestSort("nombre_maquina")}
            >
              Nombre Maquina
            </TableSortLabel>
          </TableCell>
          <TableCell>Modelo Maquina</TableCell>
          <TableCell>N° Serie</TableCell>
          <TableCell>N° Motor</TableCell>
          <TableCell>Cliente Asignado</TableCell>
          <TableCell>Acciones</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {stableSort(maquinas, comparator).map((maquina) => (
          <TableRow key={maquina.id_maquina}>
            <TableCell>{maquina.nombre_maquina}</TableCell>
            <TableCell>{maquina.modelo_maquina}</TableCell>
            <TableCell>{maquina.numero_serie}</TableCell>
            <TableCell>{maquina.numero_motor}</TableCell>
            <TableCell>{getClienteName(maquina.id_cliente)}</TableCell>

            <TableCell>
              <Link to={`/maquinaProfile/${maquina.id_maquina}`}>
                <IconButton>
                  <VisibilityIcon />
                </IconButton>
              </Link>
              {userRole !== 3 && userRole !== 5 && (
                <IconButton
                  color="warning"
                  sx={{ ml: 1 }}
                  onClick={() => onEdit(maquina)}
                >
                  <EditIcon />
                </IconButton>
              )}

              {userRole === 2 && (
                <IconButton
                  color="error"
                  sx={{ ml: 1 }}
                  onClick={() => onDelete(maquina.id_maquina)}
                >
                  <DeleteIcon />
                </IconButton>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default MaquinaTable;
