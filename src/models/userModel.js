const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String },
    password: { type: String },
    age: { type: Number },
    hobbies: { type: [String] },
    isActive: { type: Boolean },
    resetToken: String,
    resetTokenExpire: Date,
    Image: { type: String },
  }

  // { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// const User = mongoose.model("User", userSchema);
module.exports = mongoose.model("User", userSchema);
