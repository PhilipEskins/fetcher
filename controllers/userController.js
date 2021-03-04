const User = require("../models/User")

// uses Promise (then/catch method)
exports.login = function(req, res) {
    let user = new User(req.body)
    user.login().then(function(result) {
        req.session.user = {username: user.data.username, avatar: user.avatar}
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
        req.session.user = {username: user.data.username, avatar: user.avatar}
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
        res.render('home-dashboard', {username: req.session.user.username, avatar: req.session.user.avatar})
    } else {
        res.render("index", {errors: req.flash('errors'), regErrors: req.flash('regErrors')})
    }
}