const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/gamecontroller');

router.get('/library', ctrl.getLibrary);

router.get('/usergames/:userId/:platformId', ctrl.getUserGames);
router.get('/userplatforms/:userId', ctrl.getUserPlatforms);

module.exports = router