const mongoose = require("mongoose")
const validateId = (...IdArry) => {
  return async (req, res, next) => {
    try {
      IdArry.forEach(idName => {
        const id = req.params[idName]
        if (!mongoose.Types.ObjectId.isValid(id))
          return res.status(400).json("the path id should be a valid object id ")
      })

      next()
    } catch (error) {
      return res.status(500).send(error.message)
    }
  }
}
module.exports = validateId
