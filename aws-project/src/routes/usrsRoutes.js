module.exports = function(app) {
	var usrsController = require('../controllers/usrsController');

	/*
	app.route('/')
		.get(moviesController.show_index);
	*/

	app.route('/api/usrs')
		.get(usrsController.list_movies)
		.post(usrsController.create_movie);


	app.route('/api/usrs/:id')
		.get(usrsController.read_movie)
		.put(usrsController.update_movie)
		.delete(usrsController.delete_movie);

	app.use(usrsController.show_index);
};
