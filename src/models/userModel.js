const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String },
    password: { type: String },
    age: { type: Number },
    hobbies: { type: [String] },
    isActive: { type: Boolean },
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);
module.exports = User;
