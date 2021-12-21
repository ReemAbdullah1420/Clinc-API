const mongoose = require("mongoose")
const Joi = require("joi")

const MadacalFileSchema = new mongoose.Schema({
  gender: String,
  bloodType: String,
  nationality: String,
  mobilePhone: Number,
  age: Number,
  IdNumber: Number,
  dateFile: Date,
  sensitivity: String,
})
const MadacalFileAddjoi = Joi.object({
  gender: Joi.string().max(100).min(1).required(),
  nationality: Joi.string().max(100).min(1).required(),
  bloodType: Joi.string().max(100).min(1).required(),
  sensitivity: Joi.string.max(100).min(1).required(),
  mobilePhone: Joi.number().min(10).required(),
  IdNumber: Joi.number().min(11).required(),
  age: Joi.number().min(3).required(),
  dateFile: Joi.date().required(),
})
const MadacalFileEditjoi = Joi.object({
  gender: Joi.string().max(100).min(1),
  nationality: Joi.string().max(100).min(1),
  bloodType: Joi.string().max(100).min(1),
  sensitivity: Joi.string.max(100).min(1),
  mobilePhone: Joi.number().min(10),
  IdNumber: Joi.number().min(11),
  age: Joi.number().min(3),
  dateFile: Joi.date(),
})

const MadacalFile = mongoose.model("MadacalFile", MadacalFileSchema)
module.exports.MadacalFile = MadacalFile
module.exports.MadacalFileAddjoi = MadacalFileAddjoi
module.exports.MadacalFileEditjoi = MadacalFileEditjoi
