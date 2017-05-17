(function f(global) {
  'use strict';

  var g = global;

  g.Command = global.Class.create({
    ship: null,
    weapon: null,

    initialize: function initialize(ship, weapon) {
      this.ship = ship;
      this.weapon = weapon;
    },

    execute: function execute(command) {
      if (command && command in this) this[command]();
    }
  });
}(window));
