// routes.js
const express = require("express");
const router = express.Router();
const  sendEmail  = require("../controllers/emailcontroller");

// Ruta para enviar un correo
router.post("/send-email", sendEmail.sendEmail);

module.exports = router;
