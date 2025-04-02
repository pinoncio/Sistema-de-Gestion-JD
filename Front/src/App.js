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
import OrderForm from "./Components/OtForm";
import OrderUForm from "./Components/OtUForm";
import ItPage from "./Pages/ItPage";
import ItForm from "./Components/ItForm";
import ItUForm from "./Components/ItUForm";
import ItProfilePage from "./Pages/ItVerPage";
import MaquinaPage from "./Pages/MaquinaPage";
import MaquinaVerPage from "./Pages/MaquinaVerPage";
import CostoPage from "./Pages/GastoPage";

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
          <Route
            path="/its"
            element={
              <PrivateRoute rolPermitido={2}>
                <ItPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/create-it"
            element={
              <PrivateRoute rolPermitido={2}>
                <ItForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/update-it/:id_it"
            element={
              <PrivateRoute rolPermitido={2}>
                <ItUForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/itProfile/:id_it"
            element={
              <PrivateRoute rolPermitido={2}>
                <ItProfilePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/maquina"
            element={
              <PrivateRoute rolPermitido={2}>
                <MaquinaPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/maquinaProfile/:id_maquina"
            element={
              <PrivateRoute rolPermitido={2}>
                <MaquinaVerPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/gastos"
            element={
              <PrivateRoute rolPermitido={2}>
                <CostoPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
