(function f(global) {
  'use strict';

  var g = global;

  g.ShipBuilder = global.Class.create({
    sounds: null,
    isEnemy: null,

    initialize: function initialize(sounds, isEnemy) {
      this.sounds = sounds;
      this.isEnemy = isEnemy;
    },

    buildShip: global.Prototype.emptyFunction,

    buildWeapon: global.Prototype.emptyFunction,

    buildAction: global.Prototype.emptyFunction,

    buildAI: global.Prototype.emptyFunction,

    buildCommand: global.Prototype.emptyFunction
  });
}(window));
