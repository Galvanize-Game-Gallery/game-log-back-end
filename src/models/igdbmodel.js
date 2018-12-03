const igdb = require('igdb-api-node').default;
const key = process.env.API_KEY
const client = igdb(key);

const getGame = function(title) {
    return client.games({
        fields: ['id', 'name', 'rating', 'cover.url', 'platforms'],
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

const getPlatforms = function() {
    return client.platforms({
        fields: ['id', 'name', 'generation', 'logo.url', 'summary'],
        limit: 10,
        offset: 0,
        order: 'generation:desc',
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