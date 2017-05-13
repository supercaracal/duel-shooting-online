var ShipCreater = Class.create({

  sounds: null,
  isEnemy: null,
  ship: null,
  weapon: null,

  initialize: function(sounds, isEnemy) {
    this.sounds = sounds;
    this.isEnemy = isEnemy;
  },

  createShip: Prototype.emptyFunction,
  createWeapon: Prototype.emptyFunction,
  createAction: Prototype.emptyFunction,
  createAI: Prototype.emptyFunction,
  createCommand: Prototype.emptyFunction
});
