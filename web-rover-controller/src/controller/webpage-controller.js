//Controllers dovrà contenere un file js che gestisce la logica di ogni chiamata

//var mongoose = require('mongoose');

exports.show_index = function(req, res) {
    res.sendFile(appRoot  + '/www/index.html');
};