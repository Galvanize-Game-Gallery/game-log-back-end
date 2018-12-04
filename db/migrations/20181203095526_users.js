
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', table => {
        table.increments();
        table.string('username').notNullable();
        table.text('password').notNullable();
        table.string('fname').defaultsTo('');
        table.string('lname').defaultsTo('');
    })  
};


exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
