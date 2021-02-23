const validator = require('validator')

let User = function(data) {
    this.data = data
    this.errors = []
}

User.prototype.validate = function() {
    let d = this.data
    let e = this.errors

    if (d.username == '') {e.push("Provide a username")}
    if (d.username != '' && !validator.isAlphanumeric(d.username)) {e.push("Username not valid")}
    if (!validator.isEmail(d.email)) {e.push("Provide an email")}
    if (d.password == '') {e.push("Provide a password")}
    if (d.password.length > 0 && d.password.length < 5) {e.push("Password not long enough")}
    if (d.password.length > 100) {e.push("Password too long")}
    if (d.username.length > 0 && d.username.length < 5) {e.push("Username not long enough")}
    if (d.username.length > 30) {e.push("Username too long")}
}

User.prototype.register = function() {
    // Validate data
    this.validate()

    // Save data to database if no errors
}

module.exports = User