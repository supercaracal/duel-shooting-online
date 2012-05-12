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
    this.socket.on('critical white', this.onCriticalWhite.bind(this));
    this.socket.on('critical red', this.onCriticalRed.bind(this));
    this.socket.on('white', this.onWhite.bind(this));
    this.socket.on('red', this.onRed.bind(this));
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
    console.log('>>>>>>>>>>>>>>> ready: ' + this.socket.id + ' control ' + data.ship);
    this.socket.emit('ready', {});
};

DuelMessenger.prototype.onDisconnect = function() {
    var duelist = this.ctrl.get(this.socket.id);
    if (!duelist) return;
    this.socket.broadcast.to(duelist.getRoom()).emit('You win', true);
    this.socket.leave(duelist.getRoom());
    this.ctrl.remove(this.socket.id);
    this.pushDuelistCount();
};

DuelMessenger.prototype.onCriticalWhite = function(data) {
    var duelist = this.ctrl.get(this.socket.id);
    if (!duelist) return;
    this.socket.broadcast.to(duelist.getRoom()).emit('critical white', data);
};

DuelMessenger.prototype.onCriticalRed = function(data) {
    var duelist = this.ctrl.get(this.socket.id);
    if (!duelist) return;
    this.socket.broadcast.to(duelist.getRoom()).emit('critical red', data);
};

DuelMessenger.prototype.onWhite = function(data) {
    this.socket.emit('white', data);
    var duelist = this.ctrl.get(this.socket.id);
    if (!duelist) return;
    this.socket.broadcast.to(duelist.getRoom()).emit('white', data);
};

DuelMessenger.prototype.onRed = function(data) {
    this.socket.emit('red', data);
    var duelist = this.ctrl.get(this.socket.id);
    if (!duelist) return;
    this.socket.broadcast.to(duelist.getRoom()).emit('red', data);
};

module.exports = DuelMessenger;
