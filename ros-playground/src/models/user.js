module.exports = function (mongoose){
    var userSchema = mongoose.Schema({
        username: String,
        name: String,
        email: String,
        hash: String,
        salt: String
    })
    return mongoose.model('User',userSchema)
}