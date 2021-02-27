const validator = require('validator')
const usersCollection = require('../db').collection('users')
const bcrypt = require('bcryptjs')

let User = function(data) {
    this.data = data
    this.errors = []
}

User.prototype.cleanUp = function() {
    if (typeof(this.data.username) != 'string') {this.data.username = ''}
    if (typeof(this.data.email) != 'string') {this.data.email = ''}
    if (typeof(this.data.password) != 'string') {this.data.password = ''}

    // get rid of extra data
    this.data = {
        username: this.data.username.trim().toLowerCase(),
        email: this.data.email.trim().toLowerCase(),
        password: this.data.password
    }
}

User.prototype.validate = function() {
    let d = this.data
    let e = this.errors

    if (d.username == '') {e.push("Provide a username")}
    if (d.username != '' && !validator.isAlphanumeric(d.username)) {e.push("Username not valid")}
    if (!validator.isEmail(d.email)) {e.push("Provide an email")}
    if (d.password == '') {e.push("Provide a password")}
    if (d.password.length > 0 && d.password.length < 5) {e.push("Password not long enough")}
    if (d.password.length > 50) {e.push("Password too long")}
    if (d.username.length > 0 && d.username.length < 5) {e.push("Username not long enough")}
    if (d.username.length > 30) {e.push("Username too long")}
}

// uses Promise (then/catch method)
User.prototype.login = function() {
    return new Promise((resolve, reject) => {
        this.cleanUp()
        usersCollection.findOne({username: this.data.username}).then((attemptedUser) => {
            if (attemptedUser && bcrypt.compareSync(this.data.password, attemptedUser.password)) {
                resolve("Congratz")
            } else {
                reject("Invaild")
            }
        }).catch(function() {
            reject("Try again later")
        })
    })
}

User.prototype.register = function() {
    // Validate data
    this.cleanUp()
    this.validate()

    // Save data to database if no errors
    if (!this.errors.length) {
        // hash password
        let salt = bcrypt.genSaltSync(10)
        this.data.password = bcrypt.hashSync(this.data.password, salt)
        usersCollection.insertOne(this.data)
    }
}

module.exports = User