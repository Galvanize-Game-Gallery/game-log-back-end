
exports.up = function(knex, Promise) {
  return knex.schema.createTable('platform_games', table => {
      table.increments();
      table.integer('game_id').references('games.igdb_id').onDelete('CASCADE').notNullable();
      table.integer('platform_id').references('platforms.igdb_id').onDelete('CASCADE').notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('platform_games');
};
