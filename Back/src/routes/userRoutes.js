const { Router } = require('express');
const { 
    getUsuarios, 
    getUsuario, 
    createUsuario, 
    updateUsuario, 
    deleteUsuario 
} = require('../controllers/usuarioController');

const router = Router();

// Ruta para obtener todos los usuarios
router.get('/', getUsuarios);

// Ruta para obtener un usuario específico por su ID
router.get('/:id', getUsuario);

// Ruta para crear un nuevo usuario
router.post('/', createUsuario);

// Ruta para actualizar un usuario por su ID
router.put('/:id', updateUsuario);

// Ruta para eliminar un usuario por su ID
router.delete('/:id', deleteUsuario);

module.exports = router;
