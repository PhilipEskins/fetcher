const { response } = require("../app")
const User = require("../models/User")

// uses Promise (then/catch method)
exports.login = function(req, res) {
    let user = new User(req.body)
    user.login().then(function(result) {
        req.session.user = {username: user.data.username}
        res.send(result)
    }).catch(function(e) {
        res.send(e)
    })
}

exports.logout = function() {
    
}

exports.register = (req, res) => {
    let user = new User(req.body)
    user.register()
    if (user.errors.length) {
        res.send(user.errors)
    } else {
        res.send("Good jorb")
    }
}

exports.home = (req, res) => {
    if (req.session.user) {
        res.send("wElcome " + req.session.user.username)
    } else {
        res.render("index")
    }
}