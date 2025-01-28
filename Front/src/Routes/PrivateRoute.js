import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  // Verificar si el usuario tiene uno de los roles permitidos
  const allowedRoles = [1, 2]; // Lista de roles permitidos

  if (!token || !user || !allowedRoles.includes(user.rol)) {
    // Redirige a la página de login si no está autorizado
    return <Navigate to="/login" />;
  }

  // Si el usuario tiene un rol permitido, renderiza los hijos
  return children;
};

export default PrivateRoute;
