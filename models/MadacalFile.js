const mongoose = require("mongoose")
const Joi = require("joi")

const MadacalFileSchema = new mongoose.Schema({
  gender: String,
  bloodType: {
    type: String,
    default: "There are no data",
  },
  nationality: String,
  mobilePhone: Number,
  age: String,
  fileNumber: String,
  sensitivity: String,
})
const MadacalFileAddjoi = Joi.object({
  gender: Joi.string().max(100).min(1).required(),
  nationality: Joi.string().max(100).min(1).required(),
  bloodType: Joi.string().max(100).min(1).required(),
  sensitivity: Joi.string().max(100).min(1).required(),
  mobilePhone: Joi.number().min(10).required(),
  fileNumber: Joi.string().min(5).required(),
  age: Joi.string().min(1).required(),
})
const MadacalFileEditjoi = Joi.object({
  gender: Joi.string().max(100).min(1),
  nationality: Joi.string().max(100).min(1),
  bloodType: Joi.string().max(100).min(1),
  sensitivity: Joi.string().max(100).min(1),
  mobilePhone: Joi.number().min(10),
  fileNumber: Joi.string().min(5),
  age: Joi.string().min(1),
})

const MadacalFile = mongoose.model("MadacalFile", MadacalFileSchema)
module.exports.MadacalFile = MadacalFile
module.exports.MadacalFileAddjoi = MadacalFileAddjoi
module.exports.MadacalFileEditjoi = MadacalFileEditjoi
