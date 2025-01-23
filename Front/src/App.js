// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./Components/Layout/Footer";
import Home from "./Pages/Home"; 
import UserPage from "./Pages/UserPage";

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<UserPage />} />
        </Routes>

        <hr />
        <Footer />
      </div>
    </Router>
  );
};

export default App;
