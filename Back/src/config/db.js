require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Probar la conexión
pool.connect((err, client, release) => {
  if (err) {
    console.error('Error al conectar con la base de datos:', err.stack);
  } else {
    console.log('Conexión exitosa a la base de datos');
    release(); // Liberar el cliente después de la prueba
  }
});

module.exports = pool;
