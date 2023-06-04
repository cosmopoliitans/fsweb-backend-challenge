const { JWT_SECRET } = require("../secrets");

const jwt = require("jsonwebtoken");

const limited = (req, res, next) => {
  try {
    let authHeader = req.headers["authorization"];
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

module.exports = {
limited
};