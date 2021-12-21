const express = require("express")
const mongoose = require("mongoose")
const checkadmin = require("../middelwear/checkadmin")
const checkId = require("../middelwear/checkId")
const validatebody = require("../middelwear/validateboody")
const { Service, ServiceAddjoi, ServiceEditjoi } = require("../models/Service")

//---------------------------get service------------------------
router.get("/", checkadmin, async (eq, res) => {
  try {
    const service = await Service.find().select("-__v")
    res.json(service)
  } catch (error) {
    return res.status(500).send(error.message)
  }
})
//-----------------------get byId service-----------------------
router.get("/:id", checkId, checkadmin, async (req, res) => {
  try {
    const service = await Service.findById(req.params.id).select("-__v")
    if (!service) return res.status(404).send("service not found ")
    res.json(service)
  } catch (error) {
    return res.status(500).send(error.message)
  }
})
//---------------------post servie-------------------------------
router.post("/", checkadmin, validatebody(ServiceAddjoi), async (req, res) => {
  try {
    const { service } = req.body
    const service = new Service({
      service,
    })
    await service.save()
    res.json(service)
  } catch (error) {
    return res.status(500).send(error.message)
  }
})
//-------------------------------put service----------------------------------------------
router.put("/:id", checkadmin, checkId, validatebody(ServiceEditjoi), async (req, res) => {
  try {
    const { service } = req.body
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      {
        $set: { service },
      },
      { new: true }
    )
    if (!service) return res.status(404).send("service not found ")
    res.json(service)
  } catch (error) {
    return res.status(500).send(error.message)
  }
})
//----------------------------delet service--------------------------------
router.delete("/:id", checkadmin, checkId, async (req, res) => {
  try {
    const service = await Service.findByIdAndRemove(req.params.id)
    if (!service) return res.status(404).send("service not found ")
    res.json("service removed ")
  } catch (error) {
    return res.status(500).send(error.message)
  }
})

const router = express.Router()
