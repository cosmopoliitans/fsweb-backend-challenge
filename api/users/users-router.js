const router = require("express").Router();
const Users = require("./users-model.js");
const { limited } = require("../users/users-middleware.js");


router.get("/", limited, (req, res, next) => {
  
    Users.getAllTweets()
        .then((tweet) => {
        res.json(tweet)
    
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

module.exports = router;