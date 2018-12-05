const express = require('express')

const router = express.Router()
const userController = require('../controllers/usercontroller')
const igdbController = require('../controllers/igdbcontrollers')

router.post('/', userController.create)
router.post('/:userId/platforms', userController.addPlatformToUser)
router.post('/:userId/platforms/:platformId/games', userController.verifyUserPlatform, igdbController.verifyPlatformGames, userController.addToShelf)

module.exports = router
