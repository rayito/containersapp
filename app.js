/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , containers = require('./routes/containers')
  , mongoose = require('mongoose');

// MongoDB Connection 
mongoose.connect('mongodb://localhost/containers_db');
var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/containers', containers.index);
app.get('/show', containers.show);

/* http://localhost:3000/create?lng=_____&lat=_____&level=_____  (level is OPTIONAL)   */
app.get('/create', containers.create);       
app.get('/update', containers.update);
app.get('/delete', containers.delete);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port %s in %s mode.",  app.get('port'), app.settings.env);
});
