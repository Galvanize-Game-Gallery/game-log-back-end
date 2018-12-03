
exports.up = function(knex, Promise) {
    return knex.schema.createTable('user_platforms', table=>{
        table.increments();
        table.integer('user_id').references('users.id').onDelete('CASCADE').notNullable();
        table.integer('platform_id').references('platforms.id').onDelete('CASCADE').notNullable();
        table.integer('year_purchased').defaultsTo(1985);
        table.text('platform_notes').defaultsTo('');
    })
    .then( table => {
        return knex.schema.raw(
           `ALTER TABLE "user_platforms"
           ADD CONSTRAINT "year_max" 
           CHECK(year_purchased <= date_part('year', CURRENT_DATE))` 
        )
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('user_platforms');
};
