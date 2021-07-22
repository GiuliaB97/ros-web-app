module.exports = function(app) {
	var usersController = require('../controllers/usersController');

	/*
	app.route('/')
		.get(moviesController.show_index);
	*/

	app.route('/api/user')
		.get(usersController.list_users)
		//.post(usersController.registration());




	app.use(usersController.show_index);
};
