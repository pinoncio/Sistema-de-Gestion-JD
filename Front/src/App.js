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
import GastoVerPage from "./Pages/GastoVerPage";
import GastoMensual from "./Pages/GastoMensual";
import AdminProfilePage from "./Pages/AdminProfile";

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/admin"
            element={
              <PrivateRoute rolesPermitidos={[1]}>
                <AdminHome />
              </PrivateRoute>
            }
          />
          <Route
            path="/users"
            element={
              <PrivateRoute rolesPermitidos={[1]}>
                <UserPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/role"
            element={
              <PrivateRoute rolesPermitidos={[1]}>
                <RolePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/perfil/:id_usuario"
            element={
              <PrivateRoute rolesPermitidos={[1]}>
                <UserProfilePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/ver/:id_usuario"
            element={
              <PrivateRoute rolesPermitidos={[1]}>
                <AdminProfilePage />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/user"
            element={
              <PrivateRoute rolesPermitidos={[1, 2, 3, 4, 5]}>
                <UserHome />
              </PrivateRoute>
            }
          />
          <Route
            path="/cliente"
            element={
              <PrivateRoute rolesPermitidos={[1, 2, 3, 4, 5]}>
                <ClientePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/clienteProfile/:id_cliente"
            element={
              <PrivateRoute rolesPermitidos={[1, 2, 3, 4, 5]}>
                <ClientProfilePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/categoria"
            element={
              <PrivateRoute rolesPermitidos={[1, 2, 3, 4]}>
                <CategoriaPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/insumo"
            element={
              <PrivateRoute rolesPermitidos={[1, 2, 4]}>
                <InsumoPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/insumoProfile/:id_insumo"
            element={
              <PrivateRoute rolesPermitidos={[1, 2, 4]}>
                <InsumoProfilePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/ots"
            element={
              <PrivateRoute rolesPermitidos={[1, 2, 3, 4, 5]}>
                <OtPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/otProfile/:id_ot"
            element={
              <PrivateRoute rolesPermitidos={[1, 2, 3, 4, 5]}>
                <OTProfilePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/create-ot"
            element={
              <PrivateRoute rolesPermitidos={[1, 2, 3, 4]}>
                <OrderForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/update-ot/:id_ot"
            element={
              <PrivateRoute rolesPermitidos={[1, 2, 3, 4]}>
                <OrderUForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/its"
            element={
              <PrivateRoute rolesPermitidos={[1, 2, 3, 4, 5]}>
                <ItPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/create-it"
            element={
              <PrivateRoute rolesPermitidos={[1, 2, 3, 5]}>
                <ItForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/update-it/:id_it"
            element={
              <PrivateRoute rolesPermitidos={[1, 2, 3, 5]}>
                <ItUForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/itProfile/:id_it"
            element={
              <PrivateRoute rolesPermitidos={[1, 2, 3, 4, 5]}>
                <ItProfilePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/maquina"
            element={
              <PrivateRoute rolesPermitidos={[1, 2, 3, 4, 5]}>
                <MaquinaPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/maquinaProfile/:id_maquina"
            element={
              <PrivateRoute rolesPermitidos={[1, 2, 3, 4, 5]}>
                <MaquinaVerPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/gastos"
            element={
              <PrivateRoute rolesPermitidos={[1, 2, 3, 4]}>
                <CostoPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/gastoProfile/:id_gasto"
            element={
              <PrivateRoute rolesPermitidos={[1, 2, 3, 4]}>
                <GastoVerPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/gastoMensual"
            element={
              <PrivateRoute rolesPermitidos={[1, 2, 3, 4]}>
                <GastoMensual />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
