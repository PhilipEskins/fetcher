let User = function(data) {
    this.data = data
}

User.prototype.register = function() {
    console.log(this.data.username)
}

module.exports = User