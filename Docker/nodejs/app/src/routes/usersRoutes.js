const usersController = require("../controllers/usersController");
module.exports = function(app) {
	var usersController = require('../controllers/usersController');

	app.route('/api/user')
		.get(usersController.list_users)

	app.route('/api/user/:id')
		.get(usersController.user_info)

	app.route('/api/registration')
		.post(usersController.registration)
		.get(usersController.checkUsername)

	app.route('/api/login')
		.post(usersController.login)

	app.use(usersController.show_index);
};
