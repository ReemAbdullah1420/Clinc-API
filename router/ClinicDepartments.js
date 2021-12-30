const express = require("express")
const router = express.Router()
const checkadmin = require("../middelwear/checkadmin")
const checkId = require("../middelwear/checkId")
const validatebody = require("../middelwear/validateboody")
const { ClinicDepartmentsAddjoi, ClinicDepartmentsEditjoi, ClinicDepartments } = require("../models/ClinicDepartments")
const { User } = require("../models/User")


//-----------------------------------get ClinicDepartments--------------------------------
router.get("/", async (req, res) => {
  try {
    const ClinicDepartment = await ClinicDepartments.find()
      .select("-__v")
      .populate({
        path: "doctors",
        select: "firstName lastName image ",
      })
      .populate("services")
    res.json(ClinicDepartment)
  } catch (error) {
    return res.status(500).send(error.message)
  }
})
//------------------------------------get ByID clinicDepatments------------------------------------
router.get("/:id", checkadmin, checkId, async (req, res) => {
  try {
    const clinicDepartment = await ClinicDepartments.findById(req.params.id)
      .select("-__v")
      // .populate("doctors")
      .populate("services")
    if (!clinicDepartment) return res.status(404).send("clinicDepartment not found ")
    res.json(clinicDepartment)
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
      const doctorFound = await User.find({ _id: { $in: doctors }, type: "Doctor" })
      if (doctorFound.length < doctors.length) return res.status(404).send("some of the doctors is not found ")
    }
    const clinicDepartment = new ClinicDepartments({
      name,
      description,
      image,
      services,
      doctors,
    })
    await clinicDepartment.save()
    res.json(clinicDepartment)
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
      const doctorFound = await User.find({ _id: { $in: doctors },type: "Doctor" })
      if (doctorFound.length < doctors.length) return res.status(404).send("some of the doctors is not found ")
    }
    const clinicDepartment = await ClinicDepartments.findByIdAndUpdate(
      req.params.id,
      {
        $set: { name, description, image, services, doctors },
      },
      { new: true }
    )
    if (!clinicDepartment) return res.status(404).send("clinicDepatment not found ")
    res.json(clinicDepartment)
  } catch (error) {
    return res.status(500).send(error.message)
  }
})
router.delete("/:id", checkId, checkadmin, async (req, res) => {
  try {
    const clinicDepartment = await ClinicDepartments.findByIdAndRemove(req.params.id)
    if (!clinicDepartment) return res.status(404).send("clinicDepartment not found ")
    res.json("clinicDepartment removed")
  } catch (error) {
    return res.status(500).send(error.message)
  }
})
module.exports = router
