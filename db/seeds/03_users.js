
exports.seed = function(knex, Promise) {
  return knex('users').insert([
    {id: 1, username: 'Beamer92', password: '$2a$10$S5UVAufnM2E6H7OVvEgOTOqypkxe925vurwwgNNl8pOtFhvNnpCWG', fname: "Brendan", lname: "Woodell"},
    {id: 2, username: 'chriskistner', password: '$2a$10$rVKZkCbx80xFDoYDotb.Uu0D/6J59CXrn6YMpwqZzL9yg/ynywFbi', fname: 'Chris', lname: "Kistner"},
    {id: 3, username: 'a', password: '$2b$10$XgjgKfqeIMGxoEfqnUhts.8Kxjyr6FkrTewPhXU505NT3xWGpz9e.', fname: 'a', lname: "a"},

  ])
  .then(() =>{
    return knex.raw(`SELECT setval('users_id_seq', (SELECT max(id) FROM users));`)})
};
