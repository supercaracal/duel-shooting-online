function Duelist(id, timestamp) {
    this.id = id;
    this.timestamp = timestamp;
}

Duelist.prototype.color = '';
Duelist.prototype.foe = null;
Duelist.prototype.room = null;

Duelist.prototype.setColorWhite = function () {
    this.color = 'white';
};

Duelist.prototype.setColorRed = function() {
    this.color = 'red';
};

Duelist.prototype.setFoe = function(id) {
    this.foe = id
};

Duelist.prototype.setRoom = function(name) {
    this.room = name;
};

Duelist.prototype.getId = function() {
    return this.id;
};

Duelist.prototype.getTimestamp = function() {
    return this.timestamp;
};

Duelist.prototype.getColor = function() {
    return this.color;
};

Duelist.prototype.getFoe = function() {
    return this.foe;
};

Duelist.prototype.getRoom = function() {
    return this.room;
};

module.exports = Duelist;
