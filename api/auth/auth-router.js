const router = require("express").Router();
const { JWT_SECRET } = require("../secrets");
const userModel = require("../users/users-model");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const Users = require("../users/users-model");
const {
  checkPayload,
  usernameVarmi,
  checkDuplicateEmail,
} = require("./auth-middleware");
const {limited} = require("../users/users-middleware")


router.get("/",limited, (req, res, next) => {
  Users.getAllUsers()
    .then((user) => {
      res.json(user);
    })
    .catch(next);
});

router.post("/register",checkPayload,checkDuplicateEmail, async (req, res, next) => {
  try {
    let hashedPassword = bcryptjs.hashSync(req.body.user_password); // oluşturulan şifre hashlendi
    let userRequestModel = {
      user_name: req.body.user_name,
      user_password: hashedPassword,
      user_email: req.body.user_email,
    };
    const registeredUser = await userModel.createUser(userRequestModel);
    res.status(201).json(registeredUser);
  } catch (error) {
    next(error);
  }
});
router.post("/login", checkPayload, usernameVarmi, (req, res, next) => {
  try {
    let payload = {
      subject: req.currentUser.user_id,
      user_name: req.currentUser.user_name,
      user_email: req.currentUser.user_email,
    };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
    res.json({
      message: `${req.currentUser.user_name} hoşgeldiniz!`,
      token: token,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;