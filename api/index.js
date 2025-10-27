// api/index.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");

// ✅ Load env
dotenv.config();

// ✅ Express init
const app = express();
app.use(express.json());
app.use(cors());

// ✅ MongoDB connect
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ Mongo connection error:", err));

// ✅ Routes import
const userRoutes = require("../src/routes/userRoutes");
const doctorRoutes = require("../src/routes/doctorRoutes");
const appointmentRoutes = require("../src/routes/appointmentRoutes");
const fileRoutes = require("../src/routes/fileRoutes");

// ✅ Routes use
app.use("/api/users", userRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/file", fileRoutes);




// ✅ Root test route
app.get("/", (req, res) => {
  res.send("🚀 API running successfully!.");
});

// ✅ Export app for Vercel
module.exports = app;
