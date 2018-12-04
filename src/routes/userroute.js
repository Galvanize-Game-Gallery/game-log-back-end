const express = require('express')

const router = express.Router()
const userController = require('../controllers/usercontroller')
const gameController = require('../controllers/gamecontroller')

router.post('/', userController.create)

router.post('/:userId/platforms/:platformId/games', userController.verifyUserPlatform, gameController.verifyPlatformGames, userController.addToShelf)

module.exports = router
