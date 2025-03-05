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
import OtPage from "./Pages/OtPage";
import OTProfilePage from "./Pages/OtVerPage";
import OrderForm from "./Components/OrderForm";
import OrderUForm from "./Components/OrderUForm";

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/admin"
            element={
              <PrivateRoute rolPermitido={1}>
                <AdminHome />
              </PrivateRoute>
            }
          />

          <Route
            path="/users"
            element={
              <PrivateRoute rolPermitido={1}>
                <UserPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/role"
            element={
              <PrivateRoute rolPermitido={1}>
                <RolePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/perfil/:id_usuario"
            element={
              <PrivateRoute rolPermitido={1}>
                <UserProfilePage />
              </PrivateRoute>
            }
          />

          <Route path="/login" element={<LoginPage />} />
          {/* Rutas protegidas para rol 2 (Usuarios normales) */}
          <Route
            path="/user"
            element={
              <PrivateRoute rolPermitido={2}>
                <UserHome />
              </PrivateRoute>
            }
          />

          {/* Otras rutas protegidas */}
          <Route
            path="/cliente"
            element={
              <PrivateRoute rolPermitido={2}>
                <ClientePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/clienteProfile/:id_cliente"
            element={
              <PrivateRoute rolPermitido={2}>
                <ClientProfilePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/categoria"
            element={
              <PrivateRoute rolPermitido={2}>
                <CategoriaPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/insumo"
            element={
              <PrivateRoute rolPermitido={2}>
                <InsumoPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/insumoProfile/:id_insumo"
            element={
              <PrivateRoute rolPermitido={2}>
                <InsumoProfilePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/ots"
            element={
              <PrivateRoute rolPermitido={2}>
                <OtPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/otProfile/:id_ot"
            element={
              <PrivateRoute rolPermitido={2}>
                <OTProfilePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/create-ot"
            element={
              <PrivateRoute rolPermitido={2}>
                <OrderForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/update-ot/:id_ot"
            element={
              <PrivateRoute rolPermitido={2}>
                <OrderUForm />
              </PrivateRoute>
            }
          />
          
        </Routes>
      </div>
    </Router>
  );
};

export default App;
