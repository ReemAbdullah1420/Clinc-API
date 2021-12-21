const mongoose = require("mongoose")
const Joi = require("joi")

const ApplySchema = new mongoose.Schema({
  firstName: String,
  lastname: String,
  gender: String,
  numerPhone: Number,
})
const ApplyAddjoi = Joi.object({
  firstName: Joi.string().max(100).min(1).required(),
  lastname: Joi.string().max(100).min(1).required(),
  gender: Joi.string().min(4).max(1000).required(),
  numerPhone: Joi.number().min(10).max(11).required(),
})
const ApplyEditjoi = Joi.object({
  firstName: Joi.string().max(100).min(1),
  lastname: Joi.string().max(100).min(1),
  gender: Joi.string().min(4).max(1000),
  numerPhone: Joi.number.min(10).max(11),
})
const Apply = mongoose.model("Apply", ApplySchema)
module.exports.Apply = Apply
module.exports.ApplyAddjoi = ApplyAddjoi
module.exports.ApplyEditjoi = ApplyEditjoi
