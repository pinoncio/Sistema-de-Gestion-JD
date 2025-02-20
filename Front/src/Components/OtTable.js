import React, { useState } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link } from "react-router-dom";

const OtTable = ({
  ordenes,
  onDelete,
  onEdit,
  getClienteName,
  getInsumoName,
}) => {
  const [order] = useState("asc");
  const [orderBy] = useState("");

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
          <TableCell>Cliente</TableCell>
          <TableCell>Tipo documento</TableCell>
          <TableCell>Fecha solicitud</TableCell>
          <TableCell>Fecha entrega</TableCell>
          <TableCell>Tipo OT</TableCell>
          <TableCell>Observacion final</TableCell>
          <TableCell>Insumo</TableCell>
          <TableCell>Total</TableCell>
          <TableCell>Acciones</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {stableSort(ordenes, comparator).map((orden, index) => (
          <TableRow key={orden.ID_OT || index}>
            <TableCell>{getClienteName(orden.ID_CLIENTE)}</TableCell>
            <TableCell>{orden.TIPO_DOCUMENTO}</TableCell>
            <TableCell>{orden.FECHA_SOLICITUD}</TableCell>
            <TableCell>{orden.FECHA_ENTREGA}</TableCell>
            <TableCell>{orden.TIPO_OT}</TableCell>
            <TableCell>{orden.OBSERVACION_FINAL}</TableCell>
            <TableCell>{getInsumoName(orden.ID_INSUMO)}</TableCell>
            <TableCell>
              {new Intl.NumberFormat("es-CL", {
                style: "currency",
                currency: "CLP",
              }).format(orden.TOTAL)}
            </TableCell>
            <TableCell>
              <Link to={`/ordenProfile/${orden.ID_OT}`}>
                <IconButton>
                  <VisibilityIcon />
                </IconButton>
              </Link>
              <IconButton sx={{ ml: 1 }} onClick={() => onEdit(orden)}>
                <EditIcon />
              </IconButton>
              <IconButton
                sx={{ ml: 1 }}
                onClick={() => onDelete(orden.ID_OT)}
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

export default OtTable;
