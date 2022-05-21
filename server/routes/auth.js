const router = require("express").Router();
const User = require("../models/User");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { mailExistance, loginValidation, tokenCheck } = require("../middlewares/authMiddleware");

router.use(cors({
  credentials: true,
  origin: true
}));

router.use(cookieParser());

router.post("/register", mailExistance, async(req, res) => {
  if(req.emailExist) {
    return res.json({
      code: 409,
      message: "Email already exist in our Database"
    });
  }
  try {
    let userId = await User.estimatedDocumentCount();
    let user = new User(req.body);
    user.id = `${parseInt(userId) + 1}`;

    await user.save();

    res.json({
      code: 201,
      message: "New User have been created"
    });
  } catch {
    return res.json({
      code: 500,
      message: "Unknown error happened"
    });
  }
});

router.post("/login", (req, res) => {
  if(req.accountExist == false) {
    res.status(404).json({
      code: 404,
      message: "User not found"
    })
  }
  req.invalidPassword = false;
  if(req.invalidPassword == false) {
    const payload = { id: req.userId, email: req.body.email };
    const token = jwt.sign(payload, process.env.SERVER_JWT, {
      expiresIn: '1h',
    });
    // res.cookie('token', token, {sameSite: 'lax', httpOnly: true})
    res.status(200).json({ code: 200, token, message: "Login Successful" })
  } else {
    res.status(401).json({
      code: 401,
      message: "Invalid Password provided"
    })
  }
});

router.post("/password/check", async(req, res) => {
  let userId = req.body.id;
  let password = req.body.password;
  let exist = await User.exists({ id: userId });
  if(!exist) return res.json({
    success: false,
    code: 404,
    valid: false
  }).status(404);
  User.findOne({ id: userId }, async function(err, post) {
    let comparedPassword = await post.comparePassword(password);
    res.json({
      code: 200,
      valid: comparedPassword
    })
  })
});

router.get("/check", tokenCheck, (req, res) => {
  res.status(200).json({ code: 200, message: 'Working' });
})

router.get("/decode", (req, res) => {
  let cookie = req.cookies["token"];
  if(!cookie) return res.json({
    id: null,
    mail: null
  }).status(404);
  let decodeToken = jwt.verify(cookie, process.env.SERVER_JWT);

  res.json({
    id: decodeToken.id,
    mail: decodeToken.email
  }).status(200);
})

module.exports = router;