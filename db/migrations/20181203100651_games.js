
exports.up = function(knex, Promise) {
  return knex.schema.createTable('games', table => {
      table.increments();
      table.integer('igdb_id').notNullable();
      table.string('title').notNullable();
      table.string('cover_url');
      table.text('desc');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('games');
};
