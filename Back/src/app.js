const express = require('express');
const dbRoutes = require('./routes/dbRoutes'); // Importar las rutas

const app = express();

// Usar las rutas
app.use('/api', dbRoutes);

module.exports = app;
