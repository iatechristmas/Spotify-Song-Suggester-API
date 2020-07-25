exports.seed = function (knex) {
  return knex("users")
    .del()
    .then(function () {
      return knex("users").insert([
        {
          first_name: "Steve",
          last_name: "Rogers",
          username: "thecaptain",
          password: "peggy",
        },
        {
          first_name: "Tony",
          last_name: "Stark",
          username: "iamironman",
          password: "pepper",
        },
        {
          first_name: "Bruce",
          last_name: "Banner",
          username: "strongestavenger",
          password: "bettyross",
        },
        {
          first_name: "Thor",
          last_name: "Odinson",
          username: "godofthunder69",
          password: "mjolnir",
        },
      ]);
    });
};
