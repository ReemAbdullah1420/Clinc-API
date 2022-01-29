const express = require("express")
const router = express.Router()
const checkadmin = require("../middelwear/checkadmin")
const checkDoctor = require("../middelwear/checkDoctor")
const checkId = require("../middelwear/checkId")
const validatebody = require("../middelwear/validateboody")
const { Appointment } = require("../models/Appointment")
const { MadacalFile, MadacalFileAddjoi, MadacalFileEditjoi } = require("../models/MadacalFile")
const { User } = require("../models/User")

//-------------------------get MadacalFile--------------------------
router.get("/", async (req, res) => {
  try {
    const madacalFile = await MadacalFile.find().select("-__v")
    res.json(madacalFile)
  } catch (error) {
    return res.status(500).send(error.message)
  }
})
//-----------------------get byId MadacalFile------------------------
router.get("/:id", checkId, checkDoctor, async (req, res) => {
  const madacalFile = await MadacalFile.findById(req.params.id).select("-__v")
  if (!madacalFile) return res.status(404).send("madacalFile not found ")
  res.json(madacalFile)
})
//----------------------post MadacalFile-------------------------------
router.post("/:AppointmentId",checkDoctor, validatebody(MadacalFileAddjoi), async (req, res) => {
  try {
    const { gender, nationality, bloodType, sensitivity, mobilePhone, fileNumber, age } = req.body
    const madacalFile = new MadacalFile({
      gender,
      nationality,
      bloodType,
      sensitivity,
      mobilePhone,
      fileNumber,
      age,
    })
    await Appointment.findByIdAndUpdate(req.params.AppointmentId, { $push: { MadacalFile: madacalFile } })
    const appoinemrnt = await Appointment.findById(req.params.AppointmentId)
    await User.findByIdAndUpdate(appoinemrnt.userId, { $push: { MadacalFile: madacalFile } })
    await madacalFile.save()
    res.json(madacalFile)
  } catch (error) {
    return res.status(500).send(error.message)
  }
})
//--------------------------put MadacalFile --------------------------
router.put("/:id", checkId, checkDoctor, validatebody(MadacalFileEditjoi), async (req, res) => {
  try {
    const { gender, nationality, bloodType, sensitivity, mobilePhone, fileNumber, age } = req.body
    const madacalFile = await MadacalFile.findByIdAndUpdate(
      req.params.id,
      {
        $set: { gender, nationality, bloodType, sensitivity, mobilePhone, fileNumber, age },
      },
      { new: true }
    )
    if (!madacalFile) return res.status(404).send("madacalFile not found ")
    res.json(madacalFile)
  } catch (error) {
    return res.status(500).send(error.message)
  }
})
//--------------------------delet MadacalFile------------------------------
router.delete("/:id", checkDoctor, checkId, async (req, res) => {
  try {
    const madacalFile = await MadacalFile.findByIdAndRemove(req.params.id)
    if (!madacalFile) return res.status(404).send("madacalFile not found ")
    res.json("removed")
  } catch (error) {
    return res.status(500).send(error.message)
  }
})
module.exports = router
