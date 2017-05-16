function DuelMessenger(socket, ctrl) {
  this.socket = socket;
  this.ctrl = ctrl;
}

DuelMessenger.prototype.start = function start() {
  this.observe();
  this.pushDuelistCount();
};

DuelMessenger.prototype.observe = function observe() {
  this.socket.on('duty', this.onDuty.bind(this));
  this.socket.on('I have control', this.onIHaveControl.bind(this));
  this.socket.on('disconnect', this.onDisconnect.bind(this));
  this.socket.on('attack', this.onAttack.bind(this));
  this.socket.on('chat', this.onChat.bind(this));
};

DuelMessenger.prototype.pushDuelistCount = function pushDuelistCount() {
  this.socket.emit('duelist count', this.ctrl.getDuelistCount());
  this.socket.broadcast.emit('duelist count', this.ctrl.getDuelistCount());
};

DuelMessenger.prototype.onDuty = function onDuty() {
  const duelist = this.ctrl.get(this.socket.id);
  if (!duelist) {
    this.socket.emit('You have no control', {});
    return;
  }
  this.socket.join(duelist.getRoom());
  this.socket.emit('You have control', { ship: duelist.getColor() });
  this.pushDuelistCount();
};

DuelMessenger.prototype.onIHaveControl = function onIHaveControl() {
  const duelistShip = this.ctrl.get(this.socket.id);
  const duelistEnemy = this.ctrl.get(duelistShip.getFoe());
  this.socket.emit('ready', {
    ship: duelistShip.getColor(),
    enemy: duelistEnemy.getColor(),
  });
};

DuelMessenger.prototype.onDisconnect = function onDisconnect() {
  const duelist = this.ctrl.get(this.socket.id);
  if (!duelist) return;
  this.socket.broadcast.to(duelist.getRoom()).emit('You win', true);
  this.socket.leave(duelist.getRoom());
  this.ctrl.remove(this.socket.id);
  this.pushDuelistCount();
};

DuelMessenger.prototype.onAttack = function onAttack(data) {
  const duelist = this.ctrl.get(this.socket.id);
  if (!duelist) return;
  this.socket.emit('attack', data);
  this.socket.broadcast.to(duelist.getRoom()).emit('attack', data);
};

DuelMessenger.prototype.onChat = function onChat(data) {
  this.socket.emit('chat', data);
  this.socket.broadcast.emit('chat', data);
};

module.exports = DuelMessenger;
