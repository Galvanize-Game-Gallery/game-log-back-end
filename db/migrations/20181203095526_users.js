
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', table => {
        table.increments();
        table.string('username').notNullable();
        table.text('password').notNullable();
        table.string('fname');
        table.string('lname');
    })  
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
