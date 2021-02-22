const express = require('express')
const router = express.Router()
const userController = require('./controllers/userController')

// Home page
router.get('/', userController.home)

// Sign up
router.post('/register', userController.register)

module.exports = router