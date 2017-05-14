var ShipBuilderNavy = Class.create(ShipBuilder, {

  buildShip: function() {
    var ship = new ShipNavy(this.isEnemy);
    if (!this.isEnemy) {
      ship.setSoundHit(this.sounds.hit);
      ship.setSoundLose(this.sounds.lose);
    }
    return ship;
  },

  buildWeapon: function(ship, enemy) {
    var weapon = new Weapon(ship, enemy);
    if (this.isEnemy) return weapon;
    weapon.setSoundAttack(this.sounds.attack);
    return weapon;
  },

  buildAction: function() {
    return new ActionShipNavy();
  },

  buildAI: function(ship, enemy, enemyWeapon) {
    return new AIShipNavy(ship, enemy, enemyWeapon);
  },

  buildCommand: function(ship, weapon) {
    return new CommandShipNavy(ship, weapon);
  }
});
