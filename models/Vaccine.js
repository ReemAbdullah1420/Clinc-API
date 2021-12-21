const mongoose = require("mongoose")
const Joi = require("joi")

const VaccineSchema = new mongoose.Schema({
  vaccineType: String,
  doseDate: Date,
})
const VaccineAddjoi = Joi.object({
  vaccineType: Joi.string().max(100).min(1).required(),
  doseDate: Joi.date().min(10).max(11).required(),
})
const VaccineEditjoi = Joi.object({
  vaccineType: Joi.string().max(100).min(1),
  doseDate: Joi.date().min(10).max(11),
})
const Vaccine = mongoose.model("Vaccine", VaccineSchema)
module.exports.Vaccine = Vaccine
module.exports.VaccineAddjoi = VaccineAddjoi
module.exports.VaccineEditjoi = VaccineEditjoi
