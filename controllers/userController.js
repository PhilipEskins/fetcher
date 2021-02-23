const User = require("../models/User")

exports.login = function() {

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
    res.render("index")
}