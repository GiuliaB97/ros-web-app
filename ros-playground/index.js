var express = require('express');
var app = express();
var mongoose = require('mongoose')
var cors = require('cors')
var path = require('path');
var bodyParser = require('body-parser');
var PORT = 7000;            //port on which communication with ROS is enabled

global.appRoot = path.resolve(__dirname);

//Quseto usalo quando hai effettivamente implementato il db
//mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true, useFindAndModify: false,  useUnifiedTopology: true });

app.use(cors())

//Per gestire i parametri passati nel corpo della richiesta http.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/static', express.static(__dirname + '/public'));//__dirname : It will resolve to your project folder.

var routes = require('./src/routes/user');
routes(app);

//app.use('/', router);
app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(PORT, function (){
    console.log('Node API server started on port '+ PORT);
})