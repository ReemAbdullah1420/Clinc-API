const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const { User, signupJoi, loginJoi, profileJoi, singupdoctorJoi, logindoctorJoi } = require("../models/User")
const checktoken = require("../middelwear/checktoken")
const checkadmin = require("../middelwear/checkadmin")
const checkId = require("../middelwear/checkId")
const validatebody = require("../middelwear/validateboody")
const checkDoctor = require("../middelwear/checkDoctor")

//......................get all user-------------------------
router.get("/user", checkadmin, async (req, res) => {
  const user = await User.find()
  res.json(user)
})
//.....................get byId user---------------------------
router.get("/user/:id", checkadmin, checkId, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-__v")
    if (!user) return res.status(404).send("user not found ")
    res.json(user)
  } catch (error) {
    return res.status(500).send(error.message)
  }
})
//------------------------ post signup ----------------------------------
router.post("/signup", validatebody(signupJoi), async (req, res) => {
  try {
    const userbody = req.body
    const { firstName, lastName, email, password, image } = userbody
    const userfound = await User.findOne({ email })
    if (userfound) return res.status(404).send("user alrady register")
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = new User({
      firstName,
      lastName,
      email,
      password: hash,
      image,
      role: "User",
    })
    // let transporter = nodemailer.createTransport({
    //   service: "gmail",
    //   port: 587,
    //   secure: false,
    //   auth: {
    //     user: `Reemr1999r@gmail.com`,
    //     pass: `Rraa1420`,
    //   },
    // })
    // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "15d" })
    // await transporter.sendMail({
    //   from: '"reem" <Reemr1999r@gmail.com>', // sender address
    //   to: email,
    //   subject: "Email verfition ",
    //   html: `Hello plaecse click on this link to verifiy your email.
    //   <a href="http://localhost:3000/email_verified/${token}">Verrfiy email</a>`,
    // })
    await user.save()
    delete user._doc.password
    res.json(user)
  } catch (error) {
    return res.status(500).send(error.message)
  }
})
//-------------------------post login user---------------------------------
router.post("/login", validatebody(loginJoi), async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email }) //*هذيuser
    if (!user) return res.status(404).send("user not found ")
    const vaild = await bcrypt.compare(password, user.password)
    if (!vaild) return res.status(400).send(" password incorrect ")
    // if (!user.emailVerified) return res.status(403).send("user not verified plases check your email")
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "15d" }) //user اللي هنا بحط علامة * عليها
    res.json(token)
  } catch (error) {
    return res.status(500).send(error.message)
  }
})
//------------------------delete user ---------------------------------
router.delete("/user/:id", checkadmin, checkId, async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) return res.status(404).send("user not found ")
    if (user.role === "Admin") return res.status(403).send("auauthorized action")
    await User.findByIdAndRemove(req.params.id)
    res.json("removed")
  } catch (error) {
    res.status(500).send(error.message)
  }
})

//------------------------get doctors-----------------------------------
router.get("/doctor", checkadmin, async (req, res) => {
  try {
    const doctors = await User.find({ type: "Doctor" }).select("-__v")
    res.json(doctors)
  } catch (error) {
    return res.status(500).send(error.message)
  }
})
//-------------------------get byId one doctor --------------------------------
router.get("/doctor/:id", checkadmin, checkId, async (req, res) => {
  try {
    const doctors = await User.findOne({ _id: req.params.id, type: "Doctor" }).select("-__v")
    if (!doctors) return res.status(404).send("doctor not found ")
    res.json(doctors)
  } catch (error) {
    return res.status(500).send(error.message)
  }
})
//-------------------------post singup doctors---------------------------------
router.post("/add-doctor", checkadmin, validatebody(singupdoctorJoi), async (req, res) => {
  try {
    const { firstName, lastName, email, password, image, specialization } = req.body
    const doctorfound = await User.findOne({ email })
    if (doctorfound) return res.status(404).send("doctor alrady register")
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = new User({
      firstName,
      lastName,
      email,
      password: hash,
      image,
      specialization,
      role: "Doctor",
    })
    await user.save()
    delete user._doc.password
    res.json(user)
  } catch (error) {
    return res.status(500).send(error.message)
  }
})
//--------------------------post login doctors ----------------------------------
router.post("/login/doctor", validatebody(logindoctorJoi), async (req, res) => {
  try {
    const { email, password } = req.body
    const doctor = await User.findOne({ email })
    if (!doctor) return res.status(404).send("doctor  not found ")
    if (doctor.role != "Doctor") return res.status(403).send("you not doctor")
    const vaild = await bcrypt.compare(password, doctor.password)
    if (!vaild) return res.status(400).send(" password incorrect ")
    const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET_KEY, { expiresIn: "15d" })
    res.json(token)
  } catch (error) {
    return res.status(500).send(error.message)
  }
})
//-----------------------delet doctor-------------------------------------------
router.delete("/doctor/:id", checkadmin, checkId, async (req, res) => {
  try {
    const user = await User.findById({ _id: req.params.id, type: "Doctor" })
    if (!user) return res.status(404).send("doctor not found ")
    if (user.role === "Admin") return res.status(403).send("auauthorized action")
    await User.findByIdAndRemove(req.params.id)
    res.json("removed")
  } catch (error) {
    res.status(500).send(error.message)
  }
}) // اخر شي بسويه ف البوست مان
router.post("/add-admin", checkadmin, validatebody(signupJoi), async (req, res) => {
  try {
    const userbody = req.body
    const { firstName, lastName, email, password, image } = userbody
    const userfound = await User.findOne({ email })
    if (userfound) return res.status(404).send("user alrady register")
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = new User({
      firstName,
      lastName,
      email,
      password: hash,
      image,
      role: "Admin",
    })
    await user.save()
    delete user._doc.password
    res.json(user)
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
////////////////////////////////////////////////////////////////////
/// get profile ///////
router.get("/user/profile", checktoken, async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .select("-__v -password")
      .populate("Appointments")
      .populate("Vaccines")
      .populate("Medicinerecords")
      .populate("Rays")
      .populate("Analyzings")
      .populate("MadacalFile")
      .populate("Blood")
    if (!user) return res.status(404).send("user not found")
    res.json(user)
  } catch (error) {
    return res.status(500).send(error.message)
  }
})
router.put("/user/profile", checktoken, validatebody(profileJoi), async (req, res) => {
  try {
    const { firstName, lastName, password, image } = req.body
    let hash
    if (password) {
      const salt = await bcrypt.genSalt(10)
      hash = await bcrypt.hash(password, salt)
    }
    const user = await User.findByIdAndUpdate(
      req.userId,
      { set: { firstName, lastName, password: hash, image } },
      { new: true }
    ).select("-__v -password")
    res.json(user)
  } catch (error) {
    return res.status(500).send(error.message)
  }
})
router.get("/doctors/profile", checkDoctor, async (req, res) => {
  try {
    const user = await User.findById(req.doctorId).select("firstName lastName image email")
    res.json(user)
  } catch (error) {
    return res.status(500).send(error.message)
  }
})
router.put("/doctors/profile/:id", checkDoctor, validatebody(profileJoi), async (req, res) => {
  try {
    const { firstName, lastName, password, image, email } = req.body
    let hash
    if (password) {
      const salt = await bcrypt.genSalt(10)
      hash = await bcrypt.hash(password, salt)
    }
    const doctor = await User.findByIdAndUpdate(
      req.doctorId,
      { set: { firstName, lastName, email, password: hash, image } },
      { new: true }
    ).select("firstName lastName image email")
    res.json(doctor)
  } catch (error) {
    return res.status(500).send(error.message)
  }
})

module.exports = router
