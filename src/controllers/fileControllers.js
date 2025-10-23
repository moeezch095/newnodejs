const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

// 🔧 Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 🗂️ Storage directly to Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "uploads", // Folder name in Cloudinary
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

const upload = multer({ storage });

// 📤 Controller
const uploadImage = async (req, res) => {
  try {
    console.log("File received:", req.file);

    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    res.json({
      message: "Image uploaded successfully!",
      url: req.file.path, // Cloudinary URL
    });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ message: "Upload failed", error: err.message });
  }
};

module.exports = { upload, uploadImage };
