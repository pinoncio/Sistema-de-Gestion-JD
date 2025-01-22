// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./Components/Layout/Footer";
import Home from "./Pages/Home"; 
import UserPage from "./Pages/UserPage"; // Asegúrate de tener este componente creado
import NotFound from "./Pages/NotFound"; // Asegúrate de tener este componente creado

const App = () => {
  return (
    <Router>
      <div>
        {/* Definir las rutas */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<UserPage />} />
          <Route path="*" element={<NotFound />} /> {/* Página 404 */}
        </Routes>

        {/* Footer global */}
        <hr />
        <Footer />
      </div>
    </Router>
  );
};

export default App;
