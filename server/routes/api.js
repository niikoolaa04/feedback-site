const router = require("express").Router();
const User = require("../models/User");
const Poll = require("../models/Poll");
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
  res.status(201).json(newPoll);
})

module.exports = router;