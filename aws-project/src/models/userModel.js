module.exports = function(mongoose) {
    var Schema = mongoose.Schema;
    var UserSchema = new Schema({
        name:  String, // String is shorthand for {type: String}
        surname: String,
        email: String,
        password: String,
    });
    return mongoose.model('usermodel', UserSchema, 'User');
};
