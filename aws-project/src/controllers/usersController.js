var mongoose = require('mongoose');
User = require("../models/usersModel.js")(mongoose);
/*
The req object represents the HTTP request and has properties for the request query string,
 parameters, body, HTTP headers, and so on.
 In this documentation and by convention, the object is always referred to as req
 (and the HTTP response is res) but its actual name is determined by
 the parameters to the callback function in which you’re working.

 The req object is an enhanced version of Node’s own request object and
 supports all built-in fields and methods.
 */
exports.show_index = function(req, res) {
    res.sendFile(appRoot  + '/www/index2.html');
};
/*
req.body
Contains key-value pairs of data submitted in the request body. By default, it is undefined, and is populated when you use body-parsing middleware such as express.json() or express.urlencoded().

The following example shows how to use body-parsing middleware to populate req.body.

This property is an object containing a property for each query string parameter in the route. When query parser is set to disabled, it is an empty object {}, otherwise it is the result of the configured query parser.


 */
exports.list_users = function(req, res) {
    User.find({}, function(err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};

exports.create_user = function( req, res){
    let message;
    if(User.findOne({email: req.query.email})){
        message = "user exists";
        console.log(message)
    }else {
        message = "user doesn't exist";
        console.log(message)
        const new_user = new User(req.body);
        new_user.save(function (err, user) {
            if (err)
                res.send(err);
            res.status(201).json(user)
        });
    }
};
/*
async function authenticate({ username, password }) {
    const user = await User.findOne({ username });
    if (user.password !== password) {
        message= "wrong password";
        console.log(message);
    }
};

 */