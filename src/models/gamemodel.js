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

const getUserGames = function() {
  console.log('about to return games')
    return db('games')
    .join('user_platforms.userid', 'users.id')
    .then(function(response) {
        console.log(response)
  
    })
  .then(() => {
      console.log('the then')
      return "your only game is gorgar"

  })

 
  
}


module.exports = {
    verifyPlatformGames,
    getLibrary,
    getUserGames
}