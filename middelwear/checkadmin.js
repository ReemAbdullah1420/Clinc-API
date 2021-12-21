const jwt = require("jsonwebtoken")
const { User } = require("../models/User")
const checkadmin = async (req, res, next) => {
  const token = req.header("Authorization")
  if (!token) return res.status(401).send("token is requied")
  const deccryptedToken = jwt.verify(token, process.env.JWT_SECRET_KEY)
  const userId = deccryptedToken.id
  const user = await User.findById(userId)
  if (!user) return res.status(404).send("user not found ")
  if (user.role !== "Admin") return res.status(404).send("you are not admin")
  req.userId = userId
  next()
}
module.exports = checkadmin