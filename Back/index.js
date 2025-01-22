const db = require('./src/config/db');

db.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error ejecutando la consulta:', err);
  } else {
    console.log('Respuesta de la base de datos:', res.rows);
  }
});
