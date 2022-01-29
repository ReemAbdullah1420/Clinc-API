const mongoose = require("mongoose")
const checkId = async (req, res, next) => {
  try {
    const id = req.params.id
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json("the path id should be a valid object id ")
    next()
  } catch (error) {
    return res.status(500).send(error.message)
  }
}
module.exports = checkId
