function DuelMatchingController() {
    setInterval(this.match.bind(this), 100);
    setInterval(this.gc.bind(this), 600000);
}

DuelMatchingController.prototype.duelist = require('./duelist');

DuelMatchingController.prototype.whiteQueue = [];
DuelMatchingController.prototype.redQueue = [];

DuelMatchingController.prototype.duelistCount = 0;

DuelMatchingController.prototype.duelists = {};
DuelMatchingController.prototype.bugoutFuckers = {};

DuelMatchingController.prototype.add = function(id, timestamp) {
    var duelist = new this.duelist(id, timestamp);
    var isWhite = !this.whiteQueue.length || (this.whiteQueue.length <= this.redQueue.length);
    isWhite ? duelist.setColorWhite() : duelist.setColorRed();
    isWhite ? this.whiteQueue.push(duelist) : this.redQueue.push(duelist);
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
    return this.whiteQueue.length + this.redQueue.length + this.duelistCount;
};

DuelMatchingController.prototype.match = function() {
    var white = this.shiftWhiteQueue();
    var red = this.shiftRedQueue();
    if (!white || !red) {
        if (white) this.whiteQueue.unshift(white);
        if (red) this.redQueue.unshift(red);
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
    this.whiteQueue.forEach(func, this);
    this.redQueue.forEach(func, this);
    for (var socketId in this.duelists) {
        func(this.duelists[socketId]);
    }
};

DuelMatchingController.prototype.shiftWhiteQueue = function() {
    var white = this.whiteQueue.shift();
    if (!white) return null;
    if (this.bugoutFuckers[white.getId()]) {
        delete this.bugoutFuckers[white.getId()];
        white = null;
    }
    return white;
};

DuelMatchingController.prototype.shiftRedQueue = function() {
    var red = this.redQueue.shift();
    if (!red) return null;
    if (this.bugoutFuckers[red.getId()]) {
        delete this.bugoutFuckers[red.getId()];
        red = null;
    }
    return red;
};

module.exports = DuelMatchingController;
