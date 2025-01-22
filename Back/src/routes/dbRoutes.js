const express = require('express');
const router = express.Router();
const sequelize = require('../config/db'); // Importa Sequelize

// Ruta para probar la conexión
router.get('/test', async (req, res) => {
  try {
    const [result] = await sequelize.query('SELECT NOW()');
    res.status(200).json({ success: true, timestamp: result[0].now });
  } catch (err) {
    console.error('Error al ejecutar la consulta con Sequelize:', err);
    res.status(500).json({ success: false, message: 'Error al conectar con la base de datos' });
  }
});

module.exports = router;
