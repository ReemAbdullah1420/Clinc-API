const mongoose = require("mongoose")
const Joi = require("joi")

const VaccineSchema = new mongoose.Schema({
  vaccineType: {
    type: String,
    default: "There are no data",
  },
  doseDate: Date,
})
const VaccineAddjoi = Joi.object({
  vaccineType: Joi.string().max(100).min(1).required(),
  doseDate: Joi.date().required(),
})
const VaccineEditjoi = Joi.object({
  vaccineType: Joi.string().max(100).min(1),
  doseDate: Joi.date(),
})
const Vaccine = mongoose.model("Vaccine", VaccineSchema)
module.exports.Vaccine = Vaccine
module.exports.VaccineAddjoi = VaccineAddjoi
module.exports.VaccineEditjoi = VaccineEditjoi
