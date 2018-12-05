
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
  return deleteTables(knex, tables);
};
