const express = require("express")
const router = express.Router()
const checkDoctor = require("../middelwear/checkDoctor")
const checkId = require("../middelwear/checkId")
const validatebody = require("../middelwear/validateboody")
const { Vaccine, VaccineAddjoi, VaccineEditjoi } = require("../models/Vaccine")

//-------------------------get Vaccine--------------------------
router.get("/", checkDoctor,  async (req, res) => {
  try {
    const vaccine = await Vaccine.find().select("-__v")
    res.json(vaccine)
  } catch (error) {
    return res.status(500).send(error.message)
  }
})
//-----------------------get byId Vaccine------------------------
router.get("/:id", checkId, checkDoctor,  async (req, res) => {
  const vaccine = await Vaccine.findById(req.params.id).select("-__v")
  if (!vaccine) return res.status(404).send("vaccine not found ")
  res.json(vaccine)
})
//----------------------post Vaccine-------------------------------
router.post("/", checkDoctor, validatebody(VaccineAddjoi), async (req, res) => {
  try {
    const { vaccineType, doseDate } = req.body
    const vaccine = new Vaccine({
      vaccineType,
      doseDate,
    })
    await vaccine.save()
    res.json(vaccine)
  } catch (error) {
    return res.status(500).send(error.message)
  }
})
//--------------------------put Vaccine --------------------------
router.put("/:id", checkId, checkDoctor, validatebody(VaccineEditjoi), async (req, res) => {
  try {
    const { vaccineType, doseDate } = req.body
    const vaccine = await Vaccine.findByIdAndUpdate(
      req.params.id,
      {
        $set: { vaccineType, doseDate },
      },
      { new: true }
    )
    if (!vaccine) return res.status(404).send("vaccine not found ")
    res.json(vaccine)
  } catch (error) {
    return res.status(500).send(error.message)
  }
})
//--------------------------delet Vaccine------------------------------
router.delete("/:id", checkDoctor, checkId, async (req, res) => {
  try {
    const vaccine = await Vaccine.findByIdAndRemove(req.params.id)
    if (!vaccine) return res.status(404).send("vaccine not found ")
    res.json("removed")
  } catch (error) {
    return res.status(500).send(error.message)
  }
})
module.exports = router
