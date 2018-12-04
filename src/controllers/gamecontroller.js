const model = require('../models/gamemodel.js')
const axios = require('axios')

function verifyPlatformGames(req,res,next) {
    if(!req.body.game_id) return next({status: 400, message: 'Bad Request, Must Include GameID'})

    model.verifyPlatformGames(req.params.platformId, req.body.game_id)
    .then(data => {
        req.pgid = data[0].id
        return next()
    })
    .catch(next)
}

module.exports = {verifyPlatformGames}

// http POST :3000/user/1/platforms/6/games game_id=231 user_rating=3 notes="What a classic"