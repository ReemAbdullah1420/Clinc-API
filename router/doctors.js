const express = require("express")
const mongoose = require("mongoose")
const checkadmin = require("../middelwear/checkadmin")
const checkId = require("../middelwear/checkId")
const { Doctor, DoctorAddjoi, DoctorEditjoi } = require("../models/Doctor")
const {} = require("../models/User")
//------------------------get doctors-------------------------------
router.get("/", checkadmin, async (req, res) => {
  const doctors = await User.find({ type: "Doctor" }).select("-__v")
  res.json(doctors)
})
//----------------------get byId doctors -----------------------------
router.get("/:id", checkadmin, checkId, async (req, res) => {
  try {
    const doctors = await User.findOne({ _id: req.params.id, type: "Doctor" }).select("-__v")
    if (!doctors) return res.status(404).send("doctor not found ")
    res.json(doctors)
  } catch (error) {
    return res.status(500).send(error.message)
  }
})
//--------------------post doctors-------------------------------------
router.post("/", checkadmin, async (req, res) => {
  const { firstName, lastName, specialization, certificate, image } = req.body
})
const router = express.Router()
