(function f(global) {
  'use strict';

  var g = global;

  g.ShipBuilderRed = global.Class.create(global.ShipBuilder, {
    buildShip: function buildShip() {
      var ship = new global.ShipRed(this.isEnemy);
      if (!this.isEnemy) {
        ship.setSoundHit(this.sounds.hit);
        ship.setSoundLose(this.sounds.lose);
        ship.setSoundNewtype(this.sounds.newtype);
      }
      return ship;
    },

    buildWeapon: function buildWeapon(ship, enemy) {
      var weapon = new global.Weapon(ship, enemy);
      if (this.isEnemy) {
        weapon.addIField();
      } else {
        weapon.addIField(this.sounds.iField);
      }
      weapon.addFunnelDefences();
      if (this.isEnemy) return weapon;
      weapon.setSoundAttack(this.sounds.attack);
      weapon.setSoundFunnelGo(this.sounds.funnelGo);
      weapon.setSoundFunnelAttack(this.sounds.funnelAtk);
      return weapon;
    },

    buildAction: function buildAction() {
      return new global.ActionShipRed();
    },

    buildAI: function buildAI(ship, enemy, enemyWeapon) {
      return new global.AIShipRed(ship, enemy, enemyWeapon);
    },

    buildCommand: function buildCommand(ship, weapon) {
      return new global.CommandShipRed(ship, weapon);
    }
  });
}(window));
