//var mongoose = require('mongoose');

exports.show_index = function(req, res) {
    res.sendFile(appRoot  + '/www/index.html');
};