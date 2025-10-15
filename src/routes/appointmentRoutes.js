const express = require("express");
const router = express.Router();
const {
  bookAppointment,
  getDoctorAppointments,
  confirmAppointmentStatus,
  getUserAppointments,
} = require("../controllers/appointmentControllers");

const auth = require("../middleware/auth");

router.post("/book", auth, bookAppointment);
router.get("/doctorAppointments", auth, getDoctorAppointments);
router.put("/ConfirmStatus", auth, confirmAppointmentStatus);
router.get("/userAppointments", auth, getUserAppointments);

module.exports = router;
