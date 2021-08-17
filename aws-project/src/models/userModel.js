module.exports = function(mongoose) {
    const Schema = mongoose.Schema;
    const UserSchema = new Schema({
        name: String,
        surname: String,
        email: String,
        user_id: String,
        password: String,
        salt: String,
    }, {
        versionKey: false
    });
    return mongoose.model('User', UserSchema);
};
