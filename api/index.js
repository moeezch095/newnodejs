// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const dotenv = require("dotenv");

// const connectDB = require("../src/config/db");
// const userRoutes = require("../src/routes/userRoutes");
// const app = require("../src/app");

// dotenv.config();

// const app = express();

// // Middlewares
// app.use(cors());
// app.use(express.json());

// // Database connection
// connectDB();

// // Routes
// app.use("/api/users", userRoutes);

// // Default route
// app.get("/", (req, res) => {
//   res.send("Hello from Vercel Serverless API!");
// });

// // Export for Vercel
// module.exports = app;

// api/index.js
const serverless = require("serverless-http");
const app = require("../src/app");

module.exports = serverless(app);

