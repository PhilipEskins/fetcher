const express = require('express')
const router = express.Router()
const userController = require('./controllers/userController')

// Home page
router.get('/', userController.home)

// User routes
router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/logout', userController.logout)

module.exports = router