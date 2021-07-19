module.exports = function(app) {
	var usrsController = require('../controllers/usrsController');

	/*
	app.route('/')
		.get(moviesController.show_index);
	*/

	app.route('/api/lastmovie')
		.get(usrsController.last_movie)

	app.route('/api/movies')
		.get(usrsController.list_movies)
		.post(usrsController.create_movie);


	app.route('/api/movies/:id')
		.get(usrsController.read_movie)
		.put(usrsController.update_movie)
		.delete(usrsController.delete_movie);

	app.use(usrsController.show_index);
};
