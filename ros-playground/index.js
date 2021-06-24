var express = require('express');
var app = express();
app.use(express.json());
/*
mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useFindAndModify', false);

var routes = require('./src/routes/movieRoutes');

routes(app);

*/
const path = require('path');
const router = express.Router();
router.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/webpage.html'));
    //__dirname : It will resolve to your project folder.
});
app.use('/', router);
//port on which communication with ROS is enabled
app.listen(7000, function (){
    console.log('Listening on port 7000')
})