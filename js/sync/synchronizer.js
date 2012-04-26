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
        this.listenCriticalInfo();
        setInterval(this.pushCriticalInfoInterval.bind(this), 1000);
    },

    pushCriticalInfoInterval: function() {
        switch (this.controlShip) {
            case 'white':
                this.socket.emit('critical white', {hp: this.shipWhite.getHitPoint(), left: this.shipWhite.getLeft()});
                break;
            case 'red':
                this.socket.emit('critical red', {hp: this.shipRed.getHitPoint(), left: this.shipRed.getLeft()});
                break;
        }
    },

    pushShipWhiteCommand: function(cmd) {
        if (!cmd) return;
        this.socket.emit('white', {cmd: cmd});
    },

    pushShipRedCommand: function(cmd) {
        if (!cmd) return;
        this.socket.emit('red', {cmd: cmd});
    },

    listenCriticalInfo: function() {
        this.socket.on('critical white', this.criticalWhite.bind(this));
        this.socket.on('critical red', this.criticalRed.bind(this));
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

    criticalWhite: function(data) {
        this.shipWhite.setHitPoint(data.hp);
        this.shipWhite.setLeft(data.left);
    },

    criticalRed: function(data) {
        this.shipRed.setHitPoint(data.hp);
        this.shipRed.setLeft(data.left);
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
    },

    red: function(data) {
         this.cmdRed.execute(data.cmd);
    }
});
