const igdb = require('igdb-api-node').default;
const key = process.env.API_KEY
const client = igdb(key);
const db = require('../../db');

const checkLibrary = function(id) {
    return getGame(id)
    .then(function(result){
        if(!result) throw {status: 400, message: "Game Not Found"}
        return (
            db('games')
            .select('*')
            .where({igdb_id: id})
            )
    })
    .then(function([data]){
        if(data) throw {status: 404, message: "Game Already Exists"}
        return
    })
};

const getGame = function(id) {
    return client.games({
        fields: ['id', 'name', 'cover.url', 'platforms', 'summary'],
        limit: 1,
        offset: 0, 
        // order: 'rating:desc',
        ids: [id]
    }).then(response => {
        return response.body;
    }).catch(error => {
        throw error;
    })
};

const getGames = function(title) {
    return client.games({
        fields: ['id', 'name', 'cover.url'],
        limit: 5,
        offset: 0, 
        // order: 'rating:desc',
        search: title
    }).then(response => {
        return response.body;
    }).catch(error => {
        throw error;
    })
};

const getPlatforms = function(id) {
    return client.platforms({
        fields: ['id', 'name', 'logo', 'url'],
        limit: 1,
        offset: 0,
        search: id
    }).then(response => {
        return response.body;
    }).catch(error => {
        throw error;
    })
};

const addGame = function(id) {
    return getGame(id)
    .then(function([result]){
        if (!result) throw {error: 400, message: "This Game Not Found"}
        platforms = result.platforms
        let url
        if(!result.cover || !result.cover.url) {
            url = 'https://pbs.twimg.com/profile_images/999040468804550656/fz9_TwiQ_400x400.jpg'
       }
       else {
           url = result.cover.url
        }

        let desc = result.summary ? result.summary : 'No Summary Found'

        return db('games').insert([{
            igdb_id: result.id,
            title: result.name,
            cover_url: url,
            desc: desc
            }])
        .then(function () {
                const promises = platforms.map(ele => {
                    //does Platform Exist in Platforms?
                    return db('platforms')
                    .where({
                        igdb_id: ele
                    })
                    .then(function ([data]) {
                        //if platform exists, add an entry to platform_games
                        if (data) {
                            return db('platform_games').insert([{
                                platform_id: ele,
                                game_id: id
                            }])
                        } else {
                            return Promise.resolve({message: "Platform not part of our Database."});
                        }
                    })
                }) 
            return Promise.all(promises)
        })
        .catch(() => {
            throw {error: 400, message: "Game already in Library"}
        })
    })
};

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

module.exports = {
    getGame,
    getPlatforms,
    getGames,
    checkLibrary,
    addGame,
    verifyPlatformGames
}