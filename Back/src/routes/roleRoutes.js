"use strict";
const { Router } = require("express");
const {
  newRol,
  updateRol,
  deleteRol,
  getRoles,
  getRol,
} = require("../controllers/roleController");
const router = Router();

router.post("/", newRol);
router.put("/:id_rol", updateRol);
router.delete("/:id_rol", deleteRol);
router.get("/list", getRoles);
router.get("/:id_rol", getRol);

module.exports = router;
