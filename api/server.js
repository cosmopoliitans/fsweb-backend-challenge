const express = require("express");
const helmet = require("helmet");
// helmet, çeşitli güvenlik önlemlerini otomatik olarak uygulayan bir modüldür. 
//Örneğin, HTTP başlıklarını düzenleyerek bazı yaygın güvenlik açıklarını önler.
const cors = require("cors");
//CORS politikaları, sunucunun HTTP yanıtlarında belirtilir. Tarayıcılar, bir isteğin gönderildiği sunucudan CORS 
//politikalarını kontrol eder ve sunucunun yanıtına göre isteği kabul eder veya reddeder.

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use((err, req, res, next) => {
  // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = server;
