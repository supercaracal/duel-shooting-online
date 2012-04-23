var CommandShipRed = Class.create(Command, {

    stepRight: function() {
        this.ship.stepRight();
    },

    stepLeft: function() {
        this.ship.stepLeft();
    },

    avoid: function() {
        this.ship.avoid();
    },

    barrier: function() {
        this.ship.barrier();
    },

    attack: function() {
        this.auto.addBulletHoming();
    },

    funnel: function() {
        this.auto.addFunnelCircle();
    }
});
