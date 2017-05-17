(function f(global) {
  'use strict';

  var g = global;

  g.ShipBuilderNavy = global.Class.create(global.ShipBuilder, {
    buildShip: function buildShip() {
      var ship = new global.ShipNavy(this.isEnemy);
      if (!this.isEnemy) {
        ship.setSoundHit(this.sounds.hit);
        ship.setSoundLose(this.sounds.lose);
      }
      return ship;
    },

    buildWeapon: function buildWeapon(ship, enemy) {
      var weapon = new global.Weapon(ship, enemy);
      if (this.isEnemy) return weapon;
      weapon.setSoundAttack(this.sounds.attack);
      return weapon;
    },

    buildAction: function buildAction() {
      return new global.ActionShipNavy();
    },

    buildAI: function buildAI(ship, enemy, enemyWeapon) {
      return new global.AIShipNavy(ship, enemy, enemyWeapon);
    },

    buildCommand: function buildCommand(ship, weapon) {
      return new global.CommandShipNavy(ship, weapon);
    }
  });
}(window));
