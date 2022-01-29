const jwt = require("jsonwebtoken")
const { User } = require("../models/User")
const checkDoctor = async (req, res, next) => {
  try {
    const token = req.header("Authorization")
    if (!token) return res.status(401).send("token is requied")
    const deccryptedToken = jwt.verify(token, process.env.JWT_SECRET_KEY)
    const doctorId = deccryptedToken.id
    const doctor = await User.findById(doctorId)
    if (!doctor) return res.status(404).send("doctor not found ")
    if (doctor.role !== "Doctor") return res.status(403).send("you are not doctor")
    req.doctorId = doctorId
    next()
  } catch (error) {
    return res.status(500).send(error.message)
  }
}
module.exports = checkDoctor
