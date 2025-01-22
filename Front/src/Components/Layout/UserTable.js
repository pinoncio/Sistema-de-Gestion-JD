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

const UserTable = ({ usuarios, onDelete, onToggleStatus, onEdit }) => {
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
          <TableCell>
            <TableSortLabel
              active={orderBy === "nombre"}
              direction={orderBy === "nombre" ? order : "asc"}
              onClick={() => handleRequestSort("nombre")}
            >
              Nombre
            </TableSortLabel>
          </TableCell>
          <TableCell>
            <TableSortLabel
              active={orderBy === "apellido"}
              direction={orderBy === "apellido" ? order : "asc"}
              onClick={() => handleRequestSort("apellido")}
            >
              Apellido
            </TableSortLabel>
          </TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Estado</TableCell>
          <TableCell>Acciones</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {stableSort(usuarios, comparator).map((usuario) => (
          <TableRow key={usuario.ID_USUARIO}>
            <TableCell>{usuario.NOMBRE_USUARIO}</TableCell>
            <TableCell>{usuario.APELLIDO_USUARIO}</TableCell>
            <TableCell>{usuario.EMAIL_USUARIO}</TableCell>
            <TableCell>
              <Switch
                checked={usuario.ESTADO_USUARIO} // Este valor debe reflejar el estado del backend
                onChange={() =>
                  onToggleStatus(usuario.ID_USUARIO, !usuario.ESTADO_USUARIO) // Aquí invertimos el estado
                }
                name="estado"
                inputProps={{ "aria-label": "controlled" }}
              />
            </TableCell>
            <TableCell>
              <IconButton onClick={() => onEdit(usuario)}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => onDelete(usuario.ID_USUARIO)}>
                <DeleteIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UserTable;
