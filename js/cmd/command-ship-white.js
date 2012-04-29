var CommandShipWhite = Class.create(Command, {

    stepRight: function() {
        this.ship.stepRight();
    },

    stepLeft: function() {
        this.ship.stepLeft();
    },

    wait: Prototype.emptyFunction,

    attack: function() {
        this.auto.addBulletLinear();
    },

    funnel: function() {
        this.auto.addFunnelSlider();
    },

    megaCannon: function() {
        this.auto.fireMegaCannon();
    }
});
