var express = require('express');
var app = express();
var mongoose = require('mongoose')
var cors = require('cors')
var path = require('path');
var PORT = 7000;            //port on which communication with ROS is enabled

global.appRoot = path.resolve(__dirname);

mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true, useFindAndModify: false,  useUnifiedTopology: true });

app.use(cors())
app.use(express.json());    //Per gestire i parametri passati nel corpo della richiesta http.
app.use('/static', express.static(__dirname + '/public'));//__dirname : It will resolve to your project folder.

var routes = require('./src/routes/user');
routes(app);
//////////////////////////////Sta roba andrebbe tolta ma non capisco come caricare la pagina senza
const router = express.Router();
router.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/webpage.html'));
});

app.use('/', router);
app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(PORT, function (){
    console.log('Node API server started on port '+ PORT);
})