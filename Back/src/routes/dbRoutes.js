const express = require('express');
const router = express.Router();
const pool = require('../config/db'); // Importa la conexión a la base de datos

// Ruta para probar la conexión
router.get('/test', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.status(200).json({ success: true, timestamp: result.rows[0].now });
  } catch (err) {
    console.error('Error al ejecutar la consulta:', err);
    res.status(500).json({ success: false, message: 'Error al conectar con la base de datos' });
  }
});

module.exports = router;
