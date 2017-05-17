(function f(global) {
  'use strict';

  var g = global;

  g.ShipBuilderWhite = global.Class.create(global.ShipBuilder, {
    buildShip: function buildShip() {
      var ship = new global.ShipWhite(this.isEnemy);
      if (!this.isEnemy) {
        ship.setSoundHit(this.sounds.hit);
        ship.setSoundLose(this.sounds.lose);
      }
      return ship;
    },

    buildWeapon: function buildWeapon(ship, enemy) {
      var weapon = new global.Weapon(ship, enemy);
      weapon.addWeaponWaitStatusMegaCannon();
      if (this.isEnemy) return weapon;
      weapon.setSoundAttack(this.sounds.attack);
      weapon.setSoundMegaCannon(this.sounds.megaCannon);
      weapon.setSoundFunnelGo(this.sounds.funnelGo);
      weapon.setSoundFunnelAttack(this.sounds.funnelAtk);
      return weapon;
    },

    buildAction: function buildAction() {
      return new global.ActionShipWhite();
    },

    buildAI: function buildAI(ship, enemy, enemyWeapon) {
      return new global.AIShipWhite(ship, enemy, enemyWeapon);
    },

    buildCommand: function buildCommand(ship, weapon) {
      return new global.CommandShipWhite(ship, weapon);
    }
  });
}(window));
