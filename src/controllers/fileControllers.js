// src/controllers/fileControllers.js
const multer = require("multer");
const cloudinary = require("cloudinary").v2;

// ✅ Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ 1. Memory Storage (instead of temp folder)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ✅ 2. Upload Controller
const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    // ✅ Convert file buffer to base64
    const base64 = req.file.buffer.toString("base64");
    const dataURI = `data:${req.file.mimetype};base64,${base64}`;

    // ✅ Upload directly to Cloudinary
    const result = await cloudinary.uploader.upload(dataURI, {
      folder: "uploads", // optional folder name in Cloudinary
    });

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
