const model = require('../models/gamemodel.js')
const axios = require('axios')

function verifyPlatformGames(req,res,next) {
    if(!req.body.game_id) return next({status: 400, message: 'Bad Request, Must Include GameID'})

    model.verifyPlatformGames(req.params.platformId, req.body.game_id)
    .then(data => {
        req.pgid = data.id
        return next()
    })
    .catch(next)
}

module.exports = {verifyPlatformGames}