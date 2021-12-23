const mongoose = require("mongoose")
const Joi = require("joi")

const ProgramSchema = new mongoose.Schema({
  title: String,
  image: String,
  description: String,
  services: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Service",
    },
  ],
  applicants: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  ],
})
const ProgramAddjoi = Joi.object({
  title: Joi.string().max(100).min(1).required(),
  image: Joi.string().max(100).min(1).required(),
  description: Joi.string().min(4).max(1000).required(),
  services: Joi.array().items(Joi.ObjectId()).min(1),
})

const ProgramEditjoi = Joi.object({
  title: Joi.string().max(100).min(1),
  image: Joi.string().max(100).min(1),
  description: Joi.string().min(4).max(1000),
  services: Joi.array().items(Joi.ObjectId()).min(1),
})
const Program = mongoose.model("Program", ProgramSchema)
module.exports.Program = Program
module.exports.ProgramAddjoi = ProgramAddjoi
module.exports.ProgramEditjoi = ProgramEditjoi
