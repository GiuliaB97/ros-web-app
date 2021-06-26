module.exports = function (app){
    var usersController = require('../controllers/user');

    app.route('/api/users')
        .get(usersController.list_users())
        .post(usersController.create_user)

    app.route('/api/users/:id')
        .get(usersController.read_user)
        .put(usersController.update_user)
        .delete(usersController.delete_user);
    app.use(usersController.show_index);
}