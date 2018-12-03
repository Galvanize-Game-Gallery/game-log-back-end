
exports.up = function(knex, Promise) {
  return knex.schema.createTable('games', table => {
      table.integer('igdb_id').primary().unique().notNullable();
      table.string('title').notNullable();
      table.string('cover_url');
      table.text('desc');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('games');
};
