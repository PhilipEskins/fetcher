const express = require('express')
const router = express.Router()
const userController = require('./controllers/userController')

// Home page
router.get('/', userController.home)

// Sign up
router.post('/register', userController.register)

// Login
router.post('/login', userController.login)

module.exports = router