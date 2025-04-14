import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, rolesPermitidos }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!token || !user) {
      setErrorMessage("Acceso denegado. No tienes permisos.");
    } else if (user.rol && !rolesPermitidos.includes(user.rol)) {
      setErrorMessage("No tienes los permisos necesarios para acceder a esta sección.");
    }
  }, [token, user, rolesPermitidos]);

  // Si no hay token o el usuario no existe, redirige al login
  if (!token || !user) {
    return (
      <Navigate
        to="/login"
        state={{ error: errorMessage }}
      />
    );
  }

  // Si el usuario tiene rol, pero no está en los roles permitidos
  if (user.rol && !rolesPermitidos.includes(user.rol)) {
    return (
      <Navigate
        to="/user"
        state={{ error: errorMessage }}
      />
    );
  }

  return children;
};

export default PrivateRoute;
