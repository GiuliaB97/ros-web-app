var mongoose = require('mongoose');
var userModel = require('../models/user')(mongoose)

exports.list_users = function (req,res){
    userModel.find({},function (err,doc){
        if(err){
            res.send(err);
        }
        res.json(doc);
    })
}

exports.read_movie = function(req,res){
    userModel.findById(req.params.id,function(err,doc){
        if(err){
            res.send(err);
        }
        res.json(doc);
    })
}

exports.create_movie = function (req,res){
    User = new userModel(req.body);
    User.save(function (err,doc){
        if(err){
            res.send(err);
        }
        res.json(doc);
    })
}

exports.update_user = function (req,res){
    userModel.findByIdAndUpdate(req.params.id,req.body,{new: true},function(err,doc){
        if(err){
            res.send(err);
        }
        res.json(doc);
    })
}

exports.delete_user = function(req,res){
    userModel.findByIdAndDelete(req.params.id,function (err,doc){
        if(err){
            res.send(err);
        }
        res.json(doc);
    })
}
/*
exports.querydb = function (req,res){
    userModel.find().
    where('actors').equals(req.query.actor).
    where('year').gte(req.query.fromyear).lte(req.query.toyear).exec(function (err,doc){
        if(err){
            res.send(err);
        }
        res.json(doc);
    })
}
*/

//movieModel.find().where("year").gte().exec(function)