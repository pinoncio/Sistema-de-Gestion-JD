const server = require("./src/server");  


const PORT = process.env.PORT || 3001;


server.listen(PORT); 


process.on('SIGINT', (signal) => {
  console.log('\nRecibí la señal de interrupción (Ctrl + C)');

  process.stdout.write('¿Estás seguro de que deseas cerrar el servidor? (s/n): ');

  process.stdin.on('data', (input) => {
    const confirmation = input.toString().trim().toLowerCase();
    if (confirmation === 's' || confirmation === 'sí') {
      console.log('Cerrando el servidor...');
      process.exit();
    } else {
      console.log('El servidor sigue corriendo...');
      process.stdin.pause();
    }
  });
});
