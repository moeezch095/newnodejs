// src/routes/fileRoutes.js
const express = require("express");
const router = express.Router();
const { upload, uploadImage } = require("../controllers/fileControllers");

// ✅ POST /api/file/uploadfile
router.post("/uploadfile", upload.single("image"), uploadImage);

module.exports = router;
