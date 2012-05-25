var Synchronizer = Class.create({

    socket: null,
    timerId: null,
    controlShip: null,
    ship: null,
    cmd: null,
    weapon: null,
    chat: null,
    duelistCounter: null,
    chatForm: null,

    initialize: function(uri, callback, finish) {
        this.ship = {};
        this.cmd = {};
        this.weapon = {};
        this.chat = new Chat();
        this.duelistCounter = new DuelistCounter();
        this.duelistCounter.renderElement();
        this.chatForm = new ChatForm();
        this.chatForm.renderElement();

        this.socket = io.connect(uri);
        this.setupChatEvent();
        this.listenShipControl();
        this.listenDuelReady(callback);
        this.listenYouWin(finish);
        this.listenDuelistCount();
        this.socket.emit('duty', {});
        this.listenCriticalInfo();
        this.timerId = setInterval(this.pushCriticalInfo.bind(this), 5000);
    },

    setupChatEvent: function() {
        this.chatForm.elm.observe('submit', (function(e) {
            e.stop();
            var v = this.chatForm.getValue();
            if (v) this.socket.emit('chat', v);
        }).bindAsEventListener(this));
        this.socket.on('chat', (function(data) {
            this.chat.add(data);
        }).bind(this));
    },

    listenShipControl: function() {
        this.socket.on('You have control', this.youHaveControl.bind(this));
        this.socket.on('You have no control', this.youHaveNoControl.bind(this));
    },

    listenDuelReady: function(callback) {
        this.socket.on('ready', callback);
    },

    listenYouWin: function(finish) {
        this.socket.on('You win', finish);
    },

    listenDuelistCount: function() {
        this.socket.on('duelist count', this.updateDuelistCount.bind(this));
    },

    listenCriticalInfo: function() {
        this.socket.on('critical', this.critical.bind(this));
    },

    listenShipCommand: function() {
        this.socket.on('attack', this.attack.bind(this));
    },

    youHaveControl: function(data) {
        this.controlShip = data.ship;
        this.socket.emit('I have control', {ship: this.controlShip});
        if (typeof console !== 'undefined') {
            console.log('I have control: ' + this.controlShip);
        }
    },

    youHaveNoControl: function(data) {
        (function() { this.socket.emit('duty', {}); }).bind(this).delay(5);
    },

    updateDuelistCount: function(cnt) {
        this.duelistCounter.update('Duelists: ' + cnt);
    },

    critical: function(data) {
        switch (data.color) {
            case 'white':
                this.criticalWhite(data);
                break;
            case 'red':
                this.criticalRed(data);
                break;
        }
    },

    criticalWhite: function(data) {
        if (!this.ship.white) return;
        this.ship.white.setHitPoint(data.hp);
        var left = data.isEnemy === this.ship.white.isEnemy ?
            data.left :
            this.ship.white.clientWidth - data.left + (data.isEnemy ? 90 : -90);
        if (60 < (this.ship.white.getLeft() - left).abs()) {
            this.ship.white.setLeft(left);
        }
    },

    criticalRed: function(data) {
        if (!this.ship.red) return;
        this.ship.red.setHitPoint(data.hp);
        var left = data.isEnemy === this.ship.red.isEnemy ?
            data.left :
            this.ship.red.clientWidth - data.left + (data.isEnemy ? 90 : -90);
        if (60 < (this.ship.red.getLeft() - left).abs()) {
            this.ship.red.setLeft(left);
        }
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

    attack: function(data) {
        if (!this.cmd[data.color]) return;
        this.ship[data.color].nextCmd = data.cmd;
        this.cmd[data.color].execute(data.cmd);
    },

    pushAttackInfo: function(cmd) {
        if (!cmd) return;
        this.socket.emit('attack', {color: this.controlShip, cmd: cmd});
    },

    pushCriticalInfo: function() {
        if (!this.ship[this.controlShip]) {
            return;
        }
        var data = {
            hp: this.ship[this.controlShip].getHitPoint(),
            left: this.ship[this.controlShip].getLeft(),
            isEnemy: this.ship[this.controlShip].isEnemy
        };
        if (this.controlShip == 'red') {
            data.iField = this.ship[this.controlShip].getIFieldInfo();
            data.funnel = this.ship[this.controlShip].getFunnelInfo();
        }
        data.color = this.controlShip;
        this.socket.emit('critical', data);
    },

    stop: function() {
        clearInterval(this.timerId);
        this.socket.disconnect();
        this.chatForm.elm.disable();
        this.chatForm.elm.stopObserving('submit');
    },

    setShipAndCommand: function(color, ship, cmd) {
        this.ship[color] = ship;
        this.cmd[color] = cmd;
    },

    setShipRedWeapon: function(weapon) {
        this.weapon.red = weapon;
    }
});
