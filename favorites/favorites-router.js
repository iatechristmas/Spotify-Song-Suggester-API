const router = require("express").Router();

const Comments = require("./favorites-model");

router.get("/:id/favorites", (req, res) => {
  const { id } = req.params;

  Comments.getFavorites(id)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      res.status(500).json({ errorMessage: error });
    });
});

router.post("/:id/add/:song", (req, res) => {
  const { id } = req.params;
  const { song } = req.params;

  Comments.addFavorite(id, song)
    .then(([response]) => {
      res.status(201).json(response);
    })
    .catch((error) => {
      res.status(500).json({ errorMessage: error });
    });
});

router.delete("/:id/remove/:song_id", (req, res) => {
  const { id } = req.params;
  const { song_id } = req.params;

  Comments.removeFavorite(id, song_id)
    .then((response) => {
      res.status(200).json({ message: "The song was successfully deleted" });
    })
    .catch((error) => {
      res.status(500).json({ errorMessage: error });
    });
});

module.exports = router;
