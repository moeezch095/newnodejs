// src/controllers/fileControllers.js
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

// ✅ Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ Temporary local upload folder for multer
const upload = multer({ dest: "temp/" });

// ✅ Upload Controller
const uploadImage = async (req, res) => {
  try {
    // Check if file provided
    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    // ✅ Upload to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    // ✅ Delete local temp file
    fs.unlinkSync(req.file.path);

    // ✅ Send response
    res.status(200).json({
      message: "Image uploaded successfully!",
      url: result.secure_url,
    });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ message: "Upload failed", error: err.message });
  }
};

module.exports = { upload, uploadImage };
