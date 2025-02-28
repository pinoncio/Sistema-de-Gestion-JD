const express = require("express");
const cors = require("cors");

// importar rutas
const usuarioroutes = require("./routes/userroutes");
const roleroutes = require("./routes/roleroutes");
const clienteroutes = require("./routes/clienteroutes");
const clientepagoroutes = require("./routes/clientemetodopagoroute");
const metodopagoroutes = require("./routes/metodopagoroute");
const contactocomercialroutes = require("./routes/contactocomercialroute");
const informaciondepagoroutes = require("./routes/informacionpagoroute");
const categoriaroutes = require("./routes/categoriaroute");
const insumoroutes = require("./routes/insumoroute");
//const emailroutes = require("./routes/emailroute");
const otroutes = require("./routes/otroute");
const otinsumoroutes = require("./routes/otinsumoroute");
const productoroutes = require("./routes/productoroute");

// importar modelos
const { usuario } = require("./models/usermodel");
const { rol } = require("./models/rolemodel");
const { clientemetodopago } = require("./models/clientemetodopagomodel");
const { cliente } = require("./models/clientemodel");
const { metodopago } = require("./models/metodopagomodel");
const { contactocomercial } = require("./models/contactocomercialmodel");
const { informaciondepago } = require("./models/informacionpagomodel");
const { categoria } = require("./models/categoriamodel")
const { insumo } = require("./models/insumomodel");
const { ot } = require("./models/otmodel");
const { otinsumo } = require("./models/otinsumomodel");
const { producto } = require("./models/productomodel");
   
class server {
  constructor() {
    this.app = express();
    this.port = process.env.port || "3001";
    this.middlewares();
    this.routes();
    this.dbconnect();
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`servidor escuchando en el puerto ${this.port}`);
    });
  }

  routes() {
    this.app.use("/api/usuarios", usuarioroutes);
    this.app.use("/api/roles", roleroutes);
    this.app.use("/api/clientes", clienteroutes);
    this.app.use("/api/pago", clientepagoroutes);
    this.app.use("/api/metodo", metodopagoroutes);
    this.app.use("/api/contacto", contactocomercialroutes);
    this.app.use("/api/informacion", informaciondepagoroutes);
    this.app.use("/api/categoria", categoriaroutes);
    this.app.use("/api/insumo", insumoroutes);
    //this.app.use("/api/email", emailroutes);
    this.app.use("/api/ots", otroutes);
    this.app.use("/api/otinsumo", otinsumoroutes);
    this.app.use("/api/producto", productoroutes);
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(cors());
  }

  async dbconnect() {
    try {
      await usuario.sync({ alter: true });
      await rol.sync({ alter: true });
      await cliente.sync({ alter: true });
      await clientemetodopago.sync({ alter: true });
      await metodopago.sync({ alter: true });
      await contactocomercial.sync({ alter: true });
      await informaciondepago.sync({ alter: true });
      await categoria.sync({ alter: true });
      await insumo.sync({ alter: true });
      await ot.sync({ alter: true });
      await otinsumo.sync({ alter:true });
      await producto.sync({ alter:true });
      console.log("base de datos sincronizada correctamente.");
    } catch (error) {
      console.log(
        "no se ha podido establecer conexión a la base de datos",
        error
      );
      throw error;
    }
  }
}

// asegúrate de exportar la instancia del servidor
module.exports = new server();
