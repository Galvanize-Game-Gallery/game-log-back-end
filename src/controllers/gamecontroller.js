const model = require('../models/gamemodel.js');

function verifyPlatformGames(req,res,next) {
    if(!req.body.game_id) return next({status: 400, message: 'Bad Request, Must Include GameID'})

    model.verifyPlatformGames(req.params.platformId, req.body.game_id)
    .then(data => {
        req.pgid = data[0].id
        return next()
    })
    .catch(next)
}

function getLibrary(req, res, next) {
    model.getLibrary().then(function(result){
        if (!result) 
            return next({status: 404, message: "Sorry, Our Library is Empty!"})
    res.status(200).send(result)
    })
    .catch(next)
}

function getUserGames(req, res, next) {
    model.getUserGames().then(function(result){
         if (!result) {
             return next({status: 404, message: `Sorry, it looks like you haven't added any games yet!`}) }
    return res.status(200).send(model.getUserGames())
    })
    
}

module.exports = {
    verifyPlatformGames,
    getLibrary,
    getUserGames
}