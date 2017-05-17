(function f(global) {
  'use strict';

  var g = global;

  g.CommandShipWhite = global.Class.create(global.Command, {

    stepRight: function stepRight() {
      this.ship.stepRight();
    },

    stepLeft: function stepLeft() {
      this.ship.stepLeft();
    },

    wait: global.Prototype.emptyFunction,

    attack: function attack() {
      this.weapon.addBulletLinear();
    },

    funnel: function funnel() {
      this.weapon.addFunnelSlider();
    },

    megaCannon: function megaCannon() {
      this.weapon.fireMegaCannon();
    }
  });
}(window));
