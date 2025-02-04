import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, rolPermitido }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token || !user || user.rol !== rolPermitido) {
    return <Navigate to="/login" state={{ error: "Acceso denegado. No tienes permisos." }} />;
  }

  return children;
};

export default PrivateRoute;
