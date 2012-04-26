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
app.listen(process.env.PORT || 3000);

app.get('/', function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.sendfile(__dirname + '/index.html');
});
app.get('/*', function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.sendfile(__dirname + req.url);
});

var white = null;
var red = null;

var io = require(LIB_PATH + 'socket.io').listen(app);

io.sockets.on('connection', function(socket) {
    if (!white) {
        white = socket.id;
    } else if (!red && white != socket.id) {
        red = socket.id;
    }
    socket.on('duty', function(data) {
        if (socket.id == white) {
            socket.emit('You have control', {ship: 'white'});
        } else if (socket.id == red) {
            socket.emit('You have control', {ship: 'red'});
        } else {
            socket.emit('You have no control', {});
        }
    });
    socket.on('I have control', function(data) {
        console.log('>>>>>>>>>>>>>>> ready: ' + data.ship);
        socket.emit('ready', {});
    });
    socket.on('I have no control', function(data) {
        socket.emit('ready', {});
    });
    socket.on('disconnect', function() {
        if (socket.id == white) {
            white = null;
        }
        if (socket.id == red) {
            red = null;
        }
    });
    socket.on('critical white', function(data) {
        socket.broadcast.emit('critical white', data);
    });
    socket.on('critical red', function(data) {
        socket.broadcast.emit('critical red', data);
    });
    socket.on('white', function(data) {
        if (socket.id != white) {
            return;
        }
        socket.emit('white', data);
        socket.broadcast.emit('white', data);
    });
    socket.on('red', function(data) {
        if (socket.id != red) {
            return;
        }
        socket.emit('red', data);
        socket.broadcast.emit('red', data);
    });
});

