var express = require('express'),
    http = require('http'),
    socketIo = require('socket.io'),
    routing = require('./routing'),
    msg = require('./messenger');

var app = express();
var server = http.createServer(app).listen(process.env.PORT || 8080);
var io = socketIo.listen(server);
var rootDir = __dirname.replace('backend', '');

new routing(app, rootDir, process.env.PLAY_MODE || 'online');
new msg(io);
