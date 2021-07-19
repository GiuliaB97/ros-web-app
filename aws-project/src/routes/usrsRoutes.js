module.exports = function(app) {
	var usrsController = require('../controllers/usrsController');

	/*
	app.route('/')
		.get(moviesController.show_index);
	*/

	app.route('/api/usrs')
		.get(usrsController.list_usrs)
		.post(usrsController.create_usr);


	app.route('/api/usrs/:id')
		.get(usrsController.read_usr)
		.put(usrsController.update_usr)
		.delete(usrsController.delete_usr);

	app.use(usrsController.show_index);
};
