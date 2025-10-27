/**
 * @swagger
 * tags:
 *   name: Appointments
 *   description: Appointment related APIs
 */

/**
 * @swagger
 * /api/appointments/book:
 *   post:
 *     summary: Book a new appointment
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
 *                 example: 2025-10-25
 *     responses:
 *       200:
 *         description: Appointment created successfully
 */

/**
 * @swagger
 * /api/appointments/doctorAppointments:
 *   get:
 *     summary: Get doctor’s appointments
 *     tags: [Appointments]
 *     responses:
 *       200:
 *         description: Doctor’s appointment list
 */

/**
 * @swagger
 * /api/appointments/ConfirmStatus:
 *   put:
 *     summary: Confirm or update appointment status
 *     tags: [Appointments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               appointmentId:
 *                 type: string
 *               status:
 *                 type: string
 *                 example: confirmed
 *     responses:
 *       200:
 *         description: Status updated successfully
 */

/**
 * @swagger
 * /api/appointments/userAppointments:
 *   get:
 *     summary: Get user's appointments
 *     tags: [Appointments]
 *     responses:
 *       200:
 *         description: List of user's appointments
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
