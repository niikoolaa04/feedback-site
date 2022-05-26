const router = require("express").Router();
const User = require("../models/User");
const Poll = require("../models/Poll");
const Survey = require("../models/Survey");
const cors = require("cors");
const cookieParser = require("cookie-parser")

router.use(cors({
  credentials: true,
  origin: true
}));

router.use(cookieParser());

router.get("/users/:id", async(req, res) => {
  let profile = req.params.id;
  User.findOne({ id: profile }, { id: true, about: true, profileName: true, polls: true, surveys: true, username: true, mail: true, profilePicture: true }, (err, post) => {
    res.status(200).json(post);
  })
});

router.post("/polls/new", async(req, res) => {
  let newPoll = new Poll(req.body);
  let pollId = await Poll.estimatedDocumentCount();

  newPoll.id = pollId;
  await newPoll.save();
  res.status(201).json({
    code: 201,
    response: newPoll
  });
});

router.get("/polls/:id", async(req, res) => {
  Poll.findOne({ id: req.params.id }, (err, post) => {
    res.status(200).json(post);
  })  
});

router.post("/polls/:id/vote", async(req, res) => {
  /* Check for limit, if limit return */
  Poll.findOneAndUpdate({ id: req.params.id }, { $push: { 
    submitters: { 
      user: req.body.user,
      vote: parseInt(req.body.vote) - 1,
      date: new Date(),
     }
   }}, { new: true }, (err, post) => {
     res.status(200).json(post);
   })
});

router.post("/surveys/new", async(req, res) => {
  let newSurvey = new Survey(req.body);
  let surveyId = await Survey.estimatedDocumentCount();

  newSurvey.id = surveyId;
  await newSurvey.save();
  res.status(201).json({
    code: 201,
    response: newSurvey
  });
});

router.get("/surveys/:id", async(req, res) => {
  Survey.findOne({ id: req.params.id }, (err, post) => {
    res.status(200).json(post);
  })  
});

module.exports = router;