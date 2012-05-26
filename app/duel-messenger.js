function DuelMessenger(socket, ctrl){
    this.socket = socket;
    this.ctrl = ctrl;
    this.observe();
    this.pushDuelistCount();
}

DuelMessenger.prototype.observe = function() {
    this.socket.on('duty', this.onDuty.bind(this));
    this.socket.on('I have control', this.onIHaveControl.bind(this));
    this.socket.on('disconnect', this.onDisconnect.bind(this));
    this.socket.on('critical', this.onCritical.bind(this));
    this.socket.on('attack', this.onAttack.bind(this));
    this.socket.on('chat', this.onChat.bind(this));
};

DuelMessenger.prototype.pushDuelistCount = function() {
    this.socket.emit('duelist count', this.ctrl.getDuelistCount());
    this.socket.broadcast.emit('duelist count', this.ctrl.getDuelistCount());
};

DuelMessenger.prototype.onDuty = function(data) {
    var duelist = this.ctrl.get(this.socket.id);
    if (!duelist) {
        this.socket.emit('You have no control', {});
        return;
    }
    this.socket.join(duelist.getRoom());
    this.socket.emit('You have control', {ship: duelist.getColor()});
    this.pushDuelistCount();
};

DuelMessenger.prototype.onIHaveControl = function(data) {
    var duelistShip = this.ctrl.get(this.socket.id);
    var duelistEnemy = this.ctrl.get(duelistShip.getFoe());
    this.socket.emit('ready', {
        ship: duelistShip.getColor(),
        enemy: duelistEnemy.getColor()
    });
    console.log('>>>>>>>>>>>>>>> ready: '
        + duelistShip.getId()
        + ' vs '
        + duelistEnemy.getId());
};

DuelMessenger.prototype.onDisconnect = function() {
    var duelist = this.ctrl.get(this.socket.id);
    if (!duelist) return;
    this.socket.broadcast.to(duelist.getRoom()).emit('You win', true);
    this.socket.leave(duelist.getRoom());
    this.ctrl.remove(this.socket.id);
    this.pushDuelistCount();
};

DuelMessenger.prototype.onCritical = function(data) {
    var duelist = this.ctrl.get(this.socket.id);
    if (!duelist) return;
    this.socket.broadcast.to(duelist.getRoom()).emit('critical', data);
};

DuelMessenger.prototype.onAttack = function(data) {
    this.socket.emit('attack', data);
    var duelist = this.ctrl.get(this.socket.id);
    if (!duelist) return;
    this.socket.broadcast.to(duelist.getRoom()).emit('attack', data);
};

DuelMessenger.prototype.onChat = function(data) {
    this.socket.emit('chat', data);
    this.socket.broadcast.emit('chat', data);
};

module.exports = DuelMessenger;
