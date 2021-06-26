module.exports = function (mongoose){
    var userSchema = mongoose.Schema({
        username: String,
        email: String,
        bio: String,
        image: String,
        hash: String,
        salt: String
    })
    return mongoose.model('User',userSchema)
}