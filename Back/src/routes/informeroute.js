const express = require("express");
const router = express.Router();
const {
  getInformeTrabajo,
  getInformeTrabajos,
  newInformeTrabajo,
  updateInformeTrabajo,
  deleteInformeTrabajo,
} = require("../controllers/informecontroller");

router.get("/list", getInformeTrabajos);
router.get("/:id_it", getInformeTrabajo);
router.post("/", newInformeTrabajo);
router.put("/:id_it", updateInformeTrabajo);
router.delete("/:id_it", deleteInformeTrabajo);

module.exports = router;
