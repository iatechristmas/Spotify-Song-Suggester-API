const db = require("../database/dbConfig");

module.exports = {
  getAll,
  register,
  findBy,
  findByUsers,
  editUser,
  deleteUser,
};

function getAll() {
  return db("users");
}

function register(user) {
  return db("users")
    .insert(user, "id")
    .then((id) => {
      return findBy(id[0]);
    });
}

function findBy(id) {
  return db("users")
    .select("id", "first_name", "last_name", "username")
    .where({ id });
}

function findByUsers(filter) {
  return db("users").where(filter).orderBy("id");
}

function editUser(changes, id) {
  return db("users").where({ id }).update(changes);
}

function deleteUser(id) {
  return db("users").where({ id }).del();
}
