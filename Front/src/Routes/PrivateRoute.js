import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, rolPermitido }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  // Verifica si hay token, si el usuario existe, y si el rol coincide con el rol permitido
  if (!token || !user || user.rol !== rolPermitido) {
    console.log("Acceso denegado. Redirigiendo a login.");
    return (
      <Navigate
        to="/login"
        state={{ error: "Acceso denegado. No tienes permisos." }}
      />
    );
  }

  return children;  // Si todo está bien, renderiza los hijos (contenido protegido)
};

export default PrivateRoute;
