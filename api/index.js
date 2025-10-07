const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");

dotenv.config();
connectDB();
const app = express();

app.use(cors());
// app.use(bodyParser.json());
// app.use(express.json());
app.use(express.json());
app.use("/api/users", userRoutes);

mongoose.connect(process.env.MONGO_URI);

app.get("/", (req, res) => {
  res.send("Hello World! Server is working ");
});
app.listen(8080, function () {
  console.log("server is running");
});
