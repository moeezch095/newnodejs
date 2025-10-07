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

router.post("/createUser", createUser);
router.get("/getUser", getUser);
router.put("/updateUser", updateUser);
router.delete("/deleteUser", deleteUser);
router.post("/signup", signup);
router.post("/login", login);
router.post("/forgotPassword", forgotPassword);
router.post("/resetPassword/", resetPassword);
router.get("/all", getAllUsers);
router.get("/:id", getUserById);
module.exports = router;
