var Synchronizer = Class.create({

    socket: null,
    timerId: null,
    controlShip: null,
    ship: null,
    cmd: null,
    weapon: null,

    initialize: function(uri, callback) {
        this.ship = {};
        this.cmd = {};
        this.weapon = {};
        this.socket = io.connect(uri);
        this.listenShipControl();
        this.listenDuelReady(callback);
        this.socket.emit('duty', {});
        this.listenCriticalInfo();
        this.timerId = setInterval(this.pushCriticalInfoInterval.bind(this), 5000);
    },

    stop: function() {
        clearInterval(this.timerId);
        this.socket.disconnect();
    },

    pushCriticalInfoInterval: function() {
        switch (this.controlShip) {
            case 'white':
                if (!this.ship.white) {
                    break;
                }
                this.socket.emit('critical white', {
                    hp: this.ship.white.getHitPoint(),
                    left: this.ship.white.getLeft(),
                    isEnemy: this.ship.white.isEnemy
                });
                break;
            case 'red':
                if (!this.ship.red) {
                    break;
                }
                this.socket.emit('critical red', {
                    hp: this.ship.red.getHitPoint(),
                    left: this.ship.red.getLeft(),
                    isEnemy: this.ship.red.isEnemy,
                    iField: this.ship.red.getIFieldInfo(),
                    funnel: this.ship.red.getFunnelInfo()
                });
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
        this.cmd.white = cmd;
        this.ship.white = ship;
        this.socket.on('white', this.white.bind(this));
    },

    listenShipRedCommand: function(cmd, ship) {
        this.cmd.red = cmd;
        this.ship.red = ship;
        this.socket.on('red', this.red.bind(this));
    },

    setShipRedWeapon: function(weapon) {
        this.weapon.red = weapon;
    },

    criticalWhite: function(data) {
        if (!this.ship.white) return;
        this.ship.white.setHitPoint(data.hp);
        var left = data.isEnemy === this.ship.white.isEnemy ?
            data.left :
            this.ship.white.clientWidth - data.left + (data.isEnemy ? 90 : -90);
        this.ship.white.setLeft(left);
    },

    criticalRed: function(data) {
        if (!this.ship.red) return;
        this.ship.red.setHitPoint(data.hp);
        var left = data.isEnemy === this.ship.red.isEnemy ?
            data.left :
            this.ship.red.clientWidth - data.left + (data.isEnemy ? 90 : -90);
        this.ship.red.setLeft(left);
        if (data.iField.isActive) {
            this.ship.red.iField.setHeight(data.iField.height);
            this.ship.red.iField.invoke();
        } else {
            this.ship.red.iField.cancel();
        }
        if (!this.weapon.red) return;
        if (data.funnel.firstLeft === null && data.funnel.secondLeft === null) {
            this.weapon.red.removeFunnelCircle(2);
        }
        if (data.funnel.firstLeft !== null
                && data.funnel.secondLeft === null
                && this.weapon.red.funnelCircles.size() === 2) {

            this.weapon.red.removeFunnelCircle(1);
        }
        var left;
        if (data.funnel.firstLeft !== null) {
            if (this.weapon.red.funnelCircles.size() === 0) {
                this.weapon.red.addFunnelCircle();
            }
            left = data.isEnemy === this.ship.red.isEnemy ?
                data.funnel.firstLeft :
                this.ship.red.clientWidth - data.funnel.firstLeft + (data.isEnemy ? 30 : -30);
            if (left !== this.ship.red.funnels[0].initLeft) {
                this.ship.red.funnels[0].initLeft = left;

            }
            this.ship.red.funnels[0].theta = data.funnel.firstTheta;
        }
        if (data.funnel.secondLeft !== null) {
            if (this.weapon.red.funnelCircles.size() === 1) {
                this.weapon.red.addFunnelCircle();
            }
            left = data.isEnemy === this.ship.red.isEnemy ?
                data.funnel.secondLeft :
                this.ship.red.clientWidth - data.funnel.secondLeft + (data.isEnemy ? 30 : -30);
            if (left !== this.ship.red.funnels[1].initLeft) {
                this.ship.red.funnels[1].initLeft = left;

            }
            this.ship.red.funnels[1].theta = data.funnel.secondTheta;
        }
    },

    youHaveControl: function(data) {
        this.controlShip = data.ship;
        this.socket.emit('I have control', {ship: this.controlShip});
        if (console && typeof console.log == 'function') {
            console.log('I have control: ' + this.controlShip);
        }
    },

    youHaveNoControl: function(data) {
        this.controlShip = null;
        this.socket.emit('I have no control', {});
        if (console && typeof console.log == 'function') {
            console.log('I have no control');
        }
    },

    white: function(data) {
        if (!this.cmd.white) return;
        this.ship.white.nextCmd = data.cmd;
        this.cmd.white.execute(data.cmd);
    },

    red: function(data) {
        if (!this.cmd.red) return;
        this.ship.red.nextCmd = data.cmd;
        this.cmd.red.execute(data.cmd);
    }
});
