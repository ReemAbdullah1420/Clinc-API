const express = require("express")
const router = express.Router()
const checkDoctor = require("../middelwear/checkDoctor")
const checkId = require("../middelwear/checkId")
const validatebody = require("../middelwear/validateboody")
const { Analyzing, AnalyzingAddjoi, AnalyzingEditjoi } = require("../models/Analyzing")

//-------------------------get Analyzing--------------------------
router.get("/", checkDoctor, async (req, res) => {
  try {
    const analyzing = await Analyzing.find().select("-__v")
    res.json(analyzing)
  } catch (error) {
    return res.status(500).send(error.message)
  }
})
//-----------------------get byId Analyzing------------------------
router.get("/:id", checkId, checkDoctor, async (req, res) => {
  const analyzing = await Analyzing.findById(req.params.id).select("-__v")
  if (!analyzing) return res.status(404).send("Apponitment not found ")
  res.json(analyzing)
})
//----------------------post Analyzing-------------------------------
router.post("/:AppointmentId", checkDoctor, validatebody(AnalyzingAddjoi), async (req, res) => {
  try {
    const { analysisName, value, normalValue, explanation } = req.body
    const analyzing = new Analyzing({
      analysisName,
      value,
      normalValue,
      explanation,
    })
    await analyzing.save()
    res.json(analyzing)
  } catch (error) {
    return res.status(500).send(error.message)
  }
})
//--------------------------put Analyzing --------------------------
router.put("/:id", checkId, checkDoctor, validatebody(AnalyzingEditjoi), async (req, res) => {
  try {
    const { analysisName, value, normalValue, explanation } = req.body
    const analyzing = await Analyzing.findByIdAndUpdate(
      req.params.id,
      {
        $set: { analysisName, value, normalValue, explanation },
      },
      { new: true }
    )
    if (!analyzing) return res.status(404).send("analyzing not found ")
    res.json(analyzing)
  } catch (error) {
    return res.status(500).send(error.message)
  }
})
//--------------------------delet Analyzing------------------------------
router.delete("/:id", checkDoctor, checkId, async (req, res) => {
  try {
    const analyzing = await Analyzing.findByIdAndRemove(req.params.id)
    if (!analyzing) return res.status(404).send("analyzing not found ")
    res.json("removed")
  } catch (error) {
    return res.status(500).send(error.message)
  }
})
module.exports = router
