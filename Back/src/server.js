const express = require('express');
const cors = require('cors');
const usuarioRoutes = require('./routes/userRoutes');
const roleRoutes = require('./routes/roleRoutes'); // Asegúrate de tener las rutas de roles correctamente
const { Usuario } = require('./models/userModel');
const { Rol } = require('./models/roleModel'); // Asumiendo que tienes un modelo para los roles

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3001';
        this.middlewares();
        this.routes();
        this.dbConnect();
    }

    listen() {
        // Ahora escuchamos con app, que es el objeto de Express
        this.app.listen(this.port, () => {
            console.log(`Servidor escuchando en el puerto ${this.port}`);
        });
    }

    routes() {
        this.app.use('/api/usuarios', usuarioRoutes);
        this.app.use('/api/roles', roleRoutes);
    }

    middlewares() {
        this.app.use(express.json());
        this.app.use(cors());
    }

    dbConnect() {
        return new Promise((resolve, reject) => {
            Usuario.sync()
                .then(() => {
                    console.log("Base de datos de usuarios sincronizada correctamente.");
                    return Rol.sync();  // Asegúrate de sincronizar también los roles
                })
                .then(() => {
                    console.log("Base de datos de roles sincronizada correctamente.");
                    resolve();
                })
                .catch(error => {
                    console.log('No se ha podido establecer conexión a la base de datos', error);
                    reject(error);
                });
        });
    }
}

// Asegúrate de exportar la instancia del servidor
module.exports = new Server();
