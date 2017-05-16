function Duelist(id, timestamp) {
  this.id = id;
  this.timestamp = timestamp;
}

Duelist.prototype.color = null;
Duelist.prototype.foe = null;
Duelist.prototype.room = null;

Duelist.prototype.setColor = function setColor(color) {
  this.color = color;
};

Duelist.prototype.setFoe = function setFoe(id) {
  this.foe = id;
};

Duelist.prototype.setRoom = function setRoom(name) {
  this.room = name;
};

Duelist.prototype.getId = function getId() {
  return this.id;
};

Duelist.prototype.getTimestamp = function getTimestamp() {
  return this.timestamp;
};

Duelist.prototype.getColor = function getColor() {
  return this.color;
};

Duelist.prototype.getFoe = function getFoe() {
  return this.foe;
};

Duelist.prototype.getRoom = function getRoom() {
  return this.room;
};

module.exports = Duelist;
