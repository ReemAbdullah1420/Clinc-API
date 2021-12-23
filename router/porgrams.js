const express = require("express")
const router = express.Router()
const checkId = require("../middelwear/checkId")
const validatebody = require("../middelwear/validateboody")
const { Program, ProgramAddjoi, ProgramEditjoi } = require("../models/Porgram")
const checkadmin = require("../middelwear/checkadmin")

//-------------------------get Porgram--------------------------
router.get("/", checkadmin, async (req, res) => {
  try {
    const porgram = await Program.find().select("-__v")
    res.json(porgram)
  } catch (error) {
    return res.status(500).send(error.message)
  }
})
//----------------------post Porgram-------------------------------
router.post("/", checkadmin, validatebody(ProgramAddjoi), async (req, res) => {
  try {
    const { title, image, description, services } = req.body
    const porgram = new Program({
      title,
      image,
      description,
      services,
    })
    await porgram.save()
    res.json(porgram)
  } catch (error) {
    return res.status(500).send(error.message)
  }
})
//--------------------------put Porgram --------------------------
router.put("/:id", checkId, checkadmin, validatebody(ProgramEditjoi), async (req, res) => {
  try {
    const { title, image, description, services } = req.body
    const porgram = await Program.findByIdAndUpdate(
      req.params.id,
      {
        $set: { title, image, description, services },
      },
      { new: true }
    )
    if (!porgram) return res.status(404).send("porgram not found ")
    res.json(porgram)
  } catch (error) {
    return res.status(500).send(error.message)
  }
})
//--------------------------delet Porgram------------------------------
router.delete("/:id", checkadmin, checkId, async (req, res) => {
  try {
    const porgram = await Program.findByIdAndRemove(req.params.id)
    if (!porgram) return res.status(404).send("porgram not found ")
    res.json("removed")
  } catch (error) {
    return res.status(500).send(error.message)
  }
})

module.exports = router
