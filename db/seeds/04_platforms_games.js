
exports.seed = function(knex, Promise) {
 return knex('platform_games').insert([
   {id: 1, game_id: 41608, platform_id: 49},
   {id: 2, game_id: 25076, platform_id: 49},
   {id: 3, game_id: 25076, platform_id: 48},
   {id: 4, game_id: 231, platform_id: 6},
   {id: 5, game_id: 233, platform_id: 6},
   {id: 6, game_id: 7346, platform_id: 130},
   {id: 7, game_id: 72870, platform_id: 48}
 ])
 .then(() => {
  return knex.raw(`SELECT setval('platform_games_id_seq', (SELECT max(id) FROM platform_games));`)
 })
};
