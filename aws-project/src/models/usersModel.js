/*
Models are defined using the Schema interface.
The Schema allows you to define the fields stored in each document
along with their validation requirements and default values.
In addition, you can define static and instance helper methods
to make it easier to work with your data types,
and also virtual properties that you can use like any other field,
but which aren't actually stored in the database
(we'll discuss a bit further below).

Schemas are then "compiled" into models using the mongoose.model() method. Once you have a model you can use it to find, create, update, and delete objects of the given type.
 */

module.exports = function(mongoose) {
    // Define schema
    var Schema = mongoose.Schema;
    //A schema can have an arbitrary number of fields — each one represents a field in the documents stored in MongoDB.
    var UserSchema = new Schema({
        name:  {String, required: true},// String is shorthand for {type: String}
        surname: {String, required: true},
        email: {String, unique: true, required: true},
        password: {String, required: true}//qui sarebbe meglio l'hash

    });
    // Compile model from schema
    //1rst arg: singular name of the collection that will be created for your model
    //2nd arg: the schema you want to use in creating the model
    return mongoose.model('usermodel', UserSchema, 'User');
};
