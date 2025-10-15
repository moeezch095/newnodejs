const Doctor = require("../models/doctorModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//sign up
exports.signupDoctor = async (req, res) => {
  try {
    const { name, email, password, speciality, experience, education } =
      req.body;

    const existingDoctor = await Doctor.findOne({ email });
    if (existingDoctor) {
      return res.status(400).json({ message: "Doctor already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const doctor = await Doctor.create({
      name,
      email,
      password: hashedPassword,
      speciality,
      experience,
      education,
    });

    res.status(201).json({
      message: "Doctor registered successfully",
      data: doctor,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// login

exports.loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;
    const doctor = await Doctor.findOne({ email });
    if (!doctor) {
      return res.status(404).json({ message: " Doctor not found " });
    }
    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      message: "login successful ",
      token,
      doctor,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get all doctors
exports.getAllDoctors = async (req, res) => {
  try {
    const { speciality, education, experience } = req.query;

    const query = {};
    if (speciality) query.speciality = { $regex: speciality, $options: "i" };
    if (education) query.education = { $regex: education, $options: "i" };
    if (experience) query.experience = experience;

    const doctors = await Doctor.find(query);

    res.status(200).json({
      message: "All doctors fetch successfully ",
      count: doctors.length,
      data: doctors,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// doctor apni availability set karay ga

exports.addAvailability = async (req, res) => {
  try {
    const doctorId = req.user.id;
    const { availability } = req.body;

    const doctor = await Doctor.findByIdAndUpdate(
      doctorId,
      { availability },
      { new: true }
    );
    res
      .status(200)
      .json({
        message: "Availability set successfully ",
        data: doctor.availability,
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// user doctor ke availability dekh  sakay

exports.getDoctorAvailability = async (req, res) => {
  try {
    const doctorId = req.params.doctorId;
    const doctor = await Doctor.findById(doctorId).select(
      "name speciality availability"
    );

    if (!doctor) res.status(404).json({ message: " Doctor not found " });
    res
      .status(200)
      .json({
        message: "Doctor availability fetched successfully!",
        data: doctor.availability,
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
