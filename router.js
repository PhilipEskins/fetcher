const express = require('express')
const router = express.Router()
const userController = require('./controllers/userController')
const movieController = require('./controllers/movieController')

// Home page
router.get('/', userController.home)

// User routes
router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/logout', userController.logout)

// Movie routes
router.get('/submit-movie', userController.mustBeLoggedIn, movieController.viewSubmitScreen)

module.exports = router