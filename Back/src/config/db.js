const { Pool } = require('pg');

// Configuración de la conexión a la base de datos
const pool = new Pool({
  connectionString: 'postgresql://Sistema%20JD_owner:npg_GCDFybu71kEg@ep-empty-pine-a8c3xb3g.eastus2.azure.neon.tech/Sistema%20JD?sslmode=require',
});

// Exportar el pool para usarlo en otros módulos
module.exports = pool;
