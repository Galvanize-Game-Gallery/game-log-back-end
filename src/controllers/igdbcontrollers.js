const model = require('../models/igdbmodel');

function getGame (req, res, next) {
    const gameID = req.params.id;
    model.getGame(gameID).then(function(result) {
        if (!result)
        return next({ status: 404, message: "Game not Found" });
    
    return result;
    })
};

function getGames (req, res, next) {
    const gameTitle = req.params.title;
    model.getGames(gameTitle).then(function(result) {
        if (!result)
        return next({ status: 404, message: "Game not Found" });
    
      res.status(200).send(result);
    })
};

function getPlatforms (req, res, next) {
    const platformID = req.params.id;
    model.getPlatforms(platformID).then(function(result) {
        if (!result)
            return next({status: 404, message: "No Systems Found"});
            
        res.status(200).send(result)
    })
};

function addGameToLibrary (req, res, next) {
    const gameID = req.params.id;
    model.addGame(gameID).then(function(result) {
        if (!result)
            return next({status: 404, message: "Game Not Found"});

    res.status(200).send(result);
    })
    .catch(next);
};

function checkLibrary(req, res, next) {
    const gameID = req.params.id;

    const result = model.checkLibrary(gameID);
    if(result) next({status: 404, message: "Bad Library Request"})

    return next(); 
}

function verifyPlatformGames(req,res,next) {
    if(!req.body.game_id) return next({status: 400, message: 'Bad Request, Must Include GameID'})

    model.verifyPlatformGames(req.params.platformId, req.body.game_id)
    .then(data => {
        req.pgid = data[0].id
        return next()
    })
    .catch(next)
}

module.exports = {
    getGames,
    getGame,
    getPlatforms,
    addGameToLibrary,
    checkLibrary,
    verifyPlatformGames
}