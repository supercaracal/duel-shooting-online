const Ctrl = require('./duel-matching-controller');
const DuelMsg = require('./duel-messenger');

function Messenger(io) {
  this.duelCtrl = new Ctrl();
  this.io = io;
}

Messenger.prototype.start = function start() {
  this.io.sockets.on('connection', this.handler.bind(this));
};

Messenger.prototype.handler = function handler(socket) {
  const timestamp = new Date().getTime();
  const dm = new DuelMsg(socket, this.duelCtrl);
  this.duelCtrl.add(socket.id, timestamp);
  dm.start();
};

module.exports = Messenger;
