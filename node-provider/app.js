
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var oauthserver = require('node-oauth2-server');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


var oauth = oauthserver({
    model: require('./oauthModel'),
    grants: ['password'],
    debug: true,
    accessTokenLifetime: 14400,
    passthroughErrors: true
});


app.use(express.favicon());
app.use(express.logger('dev'));

app.use(express.bodyParser());

app.use(oauth.handler());
//app.use(oauth.errorHandler());


//app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(err, req, res, next){
    console.error("Error",err);
    res.send(500, 'Something broke!');
});



// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
