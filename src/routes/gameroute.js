const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/gamecontroller');

router.get('/library', ctrl.getLibrary);

router.get('/usergames', ctrl.getUserGames);
router.get('/userplatforms', ctrl.getUserPlatforms);

module.exports = router