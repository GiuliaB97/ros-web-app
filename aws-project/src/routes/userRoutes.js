module.exports = function(app) {
    var usersController = require('../controllers/usersController');

    app.route('/api/users')
        .get(usersController.list_users())
        .post(usersController.create_user());

    app.use(usersController.show_index);
};