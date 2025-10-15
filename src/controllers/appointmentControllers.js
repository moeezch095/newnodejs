const Appointment = require("../models/appointmentModel");

// user book appointment
exports.bookAppointment = async (req, res) => {
  try {
    const { doctorId, date, time } = req.body;
    const userId = req.user.id;

    const appointment = await Appointment.create({
      userId,
      doctorId,
      date,
      time,
      // status:"pending",
    });

    res.status(201).json({
      message: "Appointment Booked Successfully ",
      data: appointment,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  Doctor gets all appointments assigned to them
exports.getDoctorAppointments = async (req, res) => {
  try {
    const doctorId = req.user.id;

    const appointments = await Appointment.find({ doctorId })
      .populate("userId", "name email")
      .populate("doctorId", "name speciality");

    res.status(200).json({
      message: "Appointments fetched successfully!",
      count: appointments.length,
      data: appointments,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 3. Doctor accept/reject appointment

exports.updateAppointmentStatus = async (req, res) => {
  try {
    const { appointmentId, status } = req.body;

    if (!["Accepted", "Rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid Status" });
    }
    const appointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { status },
      { new: true }
    );
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found " });
    }

    res.status(200).json({
      message: "Appointment  successfully",
      data: appointment,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
