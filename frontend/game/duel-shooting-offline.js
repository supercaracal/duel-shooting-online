(function f(global) {
  'use strict';

  var g = global;

  g.DuelShootingOffline = global.Class.create(global.DuelShooting, {
    initialize: function initialize($super, audioPath) {
      $super(audioPath);
      this.setupMainObjects();
      this.game = new global.Game(this.routine.bind(this));
      this.renderInitialElements();
      this.start.bind(this).delay(3);
    },

    setupMainObjects: function setupMainObjects() {
      var colors = this.getShipColors();
      var shipBuilder = this.getShipBuilder(colors.ship, this.sounds);
      var enemyBuilder = this.getEnemyBuilder(colors.enemy, this.sounds);
      this.ships.ship = shipBuilder.buildShip();
      this.ships.enemy = enemyBuilder.buildShip();
      this.weapons.ship = shipBuilder.buildWeapon(this.ships.ship, this.ships.enemy);
      this.weapons.enemy = enemyBuilder.buildWeapon(this.ships.enemy, this.ships.ship);
      this.cmds.ship = shipBuilder.buildCommand(this.ships.ship, this.weapons.ship);
      this.cmds.enemy = enemyBuilder.buildCommand(this.ships.enemy, this.weapons.enemy);
      this.actions.ship = shipBuilder.buildAction();
      this.actions.enemy = enemyBuilder.buildAI(
        this.ships.enemy,
        this.ships.ship,
        this.weapons.ship
      );
    },

    renderInitialElements: function renderInitialElements() {
      this.background.renderElement();
      this.condition.renderElement();
      this.timeKeeper.renderElement();
      this.ships.ship.renderElement();
      this.ships.enemy.renderElement();
    },

    beforeStart: function beforeStart() {
      this.opening.hide();
    },

    afterRoutine: function afterRoutine() {
      var shipCmd = this.actions.ship.getCommand();
      var enemyCmd = this.actions.enemy.getCommand();
      this.ships.ship.nextCmd = shipCmd;
      this.ships.enemy.nextCmd = enemyCmd;
      this.cmds.ship.execute(shipCmd);
      this.cmds.enemy.execute(enemyCmd);
      this.actions.ship.resetCommand();
      this.actions.enemy.resetCommand();
    }
  });
}(window));
