const jwt = require("jsonwebtoken")
const { User } = require("../models/User")
const checktoken = async (req, res, next) => {
  try {
    const token = req.header("Authorization")
    if (!token) return res.status(401).send("token is requied")
    const deccryptedToken = jwt.verify(token, process.env.JWT_SECRET_KEY)
    const userId = deccryptedToken.id // هذا عشان ابحث عن اليوزر موجود ولالا
    const user = await User.findById(userId)
    if (!user) return res.status(404).send("user not found ")
    if (user.role !== "User") return res.status(404).send("not user ")
    req.userId = userId
    next()
  } catch (error) {
    return res.status(500).send(error.message)
  }
}
module.exports = checktoken
