const mongoose = require("mongoose")
const Joi = require("joi")

const DoctorSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  specialization: String,
  certificate: String,
  image: {
    type: String,
    default: "https://cdn3.iconfinder.com/data/icons/professions-4-1/132/152-512.png",
  },
})
const DoctorAddjoi = Joi.object({
  firstName: Joi.string().max(100).min(1).required(),
  lastName: Joi.string().max(100).min(1).required(),
  specialization: Joi.string().min(4).max(1000).required(),
  certificate: Joi.string().min(4).max(1000).required(),
  image: Joi.string().uri(),
})
const DoctorEditjoi = Joi.object({
  firstName: Joi.string().max(100).min(1),
  lastName: Joi.string().max(100).min(1).required(),
  specialization: Joi.string().min(4).max(1000),
  certificate: Joi.string().min(4).max(1000),
  image: Joi.string().uri(),
})
const Doctor = mongoose.model("Doctor", DoctorSchema)
module.exports.Doctor = Doctor
module.exports.DoctorAddjoi = DoctorAddjoi
module.exports.DoctorEditjoi = DoctorEditjoi
