module.exports = function(mongoose) {
    const Schema = mongoose.Schema;
    const UserSchema = new Schema({
        name: String, // String is shorthand for {type: String}
        surname: String, // String is shorthand for {type: String}
        email: String, // String is shorthand for {type: String}
        user_id: String,
        password: String,
        salt: String, // String is shorthand for {type: String}
    }, {
        versionKey: false
    });
    return mongoose.model('User', UserSchema);
};
