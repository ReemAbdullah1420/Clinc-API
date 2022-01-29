const mongoose = require("mongoose")
const Joi = require("joi")

const BloodSchema = new mongoose.Schema({
  bloodType: {
    type: String,
    default: "There are no data",
  },
  bloodDonor: {
    type: String,
    default: "There are no data",
  },
 
})
const BloodAddjoi = Joi.object({
  bloodType: Joi.string().max(100).min(1).required(),
  bloodDonor: Joi.string().max(100).min(1).required(),

})
const BloodEditjoi = Joi.object({
  bloodType: Joi.string().max(100).min(1),
  bloodDonor: Joi.string().max(100).min(1),
 
})
const Blood = mongoose.model("Blood", BloodSchema)
module.exports.Blood = Blood
module.exports.BloodAddjoi = BloodAddjoi
module.exports.BloodEditjoi = BloodEditjoi
