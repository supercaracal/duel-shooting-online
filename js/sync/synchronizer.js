var Synchronizer = Class.create({

    socket: null,
    timerId: null,
    controlShip: null,
    ships: null,
    cmds: null,
    weapons: null,
    chat: null,
    duelistCounter: null,
    chatForm: null,

    initialize: function(uri, callback, finish) {
        this.ships = {};
        this.cmds = {};
        this.weapons = {};
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
        if (!this.ships.white) return;
        this.ships.white.setHitPoint(data.hp);
        var left = data.isEnemy === this.ships.white.isEnemy ?
            data.left :
            this.ships.white.clientWidth - data.left + (data.isEnemy ? 90 : -90);
        if (60 < (this.ships.white.getLeft() - left).abs()) {
            this.ships.white.setLeft(left);
        }
    },

    criticalRed: function(data) {
        if (!this.ships.red) return;
        this.ships.red.setHitPoint(data.hp);
        var left = data.isEnemy === this.ships.red.isEnemy ?
            data.left :
            this.ships.red.clientWidth - data.left + (data.isEnemy ? 90 : -90);
        if (60 < (this.ships.red.getLeft() - left).abs()) {
            this.ships.red.setLeft(left);
        }
        if (data.iField.isActive) {
            this.ships.red.iField.setHeight(data.iField.height);
            this.ships.red.iField.invoke();
        } else {
            this.ships.red.iField.cancel();
        }
        if (!this.weapons.red) return;
        if (data.funnel.firstLeft === null && data.funnel.secondLeft === null) {
            this.weapons.red.removeFunnelCircle(2);
        }
        if (data.funnel.firstLeft !== null
                && data.funnel.secondLeft === null
                && this.weapons.red.funnelCircles.size() === 2) {

            this.weapons.red.removeFunnelCircle(1);
        }
        var left;
        if (data.funnel.firstLeft !== null) {
            if (this.weapons.red.funnelCircles.size() === 0) {
                this.weapons.red.addFunnelCircle();
            }
            left = data.isEnemy === this.ships.red.isEnemy ?
                data.funnel.firstLeft :
                this.ships.red.clientWidth - data.funnel.firstLeft + (data.isEnemy ? 30 : -30);
            if (left !== this.ships.red.funnels[0].initLeft) {
                this.ships.red.funnels[0].initLeft = left;

            }
            this.ships.red.funnels[0].theta = data.funnel.firstTheta;
        }
        if (data.funnel.secondLeft !== null) {
            if (this.weapons.red.funnelCircles.size() === 1) {
                this.weapons.red.addFunnelCircle();
            }
            left = data.isEnemy === this.ships.red.isEnemy ?
                data.funnel.secondLeft :
                this.ships.red.clientWidth - data.funnel.secondLeft + (data.isEnemy ? 30 : -30);
            if (left !== this.ships.red.funnels[1].initLeft) {
                this.ships.red.funnels[1].initLeft = left;

            }
            this.ships.red.funnels[1].theta = data.funnel.secondTheta;
        }
    },

    attack: function(data) {
        if (!this.cmds[data.color]) return;
        this.ships[data.color].nextCmd = data.cmd;
        this.cmds[data.color].execute(data.cmd);
    },

    pushAttackInfo: function(cmd) {
        if (!cmd) return;
        this.socket.emit('attack', {color: this.controlShip, cmd: cmd});
    },

    pushCriticalInfo: function() {
        if (!this.ships[this.controlShip]) {
            return;
        }
        var data = {
            hp: this.ships[this.controlShip].getHitPoint(),
            left: this.ships[this.controlShip].getLeft(),
            isEnemy: this.ships[this.controlShip].isEnemy
        };
        if (this.controlShip == 'red') {
            data.iField = this.ships[this.controlShip].getIFieldInfo();
            data.funnel = this.ships[this.controlShip].getFunnelInfo();
        }
        data.color = this.controlShip;
        this.socket.emit('critical', data);
    },

    setShipAndCommand: function(color, ship, cmd) {
        this.ships[color] = ship;
        this.cmds[color] = cmd;
    },

    setShipRedWeapon: function(weapon) {
        this.weapons.red = weapon;
    },

    stop: function() {
        clearInterval(this.timerId);
        this.socket.disconnect();
        this.chatForm.elm.disable();
        this.chatForm.elm.stopObserving('submit');
    }
});
