var Command = Class.create({

    ship: null,
    audo: null,

    initialize: function(ship, auto) {
        this.ship = ship;
        this.auto = auto;
    },

    execute: function(command) {
        if (command && command in this) this[command]();
    }
});
