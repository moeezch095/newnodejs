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
        day: {type: String, } ,
        date: { type: String,},
         startTime: {type: String},
        endTime: { type: String},
        timeSlots: [String],

      },
    ],
    isAvailability: { type: Boolean, default: false },

    Image : { type : String,},
  },

  { timestamps: true }
);
const Doctor = mongoose.model("Doctor", doctorSchema);
module.exports = Doctor;
