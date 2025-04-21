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
import { generatePDF } from "../Services/VerInforme";

const ItTable = ({ informes, onDelete }) => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("fecha_control_tiempo");

  // Obtener el rol del usuario desde localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const userRole = user ? user.rol : null;

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const stableSort = (array, comparator) => {
    if (!orderBy) return array;
    const stabilizedArray = array.map((el, index) => {
      el.control_tiempo = Array.isArray(el.control_tiempo)
        ? el.control_tiempo
        : [];
      return [el, index];
    });

    stabilizedArray.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });

    return stabilizedArray.map((el) => el[0]);
  };

  const comparator = (a, b) => {
    if (!orderBy) return 0;

    const controlA =
      a.control_tiempo.length > 0 ? a.control_tiempo[0].fecha : null;
    const controlB =
      b.control_tiempo.length > 0 ? b.control_tiempo[0].fecha : null;

    const dateA = moment(controlA);
    const dateB = moment(controlB);

    if (!dateA.isValid()) return 1;
    if (!dateB.isValid()) return -1;

    if (dateA.isBefore(dateB)) return order === "asc" ? -1 : 1;
    if (dateA.isAfter(dateB)) return order === "asc" ? 1 : -1;
    return 0;
  };

  return (
    <div>
      <style>
        {`
          .highlight {
            background-color: rgba(255, 235, 20, 0.2); /* Amarillo opaco */
            font-weight: normal;
          }
        `}
      </style>

      <div style={{ overflowX: "auto", width: "100%" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>N° OT</TableCell>
              <TableCell>Cliente</TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "fecha_control_tiempo"}
                  direction={orderBy === "fecha_control_tiempo" ? order : "asc"}
                  onClick={() => handleRequestSort("fecha_control_tiempo")}
                >
                  Fecha Visita
                </TableSortLabel>
              </TableCell>
              <TableCell>Dirección Cliente</TableCell>
              <TableCell>Tecnico</TableCell>
              <TableCell>Máquina</TableCell>
              <TableCell>Modelo</TableCell>
              <TableCell>N° de Serie</TableCell>
              <TableCell>N° de Motor</TableCell>
              <TableCell>Queja y/o Sintoma</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stableSort(informes, comparator).map((informe, index) => (
              <TableRow key={informe.id_it || index}>
                <TableCell>
                  {informe.ot ? informe.ot.id_ot : "No disponible"}
                </TableCell>
                <TableCell>
                  {informe.cliente
                    ? informe.cliente.nombre_razon_social
                    : "No disponible"}
                </TableCell>
                <TableCell>
                  {informe.control_tiempo &&
                  informe.control_tiempo.length > 0 ? (
                    informe.control_tiempo.map((control, idx) => (
                      <div key={idx}>{control.fecha}</div>
                    ))
                  ) : (
                    <span>No hay control de tiempo</span>
                  )}
                </TableCell>
                <TableCell>{informe.cliente.direccion}</TableCell>
                <TableCell>{informe.tecnico}</TableCell>
                <TableCell>{informe.maquina}</TableCell>
                <TableCell>{informe.modelo}</TableCell>
                <TableCell>{informe.numero_serie}</TableCell>
                <TableCell>{informe.numero_motor}</TableCell>
                <TableCell>{informe.queja_sintoma}</TableCell>
                <TableCell>
                  <Link to={`/itProfile/${informe.id_it}`}>
                    <IconButton>
                      <VisibilityIcon />
                    </IconButton>
                  </Link>

                  {/* Mostrar botón de editar solo si el rol no es 4 */}
                  {userRole !== 4 && (
                    <Link to={`/update-it/${informe.id_it}`}>
                      <IconButton color="warning" sx={{ ml: 1 }}>
                        <EditIcon />
                      </IconButton>
                    </Link>
                  )}

                  {/* Solo mostrar el botón de eliminar si el usuario tiene rol 2 */}
                  {userRole === 2 && (
                    <IconButton
                      color="error"
                      sx={{ ml: 1 }}
                      onClick={() => onDelete(informe.id_it)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}

                  <IconButton
                    color="primary"
                    sx={{ ml: 1 }}
                    onClick={() => generatePDF(informe.id_it)}
                  >
                    <PictureAsPdfIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ItTable;
