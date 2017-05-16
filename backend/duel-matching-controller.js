const Duelist = require('./duelist');

function DuelMatchingController() {
  setInterval(this.match.bind(this), 100);
  setInterval(this.gc.bind(this), 1000 * 60 * 10);
}

DuelMatchingController.prototype.Duelist = Duelist;
DuelMatchingController.prototype.queue = [];
DuelMatchingController.prototype.duelistCount = 0;
DuelMatchingController.prototype.duelists = {};
DuelMatchingController.prototype.bugoutFuckers = {};

DuelMatchingController.prototype.add = function add(id, timestamp) {
  this.queue.push(new this.Duelist(id, timestamp));
};

DuelMatchingController.prototype.get = function get(id) {
  return this.duelists[id];
};

DuelMatchingController.prototype.remove = function remove(id) {
  if (id in this.duelists) {
    this.duelistCount -= 1;
  }
  delete this.duelists[id];
  this.bugoutFuckers[id] = true;
};

DuelMatchingController.prototype.getDuelistCount = function getDuelistCount() {
  return this.queue.length + this.duelistCount;
};

DuelMatchingController.prototype.match = function match() {
  const first = this.shiftQueue();
  const second = this.shiftQueue();
  if (!first || !second) {
    if (first) this.queue.unshift(first);
    if (second) this.queue.unshift(second);
    return false;
  }
  first.setColor(Math.floor(Math.random() * 100) % 3 === 0 ? 'navy' : 'white');
  second.setColor('red');
  first.setFoe(second.getId());
  second.setFoe(first.getId());
  const roomName = `${first.getId()}-${second.getId()}`;
  first.setRoom(roomName);
  second.setRoom(roomName);
  this.duelists[first.getId()] = first;
  this.duelists[second.getId()] = second;
  this.duelistCount += 2;
  return true;
};

DuelMatchingController.prototype.gc = function gc() {
  const currentTimestamp = new Date().getTime();
  const func = function func(duelist) {
    if (duelist.getTimestamp() < currentTimestamp - (1000 * 60 * 30)) {
      this.remove(duelist.getId());
    }
  };
  this.queue.forEach(func, this);
  Object.values(this.duelists).forEach(func, this);
};

DuelMatchingController.prototype.shiftQueue = function shiftQueue() {
  let duelist = this.queue.shift();
  if (!duelist) return null;
  if (this.bugoutFuckers[duelist.getId()]) {
    delete this.bugoutFuckers[duelist.getId()];
    duelist = null;
  }
  return duelist;
};

module.exports = DuelMatchingController;
