var express = require('express')
  , http = require('http')
  , socketIo = require('socket.io')
  , routing = require('./app/routing')
  , msg = require('./app/messenger');

var app = express();

var server = http.createServer(app);
server.listen(process.env.PORT || 8080);

new routing(app, __dirname);
new msg(socketIo.listen(server));
