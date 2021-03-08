const Movie = require('../models/Movie')

exports.viewSubmitScreen = function(req, res) {
    res.render('submit-movie')
}

exports.submit = function(req, res) {
    let movie = new Movie(req.body, req.session.user._id)
    movie.submit().then(function() {
        res.send("Movie submitted")
    }).catch(function(errors) {
        res.send(errors)
    })
}