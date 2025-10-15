const mongoose = require("mongoose");
const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    speciality: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    education: {
      type: String,
      required: true,
    },
    availability: [
      {
        day: String,
        date: String,
        timeSlots: [String],
      },
    ],
  },

  { timestamps: true }
);
const Doctor = mongoose.model("Doctor", doctorSchema);
module.exports = Doctor;
