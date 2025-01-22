// server.js
const express = require('express');
const cors = require('cors');
const usuarioRoutes = require('./routes/userRoutes');
const { Usuario } = require('./models/userModel');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3001';
        this.middlewares();
        this.routes();
        this.listen();
        this.dbConnect();
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Ejecutándose en el puerto ' + this.port);
        });
    }

    routes() {
        this.app.use('/api/usuarios', usuarioRoutes); 
    }

    middlewares() {
        this.app.use(express.json());
        this.app.use(cors());
    }

    dbConnect() {
        return new Promise((resolve, reject) => {
            Usuario.sync()  // Solo sincronizar el modelo de usuarios
                .then(() => {
                    console.log("Base de datos sincronizada correctamente.");
                    resolve();
                })
                .catch(error => {
                    console.log('No se ha podido establecer conexión a la base de datos', error);
                    reject(error);
                });
        });
    }
}

module.exports = Server;
