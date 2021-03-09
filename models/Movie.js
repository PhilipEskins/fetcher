const moviesCollection = require('../db').db().collection("movies")
const ObjectID = require('mongodb').ObjectID

let Movie = function (data, userid) {
    this.data = data
    this.userid = userid
    this.errors = []
}

Movie.prototype.cleanUp = function() {
    if (typeof(this.data.title) != "string") {this.data.title = ''}
    if (typeof(this.data.year) != "string") {this.data.year = ''}

    // get rid of extra data
    this.data = {
        title: this.data.title.trim(),
        year: this.data.year.trim(),
        createdDate: new Date(),
        submittedBy: ObjectID(this.userid)
    }
}

Movie.prototype.validate = function() {
    if (this.data.title == '') {this.errors.push("Provide a title")}
    if (this.data.year == '') {this.errors.push("Provide a year")}
}

Movie.prototype.submit = function() {
    return new Promise((resolve, reject) => {
        this.cleanUp()
        this.validate()
        if (!this.errors.length) {
            // save to database
            moviesCollection.insertOne(this.data).then(() => {
                resolve()
            }).catch(() => {
                this.errors.push("Try again later")
                reject(this.errors)
            })
        } else {
            reject(this.errors)
        }
    })
}

Movie.findSingleById = function (id) {
    return new Promise(async function(resolve, reject) {
        if (typeof(id) != 'string' || !ObjectID.isValid(id)) {
            reject()
            return
        }
        let movie = await moviesCollection.findOne({_id: new ObjectID(id)})
        if (movie) {
            resolve(movie)
        } else {
            reject()
        }
    })
}

module.exports = Movie