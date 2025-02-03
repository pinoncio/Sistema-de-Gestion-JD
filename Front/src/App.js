import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/HomePage";
import UserPage from "./Pages/UserPage";
import RolePage from "./Pages/RolePage";
import UserProfilePage from "./Pages/UserProfilePage";
import LoginPage from "./Pages/LoginPage";
import PrivateRoute from "./Routes/PrivateRoute";
import ClientePage from "./Pages/ClientesPage";
import AdminHome from "./Pages/AdminPage";
import ClientProfilePage from "./Pages/ClienteProfilePage";
import CategoriaPage from "./Pages/CategoriaPage";
import InsumoPage from "./Pages/InsumoPage";
import UserHome from "./Pages/UserHome";
import InsumoProfilePage from "./Pages/InsumoVerPage";

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Usamos PrivateRoute para proteger estas rutas */}
          <Route
            path="/users"
            element={
              <PrivateRoute>
                <UserPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/role"
            element={
              <PrivateRoute>
                <RolePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/perfil/:id_usuario"
            element={
              <PrivateRoute>
                <UserProfilePage />
              </PrivateRoute>
            }
          />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/cliente" element={<ClientePage />} />
          <Route path="/:id_cliente" element={<ClientProfilePage />} />
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/categoria" element={<CategoriaPage />} />
          <Route path="/insumo" element={<InsumoPage />} />
          <Route path="/user" element={<UserHome />} />
          <Route path="/verInsumo/:id_insumo" element={<InsumoProfilePage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
