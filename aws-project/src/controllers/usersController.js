var mongoose = require('mongoose');
Usr = require("../models/userModel.js")(mongoose);

exports.show_index = function(req, res) {
	res.sendFile(appRoot  + '/www/index.html');
};

exports.list_usrs = function(req, res) {
	Usr.find({}, function(err, movie) {
		if (err)
			res.send(err);
		res.json(movie);
	});
};

exports.read_usr = function(req, res) {
	/*
	TODO cast req.params.id to ObjectId
	*/
	Usr.findById(req.params.id, function(err, usr) {
		if (err)
			res.send(err);
		else{
			if(usr==null){
				res.status(404).send({
					description: 'Usr not found'
				});
			}
			else{
				res.json(usr);
			}
		}
	});
};

exports.create_usr = function(req, res) {
	var new_usr = new Usr(req.body);
	new_usr.save(function(err, movie) {
		if (err)
			res.send(err);
		res.status(201).json(movie);
	});
};

exports.update_usr = function(req, res) {
	Usr.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, usr) {
		if (err)
			res.send(err);
		else{
			if(usr==null){
				res.status(404).send({
					description: 'Usr not found'
				});
			}
			else{
				res.json(usr);
			}
		}
	});
};

exports.delete_usr = function(req, res) {
	Usr.deleteOne({_id: req.params.id}, function(err, result) {
		if (err)
			res.send(err);
		else{
			if(result.deletedCount==0){
				res.status(404).send({
					description: 'Usr not found'
				});
			}
			else{
				res.json({ message: 'Task successfully deleted' });
			}
		}
  });
};
