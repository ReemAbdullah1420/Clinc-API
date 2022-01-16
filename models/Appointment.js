const mongoose = require("mongoose")
const Joi = require("joi")

const AppointmentSchema = new mongoose.Schema({
  date: Date,
  time: String,
  Day: String,
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
  day: Joi.string().min(1).max(1000).required(),
})
const AppointmentEditjoi = Joi.object({
  date: Joi.date().max(100).min(1),
  time: Joi.string().min(1).max(1000),
  day: Joi.string().min(1).max(1000),
})
const Appointment = mongoose.model("Appintment", AppointmentSchema)
module.exports.Appointment = Appointment
module.exports.AppointmentAddjoi = AppointmentAddjoi
module.exports.AppointmentEditjoi = AppointmentEditjoi
