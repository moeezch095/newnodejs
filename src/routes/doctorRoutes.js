const express = require("express");
const router = express.Router();
const {
  signupDoctor,
  loginDoctor,
  getAllDoctors,
  addAvailability,
  getDoctorAvailability,
} = require("../controllers/doctorControllers");
const auth = require("../middleware/auth");

router.post("/signup", signupDoctor);
router.post("/login", loginDoctor);
router.get("/getAllDoctors", getAllDoctors);
router.post("/addAvailability", auth, addAvailability);
router.get("/:doctorId/availability", getDoctorAvailability);

module.exports = router;
