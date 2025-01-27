import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/HomePage";
import UserPage from "./Pages/UserPage";
import RolePage from "./Pages/RolePage";
import UserProfilePage from "./Pages/UserProfilePage";
import LoginPage from "./Pages/LoginPage";
import PrivateRoute from "./Routes/PrivateRoute";
import ClientePage from "./Pages/ClientesPage";

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
        </Routes>

      </div>
    </Router>
  );
};

export default App;
