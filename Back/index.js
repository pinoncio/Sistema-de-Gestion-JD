const express = require('express');
const pool = require('./src/config/db'); // Importa la configuración de la base de datos

const app = express();
const PORT = process.env.PORT || 3000;

// Probar conexión a la base de datos
pool.connect((err, client, release) => {
  if (err) {
    console.error('Error al conectar con la base de datos:', err.stack);
  } else {
    console.log('Conexión exitosa a la base de datos');
    release(); // Libera el cliente después de probar
  }
});

// Ruta principal
app.get('/', (req, res) => {
  res.send('¡Servidor funcionando correctamente!');
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
