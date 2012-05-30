var CommandShipNavy = Class.create(Command, {

    stepRight: function() {
        this.ship.stepRight();
    },

    stepLeft: function() {
        this.ship.stepLeft();
    },

    attack: function() {
        var elm = new BulletBezier(this.weapon.ship, this.weapon.enemy);
        this.weapon.elms.push(elm);
        elm.renderElement();
        this.weapon.playSoundAttack();
    }
});
