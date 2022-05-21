const User = require("../models/User")
const jwt = require("jsonwebtoken")

const mailExistance = async(req, res, next) => {
  User.findOne({ mail: req.body.mail }, function(err, post) {
    if(post) req.emailExist = true;
    next()
  })
}

const loginValidation = async(req, res, next) => {
  User.findOne({ mail: req.body.mail }, async function(err, post) {
    let comparedPassword = await post.comparePassword(req.body.password);
    if(!post) {
      req.accountExist = false;
      return next();
    } else {
      req.accountExist = true;
      if(comparedPassword == false) {
        console.log('ovdee')
        req.invalidPassword = true;
      } else {
        console.log("doleee")
        req.invalidPassword = false;
      }
      req.userId = post.id;
      next();
    }
  });
}

const tokenCheck = (req, res, next) => {
  const token = 
      req.body.token ||
      req.query.token ||
      req.headers['x-access-token'] ||
      req.cookies.token;

  if (!token) {
    res.json({ code: 404, message: 'Unauthorized: No token provided' });
  } else {
    jwt.verify(token, process.env.SERVER_JWT, function(err, decoded) {
      if (err) {
        res.json({ code: 404, message: 'Unauthorized: Invalid token' });
      } else {
        req.email = decoded.email;
        next();
      }
    });
  }
}

module.exports = {
  mailExistance,
  loginValidation,
  tokenCheck,
};