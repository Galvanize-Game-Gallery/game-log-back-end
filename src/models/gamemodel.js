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
}

module.exports = {verifyPlatformGames}