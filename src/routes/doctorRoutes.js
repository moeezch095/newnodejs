const express = require("express");
const router = express.Router();
const {
  signupDoctor,
  loginDoctor,
  getAllDoctors,
} = require("../controllers/doctorControllers");

router.post("/signup", signupDoctor);
router.post("/login", loginDoctor);
router.get("/getAllDoctors", getAllDoctors);


module.exports = router;
