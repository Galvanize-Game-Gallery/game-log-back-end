const igdb = require('igdb-api-node').default;
const key = process.env.API_KEY
const client = igdb(key);

const getGame = function(title) {
    return client.games({
        fields: ['id', 'name', 'cover.url', 'platforms', 'summary'],
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

module.exports = {
    getGame,
    getPlatforms
}