const express = require('express')

const router = express.Router()
const userController = require('../controllers/usercontroller')
const igdbController = require('../controllers/igdbcontrollers')

router.post('/', userController.create)
router.post('/:userId/platforms', userController.addPlatformToUser)

// router.get('/:userId/platforms', userController.getUserPlatforms)

router.post('/:userId/platforms/:platformId/games', userController.verifyUserPlatform, igdbController.verifyPlatformGames, userController.addToShelf)
router.delete('/:userId/platforms/:platformId/games/:gameId', userController.dropFromShelf)
router.put('/:userId/platforms/:platformId/games/:gameId', userController.editGameOnShelf)

module.exports = router
