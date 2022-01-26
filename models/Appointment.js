const mongoose = require("mongoose")
const Joi = require("joi")

const AppointmentSchema = new mongoose.Schema({
  date: Date,
  time: String,
  Vaccines: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Vaccine",
    },
  ],
  Medicinerecords: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Medicinerecord",
    },
  ],
  Rays: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Ray",
    },
  ],
  Analyzings: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Analyzing",
    },
  ],
  MadacalFile: [
    {
      type: mongoose.Types.ObjectId,
      ref: "MadacalFile",
    },
  ],
  Blood: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Blood",
    },
  ],
  doctorId: {
    type: mongoose.Types.ObjectId,
    ref: "Doctor",
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
})

const AppointmentAddjoi = Joi.object({
  date: Joi.date().max(100).min(1).required(),
  time: Joi.string().min(1).max(1000).required(),
 
})
const AppointmentEditjoi = Joi.object({
  date: Joi.date().max(100).min(1),
  time: Joi.string().min(1).max(1000),

})
const Appointment = mongoose.model("Appointment", AppointmentSchema)
module.exports.Appointment = Appointment
module.exports.AppointmentAddjoi = AppointmentAddjoi
module.exports.AppointmentEditjoi = AppointmentEditjoi
// module.exports.AppointmentAddjoitime = AppointmentAddjoitime
// module.exports.AppointmentAddjoiday = AppointmentAddjoiday
