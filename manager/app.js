var config = require('./config.global');

var express=require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var favicon = require('serve-favicon');

var app=express();
require(config.dir_base+'/router/route')(app);

app.set('views',config.dir_base + '/views/pages');
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(methodOverride());
app.use(express.static(config.dir_base + '/public'));
app.use(favicon(config.dir_base + '/public/favicon.ico'));
app.engine('html', require('ejs').renderFile);

var server=app.listen(config.port_nodejs,function(){
	console.log("We have started our server on port " + config.port_nodejs);
});

exports.server = server;