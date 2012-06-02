var Action = Class.create({

    hasTouchEvent: null,
    nextCommand: null,
    sprite: null,

    initialize: function() {
        this.hasTouchEvent = this.checkTouchEvent();
        this.sprite = new Sprite();
        this.setEventListener();
    },

    checkTouchEvent: function() {
        return typeof new Element('div', {ontouchstart: 'return;'}).ontouchstart == 'function';
    },

    setEventListener: function() {
        if (this.hasTouchEvent) {
            $(document).observe('touchstart', this.handlerSmart.bindAsEventListener(this));
            return;
        }
        $(document).observe('keydown', this.handler.bindAsEventListener(this));
        $(document).observe('mousedown', this.handlerMouse.bindAsEventListener(this));
    },

    stop: function() {
        if (this.hasTouchEvent) {
            $(document).stopObserving('touchstart');
            return;
        }
        $(document).stopObserving('keydown');
        $(document).stopObserving('mousedown');
    },

    getCommand: function() {
        var command = this.nextCommand;
        this.nextCommand = null;
        return command;
    },

    handlerMouse: function(e) {
        if (this.convertToAction(e.pageX, e.pageY)) e.stop();
    },

    handlerSmart: function(e) {
        if (this.convertToAction(e.touches[0].pageX, e.touches[0].pageY)) e.stop();
    }
});

/************************************/
var Command = Class.create({

    ship: null,
    weapon: null,

    initialize: function(ship, weapon) {
        this.ship = ship;
        this.weapon = weapon;
    },

    execute: function(command) {
        if (command && command in this) this[command]();
    }
});

/************************************/
var Sprite = Class.create({

    Z_INDEX_BASE: 3000,

    clientHeight: null,
    clientWidth: null,

    elm: null,

    initTop: null,
    initLeft: null,
    initTransformRotate: null,

    currentTop: null,
    currentLeft: null,
    currentTransformRotate: null,

    initialize: function() {
        this.clientHeight = this.getClientHeight();
        this.clientWidth = this.getClientWidth();
        this.elm = this.createElement();
        this.initTop = this.getInitTop();
        this.initLeft = this.getInitLeft();
        this.initTransformRotate = this.getInitTransformRotate();
        this.setupPosition();
    },

    createElement: function() {
        return new Element('div');
    },

    getInitTop: function() {
        return 0;
    },

    getInitLeft: function() {
        return 0;
    },

    getInitTransformRotate: function() {
        return 0;
    },

    setupPosition: function() {
        this.setPos({top: this.initTop, left: this.initLeft});
    },

    resetPosition: function() {
        this.clientHeight = this.getClientHeight();
        this.clientWidth = this.getClientWidth();
        this.setupPosition();
    },

    getClientHeight: function() {
        return 480;
    },

    getClientWidth: function() {
        return 720;
    },

    renderElement: function() {
        $(document.body).insert(this.elm);
    },

    getTop: function () {
        return this.currentTop;
    },

    getLeft: function () {
        return this.currentLeft;
    },

    getPos: function () {
        return {top: this.currentTop, left: this.currentLeft};
    },

    getTransformRotate: function () {
        return this.currentTransformRotate;
    },

    setTop: function (px) {
        this.elm.setStyle({top: px + 'px'});
        this.currentTop = px;
    },

    setLeft: function (px) {
        this.elm.setStyle({left: px + 'px'});
        this.currentLeft = px;
    },

    setPos: function (pxs) {
        if (pxs['top'] !== undefined) this.setTop(pxs.top);
        if (pxs['left'] !== undefined) this.setLeft(pxs.left);
    },

    setTransformRotate: function (theta) {
        this.elm.setStyle({
            webkitTransform: 'rotate(' + theta + 'deg)',
            MozTransform: 'rotate(' + theta + 'deg)',
            msTransform: 'rotate(' + theta + 'deg)',
            transform: 'rotate(' + theta + 'deg)'
        });
        this.currentTransformRotate = theta;
    },

    setOpacity: function(v) {
        this.elm.setOpacity(v);
    },

    remove: function() {
        this.elm.remove();
    }
});

/************************************/
var ActionShipNavy = Class.create(Action, {

    KEY_A: 65,
    KEY_S: 83,
    KEY_D: 68,
    KEY_F: 70,
    KEY_Z: 90,
    KEY_X: 88,
    KEY_C: 67,
    KEY_V: 86,

    handler: function(e) {
        if (e.altGraphKey || e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
        switch (e.keyCode) {
            case Event.KEY_RIGHT:
                this.nextCommand = 'stepRight';
                e.stop();
                break;
            case Event.KEY_LEFT:
                this.nextCommand = 'stepLeft';
                e.stop();
                break;
            case Event.KEY_UP:
                this.nextCommand = 'attack';
                e.stop();
                break;
            case this.KEY_A:
                this.nextCommand = 'attack1';
                e.stop();
                break;
            case this.KEY_S:
                this.nextCommand = 'attack2';
                e.stop();
                break;
            case this.KEY_D:
                this.nextCommand = 'attack3';
                e.stop();
                break;
            case this.KEY_F:
                this.nextCommand = 'attack4';
                e.stop();
                break;
            case this.KEY_Z:
                this.nextCommand = 'attack5';
                e.stop();
                break;
            case this.KEY_X:
                this.nextCommand = 'attack6';
                e.stop();
                break;
            case this.KEY_C:
                this.nextCommand = 'attack7';
                e.stop();
                break;
            case this.KEY_V:
                this.nextCommand = 'attack8';
                e.stop();
                break;
        }
    },

    convertToAction: function(x, y) {

        var screenUpperPart = (0 < y) && (y < this.sprite.clientHeight / 2);
        var screenLowerPart = (this.sprite.clientHeight / 2 < y) && (y < this.sprite.clientHeight);
        var screenLeft = (0 < x) && (x < this.sprite.clientWidth / 3);
        var screenCenter = (this.sprite.clientWidth / 3 < x) && (x < this.sprite.clientWidth / 3 * 2);
        var screenRight = (this.sprite.clientWidth / 3 * 2 < x) && (x < this.sprite.clientWidth);

        if (screenLowerPart && screenLeft) {
            this.nextCommand = 'stepLeft';
            return true;
        }
        if (screenLowerPart && screenCenter) {
            this.nextCommand = 'attack';
            return true;
        }
        if (screenLowerPart && screenRight) {
            this.nextCommand = 'stepRight';
            return true;
        }
        if (screenUpperPart && screenLeft) {
            this.nextCommand = 'stepLeft';
            return true;
        }
        if (screenUpperPart && screenCenter) {
            this.nextCommand = 'attack';
            return true;
        }
        if (screenUpperPart && screenRight) {
            this.nextCommand = 'stepRight';
            return true;
        }
        return false;
    }
});

/************************************/
var ActionShipRed = Class.create(Action, {

    KEY_F: 70,
    KEY_I: 73,
    KEY_N: 78,

    handler: function(e) {
        if (e.altGraphKey || e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
        switch (e.keyCode) {
            case Event.KEY_RIGHT:
                this.nextCommand = 'stepRight';
                e.stop();
                break;
            case Event.KEY_LEFT:
                this.nextCommand = 'stepLeft';
                e.stop();
                break;
            case Event.KEY_UP:
                this.nextCommand = 'attack';
                e.stop();
                break;
            case this.KEY_I:
                this.nextCommand = 'barrier';
                e.stop();
                break;
            case this.KEY_F:
                this.nextCommand = 'funnel';
                e.stop();
                break;
            case this.KEY_N:
                this.nextCommand = 'avoid';
                e.stop();
                break;
        }
    },

    convertToAction: function(x, y) {

        var screenUpperPart = (0 < y) && (y < this.sprite.clientHeight / 2);
        var screenLowerPart = (this.sprite.clientHeight / 2 < y) && (y < this.sprite.clientHeight);
        var screenLeft = (0 < x) && (x < this.sprite.clientWidth / 3);
        var screenCenter = (this.sprite.clientWidth / 3 < x) && (x < this.sprite.clientWidth / 3 * 2);
        var screenRight = (this.sprite.clientWidth / 3 * 2 < x) && (x < this.sprite.clientWidth);

        if (screenLowerPart && screenLeft) {
            this.nextCommand = 'stepLeft';
            return true;
        }
        if (screenLowerPart && screenCenter) {
            this.nextCommand = 'avoid';
            return true;
        }
        if (screenLowerPart && screenRight) {
            this.nextCommand = 'stepRight';
            return true;
        }
        if (screenUpperPart && screenLeft) {
            this.nextCommand = 'funnel';
            return true;
        }
        if (screenUpperPart && screenCenter) {
            this.nextCommand = 'attack';
            return true;
        }
        if (screenUpperPart && screenRight) {
            this.nextCommand = 'barrier';
            return true;
        }
        return false;
    }
});

/************************************/
var ActionShipWhite = Class.create(Action, {

    KEY_F: 70,
    KEY_M: 77,

    handler: function(e) {
        if (e.altGraphKey || e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
        switch (e.keyCode) {
            case Event.KEY_RIGHT:
                this.nextCommand = 'stepRight';
                e.stop();
                break;
            case Event.KEY_LEFT:
                this.nextCommand = 'stepLeft';
                e.stop();
                break;
            case Event.KEY_UP:
                this.nextCommand = 'attack';
                e.stop();
                break;
            case Event.KEY_DOWN:
                this.nextCommand = 'wait';
                e.stop();
                break;
            case this.KEY_F:
                this.nextCommand = 'funnel';
                e.stop();
                break;
            case this.KEY_M:
                this.nextCommand = 'megaCannon';
                e.stop();
                break;
        }
    },

    convertToAction: function(x, y) {

        var screenUpperPart = (0 < y) && (y < this.sprite.clientHeight / 2);
        var screenLowerPart = (this.sprite.clientHeight / 2 < y) && (y < this.sprite.clientHeight);
        var screenLeft = (0 < x) && (x < this.sprite.clientWidth / 3);
        var screenCenter = (this.sprite.clientWidth / 3 < x) && (x < this.sprite.clientWidth / 3 * 2);
        var screenRight = (this.sprite.clientWidth / 3 * 2 < x) && (x < this.sprite.clientWidth);

        if (screenLowerPart && screenLeft) {
            this.nextCommand = 'stepLeft';
            return true;
        }
        if (screenLowerPart && screenCenter) {
            this.nextCommand = 'wait';
            return true;
        }
        if (screenLowerPart && screenRight) {
            this.nextCommand = 'stepRight';
            return true;
        }
        if (screenUpperPart && screenLeft) {
            this.nextCommand = 'funnel';
            return true;
        }
        if (screenUpperPart && screenCenter) {
            this.nextCommand = 'attack';
            return true;
        }
        if (screenUpperPart && screenRight) {
            this.nextCommand = 'megaCannon';
            return true;
        }
        return false;
    }
});

/************************************/
var Background = Class.create(Sprite, {

    createElement: function() {
        return new Element('div').setStyle({
            display: 'block',
            position: 'fixed',
            zIndex: this.Z_INDEX_BASE,
            backgroundColor: '#333333',
            height: this.clientHeight + 'px',
            width: this.clientWidth + 'px',
            borderRight: 'solid 1px #AAAAAA',
            borderBottom: 'solid 1px #AAAAAA'
        }).setOpacity(0.8);
    },

    resetPosition: function($super) {
        $super();
        this.elm.setStyle({
            height: this.clientHeight + 'px',
            width: this.clientWidth + 'px'
        });
    }
});

/************************************/
var Bullet = Class.create(Sprite, {

    ship: null,
    enemy: null,
    isFall: null,
    isDelete: null,

    initialize: function($super, ship, enemy) {
        this.ship = ship;
        this.enemy = enemy;
        this.isFall = ship.isEnemy;
        this.isDelete = false;
        $super();
    },

    getInitTop: function() {
        return this.isFall ? 60 : this.clientHeight - 90;
    },

    getInitLeft: function() {
        return this.ship.getLeft() + 30;
    },

    createElement: function() {
        var color = this.getColor();
        var outer = new Element('div').setStyle({
            width: '30px',
            height: '30px',
            zIndex: this.Z_INDEX_BASE + 6,
            position: 'fixed'
        });
        var inner = new Element('div').setStyle({
            width: '20px',
            height: '20px',
            margin: '5px',
            backgroundColor: color,
            borderRadius: '20px',
            boxShadow: '0px 0px 10px ' + color
        });
        return inner.wrap(outer);
    }
});

/************************************/
var BulletBezier = Class.create(Bullet, {

    ATTAINABLE_COUNT: 40,
    pos: null,
    leftRange: null,
    topRange: null,
    count: null,

    initialize: function($super, ship, enemy, left) {
        $super(ship, enemy);
        this.pos = {
            ship: {
                top: ship.getTop() + (this.isFall ? 60 : -30),
                left: ship.getLeft() + 30
            },
            enemy: {
                top: enemy.getTop() + (this.isFall ? -30 : 60),
                left: left
            }
        };
        this.leftRange = -(this.pos.ship.left - this.pos.enemy.left) / this.ATTAINABLE_COUNT;
        this.topRange = -(this.pos.ship.top - this.pos.enemy.top) / this.ATTAINABLE_COUNT;
        this.count = 0;
    },

    getColor: function() {
        return '#FFFF33';
    },

    move: function() {
        ++this.count;
        if (this.enemy.isHit(this, this.topRange)) {
            this.isDelete = true;
            this.elm.remove();
            return;
        }
        var left = this.pos.ship.left + this.leftRange * this.count;
        this.setPos({
            top: this.pos.ship.top
                + this.topRange * this.count * this.count / this.ATTAINABLE_COUNT,
            left: left + (this.pos.enemy.left - left) * this.count / this.ATTAINABLE_COUNT
        });
    }
});

/************************************/
var BulletHoming = Class.create(Bullet, {

    getColor: function() {
        return '#FF55FF';
    },

    move: function() {
        var range = this.isFall ? 5 : -5;
        if (this.enemy.isHit(this, range)) {
            this.isDelete = true;
            this.elm.remove();
            return;
        }
        var top = this.getTop();
        var left = this.getLeft();
        var enemyLeft = this.enemy.getLeft();
        if (this.isFall ? (this.clientHeight / 2) < top : (this.clientHeight / 2) > top) {
            range = range * 3;
            distance = 0;
        } else if (left < enemyLeft) {
            distance = 10;
        } else if ((enemyLeft + 60) < left) {
            distance = -10;
        } else {
            distance = 0;
        }
        this.setPos({top: top + range, left: left + distance});
    }
});

/************************************/
var BulletLinear = Class.create(Bullet, {

    getColor: function() {
        return '#55FF55';
    },

    move: function() {
        var range = this.isFall ? 10 : -10;
        if (this.enemy.isHit(this, range)) {
            this.isDelete = true;
            this.elm.remove();
            return;
        }
        this.setTop(this.getTop() + range);
    }
});

/************************************/
var Chat = Class.create({

    elms: null,

    initialize: function() {
        this.elms = [];
    },

    add: function(text) {
        var elm = new NicoNico(text);
        elm.renderElement();
        this.elms.push(elm);
    },

    move: function() {
        for (var i = 0, len = this.elms.size(); i < len; i++) {
            this.elms[i].move();
            if (this.elms[i].isDelete) this.elms[i] = null;
        }
        this.elms = this.elms.compact();
    }
});

/************************************/
var ChatForm = Class.create(Sprite, {

    textField: null,

    createElement: function() {
        var form = new Element('form', {action: '#', method: 'post'}).setStyle({
            zIndex: this.Z_INDEX_BASE + 2000,
            position: 'fixed',
            backgroundColor: '#EFEFEF'
        });
        this.textField = new Element('input', { type: 'text', value: '' })
            .setStyle({ width: '400px' });
        var button = new Element('input', { type: 'submit', value: 'send' });
        form.insert(this.textField).insert(button);
        return form;
    },

    getInitTop: function() {
        return this.clientHeight + 10;
    },

    getInitLeft: function() {
        return 270;
    },

    getValue: function() {
        return $F(this.textField);
    }
});

/************************************/
var CommandShipNavy = Class.create(Command, {

    stepRight: function() {
        this.ship.stepRight();
    },

    stepLeft: function() {
        this.ship.stepLeft();
    },

    attack: function() {
        this.weapon.addBulletBezierAuto();
    },

    attack1: function() {
        this.weapon.addBulletBezierManual(this.ship.isEnemy ? 660 : 30);
    },

    attack2: function() {
        this.weapon.addBulletBezierManual(this.ship.isEnemy ? 570 : 120);
    },

    attack3: function() {
        this.weapon.addBulletBezierManual(this.ship.isEnemy ? 480 : 210);
    },

    attack4: function() {
        this.weapon.addBulletBezierManual(this.ship.isEnemy ? 390 : 300);
    },

    attack5: function() {
        this.weapon.addBulletBezierManual(this.ship.isEnemy ? 300 : 390);
    },

    attack6: function() {
        this.weapon.addBulletBezierManual(this.ship.isEnemy ? 210 : 480);
    },

    attack7: function() {
        this.weapon.addBulletBezierManual(this.ship.isEnemy ? 120 : 570);
    },

    attack8: function() {
        this.weapon.addBulletBezierManual(this.ship.isEnemy ? 30 : 660);
    }
});

/************************************/
var CommandShipRed = Class.create(Command, {

    stepRight: function() {
        this.ship.stepRight();
    },

    stepLeft: function() {
        this.ship.stepLeft();
    },

    avoid: function() {
        this.ship.avoid();
    },

    barrier: function() {
        this.ship.barrier();
    },

    attack: function() {
        if (this.ship.iField && this.ship.iField.isActive) {
            return;
        }
        this.weapon.addBulletHoming();
    },

    funnel: function() {
        this.weapon.addFunnelCircle();
    }
});

/************************************/
var CommandShipWhite = Class.create(Command, {

    stepRight: function() {
        this.ship.stepRight();
    },

    stepLeft: function() {
        this.ship.stepLeft();
    },

    wait: Prototype.emptyFunction,

    attack: function() {
        this.weapon.addBulletLinear();
    },

    funnel: function() {
        this.weapon.addFunnelSlider();
    },

    megaCannon: function() {
        this.weapon.fireMegaCannon();
    }
});

/************************************/
var Condition = Class.create(Sprite, {

    timerId: null,

    createElement: function() {
        return new Element('div').setStyle({
            display: 'none',
            position: 'fixed',
            zIndex: this.Z_INDEX_BASE + 101,
            fontSize: '20px',
            fontWeight: 800,
            top: '0px',
            left: '0px'
        });
    },

    setupPosition: function() {
        var dim = this.elm.getDimensions();
        this.elm.setStyle({
            display: 'block',
            top: this.clientHeight / 2 - (dim.height / 2 - 0) + 100 + 'px',
            left: this.clientWidth / 2 - (dim.width / 2 - 0) + 'px'
        });
    },

    update: function(text, color) {
        if (this.timerId) clearTimeout(this.timerId);
        this.elm.update(text);
        this.elm.setStyle({color: color});
        this.setupPosition();
        this.elm.show();
    },

    updateAndDelayHide: function(text, color) {
        this.update(text, color);
        this.timerId = this.elm.hide.bind(this.elm).delay(7);
    }
});

/************************************/
var DuelistCounter = Class.create(Sprite, {

    createElement: function() {
        return new Element('div').setStyle({
            position: 'fixed',
            zIndex: this.Z_INDEX_BASE,
            fontSize: '20px',
            fontWeight: 800
        });
    },

    getInitTop: function() {
        return this.clientHeight + 10;
    },

    getInitLeft: function() {
        return 10;
    },

    update: function(text) {
        this.elm.update(text);
        this.remove();
        this.renderElement();
    }
});

/************************************/
var DuelShooting = Class.create({

    sounds: null,
    weapons: null,
    cmds: null,
    opening: null,
    condition: null,
    sync: null,

    timeKeeper: null,
    ship: null,
    enemy: null,
    action: null,
    game: null,

    initialize: function() {
        this.weapons = {};
        this.cmds = {};
        this.opening = new Opening(new Title());
        this.condition = new Condition();
        this.opening.show();
        this.condition.renderElement();
        this.condition.update('Scouting for the enemy...', '#99FF99');
        this.setupSoundEffect();
        this.sync = new Synchronizer('/', this.callback.bind(this), this.finish.bind(this));
    },

    callback: function(data) {

        var creater = {};
        creater.ship = ShipFactory.getCreater(data.ship, false, this.sounds);
        creater.enemy = ShipFactory.getCreater(data.enemy, true, this.sounds);

        this.ship = creater.ship.createShip();
        this.enemy = creater.enemy.createShip();
        this.weapons.ship = creater.ship.createWeapon(this.enemy);
        this.weapons.enemy = creater.enemy.createWeapon(this.ship);
        this.action = creater.ship.createAction();
        this.cmds.ship = creater.ship.createCommand();
        this.cmds.enemy = creater.enemy.createCommand();
        this.sync.setShipAndCommand(data.ship, this.ship, this.cmds.ship);
        this.sync.setShipAndCommand(data.enemy, this.enemy, this.cmds.enemy);
        this.sync.listenShipCommand();
        this.setShipRedWeaponForSync(data);

        this.setupTimeKeeper();
        this.setupGame();
        this.renderElements();
        this.game.start();
        this.timeKeeper.start();
        this.condition.updateAndDelayHide('Engaged!', '#FF9999');
        this.opening.hide();
    },

    setupSoundEffect: function() {
        var sound = new Sound();
        this.sounds = {};
        this.sounds.hit = sound.createAudio('/se/hit.mp3');
        this.sounds.lose = sound.createAudio('/se/lose.mp3');
        this.sounds.newtype = sound.createAudio('/se/newtype.mp3');
        this.sounds.attack = sound.createAudio('/se/attack.mp3');
        this.sounds.megaCannon = sound.createAudio('/se/mega.mp3');
        this.sounds.funnelGo = sound.createAudio('/se/funnel1.mp3');
        this.sounds.funnelAtk = sound.createAudio('/se/funnel2.mp3');
        this.sounds.iField = sound.createAudio('/se/at_field.mp3');
    },

    setShipRedWeaponForSync: function(data) {
        var prop;
        if (data.ship == 'red') prop = 'ship'
        if (data.enemy == 'red') prop = 'enemy';
        if (!prop) return;
        this.sync.setShipRedWeapon(this.weapons[prop]);
    },

    setupTimeKeeper: function() {
        this.timeKeeper = new TimeKeeper();
    },

    setupGame: function() {
        this.game = new Game(this.routine.bind(this));
    },

    routine: function() {
        this.sync.chat.move();
        this.ship.move();
        this.enemy.move();
        this.weapons.ship.move();
        this.weapons.enemy.move();
        if (!this.action) {
            return;
        }
        if (this.ship.getHitPoint() === 0) {
            this.finish(false);
            return;
        }
        this.pushCommand(this.action.getCommand());
    },

    finish: function(isWin) {
        this.action.stop();
        this.timeKeeper.stop();
        this.game.stop();
        this.sync.stop();
        this.condition.update(
            isWin ? 'You win.' : 'You lose.',
            isWin ? '#9999FF' : '#FF9999'
        );
        if (isWin) {
            new ForkMeOnGitHub().renderElement();
        }
    },

    pushCommand: function(cmd) {
        this.sync.pushAttackInfo(cmd);
    },

    renderElements: function() {
        new Background().renderElement();
        this.timeKeeper.renderElement();
        this.ship.renderElement();
        this.enemy.renderElement();
    }
});

/************************************/
var ForkMeOnGitHub = Class.create(Sprite, {

    createElement: function() {
        return new Element('img', {
            src: 'https://s3.amazonaws.com/github/ribbons/forkme_left_white_ffffff.png',
            alt: 'Fork me on GitHub'
        }).setStyle({border: 'none'}).wrap(new Element('a', {
            href: 'https://github.com/supercaracal/duelshooting_online'
        })).setStyle({
            position: 'fixed',
            zIndex: this.Z_INDEX_BASE + 4000
        });
    },

    getInitTop: function() {
        return 0;
    },

    getInitLeft: function() {
        return 0;
    }
});

/************************************/
var Funnel = Class.create(Sprite, {

    carrier: null,
    isEnemy: null,
    isDelete: null,

    initialize: function($super, carrier) {
        this.carrier = carrier;
        this.isEnemy = carrier.isEnemy;
        this.isDelete = false;
        $super();
    },

    createElement: function() {
        var color = this.getColor();
        return this.isEnemy ?
            this.createForEnemy(color) :
            this.createForShip(color);
    },

    createForShip: function(color) {
        var obj = new Element('div').setStyle({
            width: '30px',
            height: '30px',
            zIndex: this.Z_INDEX_BASE + 4,
            position: 'fixed'
        });
        obj.insert(new Element('div').setStyle({
            width: '6px',
            height: '20px',
            marginLeft: '12px',
            backgroundColor: color,
            borderRadius: '2px',
            boxShadow: '0px 0px 10px ' + color
        }));
        obj.insert(new Element('div').setStyle({
            width: '20px',
            height: '10px',
            margin: '0px 5px 0px 5px',
            backgroundColor: color,
            borderRadius: '20px',
            boxShadow: '0px 0px 10px ' + color
        }));
        return obj;
    },

    createForEnemy: function(color) {
        var obj = new Element('div').setStyle({
            width: '30px',
            height: '30px',
            zIndex: this.Z_INDEX_BASE + 4,
            position: 'fixed'
        });
        obj.insert(new Element('div').setStyle({
            width: '20px',
            height: '10px',
            margin: '0px 5px 0px 5px',
            backgroundColor: color,
            borderRadius: '20px',
            boxShadow: '0px 0px 10px ' + color
        }));
        obj.insert(new Element('div').setStyle({
            width: '6px',
            height: '20px',
            marginLeft: '12px',
            backgroundColor: color,
            borderRadius: '2px',
            boxShadow: '0px 0px 10px ' + color
        }));
        return obj;               
    }
});

/************************************/
var FunnelCircle = Class.create(Funnel, {

    r: null,
    theta: null,
    speed: null,
    isClockwise: null,

    initialize: function($super, carrier) {
        $super(carrier);
        this.r = 70;
        this.theta = this.isEnemy ? 0 : 180;
        this.speed = 3;
        this.isCloclwise = this.isEnemy;
        carrier.addFunnel(this);
    },

    getInitTop: function() {
        return this.carrier.getTop() + (this.isEnemy ? 60 : -30);
    },

    getInitLeft: function() {
        return this.carrier.getLeft() + 30;
    },

    getColor: function() {
        return '#FF9900';
    },

    move: function() {

        var y = this.initLeft
            + Math.sin(Math.PI / 180 * this.theta) * this.r;

        var x = this.initTop
            + (this.isEnemy ? 0 : -140)
            + this.r
            - Math.cos(Math.PI / 180 * this.theta) * this.r;

        this.setPos({top: x, left: y});
        this.theta += this.isClockwise ? this.speed : -this.speed;
        if (this.theta < 0 || 360 < this.theta ) {
            this.theta = this.isClockwise ? 0 : 360;
        }
    }
});

/************************************/
var FunnelDefenceLeft = Class.create(Funnel, {

    iField: null,

    initialize: function($super, carrier, iField) {
        this.iField = iField;
        $super(carrier);
        this.setTransformRotate(this.getInitTransformRotate());
    },

    getInitTop: function() {
        return this.carrier.getTop() + (this.isEnemy ? 60 : -30);
    },

    getInitLeft: function() {
        return this.carrier.getLeft() - 40;
    },

    getInitTransformRotate: function() {
        return 135;
    },

    getColor: function() {
        return '#FF9900';
    },

    move: function() {
        if (this.iField.isActive) {
            this.setTransformRotate(this.isEnemy ? 270 : 90);
        } else {
            var deg = this.getTransformRotate();
            deg = deg > 360 ? 0 : deg;
            this.setTransformRotate(++deg);
        }
        this.setPos({top: this.getInitTop(), left: this.getInitLeft()});
    }
});

/************************************/
var FunnelDefenceRight = Class.create(Funnel, {

    iField: null,

    initialize: function($super, carrier, iField) {
        this.iField = iField;
        $super(carrier);
        this.setTransformRotate(this.getInitTransformRotate());
    },

    getInitTop: function() {
        return this.carrier.getTop() + (this.isEnemy ? 60 : -30);
    },

    getInitLeft: function() {
        return this.carrier.getLeft() + 100;
    },

    getInitTransformRotate: function() {
        return 225;
    },

    getColor: function() {
        return '#FF9900';
    },

    move: function() {
        if (this.iField.isActive) {
            this.setTransformRotate(this.isEnemy ? 90 : 270);
        } else {
            var deg = this.getTransformRotate();
            deg = deg < 0 ? 360 : deg;
            this.setTransformRotate(--deg);
        }
        this.setPos({top: this.getInitTop(), left: this.getInitLeft()});
    }
});

/************************************/
var FunnelSlider = Class.create(Funnel, {

    target: null,
    isComeback: null,
    isFunnelSliderAttack: null,
    isFunnelSlider: null,

    initialize: function($super, carrier, target) {
        this.isComeback = false;
        this.isFunnelSliderAttack = false;
        this.isFunnelSlider = true;
        this.target = target;
        $super(carrier);
    },

    getInitTop: function() {
        return this.carrier.getTop() + (this.isEnemy ? 60 : -30);
    },

    getInitLeft: function() {
        return this.carrier.getLeft() + 30;
    },

    getColor: function() {
        return '#9999FF';
    },

    move: function() {
        this.isComeback ? this.moveComeback() : this.moveChase();
    },

    moveComeback: function() {
        var shipCenterLeft = this.carrier.getLeft() + 30;
        var left = this.getLeft();
        if (Math.abs(shipCenterLeft - left) < 30) {
            this.isDelete = true;
            this.elm.remove();
            return;
        }
        this.setLeft(left + ((shipCenterLeft - left) > 0 ? 10 : -10));
    },

    moveChase: function() {
        var enemyCenterLeft = this.target.getLeft() + 30;
        var left = this.getLeft();
        if (Math.abs(enemyCenterLeft - left) < 30) {
            this.isComeback = true;
            this.isFunnelSliderAttack = true;
            return;
        }
        this.setLeft(left + ((enemyCenterLeft - left) > 0 ? 10 : -10));
    }
});

/************************************/
var Game = Class.create({

    INTERVAL_WAIT_MSEC: 16,

    timerId: null,
    routine: null,

    initialize: function(routine) {
        this.routine = routine;
    },

    start: function() {
        if (this.timerId !== null) return;
        this.timerId = setInterval(this.routine, this.INTERVAL_WAIT_MSEC);
    },

    pause: function() {
        this.timerId === null ? this.start() : this.stop();
    },

    stop: function() {
        clearInterval(this.timerId);
        this.timerId = null;
    }
});

/************************************/
var IField = Class.create(Sprite, {

    WAIT: 250,

    isActive: null,
    carrier: null,
    isEnemy: null,

    waitCount: null,

    sound: null,

    initialize: function($super, carrier) {
        this.isActive = false;
        this.carrier = carrier;
        this.isEnemy = carrier.isEnemy;
        this.waitCount = 0;
        $super();
        this.carrier.setIField(this);
    },

    createElement: function() {
        var color = '#FFFFFF';
        return new Element('div')
            .setStyle({
                width: '100px',
                height: '20px',
                backgroundColor: color,
                zIndex: this.Z_INDEX_BASE + 11,
                position: 'fixed',
                boxShadow: '0px 0px 10px ' + color,
                borderRadius: '10px',
                display: 'none'
            }).setOpacity(0.5);
    },

    getInitTop: function() {
        return this.carrier.getTop() + (this.isEnemy ? 65 : -25); 
    },

    getInitLeft: function() {
        return this.carrier.getLeft() - 5;
    },

    getHeight: function() {
        return this.elm.getHeight();
    },

    setHeight: function(h) {
        this.elm.setStyle({height: h + 'px'});
        this.setTop(this.getInitTop() + (20 - h) / 2);
    },

    setSound: function(audio) {
        this.sound = audio;
    },

    playSound: function() {
        if (this.sound) this.sound.replay();
    },

    hit: function() {
        h = this.getHeight();
        h -= 2;
        this.setHeight(h);
        if (h <= 0) {
            this.cancel();
            this.waitCount = this.WAIT;
        }
    },

    isHit: function(bullet, range, enemyLeft) {
        var top = bullet.getTop();
        var left = bullet.getLeft();
        if (this.isActive
                && (bullet.isFall ? top + range > this.clientHeight - 110 : top + range < 80)
                && enemyLeft - 25 < left
                && left < enemyLeft + 95) {

            this.hit();
            return true;
        }
    },

    barrier: function() {
        if (0 < this.waitCount || this.isActive) {
            return;
        }
        this.setHeight(20);
        this.invoke();
        this.playSound();
    },

    invoke: function() {
        this.isActive = true;
        this.elm.show();
    },

    cancel: function() {
        this.isActive = false;
        this.elm.hide();
    },

    move: function() {
        this.setLeft(this.carrier.getLeft() - 5);
        if (this.isActive) this.changeColor();
        if (0 < this.waitCount) {
            --this.waitCount;
        }
    },

    changeColor: function () {
        var color = '#'
            + Math.floor(Math.random() * 100).toColorPart()
            + Math.floor(Math.random() * 100).toColorPart()
            + Math.floor(Math.random() * 100).toColorPart();
        this.elm.setStyle({backgroundColor: color});
    }
});

/************************************/
var NicoNico = Class.create(Sprite, {

    text: null,
    dim: null,
    seed: null,

    initialize: function ($super, text) {
        this.text = text;
        this.seed = this.getSeed();
        $super();
    },

    createElement: function() {
        return new Element('span').setStyle({
            color: this.getColor(),
            fontSize: this.getSeed() + 8 + 'px',
            fontWeight: 'bolder',
            zIndex: this.Z_INDEX_BASE + 1000 + this.getSeed() + 1,
            position: 'fixed',
            whiteSpace: 'nowrap'
        }).update(this.text);
    },

    getInitTop: function() {
        return Math.floor(this.clientHeight * (this.getSeed() / 100));
    },

    getInitLeft: function() {
        return document.viewport.getWidth()
            || document.documentElement.clientWidth
            || document.body.clientWidth
            || document.body.scrollWidth
            || this.clientWidth;
    },

    renderElement: function($super) {
        $super();
        this.dim = this.elm.getDimensions();
        if (this.clientHeight < this.getTop() + this.dim.height) {
            this.setTop(this.clientHeight - this.dim.height);
        }
    },

    move: function () {
        var x = this.getLeft();
        if (x < -this.dim.width) {
            this.isDelete = true;
            this.remove();
            return;
        }
        x -= this.seed % 10 + 5;
        this.setLeft(x);
    },

    getSeed: function () {
        return Math.floor(Math.random() * 100);
    },

    getColor: function() {
        var color = null;
        var changePos = this.getSeed() % 6;
        var changeVal = this.getSeed() % 16;
        var hexs = {
             0: '0F',
             1: '1F',
             2: '2F',
             3: '3F',
             4: '4F',
             5: '5F',
             6: '6F',
             7: '7F',
             8: '8F',
             9: '9F',
            10: 'AF',
            11: 'BF',
            12: 'CF',
            13: 'DF',
            14: 'EF',
            15: 'FF'
        };
        switch (changePos) {
            case 0:
                color = '#' + hexs[changeVal] + 'FF' + 'FF';
                break;
            case 1:
                color = '#' + 'FF' + hexs[changeVal] + 'FF';
                break;
            case 2:
                color = '#' + 'FF' + 'FF' + hexs[changeVal];
                break;
            case 3:
                color = '#' + hexs[changeVal] + hexs[changeVal] + 'FF';
                break;
            case 4:
                color = '#' + hexs[changeVal] + 'FF' + hexs[changeVal];
                break;
            case 5:
                color = '#' + 'FF' + hexs[changeVal] + hexs[changeVal];
                break;
            default:
                color = '#FFFFFF';
                break;
        }
        return color;
    }
});

/************************************/
var Opening = Class.create(Sprite, {

    timerId: null,
    title: null,
    titleOpacity: 0.0,
    backgroundOpacity: 1.0,

    initialize: function($super, title) {
        this.title = title;
        $super();
    },

    createElement: function() {
        var background = new Element('div').setStyle({
            display: 'block',
            position: 'fixed',
            zIndex: this.Z_INDEX_BASE + 100,
            backgroundColor: '#111111',
            height: this.clientHeight + 'px',
            width: this.clientWidth + 'px'
        }).setOpacity(this.backgroundOpacity);
        return background;
    },

    show: function() {
        this.title.renderElement();
        this.renderElement();
        this.timerId = setInterval(this.appear.bind(this), 128);            
    },

    appear: function() {
        if (this.titleOpacity >= 1.0) {
            clearInterval(this.timerId);
        }
        this.titleOpacity += 0.1;
        this.title.setOpacity(this.titleOpacity);
    },

    hide: function() {
        clearInterval(this.timerId);
        this.title.remove();
        this.timerId = setInterval(this.fade.bind(this), 32);
    },

    fade: function() {
        if (this.backgroundOpacity <= 0.0) {
            clearInterval(this.timerId);
            this.elm.remove();
        }
        this.backgroundOpacity -= 0.1;
        this.elm.setOpacity(this.backgroundOpacity);
    }
});

/************************************/
var Ship = Class.create(Sprite, {
    
    hitPoint: null,
    soundHit: null,
    soundLose: null,
    isEnemy: null,
    way: null,
    nextCmd: null,

    initialize: function($super, isEnemy) {
        this.isEnemy = isEnemy;
        this.hitPoint = 100;
        $super();
        this.setHitPoint(this.hitPoint);
    },

    createElement: function() {
        var color = this.getColor();
        return this.isEnemy ?
            this.createEnemy(color) :
            this.createShip(color);
    },

    createEnemy: function(color) {
        var elm = new Element('div').setStyle({
            width: '90px',
            height: '60px',
            zIndex: this.Z_INDEX_BASE + 10,
            position: 'fixed',
            top: '0px',
            left: '0px'
        });
        elm.insert(new Element('div').setStyle({
            width: '90px',
            height: '30px',
            backgroundColor: color,
            borderRadius: '6px',
            boxShadow: '0px 0px 30px ' + color,
            textAlign: 'center',
            fontWeight: 800,
            fontSize: '20px'
        }).update(this.hitPoint));
        elm.insert(new Element('div').setStyle({
            width: '30px',
            height: '30px',
            backgroundColor: color,
            borderRadius: '6px',
            boxShadow: '0px 0px 30px ' + color,
            marginLeft: '30px'
        }));
        return elm;                
    },

    createShip: function(color) {
        var elm = new Element('div').setStyle({
            width: '90px',
            height: '60px',
            zIndex: this.Z_INDEX_BASE + 10,
            position: 'fixed',
            top: this.clientHeight - 60 + 'px',
            left: this.clientWidth - 90 + 'px'
        });
        elm.insert(new Element('div').setStyle({
            width: '30px',
            height: '30px',
            backgroundColor: color,
            borderRadius: '6px',
            boxShadow: '0px 0px 10px ' + color,
            marginLeft: '30px'
        }));
        elm.insert(new Element('div').setStyle({
            width: '90px',
            height: '30px',
            backgroundColor: color,
            borderRadius: '6px',
            boxShadow: '0px 0px 10px ' + color,
            textAlign: 'center',
            fontWeight: 800,
            fontSize: '20px'
        }).update(this.hitPoint));
        return elm;
    },

    getInitTop: function() {
        return this.isEnemy ? 0 : this.clientHeight - 60;
    },

    getInitLeft: function() {
        return this.isEnemy ? 0 : this.clientWidth - 90;
    },

    setSoundHit: function(audio) {
        this.soundHit = audio;
    },

    setSoundLose: function(audio) {
        this.soundLose = audio;
    },

    playSoundHit: function() {
        if (this.soundHit) this.soundHit.replay();
    },

    playSoundLose: function() {
        if (this.soundLose) this.soundLose.replay();
    },

    hit: function() {
        if (this.hitPoint < 1) {
            return;
        }
        this.setHitPoint(--this.hitPoint);
        if (this.hitPoint === 0) {
            this.playSoundLose();
        } else {
            this.playSoundHit();
        }
    },

    isHit: function(bullet, range) {

        var enemyLeft = this.getLeft();
        var enemyIField = this.getIField ? this.getIField() : null;
        var top = bullet.getTop();
        var left = bullet.getLeft();

        if (enemyIField && enemyIField.isHit(bullet, range, enemyLeft)) {
            return true;
        }

        if ((enemyLeft - 25 < left)
                && (left <= enemyLeft + 5)
                && (bullet.isFall ? top + range > this.clientHeight - 60 : top + range < 30)) {

            this.hit();
            return true;
        }

        if ((enemyLeft + 5 < left)
                && (left < enemyLeft + 60)
                && (bullet.isFall ? top + range > this.clientHeight - 90 : top + range < 60)) {

            this.hit();
            return true;
        }

        if ((enemyLeft + 60 <= left)
                && (left < enemyLeft + 90)
                && (bullet.isFall ? top + range > this.clientHeight - 60 : top + range < 30)) {

            this.hit();
            return true;
        }

        if ((top + range < 0) || (this.clientHeight < (top + range))) {
            return true;
        }

        return false;
    },

    setHitPoint: function(num) {
        this.hitPoint = num;
        this.elm.down(this.isEnemy ? 0 : 1).update(num);
    },

    getHitPoint: function() {
        return this.hitPoint;
    },

    stepRight: function() {
        this.way = this.isEnemy ? 'left' : 'right';
    },

    stepLeft: function() {
        this.way = this.isEnemy ? 'right' : 'left';
    },
    
    moveRight: function() {
        var max = this.clientWidth - 90;
        if (this.currentLeft + 10 <= max) {
            this.setLeft(this.currentLeft + 10);
        }
    },

    moveLeft: function() {
        var min = 0;
        if (min <= this.currentLeft - 10) {
            this.setLeft(this.currentLeft - 10);
        }
    },

    move: function() {
        if (this.nextCmd !== null
                && this.nextCmd !== 'stepRight'
                && this.nextCmd !== 'stepLeft') {

            this.way = null;
        }
        if (this.way === 'right') this.moveRight();
        if (this.way === 'left') this.moveLeft();
    }
});

/************************************/
var ShipAfterimage = Class.create(Ship, {

    getColor: function() {
        return '#FF5555';
    },

    spot: function(top, left, hitPoint) {
        this.elm.setOpacity(0.2);
        this.setPos({top: top, left: left});
        this.setHitPoint(hitPoint);
        this.renderElement();
        (function() { this.elm.remove(); }).bind(this).delay(0.3);
    }
});

/************************************/
var ShipCreater = Class.create({

    sounds: null,
    isEnemy: null,
    ship: null,
    weapon: null,

    initialize: function(sounds, isEnemy) {
        this.sounds = sounds;
        this.isEnemy = isEnemy;
    },

    createShip: Prototype.emptyFunction,
    createWeapon: Prototype.emptyFunction,
    createAction: Prototype.emptyFunction,
    createCommand: Prototype.emptyFunction
});

/************************************/
var ShipCreaterNavy = Class.create(ShipCreater, {

    createShip: function() {
        this.ship = new ShipNavy(this.isEnemy);
        if (!this.isEnemy) {
            this.ship.setSoundHit(this.sounds.hit);
            this.ship.setSoundLose(this.sounds.lose);
        }
        return this.ship;
    },

    createWeapon: function(enemy) {
        this.weapon = new Weapon(this.ship, enemy);
        if (this.isEnemy) return this.weapon;
        this.weapon.setSoundAttack(this.sounds.attack);
        return this.weapon;
    },

    createAction: function() {
        return new ActionShipNavy();
    },

    createCommand: function() {
        return new CommandShipNavy(this.ship, this.weapon);
    }
});

/************************************/
var ShipCreaterRed = Class.create(ShipCreater, {

    createShip: function() {
        this.ship = new ShipRed(this.isEnemy);
        if (!this.isEnemy) {
            this.ship.setSoundHit(this.sounds.hit);
            this.ship.setSoundLose(this.sounds.lose);
            this.ship.setSoundNewtype(this.sounds.newtype);
        }
        return this.ship;
    },

    createWeapon: function(enemy) {
        this.weapon = new Weapon(this.ship, enemy);
        this.isEnemy ?
            this.weapon.addIField() :
            this.weapon.addIField(this.sounds.iField);
        this.weapon.addFunnelDefences();
        if (this.isEnemy) return this.weapon;
        this.weapon.setSoundAttack(this.sounds.attack);
        this.weapon.setSoundFunnelGo(this.sounds.funnelGo);
        this.weapon.setSoundFunnelAttack(this.sounds.funnelAtk);
        return this.weapon;
    },

    createAction: function() {
        return new ActionShipRed();
    },

    createCommand: function() {
        return new CommandShipRed(this.ship, this.weapon);
    }
});

/************************************/
var ShipCreaterWhite = Class.create(ShipCreater, {

    createShip: function() {
        this.ship = new ShipWhite(this.isEnemy);
        if (!this.isEnemy) {
            this.ship.setSoundHit(this.sounds.hit);
            this.ship.setSoundLose(this.sounds.lose);
        }
        return this.ship;
    },

    createWeapon: function(enemy) {
        this.weapon = new Weapon(this.ship, enemy);
        if (this.isEnemy) return this.weapon;
        this.weapon.setSoundAttack(this.sounds.attack);
        this.weapon.setSoundMegaCannon(this.sounds.megaCannon);
        this.weapon.setSoundFunnelGo(this.sounds.funnelGo);
        this.weapon.setSoundFunnelAttack(this.sounds.funnelAtk);
        return this.weapon;
    },

    createAction: function() {
        return new ActionShipWhite();
    },

    createCommand: function() {
        return new CommandShipWhite(this.ship, this.weapon);
    }
});

/************************************/
var ShipFactory = {};

ShipFactory.getCreater = function(color, isEnemy, sounds) {
    return new window['ShipCreater' + color.capitalize()](sounds, isEnemy);
};

/************************************/
var ShipNavy = Class.create(Ship, {

    shadowSize : 20,
    colors: ['FF0000', 'FF6600','FFFF00','00FF00', '00FFFF','0000FF','990099'],

    getColor: function() {
        return '#0F0F3F';
    },

    createElement: function($super) {
        return $super().setStyle({color: '#FFFFFF'});
    },

    move: function($super) {
        $super();
        ++this.shadowSize;
        var color = '#' + this.colors[0];
        this.elm.down().setStyle({
            boxShadow: '0px 0px ' + this.shadowSize + 'px ' + color
        });
        this.elm.down(1).setStyle({
            boxShadow: '0px 0px ' + this.shadowSize + 'px ' + color
        });
        if (50 < this.shadowSize) {
            this.shadowSize = 20;
            this.colors.push(this.colors.shift());
        }
    }
});

/************************************/
var ShipRed = Class.create(Ship, {
    
    soundNewtype: null,
    iField: null,
    funnels: [],

    getColor: function() {
        return '#FF5555';
    },

    setSoundNewtype: function(audio) {
        this.soundNewtype = audio;
    },

    playSoundNewtype: function() {
        if (this.soundNewtype) this.soundNewtype.replay();
    },

    setIField: function(iField) {
        this.iField = iField;
    },

    getIField: function() {
        return this.iField;
    },

    getIFieldInfo: function() {
        return {isActive: this.iField.isActive, height: this.iField.getHeight()};
    },

    getFunnelInfo: function() {
        return {
            firstLeft: this.funnels[0] ? this.funnels[0].initLeft : null,
            firstTheta: this.funnels[0] ? this.funnels[0].theta : null,
            secondLeft: this.funnels[1] ? this.funnels[1].initLeft : null,
            secondTheta: this.funnels[1] ? this.funnels[1].theta : null
        };
    },

    addFunnel: function(funnel) {
        this.funnels.push(funnel);
    },

    barrier: function() {
        this.iField.barrier();
    },

    avoid: function() {
        var sign = this.getLeft() < this.clientWidth / 2 ? 1 : -1;
        var top = this.getTop();
        var left = this.getLeft();
        this.setLeft(left + 90 * sign);
        [left, left + (10 * 3 * sign), left + (10 * 6 * sign)].each((function(left) {
            var shadow = new ShipAfterimage(this.isEnemy);
            shadow.spot(top, left, this.hitPoint);
        }).bind(this));
        this.playSoundNewtype();
    }
});

/************************************/
var ShipWhite = Class.create(Ship, {

    getColor: function() {
        return '#FFFFFF';
    }
});

/************************************/
var Sound = Class.create({

    hasAudioElement: null,

    initialize: function() {
        this.hasAudioElement = this.checkAudio();
        this.addAudioMethods();
    },

    checkAudio: function() {
        return typeof Audio == 'function'
            && Audio.name == 'HTMLAudioElement'
            && typeof Audio.prototype.canPlayType == 'function'
            && new Audio().canPlayType('audio/mpeg') == 'maybe';
    },

    addAudioMethods: function() {
        if (!this.hasAudioElement) {
            return;
        }
        Element.addMethods('audio', {
            stop: function (audio) {
                audio.pause();
                try {
                    audio.currentTime = 0;
                } catch(e) {
                    if (console) console.log(e);
                }
            },
            replay: function (audio) {
                audio.pause();
                try {
                    audio.currentTime = 0;
                } catch(e) {
                    if (console) console.log(e);
                }
                audio.play();
            }
        });
    },

    createAudio: function(src) {
        if (this.hasAudioElement) {
            var audio = new Element('audio', {src: src});
            if (Prototype.Browser.MobileSafari) {
                audio.load();
            }
            return audio;
        }
        return null;
    }
});

/************************************/
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
        var methodName = 'critical' + data.color.capitalize();
        this[(methodName in this) ? methodName : 'criticalDefault'](data);
    },

    criticalDefault: function(data) {
        if (!this.ships[data.color]) return;
        this.ships[data.color].setHitPoint(data.hp);
        var left = data.isEnemy === this.ships[data.color].isEnemy ?
            data.left :
            this.ships[data.color].clientWidth - data.left + (data.isEnemy ? 90 : -90);
        if (60 < (this.ships[data.color].getLeft() - left).abs()) {
            this.ships[data.color].setLeft(left);
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

/************************************/
var TimeKeeper = Class.create(Sprite, {
    
    timerId: null,
    time: null,

    initialize: function($super) {
        this.time = 0;
        $super();
    },

    createElement: function() {
        return new Element('div').setStyle({
            zIndex: this.Z_INDEX_BASE + 20,
            position: 'fixed',
            height: '30px',
            width: '100px',
            fontSize: '20px',
            fontWeight: 800,
            color: '#FFFFFF',
            textAlign: 'right'
        }).update(this.time);
    },

    getInitTop: function() {
        return 2;
    },

    getInitLeft: function() {
        return this.clientWidth - 110;
    },

    increment: function() {
        this.elm.update(++this.time);
    },

    start: function() {
        if (this.timerId !== null) return;
        this.timerId = setInterval(this.increment.bind(this), 1000);
    },

    stop: function() {
        clearInterval(this.timerId);
        this.timerId = null;
    }
});

/************************************/
var Title = Class.create(Sprite, {

    TITLE_TEXT: 'Duel Shooting',

    createElement: function() {
        return new Element('div').setStyle({
            display: 'none',
            position: 'fixed',
            zIndex: this.Z_INDEX_BASE + 101,
            fontSize: '36px',
            color: '#FFFFFF',
            top: '0px',
            left: '0px'
        }).update(this.TITLE_TEXT).setOpacity(0.0);
    },

    setupPosition: function() {
        this.renderElement();
        var dim = this.elm.getDimensions();
        this.elm.setStyle({
            display: 'block',
            top: this.clientHeight / 2 - (dim.height / 2 - 0) + 'px',
            left: this.clientWidth / 2 - (dim.width / 2 - 0) + 'px'
        });
        this.remove();
    }
});

/************************************/
var Weapon = Class.create({

    FUNNEL_SLIDER_MAX: 5,
    FUNNEL_CIRCLE_MAX: 2,
    MEGA_CANNON_WAIT: 250,
    MEGA_CANNON_HEIGHT: 29,

    ship: null,
    enemy: null,

    funnelSliderCount: null,
    funnelCircles: null,
    megaCannonWaitCount: null,
    megaCannonHeightCount: null,

    soundFunnelGo: null,
    soundFunnelAttack: null,
    soundAttack: null,
    soundMegaCannon: null,

    elms: null,

    initialize: function(ship, enemy) {
        this.ship = ship;
        this.enemy = enemy;

        this.funnelSliderCount = 0;
        this.funnelCircles = [];
        this.megaCannonWaitCount = 0;
        this.megaCannonHeightCount = 0;

        this.elms = [];
    },

    move: function() {
        if (0 < this.megaCannonWaitCount) {
            --this.megaCannonWaitCount;
        }
        if (0 < this.megaCannonHeightCount) {
            if (this.megaCannonHeightCount % 3 === 0) this.addBulletLinearFromMegaCannon();
            --this.megaCannonHeightCount;
        }
        this.funnelCircles.each(function(x) { x.move(); });
        for (var i = 0, len = this.elms.size(); i < len; i++) {
            this.elms[i].move();
            if (this.elms[i].isFunnelSliderAttack) {
                this.addBulletLinearFromFunnel(this.elms[i].getLeft());
                this.elms[i].isFunnelSliderAttack = false;
            }
            if (this.elms[i].isDelete) {
                if (this.elms[i].isFunnelSlider) {
                    --this.funnelSliderCount;
                }
                this.elms[i] = null;
            }
        }
        this.elms = this.elms.compact();
    },

    setSoundFunnelGo: function(audio) {
        this.soundFunnelGo = audio;
    },

    setSoundFunnelAttack: function(audio) {
        this.soundFunnelAttack = audio;
    },

    setSoundAttack: function(audio) {
        this.soundAttack = audio;
    },

    setSoundMegaCannon: function(audio) {
        this.soundMegaCannon = audio;
    },

    playSoundFunnelGo: function(audio) {
        if (this.soundFunnelGo) this.soundFunnelGo.replay();
    },

    playSoundFunnelAttack: function() {
        if (this.soundFunnelAttack) this.soundFunnelAttack.replay();
    },

    playSoundAttack: function() {
        if (this.soundAttack) this.soundAttack.replay(); 
    },

    playSoundMegaCannon: function() {
        if (this.soundMegaCannon) this.soundMegaCannon.replay();
    },

    addBulletLinear: function() {
        var elm = new BulletLinear(this.ship, this.enemy);
        this.elms.push(elm);
        elm.renderElement();
        this.playSoundAttack();
    },

    addBulletHoming: function() {
        var elm = new BulletHoming(this.ship, this.enemy);
        this.elms.push(elm);
        elm.renderElement();       
        this.playSoundAttack();
    },

    addBulletBezierAuto: function() {
        var enemyLeft = this.enemy.getLeft();
        var elmL = new BulletBezier(this.ship, this.enemy, enemyLeft - 60);
        var elmC = new BulletBezier(this.ship, this.enemy, enemyLeft + 30);
        var elmR = new BulletBezier(this.ship, this.enemy, enemyLeft + 120);
        this.elms.push(elmL);
        this.elms.push(elmC);
        this.elms.push(elmR);
        elmL.renderElement();
        elmC.renderElement();
        elmR.renderElement();
        this.playSoundAttack();
    },

    addBulletBezierManual: function(left) {
        var elm = new BulletBezier(this.ship, this.enemy, left);
        this.elms.push(elm);
        elm.renderElement();
        this.playSoundAttack();
    },

    addBulletLinearFromFunnel: function(left) {
        var elm = new BulletLinear(this.ship, this.enemy);
        elm.setPos({top: (this.ship.isEnemy ? 90 : elm.clientHeight - 120), left: left});
        this.elms.push(elm);
        elm.renderElement();
        this.playSoundFunnelAttack();
    },

    addBulletLinearFromMegaCannon: function() {
        var elmL = new BulletLinear(this.ship, this.enemy);
        var elmM = new BulletLinear(this.ship, this.enemy);
        var elmR = new BulletLinear(this.ship, this.enemy);
        elmL.setPos({
            top: this.ship.isEnemy ? 60 : this.ship.clientHeight - 90,
            left: this.ship.getLeft()
        });
        elmM.setPos({
            top: this.ship.isEnemy ? 60 : this.ship.clientHeight - 90,
            left: this.ship.getLeft() + 30
        });
        elmR.setPos({
            top: this.ship.isEnemy ? 60 : this.ship.clientHeight - 90,
            left: this.ship.getLeft() + 60
        });
        this.elms.push(elmL);
        this.elms.push(elmM);
        this.elms.push(elmR);
        elmL.renderElement();
        elmM.renderElement();
        elmR.renderElement();
    },

    addBulletHomingFromFunnel: function(top, left) {
        var elm = new BulletHoming(this.ship, this.enemy);
        elm.setPos({top: top, left: left});
        this.elms.push(elm);
        elm.renderElement();
    },

    addFunnelSlider: function() {
        if (this.FUNNEL_SLIDER_MAX <= this.funnelSliderCount) {
            return;
        }
        var elm = new FunnelSlider(this.ship, this.enemy);
        this.elms.push(elm);
        ++this.funnelSliderCount;
        elm.renderElement();
        this.playSoundFunnelGo();
    },

    addFunnelCircle: function() {
        if (this.FUNNEL_CIRCLE_MAX <= this.funnelCircles.size()) {
            this.funnelCircles.each((function(x) {
                this.addBulletHomingFromFunnel(
                    x.getTop() + (x.isEnemy ? 30 : -30),
                    x.getLeft()
                );                       
            }).bind(this));
            this.playSoundFunnelAttack();
            return;
        }
        var funnel = new FunnelCircle(this.ship);
        this.funnelCircles.push(funnel);
        funnel.renderElement();
        this.playSoundFunnelGo();
    },

    addIField: function(audio) {
        var iField = new IField(this.ship);
        iField.setSound(audio);
        this.elms.push(iField);
        iField.renderElement();
    },

    addFunnelDefences: function() {
        var l = new FunnelDefenceLeft(this.ship, this.ship.getIField());
        var r = new FunnelDefenceRight(this.ship, this.ship.getIField());
        this.elms.push(l);
        this.elms.push(r);
        l.renderElement();
        r.renderElement();
    },

    removeFunnelCircle: function(num) {
        var elm;
        elm = this.funnelCircles.shift();
        if (elm) elm.remove();
        this.ship.funnels.shift();
        if (1 < num) {
            elm = this.funnelCircles.shift();
            if (elm) elm.remove();
            this.ship.funnels.shift();
        }
    },

    fireMegaCannon: function() {
        if (0 < this.megaCannonWaitCount) {
            return;
        }
        this.megaCannonWaitCount = this.MEGA_CANNON_WAIT;
        this.megaCannonHeightCount = this.MEGA_CANNON_HEIGHT;
        this.playSoundMegaCannon();
    }
});

/************************************/
