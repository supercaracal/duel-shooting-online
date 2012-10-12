var express = require('express')
  , routing = require('./app/routing')
  , socketIo = require('socket.io')
  , msg = require('./app/messenger');

var app = express.createServer();
app.listen(process.env.PORT || 8080);

new routing(app, __dirname);
new msg(socketIo.listen(app));
