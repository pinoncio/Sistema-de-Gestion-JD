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
  TextField,
} from "@mui/material";
import AdminLayout from "../Components/Layout/AdminLayout";
import PersonIcon from "@mui/icons-material/Person"; // Ícono de persona para representar el usuario
import "../Styles/UserProfilePage.css";

const AdminProfilePage = () => {
  const { id_usuario } = useParams();
  const [user, setUser] = useState(null);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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
            <Box sx={{ textAlign: "center", marginBottom: 2 }}>
              <PersonIcon sx={{ fontSize: 120, color: "primary.main" }} />
            </Box>
            <Divider sx={{ marginBottom: 2 }} />
            <Box
              component="form"
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 2,
              }}
            >
              <TextField
                label="Nombre Completo"
                value={`${user.nombre_usuario} ${user.apellido_usuario}`}
                variant="outlined"
                fullWidth
                readOnly
              />
              <TextField
                label="RUT"
                value={user.rut_usuario || ""}
                variant="outlined"
                fullWidth
                readOnly
              />
              <TextField
                label="Email"
                value={user.email_usuario || ""}
                variant="outlined"
                fullWidth
                readOnly
              />
              <TextField
                label="Fecha de Nacimiento"
                value={moment(user.fecha_nacimiento_usuario).format(
                  "DD/MM/YYYY"
                )}
                variant="outlined"
                fullWidth
                readOnly
              />
              <TextField
                label="Estado"
                value={user.estado_usuario ? "Activo" : "Inactivo"}
                variant="outlined"
                fullWidth
                readOnly
              />
              <TextField
                label="Rol"
                value={roleName || "Sin Rol"}
                variant="outlined"
                fullWidth
                readOnly
              />
            </Box>
          </CardContent>
        </Card>
        <div className="profile-button">
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/admin")}
          >
            Volver a la lista de usuarios
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminProfilePage;
