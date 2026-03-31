const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db"); 
const swaggerDocs = require("./swagger/swagger");

dotenv.config();
const app = express();

// Connect MongoDB before anything else
connectDB();

//  Middlewares
app.use(express.json());
app.use(cors());

//  Static files (optional)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//  Import routes
const userRoutes = require("./routes/userRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const fileRoutes = require("./routes/fileRoutes");

//  Use routes
app.use("/api/users", userRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/file", fileRoutes);

// Swagger Docs
swaggerDocs(app);

//  Start Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server running on ${PORT}`);
});





// "192.168.1.34"
// http://192.168.1.34: