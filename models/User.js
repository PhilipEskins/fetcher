const validator = require('validator')
const usersCollection = require('../db').db().collection('users')
const bcrypt = require('bcryptjs')
const md5 = require('md5')

let User = function(data, getAvatar) {
    this.data = data
    this.errors = []
    if (getAvatar == undefined) {getAvatar = false}
    if (getAvatar) {this.getAvatar()}
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

User.prototype.validate = function () {
    return new Promise(async (resolve, reject) => {
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
    
        // check if username is taken
        if (d.username.length > 2 && d.username.length < 31 && validator.isAlphanumeric(d.username)) {
            let usernameExists = await usersCollection.findOne({username: d.username})
            if (usernameExists) {e.push("Username taken")}
        }
    
        // check if email is taken
        if (validator.isEmail(d.email)) {
            let emailExists = await usersCollection.findOne({email: d.email})
            if (emailExists) {e.push("Email already used")}
        }
        resolve()
    })
}

// uses Promise (then/catch method)
User.prototype.login = function() {
    return new Promise((resolve, reject) => {
        this.cleanUp()
        usersCollection.findOne({username: this.data.username}).then((attemptedUser) => {
            if (attemptedUser && bcrypt.compareSync(this.data.password, attemptedUser.password)) {
                this.data = attemptedUser
                this.getAvatar()
                resolve("Congratz")
            } else {
                reject("Invaild username or password")
            }
        }).catch(function() {
            reject("Try again later")
        })
    })
}

User.prototype.register = function() {
    return new Promise(async (resolve, reject) => {
        // Validate data
        this.cleanUp()
        await this.validate()
    
        // Save data to database if no errors
        if (!this.errors.length) {
            // hash password
            let salt = bcrypt.genSaltSync(10)
            this.data.password = bcrypt.hashSync(this.data.password, salt)
            await usersCollection.insertOne(this.data)
            this.getAvatar()
            resolve()
        } else {
            reject(this.errors)
        }
    })
}

User.prototype.getAvatar = function() {
    this.avatar = `https://gravatar.com/avatar/${md5(this.data.email)}?s=128`
}

User.findByUsername = function(username) {
    return new Promise(function(resolve, reject) {
        if (typeof(username) != 'string') {
            reject()
            return
        }
        usersCollection.findOne({username: username}).then(function(userDoc) {
            if (userDoc) {
                userDoc = new User(userDoc, true)
                userDoc = {
                    _id: userDoc.data._id,
                    username: userDoc.data.username,
                    avatar: userDoc.avatar
                }
                resolve(userDoc)
            } else {
                reject()
            }
        }).catch(function() {
            reject()
        })
    })
}

module.exports = User