var ShipCreaterNavy = Class.create(ShipCreater, {

  createShip: function() {
    this.ship = new ShipNavy(this.isEnemy);
    if (!this.isEnemy) {
      this.ship.setSoundHit(this.sounds.hit);
      this.ship.setSoundLose(this.sounds.lose);
    }
    return this.ship;
  },

  createWeapon: function(enemy) {
    this.weapon = new Weapon(this.ship, enemy);
    if (this.isEnemy) return this.weapon;
    this.weapon.setSoundAttack(this.sounds.attack);
    return this.weapon;
  },

  createAction: function() {
    return new ActionShipNavy();
  },

  createAI: function(enemy, enemyWeapon) {
    return new AIShipNavy(this.ship, enemy, enemyWeapon);
  },

  createCommand: function() {
    return new CommandShipNavy(this.ship, this.weapon);
  }
});
