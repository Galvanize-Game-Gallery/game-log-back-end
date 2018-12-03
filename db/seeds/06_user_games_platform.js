
exports.seed = function(knex, Promise) {
 return knex('user_games_platform').insert([
   {id: 1, p_g_id: 2, u_p_id: 1, user_rating: 2, notes: "This game is super slow, the economy sucks, the user interface is over-engineered"}, //this should be Red Dead Redemption for Beamer92 on Xbox One
   {id: 2, p_g_id: 1, u_p_id: 1, user_rating: 5}, //For Beamer92 on Xbox One, the game Halo
   {id: 3, p_g_id: 5, u_p_id: 2, user_rating: 3}, //Half_Life 2 for Beamer92's PC
   {id: 4, p_g_id: 6, u_p_id: 3, user_rating: 5, notes: 'Great game to release first on a console. Awesome start for Nintendo'}, //Nintendo Switch for Chris, Zelda game
   {id: 5, p_g_id: 3, u_p_id: 5, user_rating: 2}, //PS4 for Chris, Red Dead
 ])
 .then(()=> {
   return knex.raw(`SELECT setval('user_games_platform_id_seq', (SELECT max(id) from user_games_platform));`)
 })
};
