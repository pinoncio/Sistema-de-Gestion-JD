require('dotenv').config();  // Esto es necesario para cargar las variables de entorno del archivo .env
const { Sequelize } = require('sequelize');

// Asegúrate de que la URL de la base de datos esté definida correctamente en el .env
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,  // Evita errores de SSL al conectarse a Neon
    },
  },
});

module.exports = sequelize;
