/**
 * @swagger
 * /api/users/signup:
 *   post:
 *     summary: signup a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Moeez
 *               email:
 *                 type: string
 *                 example: moeez@gmail.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: User created successfully
 */

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: User login
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: moeez@gmail.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 */

const express = require("express");
const router = express.Router();
const {
  createUser,
  getUser,
  updateUser,
  deleteUser,
  signup,
  login,
  forgotPassword,
  resetPassword,
  getAllUsers,
  getUserById,
} = require("../controllers/userControllers");
const { getAllDoctors } = require("../controllers/doctorControllers");

router.post("/createUser", createUser);
router.get("/getUser", getUser);
router.put("/updateUser", updateUser);
router.delete("/deleteUser", deleteUser);
router.post("/signup", signup);
router.post("/login", login);
router.post("/forgotPassword", forgotPassword);
router.post("/resetPassword", resetPassword);
router.get("/all", getAllUsers);
router.get("/", getUserById);
router.get("/getAllDoctors", getAllDoctors);

module.exports = router;
