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
        if (!this.ship.getIField()) {
            this.auto.addIField(this.isEnemy);
        }
        this.ship.barrier();
    },

    attack: function() {
        this.auto.addBulletHoming(this.isEnemy);
    },

    funnel: function() {
        this.auto.addFunnelCircle(this.isEnemy);
    }
});
