var Command = Class.create({

  ship: null,
  weapon: null,

  initialize: function(ship, weapon) {
    this.ship = ship;
    this.weapon = weapon;
  },

  execute: function(command) {
    if (command && command in this) this[command]();
  }
});
