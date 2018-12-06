const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/gamecontroller');

router.get('/library', ctrl.getLibrary);

router.get('/usergames', ctrl.getUserGames);

module.exports = router