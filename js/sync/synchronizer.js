var Synchronizer = Class.create({

    socket: null,
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

    attack: function(data) {
        if (!this.cmds[data.color]) return;
        if (data.color != this.controlShip) this.critical(data);
        this.ships[data.color].nextCmd = data.cmd;
        this.cmds[data.color].execute(data.cmd);
    },

    critical: function(data) {
        var methodName = 'critical' + data.color.capitalize();
        this[(methodName in this) ? methodName : 'criticalDefault'](data);
    },

    criticalDefault: function(data) {
        if (!this.ships[data.color]) return;
        this.ships[data.color].setHitPoint(data.hp);
        if (this.ships[data.color].nextCmd !== 'stepRight'
            && this.ships[data.color].nextCmd !== 'stepLeft') {

            this.ships[data.color].setLeft(
                this.ships[data.color].clientWidth - data.left - 90);
        }
    },

    criticalRed: function(data) {
        if (!this.ships.red) return;
        this.ships.red.setHitPoint(data.hp);
        if (this.ships.red.nextCmd !== 'stepRight'
            && this.ships.red.nextCmd !== 'stepLeft') {

            this.ships.red.setLeft(
                this.ships.red.clientWidth - data.left - 90);
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
            left = this.ships.red.clientWidth - data.funnel.firstLeft - 30;
            if (left !== this.ships.red.funnels[0].initLeft) {
                this.ships.red.funnels[0].initLeft = left;
            }
            this.ships.red.funnels[0].theta = data.funnel.firstTheta;
        }
        if (data.funnel.secondLeft !== null) {
            if (this.weapons.red.funnelCircles.size() === 1) {
                this.weapons.red.addFunnelCircle();
            }
            left = this.ships.red.clientWidth - data.funnel.secondLeft - 30;
            if (left !== this.ships.red.funnels[1].initLeft) {
                this.ships.red.funnels[1].initLeft = left;
            }
            this.ships.red.funnels[1].theta = data.funnel.secondTheta;
        }
    },

    pushAttackInfo: function(cmd) {
        if (!cmd) return;
        var data = {
            color: this.controlShip,
            cmd: cmd,
            hp: this.ships[this.controlShip].getHitPoint(),
            left: this.ships[this.controlShip].getLeft()
        };
        if (this.controlShip == 'red') {
            data.iField = this.ships.red.getIFieldInfo();
            data.funnel = this.ships.red.getFunnelInfo();
        }
        this.socket.emit('attack', data);
    },

    setShipAndCommand: function(color, ship, cmd) {
        this.ships[color] = ship;
        this.cmds[color] = cmd;
    },

    setShipRedWeapon: function(weapon) {
        this.weapons.red = weapon;
    },

    stop: function() {
        this.socket.disconnect();
        this.chatForm.elm.disable();
        this.chatForm.elm.stopObserving('submit');
    }
});
