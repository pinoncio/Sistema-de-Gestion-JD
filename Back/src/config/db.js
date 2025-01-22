// db.js
const { Sequelize } = require('sequelize');
require('dotenv').config(); // Cargar variables de entorno desde .env

// Usar las variables de entorno para la conexión
const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, 
    },
  },
  logging: false, 
});

module.exports = sequelize; 
