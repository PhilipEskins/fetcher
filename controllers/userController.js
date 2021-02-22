const User = require("../models/User")

exports.login = function() {

}

exports.logout = function() {
    
}

exports.register = (req, res) => {
    let user = new User(req.body)
    user.register()
    res.send("Thanks for all the fish")
}

exports.home = (req, res) => {
    res.render("index")
}