var express = require('express');   // importa express. “Require” permette di includere moduli: specificando solo il nome del modulo da importare vene cercato nella cartella nodule_modules
var app = express(); //crea l'applicazione express
//var mongoose = require('mongoose')
var bodyParser = require('body-parser');
var cors = require('cors')
var path = require('path');

global.appRoot = path.resolve(__dirname);

var PORT = 3000;

//mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true, useFindAndModify: false });

app.use(cors())

//Per gestire i parametri passati nel corpo della richiesta http.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//app.use('/static', express.static(__dirname + '/public'));          //__dirname richiede un path assoluto
app.use(express.static(__dirname + '/public'));
var routes = require('./src/routes/webpage-router');//importa le rotte e associarle all’istanza di express.
routes(app);
//prima dell'avvio del server viene eseguito il codice per gestire gli errori 404
app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(PORT, function () {// mette il server in ascolto sulla porta PORT
    console.log('Node API server started on port '+PORT);
});
