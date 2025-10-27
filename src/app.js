const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
// const connectDB = require("./config/db");


dotenv.config();
const app = express();


// ✅ Middlewares
app.use(express.json());
app.use(cors());

// ✅ Static files (optional)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Import routes
const userRoutes = require("./routes/userRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const fileRoutes = require("./routes/fileRoutes");

// ✅ Use routes
app.use("/api/users", userRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/file", fileRoutes);

// ✅ Connect MongoDB
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("✅ Database connected successfully"))
//   .catch((err) => console.log("❌ Database connection error:", err));

// ✅ Swagger Docs (use the one you created in /swagger/swagger.js)
const swaggerDocs = require("./swagger/swagger");
const connectDB = require("./config/db");
swaggerDocs(app);
connectDB();

// ✅ Start Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, "192.168.1.34", () => {
  console.log(`🚀 Server running on http://192.168.1.34:${PORT}`);
});
