function Messenger(io) {
    this.duelMsg = require('./duel-messenger');
    var ctrl = require('./duel-matching-controller');
    this.duelCtrl = new ctrl();
    io.sockets.on('connection', this.handler.bind(this));
}

Messenger.prototype.handler = function(socket) {
    this.duelCtrl.add(socket.id);
    new this.duelMsg(socket, this.duelCtrl);
};

module.exports = Messenger;
