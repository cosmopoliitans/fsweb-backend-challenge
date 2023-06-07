const { JWT_SECRET } = require("../secrets");

const jwt = require("jsonwebtoken");

const limited = (req, res, next) => {
  try {
    let authHeader = req.headers["authorization"]; //kimlik doğrulama
    if (!authHeader) {
      res.status(401).json({ message: "Token gereklidir!" });
    } else {
      jwt.verify(authHeader, JWT_SECRET, (err, decodedToken) => {
        if (err) {
          res.status(401).json({ message: "Girmiş olduğunuz token geçersizdir." });
        } else {
          req.decodedToken = decodedToken;
          next();
        }
      });
    }
  } catch (error) {
    next(error);
  }
};

const checkPayloadTweet = (req, res, next) => {
  try {
    let { user_name, body, user_id } = req.body;
    if (!user_name || !body || !user_id) {
      res.status(400).json({ messsage: "Girdiğiniz alanları kontrol edin!" });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  limited,
  checkPayloadTweet,
};