const User = require("../models/User")

exports.mustBeLoggedIn = function(req, res, next) {
    if (req.session.user) {
        next()
    } else {
        req.flash("errors", "Must be logged in")
        req.session.save(function() {
            res.redirect('/')
        })
    }
}

// uses Promise (then/catch method)
exports.login = function(req, res) {
    let user = new User(req.body)
    user.login().then(function(result) {
        req.session.user = {username: user.data.username, avatar: user.avatar, _id: user.data._id}
        req.session.save(function() {
            res.redirect('/')
        })
    }).catch(function(e) {
        req.flash('errors', e)
        req.session.save(function() {
            res.redirect('/')
        })
    })
}

// Uses a callback
exports.logout = function(req, res) {
    req.session.destroy(function() {
        res.redirect('/')
    })
    
}

exports.register = (req, res) => {
    let user = new User(req.body)
    user.register().then(() => {
        req.session.user = {username: user.data.username, avatar: user.avatar, _id: user.data._id}
        req.session.save(function () {
            res.redirect('/')
        })
    }).catch((regErrors) => {
        regErrors.forEach(function(e) {
            req.flash('regErrors', e)
        })
        req.session.save(function () {
            res.redirect('/')
        })
    })
}

exports.home = (req, res) => {
    if (req.session.user) {
        res.render('home-dashboard')
    } else {
        res.render("index", {errors: req.flash('errors'), regErrors: req.flash('regErrors')})
    }
}

exports.ifUserExists = function(req, res, next) {
    User.findByUsername(req.params.username).then(function(userDocument) {
        req.profileUser = userDocument
        next()
    }).catch(function() {
        res.render('404')
    })
}

exports.profileMoviesScreen = function(req, res) {
    res.render('profile', {
        profileUsername: req.profileUser.username,
        profileAvatar: req.profileUser.avatar
    })
}