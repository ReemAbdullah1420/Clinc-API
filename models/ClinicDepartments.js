const mongoose = require("mongoose")
const Joi = require("joi")

const ClinicDepartmentsSchema = new mongoose.Schema({
  name: String,
  description: String,
  image: String,
  doctors: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Doctor",
    },
  ],
  services: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Service",
    },
  ],
})
const ClinicDepartmentsAddjoi = Joi.object({
  name: Joi.string().max(100).min(1).required(),
  description: Joi.string().min(4).max(1000).required(),
  image: Joi.string().uri().required(),
  doctors: Joi.array().items(Joi.ObjectId()).min(1).required(),
  services: Joi.array().items(Joi.ObjectId()).min(1).required(),
})
const ClinicDepartmentsEditjoi = Joi.object({
  name: Joi.string().max(100).min(1),
  description: Joi.string().min(4).max(1000),
  image: Joi.string().uri().required(),
  doctors: Joi.array().items(Joi.ObjectId()).min(1),
  services: Joi.array().items(Joi.ObjectId()).min(1),
})
const ClinicDepartments = mongoose.model("ClinicDepartments", ClinicDepartmentsSchema)
module.exports.ClinicDepartments = ClinicDepartments
module.exports.ClinicDepartmentsAddjoi = ClinicDepartmentsAddjoi
module.exports.ClinicDepartmentsEditjoi = ClinicDepartmentsEditjoi
