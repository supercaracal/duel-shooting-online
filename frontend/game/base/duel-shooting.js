(function f(global) {
  'use strict';

  var g = global;

  g.DuelShooting = global.Class.create({
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

    initialize: function initialize(audioPath) {
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

    addMonkeyPatch: function addMonkeyPatch() {
      /* eslint-disable no-extend-native */
      Number.prototype.isTiming =
        (function isTiming(num) {
          return Math.floor(Math.random() * 100) % num === 0;
        }).methodize();
      /* eslint-enable no-extend-native */
    },

    buildBackground: function buildBackground() {
      return new global.Background();
    },

    buildCondition: function buildCondition() {
      return new global.Condition();
    },

    buildForkMeOnGitHub: function buildForkMeOnGitHub() {
      return new global.ForkMeOnGitHub();
    },

    buildOpening: function buildOpening() {
      return new global.Opening(new global.Title());
    },

    buildSounds: function buildSounds(audioPath) {
      var sound = new global.Sound();
      return {
        hit: sound.createAudio(audioPath + '/hit.mp3'),
        lose: sound.createAudio(audioPath + '/lose.mp3'),
        newtype: sound.createAudio(audioPath + '/newtype.mp3'),
        attack: sound.createAudio(audioPath + '/attack.mp3'),
        megaCannon: sound.createAudio(audioPath + '/mega.mp3'),
        funnelGo: sound.createAudio(audioPath + '/funnel1.mp3'),
        funnelAtk: sound.createAudio(audioPath + '/funnel2.mp3'),
        iField: sound.createAudio(audioPath + '/at_field.mp3')
      };
    },

    buildTimeKeeper: function buildTimeKeeper() {
      return new global.TimeKeeper();
    },

    getShipColors: function getShipColors() {
      var s = this.getRandomColor();
      var e = this.getRandomColor();
      for (; s === e; e = this.getRandomColor()) {
        //
      }
      return { ship: s, enemy: e };
    },

    getRandomColor: function getRandomColor() {
      return ['white', 'red', 'navy'][Math.floor(Math.random() * 100) % 3];
    },

    getShipBuilder: function getShipBuilder(color, sounds) {
      return global.ShipFactory.getBuilderAsShip(color, sounds);
    },

    getEnemyBuilder: function getEnemyBuilder(color, sounds) {
      return global.ShipFactory.getBuilderAsEnemy(color, sounds);
    },

    beforeRoutine: global.Prototype.emptyFunction,

    routine: function routine() {
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

    onEnemyDown: function onEnemyDown() {
      this.stop(true);
    },

    onShipDown: function onShipDown() {
      this.stop(false);
    },

    afterRoutine: global.Prototype.emptyFunction,

    beforeStart: global.Prototype.emptyFunction,

    start: function start() {
      this.beforeStart();
      this.game.start();
      this.timeKeeper.start();
      this.afterStart();
    },

    afterStart: global.Prototype.emptyFunction,

    beforeStop: global.Prototype.emptyFunction,

    stop: function stop(isWin) {
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

    afterStop: global.Prototype.emptyFunction
  });
}(window));
