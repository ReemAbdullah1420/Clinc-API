const express = require("express")
const router = express.Router()

const checkDoctor = require("../middelwear/checkDoctor")
const checkId = require("../middelwear/checkId")
const validatebody = require("../middelwear/validateboody")
const { Ray, RayAddjoi, RayEditjoi } = require("../models/Ray")

//-------------------------get Ray--------------------------
router.get("/", checkDoctor, async (req, res) => {
  try {
    const ray = await Ray.find().select("-__v")
    res.json(ray)
  } catch (error) {
    return res.status(500).send(error.message)
  }
})
//-----------------------get byId Ray------------------------
router.get("/:id", checkId, checkDoctor, async (req, res) => {
  const ray = await Ray.findById(req.params.id).select("-__v")
  if (!ray) return res.status(404).send("ray not found ")
  res.json(ray)
})
//----------------------post Ray-------------------------------
router.post("/", checkDoctor, validatebody(RayAddjoi), async (req, res) => {
  try {
    const { rayName, rayImage } = req.body
    const ray = new Ray({
      rayName,
      rayImage,
    })
    await ray.save()
    res.json(ray)
  } catch (error) {
    return res.status(500).send(error.message)
  }
})
//--------------------------put Ray --------------------------
router.put("/:id", checkDoctor, validatebody(RayEditjoi), async (req, res) => {
  try {
    const { rayName, rayImage } = req.body
    const ray = await Ray.findByIdAndUpdate(
      req.params.id,
      {
        $set: { rayName, rayImage },
      },
      { new: true }
    )
    if (!ray) return res.status(404).send("ray not found ")
    res.json(ray)
  } catch (error) {
    return res.status(500).send(error.message)
  }
})
//--------------------------delet Ray------------------------------
router.delete("/:id", checkDoctor, checkId, async (req, res) => {
  try {
    const ray = await Ray.findByIdAndRemove(req.params.id)
    if (!ray) return res.status(404).send("ray not found ")
    res.json("removed")
  } catch (error) {
    return res.status(500).send(error.message)
  }
})
module.exports = router
