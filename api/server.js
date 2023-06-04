const express = require("express");
const helmet = require("helmet"); // web uygulamalarını çeşitli güvenlik saldırılarına karşı korur

const server = express();

server.use(helmet());
server.use(express.json());

server.use((err, req, res, next) => {
  // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = server;
