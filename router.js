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

// Profile routes
router.get('/profile/:username', userController.ifUserExists, userController.profileMoviesScreen)

// Movie routes
router.get('/submit-movie', userController.mustBeLoggedIn, movieController.viewSubmitScreen)
router.post('/submit-movie', userController.mustBeLoggedIn, movieController.submit)
router.get('/movie/:id', movieController.viewSingle)

module.exports = router