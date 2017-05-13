var CommandShipNavy = Class.create(Command, {

  stepRight: function() {
    this.ship.stepRight();
  },

  stepLeft: function() {
    this.ship.stepLeft();
  },

  attack: function() {
    this.weapon.addBulletBezierAuto();
  },

  attack1: function() {
    this.weapon.addBulletBezierManual(this.ship.isEnemy ? 660 : 30);
  },

  attack2: function() {
    this.weapon.addBulletBezierManual(this.ship.isEnemy ? 570 : 120);
  },

  attack3: function() {
    this.weapon.addBulletBezierManual(this.ship.isEnemy ? 480 : 210);
  },

  attack4: function() {
    this.weapon.addBulletBezierManual(this.ship.isEnemy ? 390 : 300);
  },

  attack5: function() {
    this.weapon.addBulletBezierManual(this.ship.isEnemy ? 300 : 390);
  },

  attack6: function() {
    this.weapon.addBulletBezierManual(this.ship.isEnemy ? 210 : 480);
  },

  attack7: function() {
    this.weapon.addBulletBezierManual(this.ship.isEnemy ? 120 : 570);
  },

  attack8: function() {
    this.weapon.addBulletBezierManual(this.ship.isEnemy ? 30 : 660);
  }
});
