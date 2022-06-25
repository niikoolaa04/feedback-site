const router = require("express").Router();
const User = require("../models/User");
const Poll = require("../models/Poll");
const Survey = require("../models/Survey");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const Comment = require("../models/Comment");
const { generateRandomID } = require("../utils/utils");

router.use(cors({
  credentials: true,
  origin: true
}));

router.use(cookieParser());

router.get("/users", async(req, res) => {
  // if(req.headers.origin != process.env.SERVER_CLIENT_URL) return res.sendStatus(401);
  User.find({ }, { password: false, _id: false }, (err, post) => {
    res.status(200).json(post);
  });
});

router.get("/users/list", async(req, res) => {
  if(req.headers.origin != process.env.SERVER_CLIENT_URL) return res.sendStatus(401);
  let profile = req.params.id;
  User.find({ }, { id: true, about: true, profileName: true, polls: true,
     surveys: true, username: true, mail: true, profilePicture: true,
      likes: true, dislikes: true, role: true }, (err, post) => {
    res.status(200).json(post);
  })
});

router.get("/users/:id", async(req, res) => {
  if(req.headers.origin != process.env.SERVER_CLIENT_URL) return res.sendStatus(401);
  let profile = req.params.id;
  User.findOne({ id: profile }, { id: true, about: true, profileName: true, polls: true,
     surveys: true, username: true, mail: true, profilePicture: true,
      likes: true, dislikes: true, role: true }, (err, post) => {
    res.status(200).json(post);
  })
});

router.delete("/users/:id", async(req, res) => {
  if(req.headers.origin != process.env.SERVER_CLIENT_URL) return res.sendStatus(401);
  let profile = req.params.id;
  User.findOneAndDelete({ id: profile }, (err, post) => {
    res.status(200).json(post);
  })
});

router.get("/users/:id/comments", async(req, res) => {
  if(req.headers.origin != process.env.SERVER_CLIENT_URL) return res.sendStatus(401);
  const id = req.params.id;

  User.findOne({ id }, (err, post) => {
    const comments = post?.comments;
    Comment.find({ _id: { $in: comments } }, (e, commentList) => {
      res.json(commentList).status(200)
    })
  });
});

router.get("/users/:id/surveys", async(req, res) => {
  if(req.headers.origin != process.env.SERVER_CLIENT_URL) return res.sendStatus(401);
  const id = req.params.id;

  User.findOne({ id }, (err, post) => {
    const surveys = post?.surveys;
    Survey.find({ _id: { $in: surveys } }, (e, surveyList) => {
      res.json(surveyList).status(200)
    })
  });
});

router.get("/users/:id/polls", async(req, res) => {
  if(req.headers.origin != process.env.SERVER_CLIENT_URL) return res.sendStatus(401);
  const id = req.params.id;

  User.findOne({ id }, (err, post) => {
    const polls = post?.polls;
    Poll.find({ _id: { $in: polls } }, (e, pollsList) => {
      res.json(pollsList).status(200)
    })
  });
});

router.post("/users/:id/reputation/:type", async(req, res) => {
  if(req.headers.origin != process.env.SERVER_CLIENT_URL) return res.sendStatus(401);
  const id = req.params.id;
  const repType = req.params.type;
  const author = new String(req.body.author);

  User.findOne({ id }, { likes: true, dislikes: true }, { new: true }, async(err, post) => {
    if(!post) return;

    if((post.likes.find((like) => like.user == `${author}`) && repType == "pos") || (post.dislikes.find((dislike) => dislike.user == `${author}`) && repType == "neg")) {
      post.likes = post.likes.filter((like) => like.user != `${author}`);
      post.dislikes = post.dislikes.filter((dislike) => dislike.user != `${author}`);

      await post.save();
      return res.status(200).json({
        code: 200,
        response: "Removed " + repType == "pos" ? " Like" : " Dislike"
      });
    }

    post.likes = post.likes.filter((like) => like.user != `${author}`);
    post.dislikes = post.dislikes.filter((dislike) => dislike.user != `${author}`);

    if(repType == "pos") post.likes.push({ user: `${author}` });
    else if(repType == "neg") post.dislikes.push({ user: `${author}` });

    await post.save();

    res.json({
      code: 200,
      response: post
    })
  });
});

router.put("/users/:id", async(req, res) => {
  if(req.headers.origin != process.env.SERVER_CLIENT_URL) return res.sendStatus(401);
  let profile = req.params.id;
  User.findOneAndUpdate({ id: profile }, req.body, { new: true }, (err, post) => {
    res.status(200).json(post);
  })
});

router.post("/polls/new", async(req, res) => {
  if(req.headers.origin != process.env.SERVER_CLIENT_URL) return res.sendStatus(401);
  let newPoll = new Poll(req.body);

  const savePoll = async() => {
    let randomId = generateRandomID(9);
    let pollExist = await Poll.exists({ id: randomId });
    
    if(pollExist) return await savePoll();
    
    newPoll.id = randomId;
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
  }
  
  await savePoll();
});

router.get("/polls/list", async(req, res) => {
  if(req.headers.origin != process.env.SERVER_CLIENT_URL) return res.sendStatus(401);
  Poll.find({ }, (err, post) => {
    res.status(200).json(post);
  })
});

router.get("/polls/:id", async(req, res) => {
  if(req.headers.origin != process.env.SERVER_CLIENT_URL) return res.sendStatus(401);
  Poll.findOne({ id: req.params.id }, (err, post) => {
    res.status(200).json(post);
  })  
});

router.delete("/polls/:id", async(req, res) => {
  if(req.headers.origin != process.env.SERVER_CLIENT_URL) return res.sendStatus(401);
  Poll.findOneAndDelete({ id: req.params.id }, (err, post) => {
    res.status(200).json(post);
  })
});

router.post("/polls/:id/vote", async(req, res) => {
  if(req.headers.origin != process.env.SERVER_CLIENT_URL) return res.sendStatus(401);
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
  if(req.headers.origin != process.env.SERVER_CLIENT_URL) return res.sendStatus(401);
  let newSurvey = new Survey(req.body);

  const saveSurvey = async() => {
    let randomId = generateRandomID(9);
    let surveyExist = await Survey.exists({ id: randomId });
    
    if(surveyExist) return await saveSurvey();
    
    newSurvey.id = randomId;
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
  }
  
  await saveSurvey();
});

router.get("/surveys/list", async(req, res) => {
  if(req.headers.origin != process.env.SERVER_CLIENT_URL) return res.sendStatus(401);
  Survey.find({ }, (err, post) => {
    res.status(200).json(post);
  })
});

router.get("/surveys/:id", async(req, res) => {
  if(req.headers.origin != process.env.SERVER_CLIENT_URL) return res.sendStatus(401);
  Survey.findOne({ id: req.params.id }, (err, post) => {
    res.status(200).json(post);
  })  
});

router.delete("/surveys/:id", async(req, res) => {
  if(req.headers.origin != process.env.SERVER_CLIENT_URL) return res.sendStatus(401);
  Survey.findOneAndDelete({ id: req.params.id }, (err, post) => {
    res.status(200).json(post);
  })
});

router.post("/surveys/:id/vote", async(req, res) => {
  if(req.headers.origin != process.env.SERVER_CLIENT_URL) return res.sendStatus(401);
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
  if(req.headers.origin != process.env.SERVER_CLIENT_URL) return res.sendStatus(401);
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