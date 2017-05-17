(function f(global) {
  'use strict';

  var g = global;

  g.CommandShipRed = global.Class.create(global.Command, {

    stepRight: function stepRight() {
      this.ship.stepRight();
    },

    stepLeft: function stepLeft() {
      this.ship.stepLeft();
    },

    avoid: function avoid() {
      this.ship.avoid();
    },

    barrier: function barrier() {
      this.ship.barrier();
    },

    attack: function attack() {
      if (this.ship.iField && this.ship.iField.isActive) {
        return;
      }
      this.weapon.addBulletHoming();
    },

    funnel: function funnel() {
      this.weapon.addFunnelCircle();
    }
  });
}(window));
