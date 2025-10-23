// api/index.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

// ✅ Load env variables
dotenv.config();

const app = express();

// ✅ Middlewares
app.use(express.json());
app.use(cors());

// ✅ Serve static uploads folder (optional, for local testing)
app.use("/uploads", express.static(path.join(__dirname, "../src/uploads")));

// ✅ Import routes
const userRoutes = require("../src/routes/userRoutes");
const doctorRoutes = require("../src/routes/doctorRoutes");
const appointmentRoutes = require("../src/routes/appointmentRoutes");
const fileRoutes = require("../src/routes/fileRoutes");

// ✅ Use routes
app.use("/api/users", userRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/file", fileRoutes);

// ✅ MongoDB connection (connect only once)
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.log("❌ MongoDB connection error:", err));

// ✅ Export handler for Vercel (no need for app.listen)
module.exports = app;
