const router = require("express").Router();
const Users = require("./users-model.js");
const { limited } = require("../users/users-middleware.js");

router.get("/", limited, (req, res, next) => {
  Users.getAllTweets()
    .then((tweet) => {
      res.json(tweet);
    })
    .catch(next);
});

router.get("/:user_id", limited, (req, res, next) => {
  // hazır
  Users.getTweetById(req.params.user_id)
    .then((user) => {
      res.json(user);
    })
    .catch(next);
});

router.post("/tweets", async (req, res, next) => {
  try {
    // Yeni tweet'in veritabanına kaydedilmesi
    const tweet = {
      user_id: req.body.user_id,
      user_name: req.body.user_name,
      body: req.body.body,
      img_url: req.body.img_url,
    };
    const insertedTweet = await Users.createTweet(tweet);
    res.status(201).json(insertedTweet);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
