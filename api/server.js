const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

// ADD ROUTERS IMPORTS HERE

const server = express();

server.use(helmet(), cors(), express.json());

server.use("/api/users" /*ADD ROUTER OR MIDDLEWARE HERE*/);
server.use("/api/favorites" /*ADD ROUTER OR MIDDLEWARE HERE*/);

module.exports = server;
