var ShipCreaterRed = Class.create(ShipCreater, {

    createShip: function() {
        var ship = new ShipRed(this.isEnemy);
        if (!this.isEnemy) {
            ship.setSoundHit(this.sounds.hit);
            ship.setSoundLose(this.sounds.lose);
            ship.setSoundNewtype(this.sounds.newtype);
        }
        this.ship = ship;
        return ship;
    },

    createWeapon: function(enemy) {
        var weapon = new Weapon(this.ship, enemy);
        this.isEnemy ? weapon.addIField() : weapon.addIField(this.sounds.iField);
        weapon.addFunnelDefences();
        this.weapon = weapon;
        if (this.isEnemy) return weapon;
        weapon.setSoundAttack(this.sounds.attack);
        weapon.setSoundFunnelGo(this.sounds.funnelGo);
        weapon.setSoundFunnelAttack(this.sounds.funnelAtk);
        return weapon;
    },

    createAction: function() {
        return new ActionShipRed();
    },

    createCommand: function() {
        return new CommandShipRed(this.ship, this.weapon);
    }
});
