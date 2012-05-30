var CommandShipNavy = Class.create(Command, {

    stepRight: function() {
        this.ship.stepRight();
    },

    stepLeft: function() {
        this.ship.stepLeft();
    },

    attack: function() {
        this.weapon.addBulletBezier();
    }
});
