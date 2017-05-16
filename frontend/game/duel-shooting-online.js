(function f(global) {
  'use strict';

  var g = global;

  g.DuelShootingOnline = global.Class.create(global.DuelShooting, {
    sync: null,

    initialize: function initialize($super, audioPath) {
      $super(audioPath);
      this.condition.renderElement();
      this.condition.update('Please wait for player matching.', '#99FF99');
      this.sync = new global.Synchronizer('/', this.start.bind(this), this.stop.bind(this));
    },

    setupMainObjects: function setupMainObjects(data) {
      var shipBuilder = this.getShipBuilder(data.ship, this.sounds);
      var enemyBuilder = this.getEnemyBuilder(data.enemy, this.sounds);
      this.ships.ship = shipBuilder.buildShip();
      this.ships.enemy = enemyBuilder.buildShip();
      this.weapons.ship = shipBuilder.buildWeapon(this.ships.ship, this.ships.enemy);
      this.weapons.enemy = enemyBuilder.buildWeapon(this.ships.enemy, this.ships.ship);
      this.cmds.ship = shipBuilder.buildCommand(this.ships.ship, this.weapons.ship);
      this.cmds.enemy = enemyBuilder.buildCommand(this.ships.enemy, this.weapons.enemy);
      this.actions.ship = shipBuilder.buildAction();
    },

    renderInitialElements: function renderInitialElements() {
      this.background.renderElement();
      this.timeKeeper.renderElement();
      this.ships.ship.renderElement();
      this.ships.enemy.renderElement();
    },

    beforeRoutine: function beforeRoutine() {
      this.sync.chat.move();
    },

    onEnemyDown: global.Prototype.emptyFunction,

    afterRoutine: function afterRoutine() {
      var shipCmd = this.actions.ship.getCommand();
      this.actions.ship.resetCommand();
      this.sync.pushAttackInfo(shipCmd);
    },

    beforeStart: function beforeStart(data) {
      var type;
      this.setupMainObjects(data);
      this.sync.setShipAndCommand(data.ship, this.ships.ship, this.cmds.ship);
      this.sync.setShipAndCommand(data.enemy, this.ships.enemy, this.cmds.enemy);
      this.sync.listenShipCommand();
      if (data.ship === 'red' || data.enemy === 'red') {
        type = data.ship === 'red' ? 'ship' : 'enemy';
        this.sync.setShipRedWeapon(this.weapons[type]);
      }
      this.game = new global.Game(this.routine.bind(this));
      this.renderInitialElements();
    },

    start: function start(data) {
      this.beforeStart(data);
      this.game.start();
      this.timeKeeper.start();
      this.afterStart();
    },

    afterStart: function afterStart() {
      this.condition.updateAndDelayHide('Engaged!', '#FF9999');
      this.opening.hide();
    },

    afterStop: function afterStop() {
      this.sync.stop();
    }
  });
}(window));
