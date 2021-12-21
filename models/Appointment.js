const mongoose = require("mongoose")
const Joi = require("joi")

const AppointmentSchema = new mongoose.Schema({
  clincname: String,
  date: Date,
  time: Number,
  numerPhone: Number,
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
  clincname: Joi.string().max(100).min(1).required(),
  date: Joi.date().max(100).min(1).required(),
  time: Joi.number().min(4).max(1000).required(),
  numerPhone: Joi.number().min(10).max(11).required(),
})
const AppointmentEditjoi = Joi.object({
  clincname: Joi.string().max(100).min(1),
  date: Joi.date().max(100).min(1),
  time: Joi.number().min(4).max(1000),
  numerPhone: Joi.number().min(10).max(11),
})
const Appointment = mongoose.model("Apply", ApplySchema)
module.exports.Appointment=Appointment
module.exports.AppointmentAddjoi=AppointmentAddjoi
module.exports.AppointmentEditjoi=AppointmentEditjoi
