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

const CategoriaTable = ({ categorias = [], onDelete, onEdit }) => {
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
        <TableCell>Id Categoria</TableCell>
          <TableCell>
            <TableSortLabel
              active={orderBy === "nombre"}
              direction={orderBy === "nombre" ? order : "asc"}
              onClick={() => handleRequestSort("nombre")}
            >
              Nombre
            </TableSortLabel>
          </TableCell>
          <TableCell>Acciones</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {stableSort(categorias, comparator).map((categoria) => (
          <TableRow key={categoria.id_categoria}>
            <TableCell>N°{categoria.id_categoria}</TableCell>
            <TableCell>{categoria.nombre_categoria}</TableCell>
            <TableCell>
              <IconButton
                color="warning"
                style={{ marginLeft: "10px" }}
                onClick={() => onEdit(categoria)}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                color="error"
                style={{ marginLeft: "10px" }}
                onClick={() => onDelete(categoria.id_categoria)}
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

export default CategoriaTable;
