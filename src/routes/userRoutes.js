const express = require("express");
const {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
} = require("../controllers/userControllers");

const router = express.Router();
router.post("/createUser", createUser);
router.get("/getUser", getUsers);
router.put("/updateUser", updateUser);
router.delete("/deleteUser", deleteUser);

module.exports = router;
