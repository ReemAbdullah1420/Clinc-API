const mongoose = require("mongoose")
const Joi = require("joi")

const MessageSchema = new mongoose.Schema({
  message: String,
  doctorId: {
    type: mongoose.Types.ObjectId,
    ref: "Doctor",
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
})
const MessageAddjoi = Joi.object({
  message: Joi.string().max(100).min(1).required(),
})
const MessageEditjoi = Joi.object({
  message: Joi.string().max(100).min(1),
})
const Message = mongoose.model("Message", MessageSchema)
module.exports.Message = Message
module.exports.MessageAddjoi = MessageAddjoi
module.exports.MessageEditjoi = MessageEditjoi
