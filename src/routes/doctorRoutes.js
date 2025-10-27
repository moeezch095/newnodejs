/**
 * @swagger
 * tags:
 *   name: Doctors
 *   description: Doctor management APIs
 */

/**
 * @swagger
 * /api/doctors/signup:
 *   post:
 *     summary: Register a new doctor
 *     tags: [Doctors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               specialization:
 *                 type: string
 *     responses:
 *       200:
 *         description: Doctor registered successfully
 */

/**
 * @swagger
 * /api/doctors/login:
 *   post:
 *     summary: Doctor login
 *     tags: [Doctors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 */

/**
 * @swagger
 * /api/doctors/getAllDoctors:
 *   get:
 *     summary: Get all doctors
 *     tags: [Doctors]
 *     responses:
 *       200:
 *         description: List of all doctors
 */

/**
 * @swagger
 * /api/doctors/addAvailability:
 *   post:
 *     summary: Add doctor's availability
 *     tags: [Doctors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               doctorId:
 *                 type: string
 *               date:
 *                 type: string
 *                 example: 2025-10-25
 *               timeSlots:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["10:00", "11:00"]
 *     responses:
 *       200:
 *         description: Availability added successfully
 */





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
