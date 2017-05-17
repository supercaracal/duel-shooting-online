(function f(global) {
  'use strict';

  var g = global;

  g.CommandShipNavy = global.Class.create(global.Command, {
    stepRight: function stepRight() {
      this.ship.stepRight();
    },

    stepLeft: function stepLeft() {
      this.ship.stepLeft();
    },

    attack: function attack() {
      this.weapon.addBulletBezierAuto();
    },

    attack1: function attack1() {
      this.weapon.addBulletBezierManual(this.ship.isEnemy ? 660 : 30);
    },

    attack2: function attack2() {
      this.weapon.addBulletBezierManual(this.ship.isEnemy ? 570 : 120);
    },

    attack3: function attack3() {
      this.weapon.addBulletBezierManual(this.ship.isEnemy ? 480 : 210);
    },

    attack4: function attack4() {
      this.weapon.addBulletBezierManual(this.ship.isEnemy ? 390 : 300);
    },

    attack5: function attack5() {
      this.weapon.addBulletBezierManual(this.ship.isEnemy ? 300 : 390);
    },

    attack6: function attack6() {
      this.weapon.addBulletBezierManual(this.ship.isEnemy ? 210 : 480);
    },

    attack7: function attack7() {
      this.weapon.addBulletBezierManual(this.ship.isEnemy ? 120 : 570);
    },

    attack8: function attack8() {
      this.weapon.addBulletBezierManual(this.ship.isEnemy ? 30 : 660);
    }
  });
}(window));
