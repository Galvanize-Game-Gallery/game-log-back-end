const model = require('../models/igdbmodel');

function getGame (req, res, next) {
    const gameID = req.params.id;
    model.getGame(gameID)
    .then(function(result) {
        if (!result)
        return next({ status: 404, message: "Game not Found" });
    
        res.status(200).send(result);
    })
    .catch(next)
};

function getGames (req, res, next) {
    if(!req.query.title) next({status: 400, message: "Cannot Have Blank Search Term"})
    const gameTitle = req.query.title; // title should be part of req.query
    model.getGames(gameTitle)
    .then(function(result) {
        if (!result)
        return next({ status: 404, message: "Game not Found" });
    
      res.status(200).send(result);
    })
    .catch(next)
};

function getPlatforms (req, res, next) {
    const platformID = req.params.id;
    model.getPlatforms(platformID)
    .then(function(result) {
        if (!result)
            return next({status: 404, message: "No Systems Found"});
            
        res.status(200).send(result)
    })
    .catch(next)
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

    model.checkLibrary(gameID)
    .then(function(result){
        if(result) next({status: 404, message: "Bad Library Request"})
        next()
    })
    .catch(next)
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