const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/igdbcontrollers');

router.get('/games/:id', ctrl.getGame);
router.get('/platforms/', ctrl.getPlatforms)

module.exports = router