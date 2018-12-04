const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/igdbcontrollers');

router.get('/:title', ctrl.getGames);
router.get('/id/:id', ctrl.getGame);
router.get('/platforms/:id', ctrl.getPlatforms);
router.post('/id/:id', ctrl.checkLibrary, ctrl.addGameToLibrary)

module.exports = router