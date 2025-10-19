const Doctor = require("../models/doctorModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//sign up
exports.signupDoctor = async (req, res) => {
  try {
    const { name, email, password, speciality, experience, education, image } =
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
      image,
    });
    // Agar speciality provided hai to isAvailability = true
    if (speciality) {
      doctor.isAvailability = true;
      await doctor.save();
    }

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
      { availability, isAvailability: true },
      { new: true }
    );
    res.status(200).json({
      message: "Availability set successfully ",
      data: doctor.availability,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ User doctor ki availability dekh sakta hai
exports.getDoctorAvailability = async (req, res) => {
  try {
    const doctorId = req.params.doctorId;

    // Doctor find karo aur sirf name, speciality aur availability fields lo
    const doctor = await Doctor.findById(doctorId).select(
      "name speciality availability"
    );

    // Agar doctor na mile
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Filter karo — sirf future ya active availability show karo
    const today = new Date();
    const validAvailability = doctor.availability.filter((slot) => {
      if (!slot.date) return true; // agar date field nahi hai to show kar do
      return new Date(slot.date) >= today;
    });

    res.status(200).json({
      message: "Doctor availability fetched successfully!",
      doctor: {
        name: doctor.name,
        speciality: doctor.speciality,
      },
      availability: validAvailability,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get all doctors available on a specific day
exports.getAvailableDoctors = async (req, res) => {
  try {
    const { day } = req.query;

    if (!day) {
      return res
        .status(400)
        .json({ message: "Please provide a day in query (e.g. ?day=Monday)" });
    }

    const doctors = await Doctor.find({ "availability.day": day }).select(
      "name speciality availability"
    );

    if (!doctors.length) {
      return res.status(404).json({
        message: `No doctors available on ${day}`,
      });
    }

    res.status(200).json({
      message: `Doctors available on ${day}`,
      count: doctors.length,
      data: doctors,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
