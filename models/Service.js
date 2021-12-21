const mongoose = require("mongoose")
const Joi = require("joi")

const ServiceSchema = new mongoose.Schema({
  service: String,
})
const ServiceAddjoi = Joi.object({
  service: Joi.string().max(100).min(1).required(),
})
const ServiceEditjoi = Joi.object({
  service: Joi.string().max(100).min(1),
})
const Service = mongoose.model("Service", ServiceSchema)
module.exports.Service = Service
module.exports.ServiceAddjoi = ServiceAddjoi
module.exports.ServiceEditjoi = ServiceEditjoi
