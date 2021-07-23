module.exports = function(mongoose) {
    const Schema = mongoose.Schema;
    const UserSchema = new Schema({
        user_id: String,
        name: String, // String is shorthand for {type: String}
        surname: String, // String is shorthand for {type: String}
        email: String, // String is shorthand for {type: String}
        password: String,
        salt: String, // String is shorthand for {type: String}
    });
    return mongoose.model('User', UserSchema);
};
