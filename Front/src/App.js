// App.js
import React from "react";
import Footer from "./Components/Layout/Footer";
import Home from "./Pages/Home"; 

const App = () => {
  return (
    <div>
      <Home />
      {/* Footer global */}
      <hr></hr>
      <Footer />
    </div>
  );
};

export default App;
