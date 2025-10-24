/**
 * @swagger
 * tags:
 *   name: Appointments
 *   description: Appointment related APIs
 */

/**
 * @swagger
 * /api/appointments:
 *   get:
 *     summary: Get all appointments
 *     tags: [Appointments]
 *     responses:
 *       200:
 *         description: List of appointments
 */

/**
 * @swagger
 * /api/appointments:
 *   post:
 *     summary: Create a new appointment
 *     tags: [Appointments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               doctorId:
 *                 type: string
 *               date:
 *                 type: string
 *                 example: 2025-10-24
 *     responses:
 *       200:
 *         description: Appointment created successfully
 */





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
