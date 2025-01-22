const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define("User", {
    username: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
  });
  
  // Sincroniza tablas en la base de datos
  sequelize
    .sync({ force: false }) // Cambia a 'true' para forzar la recreación
    .then(() => console.log("Modelos sincronizados correctamente"))
    .catch((err) => console.error("Error al sincronizar modelos:", err));
  

module.exports = User;
