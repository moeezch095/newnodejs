// ✅ 1. Required packages sabse pehle import karo
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const fileRoutes = require("./routes/fileRoutes");
const path = require("path")

// ✅ 2. Config environment variables
dotenv.config();

// ✅ 3. App create karo sabse pehle
const app = express();

// ✅ 4. Middlewares
app.use(express.json());
app.use(cors());
app.use("/upload", express.static(path.join(__dirname, "..", "upload")));

// ✅ 5. Routes import karo ab
const userRoutes = require("./routes/userRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");

// ✅ 6. Use routes
app.use("/api/users", userRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);

// ✅ 7. Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Database connected successfully"))
  .catch((err) => console.log("❌ Database connection error:", err));

// ✅ 8. Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
