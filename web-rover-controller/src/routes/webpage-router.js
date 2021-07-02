module.exports = function(app) {
    var webpageCtrl = require('../controller/webpage-controller');

    //app.route('/').get(webpageCtrl.show_index);

    app.use(webpageCtrl.show_index);
};
