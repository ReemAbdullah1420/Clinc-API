const mongoose = require("mongoose")
const Joi = require("joi")

const RaySchema = new mongoose.Schema({
  rayName: {
    type: String,
    default: "There are no data",
  },
  rayImage: {
    type: String,
    default: "There are no data",
  },
})
const RayAddjoi = Joi.object({
  rayName: Joi.string().max(100).min(1).required(),
  rayImage: Joi.string().uri().max(1000).required(),
})
const RayEditjoi = Joi.object({
  rayName: Joi.string().max(100).min(1),
  rayImage: Joi.string().uri().max(1000),
})
const Ray = mongoose.model("Ray", RaySchema)
module.exports.Ray = Ray
module.exports.RayAddjoi = RayAddjoi
module.exports.RayEditjoi = RayEditjoi
