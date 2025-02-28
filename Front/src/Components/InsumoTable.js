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

const InsumoTable = ({
  insumos,
  onDelete,
  onToggleStatus,
  onEdit,
  getCategoriaName,
}) => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");

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
              active={orderBy === "nombre_insumo"}
              direction={orderBy === "nombre_insumo" ? order : "asc"}
              onClick={() => handleRequestSort("nombre_insumo")}
            >
              Nombre
            </TableSortLabel>
          </TableCell>
          <TableCell>Categoria</TableCell>
          <TableCell>Tipo</TableCell>
          <TableCell>Estado</TableCell>
          <TableCell>Stock Disponible</TableCell>
          <TableCell>Precio Neto</TableCell>
          <TableCell>Precio Venta</TableCell>
          <TableCell>Acciones</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {stableSort(insumos, comparator).map((insumo) => (
          <TableRow key={insumo.id_insumo}>
            <TableCell>{insumo.nombre_insumo}</TableCell>
            <TableCell>{getCategoriaName(insumo.id_categoria)}</TableCell>
            <TableCell>{insumo.tipo_insumo}</TableCell>
            <TableCell>
              <Switch
                checked={insumo.estado_insumo}
                onChange={() =>
                  onToggleStatus(insumo.id_insumo, !insumo.estado_insumo)
                }
                name="estado"
                inputProps={{ "aria-label": "controlled" }}
              />
            </TableCell>
            <TableCell>{insumo.stock_disponible}</TableCell>
            <TableCell>
              {new Intl.NumberFormat("es-CL", {
                style: "currency",
                currency: "CLP",
              }).format(insumo.precio_neto)}
            </TableCell>
            <TableCell>
              {new Intl.NumberFormat("es-CL", {
                style: "currency",
                currency: "CLP",
              }).format(insumo.precio_venta)}
            </TableCell>

            <TableCell>
              <Link to={`/insumoProfile/${insumo.id_insumo}`}>
                <IconButton  >
                  <VisibilityIcon />
                </IconButton>
              </Link>
              <IconButton
                color="warning"
                sx={{ ml: 1 }}
                onClick={() => onEdit(insumo)}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                color="error"
                sx={{ ml: 1 }}
                onClick={() => onDelete(insumo.id_insumo)}
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

export default InsumoTable;
