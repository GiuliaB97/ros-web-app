module.exports = function (app){
    var controller = require('../controllers/user');

    app.route('/users')
        .get(controller.list_users())
        .post(controller.create_movie)

    app.route('/users/:id')
        .get(controller.read_movie)
        .put(controller.update_user)
        .delete(controller.delete_user);
/*
    app.route('/querydb')
        .get(controller.querydb)
        */
}