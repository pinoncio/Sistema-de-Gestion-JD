const express = require('express');
const router = express.Router();
const { 
    newUsuario, 
    updateUsuario, 
    loginUser, 
    getUsuario, 
    getUsuarios, 
    deleteUsuario 
} = require('../controllers/userController');

// Ruta para obtener todos los usuarios
router.get('/', getUsuarios);

// Ruta para obtener un usuario específico por su ID
router.get('/:id', getUsuario);

// Ruta para crear un nuevo usuario
router.post('/', newUsuario);

// Ruta para el login de un usuario
router.post('/login', loginUser);

// Ruta para actualizar un usuario por su ID
router.put('/:id', updateUsuario);

// Ruta para eliminar un usuario por su ID
router.delete('/:id', deleteUsuario);

module.exports = router;
