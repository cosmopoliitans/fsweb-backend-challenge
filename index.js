const server = require("./api/server.js");

const PORT = process.env.PORT || 9001;

server.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
