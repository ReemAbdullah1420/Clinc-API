const mongoose = require("mongoose")
const Joi = require("joi")

const AnalyzingSchema = new mongoose.Schema({
  analysisName: {
    type: String,
    default: "There are no data",
  },
  value: {
    type: String,
    default: "There are no data",
  },
  normalValue: {
    type: String,
    default: "There are no data",
  },
  explanation: {
    type: String,
    default: "There are no data",
  },
})
const AnalyzingAddjoi = Joi.object({
  analysisName: Joi.string().max(100).min(1).required(),
  value: Joi.string().max(100).min(1).required(),
  normalValue: Joi.string().min(2).max(100).required(),
  explanation: Joi.string().min(2).max(100).required(),
})
const AnalyzingEditjoi = Joi.object({
  analysisName: Joi.string().max(100).min(1),
  value: Joi.string().max(100).min(1),
  normalValue: Joi.string().min(2).max(100),
  explanation: Joi.string().min(2).max(100),
})
const Analyzing = mongoose.model("Analyzing", AnalyzingSchema)
module.exports.Analyzing = Analyzing
module.exports.AnalyzingAddjoi = AnalyzingAddjoi
module.exports.AnalyzingEditjoi = AnalyzingEditjoi
