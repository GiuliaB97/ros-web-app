module.exports = function(app) {
    var usersController = require('../controllers/usersController');

    app.route('/api/users')
        .get(usersController.getAll())
        .post(usersController.insert_user());
    app.use(usersController.show_index);
}