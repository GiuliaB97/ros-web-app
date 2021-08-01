var express = require('express');
var app = express();
var mongoose = require('mongoose')
var cors = require('cors')
var path = require('path')

global.appRoot = path.resolve(__dirname);

var PORT = 7000;

mongoose.connect('mongodb://localhost/aws-ros-web-app', { useNewUrlParser: true, useFindAndModify: false });

app.use(cors())

app.use(express.json());

//Remapping pblic in static
app.use('/static', express.static(__dirname + '/public'));

var routes = require('./src/routes/usersRoutes');

routes(app);

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(PORT, function () {
  console.log('Node API server started on port '+PORT);
});
