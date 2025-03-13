const express = require("express");
const router = express.Router();
const {
  newContactoComercial,
  updateContactoComercial,
  getContactoComercial,
  getContactosComerciales,
  deleteContactoComercial,
} = require("../controllers/contactocomercialcontroller");

router.get("/list", getContactosComerciales);

router.get("/:id_cliente", getContactoComercial);

router.post("/", newContactoComercial);

router.put("/:id_cliente", updateContactoComercial);

router.delete("/:id_cliente", deleteContactoComercial);

module.exports = router;
