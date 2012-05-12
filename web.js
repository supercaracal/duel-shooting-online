var app
  , routing
  , io
  , msg;

app = require('express').createServer();
app.listen(process.env.PORT || 8080);

routing = require('./routing');
new routing(app);

io = require('socket.io').listen(app);
msg = require('./app/messenger');
new msg(io);
