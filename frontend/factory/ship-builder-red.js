var ShipBuilderRed = Class.create(ShipBuilder, {

  buildShip: function() {
    var ship = new ShipRed(this.isEnemy);
    if (!this.isEnemy) {
      ship.setSoundHit(this.sounds.hit);
      ship.setSoundLose(this.sounds.lose);
      ship.setSoundNewtype(this.sounds.newtype);
    }
    return ship;
  },

  buildWeapon: function(ship, enemy) {
    var weapon = new Weapon(ship, enemy);
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

  buildAction: function() {
    return new ActionShipRed();
  },

  buildAI: function(ship, enemy, enemyWeapon) {
    return new AIShipRed(ship, enemy, enemyWeapon);
  },

  buildCommand: function(ship, weapon) {
    return new CommandShipRed(ship, weapon);
  }
});
