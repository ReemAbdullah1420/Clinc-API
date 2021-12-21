const express = require("express")
const mongoose = require("mongoose")
const checkadmin = require("../middelwear/checkadmin")
const checkId = require("../middelwear/checkId")
const validatebody = require("../middelwear/validateboody")
const { Doctor } = require("../models/Doctor")
const router = express.Router()
const { ClinicDepartments, ClinicDepartmentsAddjoi, ClinicDepartmentsEditjoi } = require("../models/ClinicDepartments")

//-----------------------------------get ClinicDepartments--------------------------------
router.get("/", async (req, res) => {
  try {
    const ClinicDepartments = await ClinicDepartments.find().select("-__v").populate("doctors").populate("services")
    res.json(ClinicDepartments)
  } catch (error) {
    return res.status(500).send(error.message)
  }
})
//------------------------------------get ByID clinicDepatments------------------------------------
router.get("/:id", checkadmin, checkId, async (req, res) => {
  try {
    const clinicDepartments = await ClinicDepartments.findById(req.params.id)
      .select("-__v")
      .populate("doctors")
      .populate("services")
    if (!clinicDepartments) return res.status(404).send("clinicDepartment not found ")
    res.json(clinicDepartments)
  } catch (error) {
    return res.status(500).send(error.message)
  }
})
//-----------------------------------post ClinicDepartments----------------------------------------
router.post("/", checkadmin, validatebody(ClinicDepartmentsAddjoi), async (req, res) => {
  try {
    const { name, description, image, services, doctors } = req.body
    if (doctors) {
      const doctorSet = new Set(doctors)
      if (doctorSet.size < doctors.length) return res.status(400).send("there is duplicated")
      const doctorFound = await Doctor.find({ _id: { $in: doctors } })
      if (doctorFound.length < doctors.length) return res.status(404).send("some of the doctors is not found ")
    }
    const clinicDepartments = new ClinicDepartments({
      name,
      description,
      image,
      services,
      doctors,
    })
    await clinicDepartments.save()
    res.json(clinicDepartments)
  } catch (error) {
    return res.status(500).send(error.message)
  }
})
//------------------------------put ClinicDepatement------------------------
router.put("/:id", checkadmin, checkId, validatebody(ClinicDepartmentsEditjoi), async (req, res) => {
  try {
    const { name, description, image, services, doctors } = req.body
    if (doctors) {
      const doctorSet = new Set(doctors)
      if (doctorSet.size < doctors.length) return res.status(400).send("there is duplicated")
      const doctorFound = await Doctor.find({ _id: { $in: doctors } })
      if (doctorFound.length < doctors.length) return res.status(404).send("some of the doctors is not found ")
    }
    const clinicDepartments = await ClinicDepartments.findByIdAndUpdate(
      req.params.id,
      {
        $set: { name, description, image, services, doctors },
      },
      { new: true }
    )
    if (!clinicDepartments) return res.status(404).send("clinicDepatment not found ")
    res.json(clinicDepartments)
  } catch (error) {
    return res.status(500).send(error.message)
  }
})
router.delete("/:id", checkId, checkadmin, async (req, res) => {
  try {
    const clinicDepartments = await ClinicDepartments.findByIdAndRemove(req.params.id)
    if (!clinicDepartments) return res.status(404).send("clinicDepartment not found ")
    res.json("clinicDepartment removed")
  } catch (error) {
    return res.status(500).send(error.message)
  }
})
module.exports = router
