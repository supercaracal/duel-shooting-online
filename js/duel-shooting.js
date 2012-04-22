var DuelShooting = Class.create({
    
    game: null,
    sound: null,

    ship: null,
    enemy: null,
    background: null,
    timeKeeper: null,
    opening: null,

    automaticControls: null,

    initialize: function() {
        this.game = new Game(this.routine, this.finalize, this.redeploy);
        this.sound = new SoundCreater();

        this.ship = new ShipWhite();
        this.ship.setSoundLose(this.sound.createAudio('/se/lose.mp3'));

        this.enemy = new ShipRed();
        this.enemy.setSoundNewtype(this.sound.createAudio('/se/newtype.mp3'));

        this.background = new Background();
        this.timeKeeper = new TimeKeeper();
        this.opening = new Opening();

        this.audomaticControls = [];
    },

    routine: function() {
    },

    finalize: function() {
    },

    redeploy: function (e) {
        (function () {
            this.background.resetPosition();
            this.enemy.resetPosition();
            this.ship.resetPosition();
        }).bind(this).defer();
    }

    // new Element('audio', {src: '/se/hit.mp3'}),
});
