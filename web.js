var express = require('express'),
    http = require('http'),
    socketIo = require('socket.io'),
    routing = require('./app/routing'),
    msg = require('./app/messenger');

var app = express();
var server = http.createServer(app).listen(process.env.PORT || 8080);
var io = socketIo.listen(server);

new routing(app, __dirname, process.env.PLAY_MODE || 'online');
new msg(io);
