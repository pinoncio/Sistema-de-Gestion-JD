const express = require('express'); // Si usas Express
const pool = require('./config/db'); // Importar el pool de db.js

const app = express();

// Endpoint de prueba para verificar la conexión a la base de datos
app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()'); // Consulta simple para verificar la conexión
    res.status(200).send(`Conexión exitosa: ${result.rows[0].now}`);
  } catch (err) {
    console.error('Error al conectar a la base de datos:', err);
    res.status(500).send('Error al conectar a la base de datos');
  }
});

// Configurar el puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
