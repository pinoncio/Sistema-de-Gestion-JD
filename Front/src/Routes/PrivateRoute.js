import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  
  if (!token || !user || user.rol !== 1) {
    // Redirige a la página de login si no está autorizado
    return <Navigate to="/login" />;
  }

  // Si el usuario tiene el rol adecuado, renderiza los hijos
  return children;
};


export default PrivateRoute;
