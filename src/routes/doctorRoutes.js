/**
 * @swagger
 * tags:
 *   name: Doctors
 *   description: Doctor management APIs
 */

/**
 * @swagger
 * /api/doctors:
 *   get:
 *     summary: Get all doctors
 *     tags: [Doctors]
 *     responses:
 *       200:
 *         description: List of all doctors
 */

/**
 * @swagger
 * /api/doctors/{id}:
 *   get:
 *     summary: Get doctor by ID
 *     tags: [Doctors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Doctor details found
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
