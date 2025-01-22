const express = require('express');
const pool = require('../config/db');
const router = express.Router();

router.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.status(200).send(`Conexión exitosa: ${result.rows[0].now}`);
  } catch (err) {
    console.error('Error al conectar a la base de datos:', err);
    res.status(500).send('Error al conectar a la base de datos');
  }
});

module.exports = router;
