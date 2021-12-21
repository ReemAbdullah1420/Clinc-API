const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const { User, signupJoi, loginJoi, profileJoi } = require("../models/User")
const checktoken = require("../middelwear/checktoken")
const checkadmin = require("../middelwear/checkadmin")
const validatebody = require("../middelwear/validatebody")
const checkId = require("../middelwear/checkId")

router.get("/user", checkadmin, async (req, res) => {
  const user = await User.find()
  res.json(user)
})
router.get("/:id", checkadmin.checkId, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-__v")
    if (!user) return res.status(404).send("user not found ")
    res.json(user)
  } catch (error) {
    return res.status(500).send(error.message)
  }
})

router.post("/signup", validatebody(signupJoi), async (req, res) => {
  try {
    const userbody = req.body
    const { firstName, lastName, email, password, avatar } = userbody
    const userfound = await User.findOne({ email })
    if (userfound) return res.status(404).send("user alrady register")
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = new User({
      firstName,
      lastName,
      email,
      password: hash,
      avatar,
      role: "User",
    })
    let transporter = nodemailer.createTransport({
      service: "gmail",
      port: 587,
      secure: false,
      auth: {
        user: `Reemr1999r@gmail.com`,
        pass: `Rraa1420`,
      },
    })
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "15d" })
    await transporter.sendMail({
      from: '"reem" <Reemr1999r@gmail.com>', // sender address
      to: email,
      subject: "Email verfition ",
      html: `Hello plaecse click on this link to verifiy your email.
      <a href="http://localhost:3000/email_verified/${token}">Verrfiy email</a>`,
    })
    await user.save()
    delete user._doc.password
    res.json("user created please check your email for verification link")
  } catch (error) {
    return res.status(500).send(error.message)
  }
})
router.get("/email_verified/:token", async (req, res) => {
  try {
    const deccryptedToken = jwt.verify(req.params.token, process.env.JWT_SECRET_KEY)
    const userId = deccryptedToken.id // هذا عشان ابحث عن اليوزر موجود ولالا
    const user = await User.findById(userId, { $set: { emailVerified: true } })
    if (!user) return res.status(404).send("user not found ")
    res.send("user verified ")
  } catch (error) {
    return res.status(500).send(error.message)
  }
})
// وانا ادمن هذا بس اذا ابغى اضيف اد ادمن
router.post("/add-admin", checkadmin, validatebody(signupJoi), async (req, res) => {
  try {
    const userbody = req.body
    const { firstName, lastName, email, password, avatar } = userbody
    const userfound = await User.findOne({ email })
    if (userfound) return res.status(404).send("user alrady register")
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = new User({
      firstName,
      lastName,
      email,
      password: hash,
      avatar,
      role: "Admin",
    })
    await user.save()
    delete user._doc.password
    res.json(user)
  } catch (error) {
    return res.status(500).send(error.message)
  }
})

router.post("/login", validatebody(loginJoi), async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email }) //*هذيuser
    if (!user) return res.status(404).send("user not found ")
    const vaild = await bcrypt.compare(password, user.password)
    if (!vaild) return res.status(400).send(" password incorrect ")
    if (!user.emailVerified) return res.status(403).send("user not verified plases check your email")
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "15d" }) //user اللي هنا بحط علامة * عليها
    res.json(token)
  } catch (error) {
    return res.status(500).send(error.message)
  }
})
router.post("/login/admin", validatebody(loginJoi), async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email }) //*هذيuser
    if (!user) return res.status(404).send("user not found ")
    if (user.role != "Admin") return res.status(403).send("you not admin")
    const vaild = await bcrypt.compare(password, user.password)
    if (!vaild) return res.status(400).send(" password incorrect ")
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "15d" }) //user اللي هنا بحط علامة * عليها
    res.json(token)
  } catch (error) {
    return res.status(500).send(error.message)
  }
})
router.get("/profile", checktoken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-__v -password")
    res.json(user)
  } catch (error) {
    return res.status(500).send(error.message)
  }
})
router.put("/profile", validatebody(profileJoi), async (req, res) => {
  try {
    const { firstName, lastName, password, avatar } = req.body
    let hash
    if (password) {
      const salt = await bcrypt.genSalt(10)
      hash = await bcrypt.hash(password, salt)
    }
    const user = await User.findByIdAndUpdate(
      req.userId,
      { set: { firstName, lastName, password: hash, avatar } },
      { new: true }
    ).select("-__v -password")
    res.json(user)
  } catch (error) {
    return res.status(500).send(error.message)
  }
})
router.delete("/user/:id", checkadmin, checkId, async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) return res.status(404).send("user not found ")
    if (user.role === "Admin") return res.status(403).send("auauthorized action")
    await User.findByIdAndRemove(req.params.id)
    await Comment.deleteMany({ owner: req.params.id })
    res.json("removed")
  } catch (error) {
    res.status(500).send(error.message)
  }
})

module.exports = router
