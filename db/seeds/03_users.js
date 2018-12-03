
exports.seed = function(knex, Promise) {
  return knex('users').insert([
    {id: 1, username: 'Beamer92', password: 'hello1', fname: "Brendan", lname: "Woodell"},
    {id: 2, username: 'chriskistner', password: 'eldar911', fname: 'Chris', lname: "Kistner"},
  ])
  .then(() =>{
    return knex.raw(`SELECT setval('users_id_seq', (SELECT max(id) FROM users));`)})
};
