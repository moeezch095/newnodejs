const express = require("express");
const path = require("path");
const cors = require("cors");
require("dotenv").config();
const userRoutes = require("../src/routes/userRoutes");
const doctorRoutes = require("../src/routes/doctorRoutes");
const fileRoutes = require("../src/routes/fileRoutes");
const connectDB = require("../config/db");
// :white_tick: Connect MongoDB
connectDB();
// :white_tick: Initialize app
const app = express();
// :white_tick: Strong CORS fix for localhost + Vercel frontend
const corsOptions = {
  origin: [
    "http://localhost:5173", // for local frontend
    "https://yourfrontend.vercel.app", // replace with your real frontend URL
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
// :white_tick: Use CORS globally
app.use(cors(corsOptions));
// :white_tick: Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// :white_tick: Static uploads
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
// :white_tick: Routes
app.use("/api/user", userRoutes);
app.use("/api/doctor", doctorRoutes);
app.use("/api/file", fileRoutes);
// :white_tick: Root route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Custom Backend API (Deployed on Vercel)" });
});
// :white_tick: Error handler
app.use((err, req, res, next) => {
  console.error("Server Error:", err.message);
  res
    .status(500)
    .json({ message: "Something went wrong!", error: err.message });
});
// :white_tick: Export app (Vercel requires export, not app.listen)
module.exports = app;
