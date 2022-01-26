const mongoose = require("mongoose")
const Joi = require("joi")

const MedicineRecordSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "There are no data",
  },
  strength: {
    type: String,
    default: "There are no data",
  },
  dosageForm: {
    type: String,
    default: "There are no data",
  },
  routeOfAdministration: {
    type: String,
    default: "There are no data",
  },
  packageSize: Number,
})
const MedicineRecordAddjoi = Joi.object({
  name: Joi.string().max(100).min(1).required(),
  strength: Joi.string().max(100).min(2).required(),
  dosageForm: Joi.string().max(100).min(2).required(),
  routeOfAdministration: Joi.string().max(100).min(2).required(),
  packageSize: Joi.number().required(),
})
const MedicineRecordEditjoi = Joi.object({
  name: Joi.string().max(100).min(1),
  strength: Joi.string().max(100).min(2),
  dosageForm: Joi.string().max(100).min(2),
  routeOfAdministration: Joi.string().max(100).min(2),
  packageSize: Joi.number(),
})
const MedicineRecord = mongoose.model("Medicinerecord", MedicineRecordSchema)
module.exports.MedicineRecord = MedicineRecord
module.exports.MedicineRecordAddjoi = MedicineRecordAddjoi
module.exports.MedicineRecordEditjoi = MedicineRecordEditjoi
