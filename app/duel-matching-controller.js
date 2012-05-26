function DuelMatchingController() {
    setInterval(this.match.bind(this), 100);
    setInterval(this.gc.bind(this), 1000*60*10);
}

DuelMatchingController.prototype.duelist = require('./duelist');

DuelMatchingController.prototype.queues = {};
DuelMatchingController.prototype.queues.white = [];
DuelMatchingController.prototype.queues.red = [];

DuelMatchingController.prototype.duelistCount = 0;

DuelMatchingController.prototype.duelists = {};
DuelMatchingController.prototype.bugoutFuckers = {};

DuelMatchingController.prototype.add = function(id, timestamp) {
    var duelist = new this.duelist(id, timestamp);
    var isWhite = !this.queues.white.length
        || (this.queues.white.length <= this.queues.red.length);
    isWhite ? duelist.setColorWhite() : duelist.setColorRed();
    isWhite ? this.queues.white.push(duelist) : this.queues.red.push(duelist);
};

DuelMatchingController.prototype.get = function(id) {
    return this.duelists[id];
};

DuelMatchingController.prototype.remove = function(id) {
    if (id in this.duelists) --this.duelistCount;
    delete this.duelists[id];
    this.bugoutFuckers[id] = true;
};

DuelMatchingController.prototype.getDuelistCount = function() {
    return this.queues.white.length + this.queues.red.length + this.duelistCount;
};

DuelMatchingController.prototype.match = function() {
    var white = this.shiftQueue('white');
    var red = this.shiftQueue('red');
    if (!white || !red) {
        if (white) this.queues.white.unshift(white);
        if (red) this.queues.red.unshift(red);
        return;
    }
    white.setFoe(red.getId());
    red.setFoe(white.getId());
    var roomName = white.getId() + '-' + red.getId();
    white.setRoom(roomName);
    red.setRoom(roomName);
    this.duelists[white.getId()] = white;
    this.duelists[red.getId()] = red;
    this.duelistCount += 2;
    return true;
};

DuelMatchingController.prototype.gc = function() {
    var currentTimestamp = new Date().getTime();
    var func = function(duelist) {
        if (duelist.getTimestamp() < currentTimestamp - 1000*60*30) {
            this.remove(duelist.getId());
        }
    };
    this.queues.white.forEach(func, this);
    this.queues.red.forEach(func, this);
    for (var socketId in this.duelists) {
        func(this.duelists[socketId]);
    }
};

DuelMatchingController.prototype.shiftQueue = function(color) {
    var duelist = this.queues[color].shift();
    if (!duelist) return null;
    if (this.bugoutFuckers[duelist.getId()]) {
        delete this.bugoutFuckers[duelist.getId()];
        duelist = null;
    }
    return duelist;
};

module.exports = DuelMatchingController;
