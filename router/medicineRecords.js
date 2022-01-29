const express = require("express")
const router = express.Router()
const checkDoctor = require("../middelwear/checkDoctor")
const checkId = require("../middelwear/checkId")
const validatebody = require("../middelwear/validateboody")
const { Appointment } = require("../models/Appointment")
const { MedicineRecord, MedicineRecordAddjoi, MedicineRecordEditjoi } = require("../models/MedicineRecord")
const { User } = require("../models/User")

//-------------------------get MedicineRecord--------------------------
router.get("/", async (req, res) => {
  try {
    const medicineRecord = await MedicineRecord.find().select("-__v")
    res.json(medicineRecord)
  } catch (error) {
    return res.status(500).send(error.message)
  }
})
//-----------------------get byId MedicineRecord------------------------
router.get("/:id", checkId, checkDoctor, async (req, res) => {
  const medicineRecord = await MedicineRecord.findById(req.params.id).select("-__v")
  if (!medicineRecord) return res.status(404).send("medicineRecord  not found ")
  res.json(medicineRecord)
})
//----------------------post MedicineRecord-------------------------------
router.post("/:AppointmentId", checkDoctor, validatebody(MedicineRecordAddjoi), async (req, res) => {
  try {
    const { name, strength, dosageForm, routeOfAdministration, packageSize } = req.body
    const medicineRecord = new MedicineRecord({
      name,
      strength,
      dosageForm,
      routeOfAdministration,
      packageSize,
    })
    await Appointment.findByIdAndUpdate(req.params.AppointmentId, { $push: { Medicinerecords: medicineRecord } })
    const appoinemrnt = await Appointment.findById(req.params.AppointmentId)
    await User.findByIdAndUpdate(appoinemrnt.userId, { $push: { Medicinerecords: medicineRecord } })
    await medicineRecord.save()
    res.json(medicineRecord)
  } catch (error) {
    return res.status(500).send(error.message)
  }
})
//--------------------------put MedicineRecord --------------------------
router.put("/:id", checkId, checkDoctor, validatebody(MedicineRecordEditjoi), async (req, res) => {
  try {
    const { name, strength, dosageForm, routeOfAdministration, packageSize } = req.body
    const medicineRecord = await MedicineRecord.findByIdAndUpdate(
      req.params.id,
      {
        $set: { name, strength, dosageForm, routeOfAdministration, packageSize },
      },
      { new: true }
    )
    if (!medicineRecord) return res.status(404).send("medicineRecord  not found ")
    res.json(medicineRecord)
  } catch (error) {
    return res.status(500).send(error.message)
  }
})
//--------------------------delet MedicineRecord------------------------------
router.delete("/:id", checkDoctor, checkId, async (req, res) => {
  try {
    const medicineRecord = await MedicineRecord.findByIdAndRemove(req.params.id)
    if (!medicineRecord) return res.status(404).send("medicineRecord  not found ")
    res.json("removed")
  } catch (error) {
    return res.status(500).send(error.message)
  }
})
module.exports = router
