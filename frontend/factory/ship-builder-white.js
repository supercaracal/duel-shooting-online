var ShipBuilderWhite = Class.create(ShipBuilder, {

  buildShip: function() {
    var ship = new ShipWhite(this.isEnemy);
    if (!this.isEnemy) {
      ship.setSoundHit(this.sounds.hit);
      ship.setSoundLose(this.sounds.lose);
    }
    return ship;
  },

  buildWeapon: function(ship, enemy) {
    var weapon = new Weapon(ship, enemy);
    weapon.addWeaponWaitStatusMegaCannon();
    if (this.isEnemy) return weapon;
    weapon.setSoundAttack(this.sounds.attack);
    weapon.setSoundMegaCannon(this.sounds.megaCannon);
    weapon.setSoundFunnelGo(this.sounds.funnelGo);
    weapon.setSoundFunnelAttack(this.sounds.funnelAtk);
    return weapon;
  },

  buildAction: function() {
    return new ActionShipWhite();
  },

  buildAI: function(ship, enemy, enemyWeapon) {
    return new AIShipWhite(ship, enemy, enemyWeapon);
  },

  buildCommand: function(ship, weapon) {
    return new CommandShipWhite(ship, weapon);
  }
});
