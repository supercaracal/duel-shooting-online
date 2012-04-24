var LISTEN_PORT = 3000;
var SERVER_URI = '127.0.0.1';
var LIB_PATH = '';

var app;

try {
    app = require(LIB_PATH + 'express').createServer();
} catch(ex) {
    LIB_PATH = 'C:/Program Files/nodejs/node_modules/';
    try {
        app = require(LIB_PATH + 'express').createServer();
    } catch(ex2) {
        LIB_PATH = 'C:/Program Files (x86)/nodejs/node_modules/';
        app = require(LIB_PATH + 'express').createServer();
    }
}

var io = require(LIB_PATH + 'socket.io').listen(app);
app.listen(LISTEN_PORT, SERVER_URI);

app.get('/', function(req, res) {
    res.sendfile(__dirname + '/index.html');
});

app.get('/*', function(req, res) {
    res.sendfile(__dirname + req.url);
});

io.sockets.on('connection', function(socket) {
    socket.on('white', function(data) {
        socket.emit('white', data);
        socket.broadcast.emit('white', data);
    });
    socket.on('red', function(data) {
        socket.emit('red', data);
        socket.broadcast.emit('red', data);
    });
});

