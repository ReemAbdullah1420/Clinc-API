// const express = require("express")
// const mongoose = require("mongoose")
// const checkadmin = require("../middelwear/checkadmin")
// const checkId = require("../middelwear/checkId")
// const validatebody = require("../middelwear/validateboody")
// const { Doctor, DoctorAddjoi, DoctorEditjoi } = require("../models/Doctor")
// const {} = require("../models/User")
// const router = require("./madacalFile")

// //------------------------get doctors-------------------------------
// router.get("/", checkadmin, async (req, res) => {
//   const doctors = await User.find({ type: "Doctor" }).select("-__v")
//   res.json(doctors)
// })
// //----------------------get byId doctors -----------------------------
// router.get("/:id", checkadmin, checkId, async (req, res) => {
//   try {
//     const doctors = await User.findOne({ _id: req.params.id, type: "Doctor" }).select("-__v")
//     if (!doctors) return res.status(404).send("doctor not found ")
//     res.json(doctors)
//   } catch (error) {
//     return res.status(500).send(error.message)
//   }
// })
// //--------------------post doctors-------------------------------------
// router.post("/", checkadmin, validatebody(DoctorAddjoi), async (req, res) => {
//   try {
//     const { firstName, lastName, specialization, certificate, image } = req.body
//     const doctor = new Doctor({
//       firstName,
//       lastName,
//       specialization,
//       certificate,
//       image,
//     })
//     await doctor.save()
//     res.json(doctor)
//   } catch (error) {
//     return res.status(500).send(error.message)
//   }
// })
// //---------------------put doctor ----------------------------------
// router.put("/:id", checkId, validatebody(DoctorEditjoi), async (req, res) => {
//   try {
//     const { firstName, lastName, specialization, certificate, image } = req.body
//     const doctor = await Doctor.findByIdAndUpdate(
//       req.params.id,
//       {
//         $set: { firstName, lastName, specialization, certificate, image },
//       },
//       { new: true }
//     )
//     if (!doctor) return res.status(404).send("doctor not found ")
//     res.json(doctor)
//   } catch (error) {
//     return res.status(500).send(error.message)
//   }
// })
// //-----------------------delete doctor--------------------------------
// router.delete("/:id", checkId, async (req, res) => {
//   try {
//     const doctor = await Doctor.findByIdAndRemove(req.params.id)
//     if (!doctor) return res.status(404).send("doctor not found ")
//     res.send("reomve doctor")
//   } catch (error) {
//     return res.status(500).send(error.message)
//   }
// })
// module.exports = router
