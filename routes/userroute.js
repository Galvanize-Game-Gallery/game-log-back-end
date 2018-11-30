const express = require('express')
const router = express.Router()
const ctrl = require('../controllers/usercontroller')

//get all
router.get('/', ctrl.getAll)

module.exports = router