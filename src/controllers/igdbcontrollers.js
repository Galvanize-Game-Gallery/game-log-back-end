const model = require('../models/igdbmodel');

function getGame (req, res, next) {
    const gameID = req.params.id;
    console.log(gameID);
    model.getGame(gameID).then(function(result) {
        if (!result)
        return next({ status: 404, message: "Game not Found" });
    
      res.status(200).send(result);
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

    const result = model.addGame(gameID)
    // console.log(result);
    // model.addGame(gameID).then(function(result) {
    //     if (!result)
    //         return next({status: 404, message: "Game Not Found"});

    // res.status(200).send(result);
    // })
    if(!result) next({status: 404, message: "Bad Additional Request"})

    return res.status(200).send(result); 
};

function checkLibrary(req, res, next) {
    const gameID = req.params.id;

    const result = model.checkLibrary(gameID);
    if(result) next({status: 404, message: "Bad Library Request"})

    return next(); 
}

module.exports = {
    getGame,
    getGames,
    getPlatforms,
    addGameToLibrary,
    checkLibrary
}