var Synchronizer = Class.create({

    socket: null,

    controlShip: null,

    shipWhite: null,
    shipRed: null,

    cmdWhite: null,
    cmdRed: null,

    initialize: function(uri, callback) {
        this.socket = io.connect(uri);
        this.listenShipControl();
        this.listenDuelReady(callback);
        this.socket.emit('duty', {});
    },

    pushShipWhiteCommand: function(cmd) {
        if (!cmd) return;
        this.socket.emit('white', {cmd: cmd});
    },

    pushShipRedCommand: function(cmd) {
        if (!cmd) return;
        this.socket.emit('red', {cmd: cmd});
    },

    listenShipControl: function() {
        this.socket.on('You have control', this.youHaveControl.bind(this));
        this.socket.on('You have no control', this.youHaveNoControl.bind(this));
    },

    listenDuelReady: function(callback) {
        this.socket.on('ready', callback);
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

    youHaveControl: function(data) {
        this.controlShip = data.ship;
        this.socket.emit('I have control', {ship: this.controlShip});
        console.log('I have control: ' + this.controlShip);
    },

    youHaveNoControl: function(data) {
        this.controlShip = null;
        this.socket.emit('I have no control', {});
        console.log('I have no control');
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
