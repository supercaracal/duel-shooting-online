var Synchronizer = Class.create({

    socket: null,

    shipWhite: null,
    shipRed: null,

    cmdWhite: null,
    cmdRed: null,

    initialize: function(uri) {
        this.socket = io.connect(uri);
    },

    pushShipWhiteCommand: function(cmd, hp) {
        this.socket.emit('white', {cmd: cmd, hp: hp});
    },

    pushShipRedCommand: function(cmd, hp) {
        this.socket.emit('red', {cmd: cmd, hp: hp});
    },

    listenShipWhiteCommand: function(cmd, ship) {
        this.cmdWhite = cmd;
        this.shipWhite = ship;
        this.socket.on('white', this.white.bind(this));
    },

    listenShipRedCommand: function(cmd, ship) {
        this.cmdRed = cmd;
        this.shipRed = ship;
        this.socket.on('red', this.red.bind(this));
    },

    white: function(data) {
        this.cmdWhite.execute(data.cmd);
        this.shipWhite.setHitPoint(data.hp);
    },

    red: function(data) {
         this.cmdRed.execute(data.cmd);
         this.shipRed.setHitPoint(data.hp);
    }
});
