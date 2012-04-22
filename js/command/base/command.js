var Command = Class.create({

    ship: null,
    audo: null,
    isEnemy: null,

    initialize: function(ship, auto, isEnemy) {
        this.ship = ship;
        this.auto = auto;
        this.isEnemy = isEnemy;
    },

    execute: function(command) {
        if (command && command in this) this[command]();
    }
});
