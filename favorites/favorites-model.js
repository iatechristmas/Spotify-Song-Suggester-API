const db = require("../database/dbConfig");

module.exports = {
  findFavorite,
  addFavorite,
  removeFavorite,
  getFavorites,
};

function findFavorite(id) {
  return db("favorites").select("favorite_songs").where({ id });
}

function addFavorite(id, favorite_songs) {
  return db("favorites")
    .insert({ favorite_songs: favorite_songs, user_id: id })
    .then((id) => {
      return findComment(id[0]);
    });
}

function removeFavorite(user_id, favorite_songs) {
  return db("favorites")
    .where({
      "favorites.user_id": `${user_id}`,
      "cfavorites.favorite_songs": `${favorite_songs}`,
    })
    .del();
}

function getFavorites(id) {
  return db("favorites").select("favorite_songs").where({ user_id: id });
}
