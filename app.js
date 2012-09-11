
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path');

// var EventProvider = require('./eventprovider.js').EventProvider;
var app = express();

var mongoose = require('mongoose')
  , db = mongoose.createConnection('localhost', 'events_1');

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

var Event = require('./models/event')(db, mongoose)

var routes = require('./routes')(Event)
var user = require('./routes/user')

app.get('/', routes.index);

app.get('/events', routes.events.index)
app.get('/events/new', routes.events.new)
app.post('/events', routes.events.create)
app.get('/events/:id', routes.events.show)
app.get('/events/:id/edit', routes.events.edit)
app.post('/events/:id', routes.events.update)
app.delete('/events/:id', routes.events.destroy)

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
