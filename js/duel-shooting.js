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
