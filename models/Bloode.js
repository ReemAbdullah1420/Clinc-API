const mongoose = require("mongoose")
const Joi = require("joi")

const BloodSchema = new mongoose.Schema({
  bloodType: String,
  bloodDonor: String,
  NextDonationDate: Date,
  lastDonationDate: Date,
})
const BloodAddjoi = Joi.object({
  bloodType: Joi.string().max(100).min(1).required(),
  bloodDonor: Joi.string.max(100).min(1).required(),
  NextDonationDate: Joi.date().min(4).max(1000).required(),
  lastDonationDate: Joi.date().min(10).max(11).required(),
})
const BloodEditjoi = Joi.object({
  bloodType: Joi.string().max(100).min(1),
  bloodDonor: Joi.string.max(100).min(1),
  NextDonationDate: Joi.date().min(4).max(1000),
  lastDonationDate: Joi.date().min(10).max(11),
})
const Blood = mongoose.model("Blood", BloodSchema)
module.exports.Blood = Blood
module.exports.BloodAddjoi = BloodAddjoi
module.exports.BloodEditjoi = BloodEditjoi
