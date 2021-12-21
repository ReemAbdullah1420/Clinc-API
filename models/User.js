const mongoose = require("mongoose")
const Joi = require("joi")

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  //   emailVerified: {
  //     type: Boolean,
  //     default: false,
  //   },
  password: String,
  image: String,
  specialization: String,
  certificate: String,
  Appointments: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Appointment",
    },
  ],
  Vaccines: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Vaccine",
    },
  ],
  Medicinerecords: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Medicinerecord",
    },
  ],
  Rays: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Ray",
    },
  ],
  Analyzings: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Analyzing",
    },
  ],
  MadacalFile: [
    {
      type: mongoose.Types.ObjectId,
      ref: "MadacalFile",
    },
  ],
  Bloode: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Bloode",
    },
  ],
  Apply: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Apply",
    },
  ],
  role: {
    type: String,
    enum: ["User", "Admin", "Doctor"],
    default: "User",
  },
})
const signupJoi = Joi.object({
  firstName: Joi.string().min(2).max(100).required(),
  lastName: Joi.string().min(2).max(100).required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .max(100)
    .required(),
  password: Joi.string().min(2).max(100).required(),
  image: Joi.string().uri().min(2).max(1000).required(),
})
const singupdoctorJoi = Joi.object({
  firstName: Joi.string().min(2).max(100).required(),
  lastName: Joi.string().min(2).max(100).required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .max(100)
    .required(),
  password: Joi.string().min(2).max(100).required(),
  image: Joi.string().uri().min(2).max(1000).required(),
  specialization: Joi.string().min(2).max(100).required(),
})
const logindoctorJoi = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .max(100)
    .required(),
  password: Joi.string().min(2).max(100).required(),
})
const loginJoi = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .max(100)
    .required(),
  password: Joi.string().min(2).max(100).required(),
})
const profileJoi = Joi.object({
  firstName: Joi.string().min(2).max(100),
  lastName: Joi.string().min(2).max(100),
  password: Joi.string().min(6).max(100),
  image: Joi.string().uri().min(6).max(100),
  Appointments: Joi.array().items(Joi.ObjectId()).min(1),
  Vaccines: Joi.array().items(Joi.ObjectId()).min(1),
  Medicinerecords: Joi.array().items(Joi.ObjectId()).min(1),
  Rays: Joi.array().items(Joi.ObjectId()).min(1),
  Analyzings: Joi.array().items(Joi.ObjectId()).min(1),
  MadacalFile: Joi.array().items(Joi.ObjectId()).min(1),
  Bloode: Joi.array().items(Joi.ObjectId()).min(1),
})
const User = mongoose.model("User", userSchema)
module.exports.User = User
module.exports.signupJoi = signupJoi
module.exports.loginJoi = loginJoi
module.exports.profileJoi = profileJoi
