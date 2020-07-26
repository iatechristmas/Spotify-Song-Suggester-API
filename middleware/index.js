const Users = require("../users/users-model");
const jwt = require("jsonwebtoken");

module.exports = {
  validateId,
  validateUser,
  validateLogin,
  authenticator,
};

function validateId(req, res, next) {
  const { id } = req.params;
  Users.findBy(id)
    .then((user) => {
      if (user[0]) {
        next();
      } else {
        res.status(404).json({ message: `User ${id} could not be found` });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Could not get user" });
    });
}

function validateUser(req, res, next) {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "Please enter user data" });
  } else {
    if (!req.body.username) {
      return res
        .status(400)
        .json({ message: "Missing required field: username" });
    } else if (!req.body.first_name) {
      return res
        .status(400)
        .json({ message: "Missing required field: first_name" });
    } else if (!req.body.last_name) {
      return res
        .status(400)
        .json({ message: "Missing required field: last_name" });
    } else if (!req.body.password) {
      return res
        .status(400)
        .json({ message: "Missing required field: password" });
    }
    next();
  }
}

function validateLogin(req, res, next) {
  if (
    Boolean(
      req.body.username &&
        req.body.password &&
        typeof req.body.password === "string"
    )
  ) {
    next();
  } else {
    res
      .status(400)
      .json({ message: "Please enter both a username and password" });
  }
}

function authenticator(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    const secret = process.env.JWT_SECRET || "Goonies never say die!";

    jwt.verify(token, secret, (error, decodedToken) => {
      if (error) {
        res
          .status(401)
          .json({
            message: "Token invalid. Please log in and get a new token",
          });
      } else {
        req.jwt = decodedToken;
        next();
      }
    });
  } else {
    res.status(400).json({ message: "Not logged in. Restricted" });
  }
}
