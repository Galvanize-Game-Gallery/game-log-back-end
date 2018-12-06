const db = require('../../db')

function verifyPlatformGames(platformid, gameid){
    return (
        db('platform_games')
        .where({
            platform_id: platformid,
            game_id: gameid
        })
        .returning('*')
    )
    .then(data=> {
        if(!data) throw {status:404, message: 'Game not found on that platform'}
        return data
    })
};

const getLibrary = function() {
    return db('games')
    .then(function(library) {
        const promises = library.map(game => {
            return db('platform_games')
            .join('platforms', 'platforms.igdb_id', 'platform_games.platform_id')
            .where('platform_games.game_id', game.igdb_id)
            .then(function(data) {
                // console.log(data)
                game.platforms = data.name
                return {...game, platforms: data.map(ele => ele.name) }
            })
        })
        return Promise.all(promises)
    })
};

const getUserGames = function(userId, platformId) {
    // return  db.raw(`Select * from users
    // inner join user_platforms up on up.user_id = users.id
    // inner join user_games_platform ugp on ugp.u_p_id = up.id
    // inner join platform_games pg on pg.id = ugp.p_g_id
    // inner join games on pg.game_id = games.igdb_id
    // where up.platform_id = ${platformId} and 
    // users.id = ${userId}`)
    
    return db('users')
    .select('games.igdb_id', 'games.title', 'games.cover_url', 'games.desc', 'user_games_platform.user_rating', 'user_games_platform.notes','platform_games.platform_id')
    .where('users.id', userId)
    .join('user_platforms','user_platforms.user_id', 'users.id')
    .where('user_platforms.platform_id', platformId)
    .join('user_games_platform', 'user_id', 'u_p_id')
    .join('platform_games', 'platform_games.id', 'user_games_platform.p_g_id')
    .join('games', 'platform_games.game_id', 'games.igdb_id')

    .then(function(response) {
        console.log(response)
        return response
        


  
    })

}

const getUserPlatforms = function (userId) {
  return db('platforms')
  .select('platforms.igdb_id', 'platforms.name', 'platforms.url', 'platforms.logo_url', 'user_platforms.platform_notes', 'user_platforms.year_purchased')
  .join('user_platforms', 'user_platforms.platform_id', 'platforms.igdb_id')
  .where('user_platforms.user_id', userId)

  .then(function(response){
      console.log(response)
      return response
      
  })
}


module.exports = {
    verifyPlatformGames,
    getLibrary,
    getUserGames,
    getUserPlatforms
}