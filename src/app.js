// src/app.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// ✅ Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Load env variables
dotenv.config();

const app = express();

// ✅ Middlewares
app.use(express.json());
app.use(cors());

// ✅ Serve static uploads folder (if you store locally)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Import routes (extension .js is REQUIRED in ESM)
import userRoutes from "./routes/userRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import fileRoutes from "./routes/fileRoutes.js";

// ✅ Use routes
app.use("/api/users", userRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/file", fileRoutes);

// ✅ Connect MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Database connected successfully"))
  .catch((err) => console.log("❌ Database connection error:", err));

// ✅ Start Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, "192.168.1.34", () => {
  console.log(`🚀 Server running on http://192.168.1.34:${PORT}`);
});
