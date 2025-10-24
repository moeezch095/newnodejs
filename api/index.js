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

// ✅ Swagger Setup (💥 this is the main fix)
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const fs = require("fs");

// 👇 Dynamic routes path fix (works on vercel)
let routesPath;
try {
  routesPath = fs.existsSync(path.join(process.cwd(), "src/routes"))
    ? path.join(process.cwd(), "src/routes/*.js")
    : path.join(__dirname, "../src/routes/*.js");
} catch (err) {
  console.error("Path resolution failed:", err);
}

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Doctor & User Appointment API",
      version: "1.0.0",
      description: "Swagger Docs for Doctor & User APIs",
    },
    servers: [
      { url: "https://docanduser.vercel.app" }, // 👈 deployed URL
      { url: "http://localhost:8080" } // 👈 local test URL
    ],
  },
  apis: [routesPath],
};

let swaggerSpec;
try {
  swaggerSpec = swaggerJsdoc(swaggerOptions);
  console.log("✅ Swagger generated successfully");
} catch (err) {
  console.error("❌ Swagger generation failed:", err);
}

if (swaggerSpec) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log("✅ Swagger docs available at /api-docs");
}

// ✅ Root test route
app.get("/", (req, res) => {
  res.send("🚀 API running successfully! Check /api-docs for Swagger.");
});

// ✅ Export app for Vercel
module.exports = app;
