const express = require("express");
const helmet = require("helmet");
// helmet, çeşitli güvenlik önlemlerini otomatik olarak uygulayan bir modüldür. 
//Örneğin, HTTP başlıklarını düzenleyerek bazı yaygın güvenlik açıklarını önler.
const cors = require("cors");
//CORS politikaları, sunucunun HTTP yanıtlarında belirtilir. Tarayıcılar, bir isteğin gönderildiği sunucudan CORS
//politikalarını kontrol eder ve sunucunun yanıtına göre isteği kabul eder veya reddeder.

const authRouter = require("./auth/auth-router.js");
const usersRouter = require("./users/users-router.js");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/api/auth", authRouter);
server.use("/api/users", usersRouter);

//sunucuda, bir hata ortaya çıktığında bu hatayı yakalayan ve uygun bir yanıt 
//döndüren bir hata işleyici
server.use((err, req, res, next) => {
  // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message || "Server Error"
  });
});

module.exports = server;
