const express = require('express')

const router = express.Router()
const userController = require('../controllers/usercontroller')

router.post('/', userController.create)



module.exports = router
