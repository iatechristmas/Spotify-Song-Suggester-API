const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = require("express").Router();
const Users = require("./users-model");

const {
  validateUser,
  validateId,
  validateLogin,
  authenticator,
} = require("../middleware/index");

router.get("/", authenticator, (req, res) => {
  Users.getAll()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      res.status(500).json({ errorMessage: error });
    });
});

router.get("/:id", authenticator, validateId, (req, res) => {
  Users.findBy(req.params.id)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      res.status(500).json({ errorMessage: error });
    });
});

router.post("/register", validateUser, (req, res) => {
  const rounds = process.env.BCRYPT_ROUNDS || 8;
  const hash = bcryptjs.hashSync(req.body.password, rounds);
  req.body.password = hash;

  Users.register(req.body)
    .then((response) => {
      res.status(201).json(response);
    })
    .catch((error) => {
      res.status(500).json({ errorMessage: error });
    });
});

router.post("/login", validateLogin, (req, res) => {
  const { username, password } = req.body;

  Users.findByUsers({ username }).then(([response]) => {
    if (response && bcryptjs.compareSync(password, response.password)) {
      const token = createToken(response);

      res.status(200).json({ message: "Welcome to our API", token });
    } else {
      res.status(401).json({ message: "Access Denied: Unauthorized" });
    }
  });
});

router.put("/:id", authenticator, validateUser, validateId, (req, res) => {
  const { id } = req.params;

  Users.editUser(req.body, id)
    .then(() => {
      Users.findBy(id).then((response) => {
        res.status(200).json(response);
      });
    })
    .catch((error) => {
      res.status(500).json({ errorMessage: error });
    });
});

router.delete("/:id", authenticator, validateId, (req, res) => {
  const { id } = req.params;

  Users.deleteUser(id)
    .then((response) => {
      res.status(200).json({ message: "The user was successfully deleted!" });
    })
    .catch((error) => {
      res.status(500).json({ errorMessage: error });
    });
});

function createToken(user) {
  const payload = {
    sub: user.id,
    username: user.username,
  };

  const secret = process.env.JWT_SECRET || "Goonies never say die!";

  const options = {
    expiresIn: "7d",
  };

  return jwt.sign(payload, secret, options);
}

module.exports = router;
