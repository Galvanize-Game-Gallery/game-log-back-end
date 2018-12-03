
exports.up = function(knex, Promise) {
  return knex.schema.createTable('platforms', table => {
      table.increments();
      table.string('name').notNullable();
      table.text('url');
      table.text('logo_url');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('platforms');
};
