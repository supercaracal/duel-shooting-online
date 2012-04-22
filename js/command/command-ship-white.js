var CommandShipWhite = Class.create(Command, {

    stepRight: function() {
        this.ship.stepRight();
    },

    stepLeft: function() {
        this.ship.stepLeft();
    },

    wait: Prototype.emptyFunction,

    attack: function() {
        this.auto.addBulletLinear(this.isEnemy);
    },

    funnel: function() {
        this.auto.addFunnelSlider(this.isEnemy);
    },

    megaCannon: function() {
        this.auto.fireMegaCannon(this.isEnemy);
    }
});
