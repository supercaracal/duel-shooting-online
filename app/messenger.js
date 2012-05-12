function Messenger(io) {
    io.sockets.on('connection', this.observe);
}

var white = null;
var red = null;

Messenger.prototype.observe = function(socket) {
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
};

module.exports = Messenger;
