const express = require("express");
const router = express.Router();
// const upload = require("../middleware/upload");

const {
  signupDoctor,
  loginDoctor,
  getAllDoctors,
  addAvailability,
  getDoctorAvailability,
  getAvailableDoctors,
} = require("../controllers/doctorControllers");
const auth = require("../middleware/auth");

router.post("/signup", signupDoctor);
router.post("/login", loginDoctor);
router.get("/getAllDoctors", getAllDoctors);
router.post("/addAvailability", auth, addAvailability);
router.get("/:doctorId/availability", getDoctorAvailability);

router.get("/available", getAvailableDoctors);

module.exports = router;
