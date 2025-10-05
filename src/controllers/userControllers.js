const User = require("../models/userModel");

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
exports.getUsers = async (req, res) => {
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
    const user = await User.findByIdAndUpdate(req.query.id, req.body, {
      new: true,
    });
    if (!user) return res.status(404).json({ message: "user not found" });
    res.json({ message: "user updated succesfully", data: user });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// delete

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.query.id);
    if (!user) return res.status(404).json({ message: "user  not found" });
    res.json({ message: " user deleted succesfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
