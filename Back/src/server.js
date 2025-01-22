const express = require("express");
const dbRoutes = require("./routes/dbRoutes"); // Importar las rutas
const { Sequelize } = require("sequelize");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware para analizar JSON
app.use(express.json());

// Configuración de la conexión a la base de datos usando Sequelize
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Esto es necesario para la mayoría de las conexiones SSL
    },
  },
  logging: false, // Cambia a true si quieres ver las consultas SQL
});

// Ruta principal (solo como ejemplo)
app.get("/", (req, res) => {
  res.send("¡Servidor funcionando correctamente!");
});

// Usar las rutas
app.use("/api", dbRoutes);

// Sincronizar Sequelize y arrancar el servidor
(async () => {
  try {
    await sequelize.sync({ alter: true }); // Sincroniza los modelos con la base de datos
    console.log("Base de datos sincronizada con Sequelize.");

    // Inicia el servidor después de la sincronización exitosa
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error("Error al sincronizar Sequelize:", error);
  }
})();
