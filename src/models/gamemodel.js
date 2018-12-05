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
    .returning('*')
    .then(data=> {
        if(!data) throw {status:404, message: 'Uh  Oh Our Library is Missing!'}
        return data
    })
};

module.exports = {
    verifyPlatformGames,
    getLibrary
}