var CommandShipWhite = Class.create(Command, {

    stepRight: function() {
        this.ship.stepRight();
    },

    stepLeft: function() {
        this.ship.stepLeft();
    },

    wait: Prototype.emptyFunction,

    attack: function() {
        this.weapon.addBulletLinear();
    },

    funnel: function() {
        this.weapon.addFunnelSlider();
    },

    megaCannon: function() {
        this.weapon.fireMegaCannon();
    }
});
