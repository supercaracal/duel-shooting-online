function Duelist(id) {
    this.id = id;
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

Duelist.prototype.isWhiteColor = function() {
    return this.color === 'white';
};

Duelist.prototype.isRedColor = function() {
    return this.color === 'red';
};

Duelist.prototype.getFoe = function() {
    return this.foe;
};

Duelist.prototype.getRoom = function() {
    return this.room;
};

module.exports = Duelist;
