const express = require("express")
const router = express.Router()
const checkadmin = require("../middelwear/checkadmin")
const checkDoctor = require("../middelwear/checkDoctor")
const checkId = require("../middelwear/checkId")
const checktoken = require("../middelwear/checktoken")
const validatebody = require("../middelwear/validateboody")

const { Appointment, AppointmentAddjoi, AppointmentEditjoi } = require("../models/Appointment")
const { User } = require("../models/User")

//-------------------------get Appointment--------------------------
router.get("/", async (req, res) => {
  try {
    const appointment = await Appointment.find({ doctorId: req.doctorId }).select("-__v")
    res.json(appointment)
  } catch (error) {
    return res.status(500).send(error.message)
  }
})
//----------------------post Appoinment-------------------------------
//يضيفها الدكتور 
router.post("/", checkDoctor, validatebody(AppointmentAddjoi), async (req, res) => {
  try {
    const { date, time } = req.body
    const appointment = new Appointment({
      date,
      time,
      doctorId: req.doctorId,
      // userId: req.userId,
    })
    // await User.findByIdAndUpdate(req.userId, { $push: { Appointments: appointment } })
    await User.findByIdAndUpdate(req.doctorId, { $push: { AvailableAppointments: appointment._id } })
    await appointment.save()
    res.json(appointment)
  } catch (error) {
    return res.status(500).send(error.message)
  }
})
//اللي يختارها المريض 
router.post("/:AppoentmentId", checktoken, validatebody(AppointmentAddjoi), async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.AppoentmentId,
      {
        $set: { userId: req.userId },
      },
      { new: true }
    )

    if (!appointment) return res.status(404).send("appointment not found ")
    await User.findByIdAndUpdate(req.userId, { $push: { Appointments: appointment._id } })
    await User.findByIdAndUpdate(appointment.doctorId, { $pull: { AvailableAppointments: appointment._id } })
    await User.findByIdAndUpdate(appointment.doctorId, { $push: { Appointments: appointment._id } })
    res.json(appointment)
  } catch (error) {
    return res.status(500).send(error.message)
  }
})
//--------------------------put Appontment --------------------------
router.put("/:id", checkId, checkDoctor, validatebody(AppointmentEditjoi), async (req, res) => {
  try {
    const { date, time, day } = req.body
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      {
        $set: { date, time, day },
      },
      { new: true }
    )
    if (!appointment) return res.status(404).send("appointment not found ")
    res.json(appointment)
  } catch (error) {
    return res.status(500).send(error.message)
  }
})
//--------------------------delet Appontment------------------------------
router.delete("/:id", checkDoctor, checkId, async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndRemove(req.params.id)
    if (!appointment) return res.status(404).send("appointment not found ")
    res.json("removed")
  } catch (error) {
    return res.status(500).send(error.message)
  }
})
router.get("/:id", checktoken, async (req, res) => {
  let appointment = await Appointment.findById(req.params.id)
  if (!appointment) return res.status(404).send("appointment not found ")

  if (appointment.userId) return res.status(400).send("appointment already booked")

  appointment = await Appointment.findByIdAndUpdate(
    req.params.id,
    {
      $set: { userId: req.userId },
    },
    { new: true }
  )
  res.json(appointment)
})
module.exports = router
