module.exports = function (mongoose){
    var Schema = mongoose.Schema;
    var UserSchema = new Schema({
        username: String,
        name: String,
        email: String,
        hash: String,
        salt: String
    });
    return mongoose.model('User',UserSchema);
};