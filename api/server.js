const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

// ADD ROUTER IMPORTS HERE
const usersRouter = require('../users/users-router')

const server = express();

server.use(helmet());
server.use(cors())
server.use(express.json());

server.use("/api/users", /*ADD MIDDLEWARE HERE*/ usersRouter);
// server.use("/api/favorites" /*ADD ROUTER OR MIDDLEWARE HERE*/);

module.exports = server;
