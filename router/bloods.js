const express = require("express")
const router = express.Router()
const checkadmin = require("../middelwear/checkadmin")
const checkDoctor = require("../middelwear/checkDoctor")
const checkId = require("../middelwear/checkId")
const validatebody = require("../middelwear/validateboody")
const { Blood, BloodAddjoi, BloodEditjoi } = require("../models/Blood")

//-------------------------get Blood--------------------------
router.get("/", checkDoctor, async (req, res) => {
  try {
    const blood = await Blood.find().select("-__v")
    res.json(blood)
  } catch (error) {
    return res.status(500).send(error.message)
  }
})
//-----------------------get byId Blood------------------------
router.get("/:id", checkId, checkDoctor, async (req, res) => {
  const blood = await Blood.findById(req.params.id).select("-__v")
  if (!blood) return res.status(404).send("blood not found ")
  res.json(blood)
})
//----------------------post Blood-------------------------------
router.post("/:AppointmentId", checkDoctor, validatebody(BloodAddjoi), async (req, res) => {
  try {
    const { bloodType, bloodDonor, NextDonationDate, lastDonationDate } = req.body
    const blood = new Blood({
      bloodType,
      bloodDonor,
      NextDonationDate,
      lastDonationDate,
    })
    await blood.save()
    res.json(blood)
  } catch (error) {
    return res.status(500).send(error.message)
  }
})
//--------------------------put Blood --------------------------
router.put("/:id", checkId, checkDoctor, validatebody(BloodEditjoi), async (req, res) => {
  try {
    const { bloodType, bloodDonor, NextDonationDate, lastDonationDate } = req.body
    const blood = await Blood.findByIdAndUpdate(
      req.params.id,
      {
        $set: { bloodType, bloodDonor, NextDonationDate, lastDonationDate },
      },
      { new: true }
    )
    if (!blood) return res.status(404).send("blood not found ")
    res.json(blood)
  } catch (error) {
    return res.status(500).send(error.message)
  }
})
//--------------------------delet Blood------------------------------
router.delete("/:id", checkDoctor, checkId, async (req, res) => {
  try {
    const blood = await Blood.findByIdAndRemove(req.params.id)
    if (!blood) return res.status(404).send("blood not found ")
    res.json("removed")
  } catch (error) {
    return res.status(500).send(error.message)
  }
})
module.exports = router
