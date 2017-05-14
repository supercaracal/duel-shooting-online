var DuelShooting = Class.create({
  opening: null,

  background: null,
  condition: null,
  forkMe: null,
  sounds: null,
  timeKeeper: null,

  game: null,

  ships: null,
  actions: null,
  cmds: null,
  weapons: null,

  initialize: function(audioPath) {
    this.opening = this.buildOpening();
    this.opening.show();

    this.addMonkeyPatch();

    this.background = this.buildBackground();
    this.condition = this.buildCondition();
    this.forkMe = this.buildForkMeOnGitHub();
    this.sounds = this.buildSounds(audioPath);
    this.timeKeeper = this.buildTimeKeeper();

    this.ships = {};
    this.weapons = {};
    this.actions = {};
    this.ais = {};
    this.cmds = {};
  },

  addMonkeyPatch: function() {
    Number.prototype.isTiming =
      (function(num) { return Math.floor(Math.random() * 100) % num === 0; }).methodize();
  },

  buildBackground: function() {
    return new Background();
  },

  buildCondition: function() {
    return new Condition();
  },

  buildForkMeOnGitHub: function() {
    return new ForkMeOnGitHub();
  },

  buildOpening: function() {
    return new Opening(new Title());
  },

  buildSounds: function(audioPath) {
    var sound = new Sound();
    return {
      hit: sound.createAudio(audioPath + '/hit.mp3'),
      lose: sound.createAudio(audioPath + '/lose.mp3'),
      newtype: sound.createAudio(audioPath + '/newtype.mp3'),
      attack: sound.createAudio(audioPath + '/attack.mp3'),
      megaCannon: sound.createAudio(audioPath + '/mega.mp3'),
      funnelGo: sound.createAudio(audioPath + '/funnel1.mp3'),
      funnelAtk: sound.createAudio(audioPath + '/funnel2.mp3'),
      iField: sound.createAudio(audioPath + '/at_field.mp3'),
    };
  },

  buildTimeKeeper: function() {
    return new TimeKeeper();
  },

  getShipColors: function() {
    var s = this.getRandomColor();
    var e = this.getRandomColor();
    for (; s === e; e = this.getRandomColor()) {}
    return { ship: s, enemy: e };
  },

  getRandomColor: function() {
    return ['white', 'red', 'navy'][Math.floor(Math.random() * 100) % 3];
  },

  getShipBuilder: function(color, sounds) {
    return ShipFactory.getBuilderAsShip(color, sounds);
  },

  getEnemyBuilder: function(color, sounds) {
    return ShipFactory.getBuilderAsEnemy(color, sounds);
  },

  beforeRoutine: Prototype.emptyFunction,

  routine: function() {
    this.beforeRoutine();
    this.ships.ship.move();
    this.ships.enemy.move();
    this.weapons.ship.move();
    this.weapons.enemy.move();
    if (this.ships.enemy.getHitPoint() === 0) {
      this.onEnemyDown();
    }
    if (this.ships.ship.getHitPoint() === 0) {
      this.onShipDown();
    }
    this.afterRoutine();
  },

  onEnemyDown: function() {
    this.stop(true);
  },

  onShipDown: function() {
    this.stop(false);
  },

  afterRoutine: Prototype.emptyFunction,

  beforeStart: Prototype.emptyFunction,

  start: function() {
    this.beforeStart();
    this.game.start();
    this.timeKeeper.start();
    this.afterStart();
  },

  afterStart: Prototype.emptyFunction,

  beforeStop: Prototype.emptyFunction,

  stop: function(isWin) {
    this.beforeStop();
    if (isWin) {
      this.forkMe.renderElement();
      this.condition.update('You win.', '#9999FF');
    } else {
      this.condition.update('You lose.', '#FF9999');
    }
    if (this.actions.ship) {
      this.actions.ship.stop();
    }
    if (this.actions.enemy) {
      this.actions.enemy.stop();
    }
    this.timeKeeper.stop();
    this.game.stop();
    this.afterStop();
  },

  afterStop: Prototype.emptyFunction
});
