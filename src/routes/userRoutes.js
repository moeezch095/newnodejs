/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a new user
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
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User registered successfully
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
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
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
