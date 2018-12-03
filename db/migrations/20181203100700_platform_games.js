
exports.up = function(knex, Promise) {
  return knex.schema.createTable('platform_games', table => {
      table.increments();
      table.integer('games_id').references('games.id').onDelete('CASCADE').notNullable();
      table.integer('platform_id').references('platforms.id').onDelete('CASCADE').notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('platform_games');
};
