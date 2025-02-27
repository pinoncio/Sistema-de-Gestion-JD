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
import { Link } from "react-router-dom"; // Importa Link de react-router-dom
import moment from "moment";

const UserTable = ({
  usuarios,
  onDelete,
  onToggleStatus,
  onEdit,
  getRoleName,
}) => {
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
              active={orderBy === "nombre_usuario"}
              direction={orderBy === "nombre_usuario" ? order : "asc"}
              onClick={() => handleRequestSort("nombre_usuario")}
            >
              Nombre
            </TableSortLabel>
          </TableCell>
          <TableCell>
            <TableSortLabel
              active={orderBy === "apellido_usuario"}
              direction={orderBy === "apellido_usuario" ? order : "asc"}
              onClick={() => handleRequestSort("apellido_usuario")}
            >
              Apellido
            </TableSortLabel>
          </TableCell>
          <TableCell>RUT</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Fecha de nacimiento</TableCell>
          <TableCell>Rol</TableCell>
          <TableCell>Estado</TableCell>
          <TableCell>
            <IconButton onClick={() => {}}>
              {/* Placeholder for sorting indicator */}
            </IconButton>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {stableSort(usuarios, comparator).map((usuario) => (
          <TableRow key={usuario.id_usuario}>
            <TableCell>{usuario.nombre_usuario}</TableCell>
            <TableCell>{usuario.apellido_usuario}</TableCell>
            <TableCell>{usuario.rut_usuario}</TableCell>
            <TableCell>{usuario.email_usuario}</TableCell>
            <TableCell>
              {moment(usuario.fecha_nacimiento_usuario).format("DD/MM/YYYY")}
            </TableCell>
            <TableCell>{getRoleName(usuario.rol_usuario)}</TableCell>
            <TableCell>
              <Switch
                checked={usuario.estado_usuario} // This value should reflect the state from the backend
                onChange={() =>
                  onToggleStatus(usuario.id_usuario, !usuario.estado_usuario)
                }
                name="estado"
                inputProps={{ "aria-label": "controlled" }}
              />
            </TableCell>
            <TableCell>
              <Link to={`/perfil/${usuario.id_usuario}`}>
                <IconButton color="success">
                  <VisibilityIcon />
                </IconButton>
              </Link>
              <IconButton
                color="warning"
                style={{ marginLeft: "10px" }}
                onClick={() => onEdit(usuario)}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                color="error"
                style={{ marginLeft: "10px" }}
                onClick={() => onDelete(usuario.id_usuario)}
              >
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
