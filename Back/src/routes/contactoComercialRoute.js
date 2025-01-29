const express = require("express");
const router = express.Router();
const {
  newContactoComercial,
  updateContactoComercial,
  getContactoComercial,
  getContactosComerciales,
  deleteContactoComercial,
} = require("../controllers/contactoComercialController");

// Ruta para obtener todos los contactos comerciales
router.get("/list", getContactosComerciales);

// Ruta para obtener un contacto comercial específico por su id_contacto_comercial
router.get("/:id_cliente", getContactoComercial);

// Ruta para crear un nuevo contacto comercial
router.post("/", newContactoComercial);

// Ruta para actualizar un contacto comercial por su id_contacto_comercial
router.put("/:id_contacto_comercial", updateContactoComercial);

// Ruta para eliminar un contacto comercial por su id_contacto_comercial
router.delete("/:id_contacto_comercial", deleteContactoComercial);

module.exports = router;
