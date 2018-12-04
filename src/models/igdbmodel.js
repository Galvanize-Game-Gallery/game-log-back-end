const igdb = require('igdb-api-node').default;
const key = process.env.API_KEY
const client = igdb(key);
const db = require('../../db');

const checkLibrary = function(id) {
    getGame(id)
    .then(function(result){
            if(!result) throw {error: 400, message: "Game Not Found"}
        return (
        db('games')
        .select('*')
        .where({igdb_id: id})
        )
        .then(function([data]){
            if(data) throw {error: 404, message: "Game Already Exists"}
            return data
        })
    })
    .catch(error => {
    throw error; })
}

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
        limit: 10,
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
    getGame(id)
    .then(function([result]){
        if (!result) throw {error: 400, message: "Game Not Found"}
        
        // const newGame = {
        //     igdb_id: result.id,
        //      title: result.name,
        //       cover_url: result.cover.url,
        //        desc: result.summary
        //     };
        platforms = result.platforms
        //   console.log(newGame)
        return db('games').insert([
            {
                igdb_id: result.id,
                 title: result.name,
                  cover_url: result.cover.url,
                   desc: result.summary
                }
        ])
        .returning('*')
    })
}

module.exports = {
    getGame,
    getPlatforms,
    getGames,
    checkLibrary,
    addGame
}