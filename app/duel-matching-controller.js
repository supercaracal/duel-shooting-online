function DuelMatchingController() {
    setInterval(this.match.bind(this), 100);
    setInterval(this.gc.bind(this), 1000*60*10);
}

DuelMatchingController.prototype.duelist = require('./duelist');
DuelMatchingController.prototype.queue = [];
DuelMatchingController.prototype.duelistCount = 0;
DuelMatchingController.prototype.duelists = {};
DuelMatchingController.prototype.bugoutFuckers = {};

DuelMatchingController.prototype.add = function(id, timestamp) {
    this.queue.push(new this.duelist(id, timestamp));
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
    return this.queue.length + this.duelistCount;
};

DuelMatchingController.prototype.match = function() {
    var first = this.shiftQueue();
    var second = this.shiftQueue();
    if (!first || !second) {
        if (first) this.queue.unshift(first);
        if (second) this.queue.unshift(second);
        return;
    }
    first.setColor('white');
    second.setColor('red');
    first.setFoe(second.getId());
    second.setFoe(first.getId());
    var roomName = first.getId() + '-' + second.getId();
    first.setRoom(roomName);
    second.setRoom(roomName);
    this.duelists[first.getId()] = first;
    this.duelists[second.getId()] = second;
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
    this.queue.forEach(func, this);
    for (var socketId in this.duelists) {
        func(this.duelists[socketId]);
    }
};

DuelMatchingController.prototype.shiftQueue = function() {
    var duelist = this.queue.shift();
    if (!duelist) return null;
    if (this.bugoutFuckers[duelist.getId()]) {
        delete this.bugoutFuckers[duelist.getId()];
        duelist = null;
    }
    return duelist;
};

module.exports = DuelMatchingController;
