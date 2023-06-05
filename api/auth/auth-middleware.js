const db = require("../../data/db-config")
const userModel = require("../users/users-model");
const bcryptjs = require("bcryptjs");

const usernameVarmi = async (req, res, next) => {
  try {
    let isExist = await userModel.getUserById(req.body.user_id); 
    if (isExist && isExist.length > 0) {
      let currentUser = isExist[0];
      let isPasswordMatch = bcryptjs.compareSync(
        req.body.user_password,
        currentUser.user_password
      );
      if (!isPasswordMatch) {
        res.status(401).json({
          message: "Girilen bilgiler hatalı!",
        });
      } else {
        req.currentUser = currentUser;
        next();
      }
    } else {
      res.status(401).json({
        message: "Girilen bilgiler hatalı!",
      });
    }
  } catch (error) {
    next(error);
  }
};

const checkDuplicateEmail = async (req, res, next) => {
  const { user_email } = req.body;

  try {
    const existingUser = await db("users").where({ user_email }).first();
    if (existingUser) {
      return res.status(409).json({ error: "Bu e-posta zaten kullanılıyor." });
    }
    next();
  } catch (error) {
    next(error);
  }
};

const checkPayload = (req, res, next) => {
  try {
    let {user_name, user_email, user_password } = req.body;
    if (!user_name || !user_email || !user_password) {
      res.status(400).json({ messsage: "Girdiğiniz alanları kontrol edin!" });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};



module.exports = {
  usernameVarmi,
  checkPayload,
  checkDuplicateEmail,
};
