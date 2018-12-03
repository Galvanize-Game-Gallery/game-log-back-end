
exports.up = function(knex, Promise) {
  return knex.schema.createTable('user_games_platform', table => {
      table.increments();
      table.integer('p_g_id').references('platform_games.id').onDelete('CASCADE').notNullable();
      table.integer('u_p_id').references('user_platforms.id').onDelete('CASCADE').notNullable();
      table.integer('user_rating').defaultsTo(1);
      table.text('notes').defaultsTo('');
  })
  .then(table => {
      return knex.schema.raw(
          `alter table "user_games_platform"
          ADD CONSTRAINT "user_rating_min_max"
          CHECK (user_rating <= 5 AND user_rating > 0)`
          )
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('user_games_platform');
};
