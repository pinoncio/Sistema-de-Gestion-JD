import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import { getUsuario } from "../Services/userService";
import { getRoles } from "../Services/roleService";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  Divider,
  Box,
  Snackbar,
} from "@mui/material";
import AdminLayout from "../Components/Layout/AdminLayout";
import "../Styles/UserProfilePage.css";

const UserProfilePage = () => {
  const { id_usuario } = useParams();
  const [user, setUser] = useState(null);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();

  // Fetch roles and user data
  const fetchRoles = useCallback(async () => {
    try {
      const data = await getRoles();
      setRoles(data);
    } catch (error) {
      setError("Error al obtener los roles.");
      console.error("Error al obtener los roles", error);
    }
  }, []);

  const fetchUser = useCallback(async () => {
    try {
      const data = await getUsuario(id_usuario);
      setUser(data);
    } catch (error) {
      setError("Error al obtener el usuario.");
      console.error("Error al obtener el usuario", error);
    } finally {
      setLoading(false);
    }
  }, [id_usuario]);

  useEffect(() => {
    if (id_usuario) {
      fetchRoles();
      fetchUser();
    } else {
      setError("ID de usuario no válido");
      setLoading(false);
    }
  }, [id_usuario, fetchRoles, fetchUser]);

  const getRoleName = (id_rol) => {
    const role = roles.find((r) => r.id_rol === id_rol);
    return role ? role.nombre_rol : "Sin Rol";
  };

  // Snackbar for error or success
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <CircularProgress />
        <Typography variant="body1">Cargando...</Typography>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <Typography variant="body1" color="error">
          {error}
        </Typography>
        <Button onClick={() => navigate("/users")}>
          Volver a la lista de usuarios
        </Button>
      </div>
    );
  }

  if (!user) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <Typography variant="body1" color="error">
          Usuario no encontrado.
        </Typography>
        <Button onClick={() => navigate("/users")}>
          Volver a la lista de usuarios
        </Button>
      </div>
    );
  }

  const roleName = getRoleName(user.rol_usuario);

  return (
    <AdminLayout>
      <div className="profile-container">
        <Card className="profile-card">
          <CardContent>
            <Typography variant="h5" className="profile-title">
              Detalles del Usuario
            </Typography>
            <Divider sx={{ marginBottom: 2 }} />
            <Box sx={{ marginTop: 2 }}>
              <Typography variant="body1" className="profile-details">
                <strong>Nombre:</strong> {user.nombre_usuario} {user.apellido_usuario}
              </Typography>
              <Typography variant="body1" className="profile-details">
                <strong>RUT:</strong> {user.rut_usuario}
              </Typography>
              <Typography variant="body1" className="profile-details">
                <strong>Email:</strong> {user.email_usuario}
              </Typography>
              <Typography variant="body1" className="profile-details">
                <strong>Fecha de Nacimiento:</strong>{" "}
                {moment(user.fecha_nacimiento_usuario).format("DD/MM/YYYY")}
              </Typography>
              <Typography variant="body1" className="profile-details">
                <strong>Estado:</strong>
                <span
                  className={`status ${
                    user.estado_usuario ? "active" : "inactive"
                  }`}
                >
                  {user.estado_usuario ? "Activo" : "Inactivo"}
                </span>
              </Typography>
              <Typography variant="body1" className="profile-details">
                <strong>Rol:</strong>
                <span className={`role-tag ${roleName}`}>{roleName}</span>
              </Typography>
            </Box>
          </CardContent>
        </Card>
        <div className="profile-button">
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/users")}
          >
            Volver a la lista de usuarios
          </Button>
        </div>
      </div>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        message={error}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </AdminLayout>
  );
};

export default UserProfilePage;
