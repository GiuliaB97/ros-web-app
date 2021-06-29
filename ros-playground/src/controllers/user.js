const mongoose = require('mongoose');
User = require('../models/user')(mongoose)

exports.show_index = function(req, res) {
    res.sendFile(appRoot  + '/www/rover-simulation.html');
};

exports.list_users = function (req,res){
    User.find({},function (err,doc){
        if(err){
            res.send(err);
        }
        res.json(doc);
    })
}

exports.read_user = function(req,res){
    /*
     TODO cast req.params.id to ObjectId
     */
    User.findById(req.params.id, function(err, movie) {
        if (err)
            res.send(err);
        else{
            if(movie==null){
                res.status(404).send({
                    description: 'User not found'
                });
            }
            else{
                res.json(movie);
            }
        }
    });
};

exports.create_user = function (req,res){
    const new_user = new User(req.body);
    new_user.save(function(err, movie) {
        if (err)
            res.send(err);
        res.status(201).json(movie);
    });
}

exports.update_user = function (req,res){
    User.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, user) {
        if (err)
            res.send(err);
        else{
            if(user==null){
                res.status(404).send({
                    description: 'User not found'
                });
            }
            else{
                res.json(user);
            }
        }
    });
}

exports.delete_user = function(req,res){
    User.deleteOne({_id: req.params.id}, function(err, result) {
        if (err)
            res.send(err);
        else{
            if(result.deletedCount===0){
                res.status(404).send({
                    description: 'Movie not found'
                });
            }
            else{
                res.json({ message: 'Task successfully deleted' });
            }
        }
    });
};
