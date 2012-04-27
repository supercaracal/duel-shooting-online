var DuelShooting = Class.create({

    sync: null,
    opening: null,
    sounds: null,
    ship: null,
    enemy: null,
    weapons: null,
    action: null,
    cmd: null,
    game: null,

    initialize: function() {
        this.opening = new Opening();
        this.opening.show();
        this.sync = new Synchronizer('/', this.callback.bind(this));
    },

    callback: function(data) {
        this.setupSoundEffect();
        this.setupShip();
        this.setupWeaponsSound();
        this.setupGame();
        this.renderElements();
        this.game.start();
        this.opening.hide();
    },

    setupSoundEffect: function() {
        var sound = new SoundCreater();
        this.sounds = {};
        this.sounds.hit = sound.createAudio('/se/hit.mp3');
        this.sounds.lose = sound.createAudio('/se/lose.mp3');
        this.sounds.newtype = sound.createAudio('/se/newtype.mp3');
        this.sounds.attack = sound.createAudio('/se/attack.mp3');
        this.sounds.megaCannon = sound.createAudio('/se/mega.mp3');
        this.sounds.funnelGo = sound.createAudio('/se/funnel1.mp3');
        this.sounds.funnelAtk = sound.createAudio('/se/funnel2.mp3');
    },

    setupShip: function() {
        switch (this.sync.controlShip) {
            case 'white':
                this.setupShipAsWhite();
                break;
            case 'red':
                this.setupShipAsRed();
                break;
            default:
                this.setupShipAsReadOnly();
                break;
        }
    },

    setupShipAsWhite: function() {
        this.ship = new ShipWhite(false);
        this.enemy = new ShipRed(true);
        this.ship.setSoundHit(this.sounds.hit);
        this.ship.setSoundLose(this.sounds.lose);
        this.weapons = {};
        this.weapons.ship = new AutomaticControls(this.ship, this.enemy);
        this.weapons.enemy = new AutomaticControls(this.enemy, this.ship);
        this.weapons.enemy.addIField(true);
        this.weapons.enemy.addFunnelDefences(true);
        this.action = new ActionShipWhite();
        this.cmd = {};
        this.cmd.ship = new CommandShipWhite(this.ship, this.weapons.ship);
        this.cmd.enemy = new CommandShipRed(this.enemy, this.weapons.enemy);
        this.sync.listenShipWhiteCommand(this.cmd.ship, this.ship);
        this.sync.listenShipRedCommand(this.cmd.enemy, this.enemy);
    },

    setupShipAsRed: function() {
        this.ship = new ShipRed(false);
        this.enemy = new ShipWhite(true);
        this.ship.setSoundHit(this.sounds.hit);
        this.ship.setSoundLose(this.sounds.lose);
        this.ship.setSoundNewtype(this.sounds.newtype);
        this.weapons = {};
        this.weapons.ship = new AutomaticControls(this.ship, this.enemy);
        this.weapons.enemy = new AutomaticControls(this.enemy, this.ship);
        this.weapons.ship.addIField(false);
        this.weapons.ship.addFunnelDefences(false);
        this.action = new ActionShipRed();
        this.cmd = {};
        this.cmd.ship = new CommandShipRed(this.ship, this.weapons.ship);
        this.cmd.enemy = new CommandShipWhite(this.enemy, this.weapons.enemy);
        this.sync.listenShipRedCommand(this.cmd.ship, this.ship);
        this.sync.listenShipWhiteCommand(this.cmd.enemy, this.enemy);
    },

    setupShipAsReadOnly: function() {
        this.ship = new ShipWhite(false);
        this.enemy = new ShipRed(true);
        this.weapons = {};
        this.weapons.ship = new AutomaticControls(this.ship, this.enemy);
        this.weapons.enemy = new AutomaticControls(this.enemy, this.ship);
        this.weapons.enemy.addIField(true);
        this.weapons.enemy.addFunnelDefences(true);
        this.cmd = {};
        this.cmd.ship = new CommandShipWhite(this.ship, this.weapons.ship);
        this.cmd.enemy = new CommandShipRed(this.enemy, this.weapons.enemy);
        this.sync.listenShipWhiteCommand(this.cmd.ship, this.ship);
        this.sync.listenShipRedCommand(this.cmd.enemy, this.enemy);
    },

    setupWeaponsSound: function() {
        this.weapons.ship.setSoundAttack(this.sounds.attack);
        this.weapons.ship.setSoundMegaCannon(this.sounds.megaCannon);
        this.weapons.ship.setSoundFunnelGo(this.sounds.funnelGo);
        this.weapons.ship.setSoundFunnelAttack(this.sounds.funnelAtk);
    },

    setupGame: function() {
        this.game = new Game((function() {
            this.weapons.ship.move();
            this.weapons.enemy.move();
            if (!this.action) {
                return;
            }
            switch (this.sync.controlShip) {
                case 'white':
                    this.sync.pushShipWhiteCommand(this.action.getCommand());
                    break;
                case 'red':
                    this.sync.pushShipRedCommand(this.action.getCommand());
                    break;
            }
        }).bind(this));
    },

    renderElements: function() {
        new Background().renderElement();
        this.ship.renderElement();
        this.enemy.renderElement();
    }
});
