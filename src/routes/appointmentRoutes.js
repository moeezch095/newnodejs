const express = require("express");
const router = express.Router();
const {
  bookAppointment,
  getDoctorAppointments,
  updateAppointmentStatus,
} = require("../controllers/appointmentControllers");

const auth = require("../middleware/auth");

router.post("/book", auth, bookAppointment);
router.get("/doctorAppointments", auth, getDoctorAppointments);
router.put("/updateStatus", auth, updateAppointmentStatus);

module.exports = router;
