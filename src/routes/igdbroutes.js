const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/igdbcontrollers');

router.get('/', ctrl.getGames); // title should be part of req.query
router.get('/:id', ctrl.getGame); // no need for /id
router.get('/platforms/:id', ctrl.getPlatforms);
router.post('/:id', ctrl.checkLibrary, ctrl.addGameToLibrary) // no need for /id



module.exports = router