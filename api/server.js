const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const { authenticator } = require('../middleware/index')

// ADD ROUTER IMPORTS HERE
const favoritesRouter = require('../favorites/favorites-router')
const usersRouter = require('../users/users-router')

const server = express();

server.use(helmet());
server.use(cors())
server.use(express.json());

server.use("/api/users", /*ADD MIDDLEWARE HERE*/ usersRouter);
server.use("/api/favorites", authenticator, favoritesRouter);

module.exports = server;
