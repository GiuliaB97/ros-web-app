var mongoose = require('mongoose');
User = require("../models/userModel.js")(mongoose);

const bcrypt = require('bcrypt');
const PRIVATE_SECRET_KEY = '4972DD665B421C97CDE1A933E54AAC067464593A1773A6C9A8B378F5CFCBBAD68B5023307F65AAEF858A6CA70D2D979A0CF3DE487359B366EAB20F3C7BDBFDA4';
const jwt = require('jsonwebtoken');

exports.show_index = function(req, res) {
	res.sendFile(appRoot  + '/www/index.html');
};

exports.list_users = function(req, res) {
	User.find({}, function(err, users) {
		if (err)
			res.send(err);
		res.json(users);
	});
};

exports.registration = function(req, res) {
	let newUserTmp = req.body.params;
	console.log("registration method receive:"+ req.body.params)
	newUserTmp.salt = bcrypt.genSaltSync(10);
	newUserTmp.password = bcrypt.hashSync(newUserTmp.password, newUserTmp.salt);

	let newUser = new User(newUserTmp);
	newUser.save(function(err, user) {
		if (err)
			res.send(false);
		res.status(201).send(true);
	});
}

exports.login = function(req, res) {
	let userId = req.body.params.userId;
	let password = req.body.params.password;
	User.findOne({user_id: userId}, 'user_id password salt', function(err, user) {
		if(err || user == null){
			res.send({
				result: false
			});
		} else {
			if(bcrypt.compareSync(password ,user.password)) {
				let token = jwt.sign({user: user.user_id, id: user._id}, PRIVATE_SECRET_KEY, {
					algorithm: 'HS512',
					expiresIn: '2d'
				});
				res.send({
					result: true,
					token: token,
					id: user._id
				});
			} else {
				res.send({
					result: false
				});
			}
		}
	});
}

exports.checkUsername = function(req, res) {
	let requestUser = req.query.userId;
	User.exists({user_id: requestUser}, function (err, result) {
		res.send(result);
	});
}

// NOT USE 4 NOW; DECIDE IF YOU WANT TO KEEP THEM OR NOT
exports.update_user = function(req, res) {
	User.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, usr) {
		if (err)
			res.send(err);
		else{
			if(usr==null){
				res.status(404).send({
					description: 'User not found'
				});
			}
			else{
				res.json(usr);
			}
		}
	});
};

exports.delete_usr = function(req, res) {
	User.deleteOne({_id: req.params.id}, function(err, result) {
		if (err)
			res.send(err);
		else{
			if(result.deletedCount==0){
				res.status(404).send({
					description: 'User not found'
				});
			}
			else{
				res.json({ message: 'Task successfully deleted' });
			}
		}
  });
};
