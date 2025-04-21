const server = require("./src/server");  // Importar la instancia de Server

const PORT = process.env.PORT || 3001;

// Iniciar el servidor
server.listen(PORT);  // Llamamos a 'listen' directamente desde la instancia

// Manejador de la señal SIGINT (Ctrl + C)
process.on('SIGINT', (signal) => {
  console.log('\nRecibí la señal de interrupción (Ctrl + C)');
  // Pide confirmación antes de cerrar el servidor
  process.stdout.write('¿Estás seguro de que deseas cerrar el servidor? (s/n): ');

  process.stdin.on('data', (input) => {
    const confirmation = input.toString().trim().toLowerCase();
    if (confirmation === 's' || confirmation === 'sí') {
      console.log('Cerrando el servidor...');
      process.exit(); // Cerrar el servidor
    } else {
      console.log('El servidor sigue corriendo...');
      process.stdin.pause(); // Detener la escucha
    }
  });
});
