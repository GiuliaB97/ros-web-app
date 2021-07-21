module.exports = function(mongoose) {
    var Schema = mongoose.Schema;
    var UsrSchema = new Schema({
        name:  String, // String is shorthand for {type: String}
		surname:  String, // String is shorthand for {type: String}
		email:  String, // String is shorthand for {type: String}
		salt:  String, // String is shorthand for {type: String}
    });
    return mongoose.model('usrmodel', UsrSchema, 'Usr');
};
