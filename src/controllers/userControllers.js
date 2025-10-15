const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

exports.signup = async (req, res) => {
  try {
    const { name, email, password, age, hobbies, isActive } = req.body;

    // ✅ Check if email already exists
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // ✅ Create a new user
    const user = await User.create({
      name,
      email,
      password,
      age,
      hobbies, // example: ["reading", "cricket"]
      isActive, // true or false
    });

    // ✅ Response
    res.status(201).json({
      message: "Signup successful",
      data: user,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// login api
// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     console.log(req.body, "boddyyy from postman");
//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ message: "user not found" });
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch)
//       return res.status(400).json({ message: "invalid credentials" });
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "1h",
//     });
//     const { password: _, ...userWithoutPassword } = user._doc;
//     res.status(200).json({
//       message: "login successfully",
//       token,
//       user: userWithoutPassword,
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid email or password" });

    // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    //   expiresIn: "1h",
    // });

    // const safeUser = user.toObject();
    // delete safeUser.password;

    const jwt = require("jsonwebtoken");
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const safeUser = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    res.status(200).json({
      message: "Login successful",
      token,
      user: safeUser,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// forgot password api
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "user not found" });
    const token = Math.random().toString(36).substring(2, 15);
    user.resetToken = token;
    user.resetTokenExpire = Date.now() + 15 * 60 * 1000;
    await user.save();
    res.json({ message: "your token of forgot pass is here", token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// reset password api
exports.resetPassword = async (req, res) => {
  console.log("BODY:", req.body);

  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res
        .status(400)
        .json({ message: "Token and new password are required" });
    }

    const user = await User.findOne({
      resetToken: token,
      resetTokenExpire: { $gt: Date.now() },
    });
    if (!user)
      return res.status(400).json({ message: "invalid or expired token" });
    user.password = newPassword;
    await user.save();

    res.json({ message: "password reset successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// create

exports.createUser = async (req, res) => {
  try {
    const { name, email, password, age, hobbies } = req.body;
    const newUser = await User.create({ name, email, password, age, hobbies });
    res
      .status(201)
      .json({ message: " user created succesfully", data: newUser });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// read
exports.getUser = async (req, res) => {
  try {
    const users = await User.find();
    res.json({ count: users.length, data: users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.query;
    const { name, email, password } = req.body;

    if (!id) return res.status(400).json({ message: "User ID is required" });
    const user = await User.findByIdAndUpdate(
      id,
      { name, email, password },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: "user not found" });
    res.json({ message: "user updated succesfully", data: user });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// delete

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ message: "User ID is required" });
    }
    const user = await User.findByIdAndDelete(id);
    if (!user) return res.status(404).json({ message: "user  not found" });
    res.json({ message: " user deleted succesfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      message: " all users fetched successfully",
      count: users.length,
      data: users,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get single user by id
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.query;
    if (!id) return res.status(400).json({ message: "User ID required" });

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
      // llllllllllllll
    }
    res.status(200).json({
      message: " user fetched succesfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
