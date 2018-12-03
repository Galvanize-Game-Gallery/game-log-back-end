const model = require('../models/igdbmodel');

function getGame (req, res, next) {
    const gameID = req.params.id;
    model.getGame(gameID).then(function(result) {
        if (!result)
        return next({ status: 404, message: "Game not Found" });
    
      res.status(200).send(result);
    })
};

function getPlatforms (req, res, next) {
    const platformID = req.params.id;
    console.log(platformID);
    model.getPlatforms(platformID).then(function(result) {
        if (!result)
            return next({stats: 404, message: "No Systems Found"});

        res.status(200).send(result)
    })
}

module.exports = {
    getGame,
    getPlatforms
}