/*
Nodejs: piattaforma software cross-platform;non è un web server e neanche un linguaggio;
        è una piattaforma web che permette di eseguire codice JavaScript lato server.
        Può essere usato per sviluppare un web server.
        Caratteristiche: Single-threaded, Event-driven architecture, Asynchronous, Non blocking I/O model

 */
var express = require('express');   //“Require” permette di includere moduli
var app = express();
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

app.use('/static', express.static(__dirname + '/public'));

var routes = require('./src/routes/webpage-router');
routes(app);

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(PORT, function () {
    console.log('Node API server started on port '+PORT);
});
