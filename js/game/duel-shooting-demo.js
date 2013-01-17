var DuelShootingDemo = Class.create({
    opening: null,
    colors: null,
    sounds: null,
    factories: null,
    ships: null,
    weapons: null,
    actions: null,
    ais: null,
    cmds: null,
    background: null,
    timekeeper: null,
    condition: null,
    game: null,
    initialize: function() {
        this.opening = new Opening(new Title());
        this.opening.show();
        Number.prototype.isTiming =
            (function(num) { return Math.floor(Math.random() * 100) % num === 0; }).methodize();
        this.setupColor();
        this.setupSound();
        this.setupFactories();
        this.setupShips();
        this.setupWeapons();
        this.setupActions();
        this.setupAIs();
        this.setupCommands();
        this.background = new Background();
        this.timekeeper = new TimeKeeper();
        this.condition = new Condition();
        this.game = new Game(this.routine.bind(this));
        this.renderElements();
        (function() {
            this.opening.hide();
            this.start();
        }).bind(this).delay(3);
    },
    setupColor: function() {
        this.colors = {
            a: ['white', 'red', 'navy'][Math.floor(Math.random() * 100) % 3],
            b: ['white', 'red', 'navy'][Math.floor(Math.random() * 100) % 3]
        };
        return;
        this.colors.a = prompt('Your ship color [white|red|navy]', 'white');
        this.colors.b = prompt('Enemy ship color [white|red|navy]', 'red');
        if ((this.colors.a !== 'white' && this.colors.a !== 'red' && this.colors.a !== 'navy')
            || (this.colors.b !== 'white' && this.colors.b !== 'red' && this.colors.b !== 'navy')) {

            this.setupColor();
        }
    },
    setupSound: function() {
        var sound = new Sound();
        this.sounds = {};
    },
    setupFactories: function() {
        this.factories = {};
        this.factories.a = ShipFactory.getCreater(this.colors.a, false, this.sounds);
        this.factories.b = ShipFactory.getCreater(this.colors.b, true, this.sounds)
    },
    setupShips: function() {
        this.ships = {};
        this.ships.a = this.factories.a.createShip();
        this.ships.b = this.factories.b.createShip();
    },
    setupWeapons: function() {
        this.weapons = {};
        this.weapons.a = this.factories.a.createWeapon(this.ships.b);
        this.weapons.b = this.factories.b.createWeapon(this.ships.a);
    },
    setupActions: function() {
        this.actions = {};
        this.actions.a = null;
        this.actions.b = null;
    },
    setupAIs: function() {
        this.ais = {};
        this.ais.a = this.factories.a.createAI(this.ships.b, this.weapons.b);
        this.ais.b = this.factories.b.createAI(this.ships.a, this.weapons.a);
    },
    setupCommands: function() {
        this.cmds = {};
        this.cmds.a = this.factories.a.createCommand();
        this.cmds.b = this.factories.b.createCommand();
    },
    routine: function() {
        this.ships.a.move();
        this.ships.b.move();
        this.weapons.a.move();
        this.weapons.b.move();
        if (!this.ships.b.getHitPoint()) {
            this.condition.update('You win.', '#9999FF');
            new ForkMeOnGitHub().renderElement();
            this.stop();
        }
        if (!this.ships.a.getHitPoint()) {
            this.condition.update('You lose.', '#FF9999');
            new ForkMeOnGitHub().renderElement();
            this.stop();
        }
        var nextActions = {
            a: this.ais.a.getCommand(),
            b: this.ais.b.getCommand()
        };
        this.ships.a.nextCmd = nextActions.a;
        this.ships.b.nextCmd = nextActions.b;
        this.cmds.a.execute(nextActions.a)
        this.cmds.b.execute(nextActions.b)
    },
    renderElements: function() {
        this.background.renderElement();
        this.timekeeper.renderElement();
        this.condition.renderElement();
        this.ships.a.renderElement();
        this.ships.b.renderElement();
    },
    start: function() {
        this.game.start();
        this.timekeeper.start();
    },
    stop: function() {
        this.timekeeper.stop();
        this.game.stop();
    }
});
