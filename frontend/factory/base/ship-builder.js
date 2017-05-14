var ShipBuilder = Class.create({

  sounds: null,
  isEnemy: null,

  initialize: function(sounds, isEnemy) {
    this.sounds = sounds;
    this.isEnemy = isEnemy;
  },

  buildShip: Prototype.emptyFunction,
  buildWeapon: Prototype.emptyFunction,
  buildAction: Prototype.emptyFunction,
  buildAI: Prototype.emptyFunction,
  buildCommand: Prototype.emptyFunction
});
