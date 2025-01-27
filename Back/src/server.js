const express = require("express");
const cors = require("cors");

// Importar rutas
const usuarioRoutes = require("./routes/userRoutes");
const roleRoutes = require("./routes/roleRoutes");
const clienteRoutes = require("./routes/clienteRoutes");
const clientePagoRoutes = require("./routes/clienteMetodoPagoRoute");
const metodoPagoRoutes = require("./routes/metodoPagoRoute");

// Importar modelos
const { Usuario } = require("./models/userModel");
const { Rol } = require("./models/roleModel");
const { ClienteMetodoPago } = require("./models/clienteMetodoPagoModel");
const { Cliente } = require("./models/clienteModel");
const { MetodoPago } = require("./models/metodoPagoModel");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || "3001";
    this.middlewares();
    this.routes();
    this.dbConnect();
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor escuchando en el puerto ${this.port}`);
    });
  }

  routes() {
    this.app.use("/api/usuarios", usuarioRoutes);
    this.app.use("/api/roles", roleRoutes);
    this.app.use("/api/clientes", clienteRoutes);
    this.app.use("/api/pago", clientePagoRoutes);
    this.app.use("/api/metodo", metodoPagoRoutes);
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(cors());
  }

  async dbConnect() {
    try {
      await Usuario.sync({ alter: true });
      await Rol.sync({ alter: true });
      await Cliente.sync({ alter: true });
      await ClienteMetodoPago.sync({ alter: true });
      await MetodoPago.sync({ alter: true });
      console.log("Base de datos sincronizada correctamente.");
    } catch (error) {
      console.log(
        "No se ha podido establecer conexión a la base de datos",
        error
      );
      throw error;
    }
  }
}

// Asegúrate de exportar la instancia del servidor
module.exports = new Server();
