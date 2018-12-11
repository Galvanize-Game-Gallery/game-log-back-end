const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/gamecontroller');

router.get('/library', ctrl.getLibrary);
router.get('/usergames/:userId/:platformId', ctrl.getUserGames);
router.get('/userplatforms/:userId', ctrl.getUserPlatforms);
// how is this different that line 6?
router.get('/library/:userId/:platformId', ctrl.getPlatformGames)

module.exports = router