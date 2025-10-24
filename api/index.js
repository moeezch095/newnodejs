// api/index.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const connectDB = require("../src/config/db");

// ✅ Load env
dotenv.config();

// ✅ App init
const app = express();
app.use(express.json());
app.use(cors());

// ✅ Connect MongoDB
connectDB();

// ✅ Static folder (for local or uploaded files)
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

// ✅ Swagger Docs
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

// 👇 IMPORTANT FIX: Absolute path use karo (vercel handle kar sakta hai)
const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Doctor & User Appointment API",
      version: "1.0.0",
      description: "API documentation for Doctor and User Appointment App",
    },
    servers: [
      {
        url: "https://docanduser.vercel.app", // 👈 apna deployed URL
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  // 👇 Absolute path fix for Vercel
  apis: [path.join(__dirname, "../src/routes/*.js")],
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req, res) => {
  res.send("🚀 API is running successfully on Vercel!");
});

// ✅ Export for Vercel
module.exports = app;
