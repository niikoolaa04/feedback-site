const router = require("express").Router();
const User = require("../models/User");
const Poll = require("../models/Poll");
const Survey = require("../models/Survey");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const Comment = require("../models/Comment");

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

router.get("/users/:id/comments", async(req, res) => {
  const id = req.params.id;

  User.findOne({ id }, (err, post) => {
    const comments = post?.comments;
    Comment.find({ _id: { $in: comments } }, (e, commentList) => {
      res.json(commentList).status(200)
    })
  });
});

router.get("/users/:id/surveys", async(req, res) => {
  const id = req.params.id;

  User.findOne({ id }, (err, post) => {
    const surveys = post?.surveys;
    Survey.find({ _id: { $in: surveys } }, (e, surveyList) => {
      res.json(surveyList).status(200)
    })
  });
});

router.get("/users/:id/polls", async(req, res) => {
  const id = req.params.id;

  User.findOne({ id }, (err, post) => {
    const polls = post?.polls;
    Poll.find({ _id: { $in: polls } }, (e, pollsList) => {
      res.json(pollsList).status(200)
    })
  });
});

router.put("/users/:id", async(req, res) => {
  let profile = req.params.id;
  User.findOneAndUpdate({ id: profile }, req.body, { new: true }, (err, post) => {
    res.status(200).json(post);
  })
});

router.post("/polls/new", async(req, res) => {
  let newPoll = new Poll(req.body);
  let pollId = await Poll.estimatedDocumentCount();

  newPoll.id = parseInt(pollId) + 1;
  await newPoll.save();

  if(newPoll.user > 0) {
    User.findOneAndUpdate({ id: newPoll.user }, { $push: {
      surveys: newPoll._id
    } }, (err, post) => {
      res.status(201).json({
        code: 201,
        response: newPoll
      });
    });
  } else {
    res.status(201).json({
      code: 201,
      response: newPoll
    });
  }
});

router.get("/polls/list", async(req, res) => {
  Poll.find({ }, (err, post) => {
    res.status(200).json(post);
  })
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

  newSurvey.id = parseInt(surveyId) + 1;
  await newSurvey.save();

  if(newSurvey.user > 0) {
    User.findOneAndUpdate({ id: newSurvey.user }, { $push: {
      surveys: newSurvey._id
    } }, (err, post) => {
      res.status(201).json({
        code: 201,
        response: newSurvey
      });
    });
  } else {
    res.status(201).json({
      code: 201,
      response: newSurvey
    });
  }
});

router.get("/surveys/list", async(req, res) => {
  Survey.find({ }, (err, post) => {
    res.status(200).json(post);
  })
});

router.get("/surveys/:id", async(req, res) => {
  Survey.findOne({ id: req.params.id }, (err, post) => {
    res.status(200).json(post);
  })  
});

router.post("/surveys/:id/vote", async(req, res) => {
  /* Check for limit, if limit return */
  Survey.findOneAndUpdate({ id: req.params.id }, { $push: { 
    submitters: { 
      user: req.body.user,
      answers: req.body.answers,
      date: new Date(),
     }
   }}, { new: true }, (err, post) => {
     res.status(200).json(post);
   })
});

router.post("/comments/new", async(req, res) => {
  let newComment = new Comment(req.body);
  let commentId = await Comment.estimatedDocumentCount();

  newComment.id = parseInt(commentId) + 1;
  await newComment.save();

  User.findOneAndUpdate({ id: newComment.author.id }, { $push: {
    comments: newComment._id
  } }, (err, post) => {
    res.status(201).json({
      code: 201,
      response: newComment
    });
  });
});

module.exports = router;