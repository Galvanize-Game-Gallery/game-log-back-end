
function deleteTables(knex, tables){
  return tables.reduce((acc, ele) => {
    return acc.then(() => knex(ele).del())
  }, Promise.resolve())
};

exports.seed = function(knex, Promise) {
  const tables = [
    'user_games_platform',
    'user_platforms',
    'platform_games',
    'users',
    'platforms',
    'games'
  ]

  return deleteTables(knex, tables)
  // knex('user_games_platform').del()
  // .then(function(){
  //   return knex('platform_games').del()
  // })
  // .then(function(){
  //   return knex('user_platforms').del()
  // })
  // .then(function(){
  //   return knex('users').del()
  // })
  // .then(function(){
  //   return knex('platforms').del()
  // })
  // .then(function(){

  // })
};
