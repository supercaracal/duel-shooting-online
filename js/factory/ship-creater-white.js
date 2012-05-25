var ShipCreaterWhite = Class.create(ShipCreater, {

    createShip: function() {
        var ship = new ShipWhite(this.isEnemy);
        if (!this.isEnemy) {
            ship.setSoundHit(this.sounds.hit);
            ship.setSoundLose(this.sounds.lose);
        }
        this.ship = ship;
        return ship;
    },

    createWeapon: function(enemy) {
        var weapon = new Weapon(this.ship, enemy);
        this.weapon = weapon;
        if (this.isEnemy) return weapon;
        weapon.setSoundAttack(this.sounds.attack);
        weapon.setSoundMegaCannon(this.sounds.megaCannon);
        weapon.setSoundFunnelGo(this.sounds.funnelGo);
        weapon.setSoundFunnelAttack(this.sounds.funnelAtk);
        return weapon;
    },

    createAction: function() {
        return new ActionShipWhite();
    },

    createCommand: function() {
        return new CommandShipWhite(this.ship, this.weapon);
    }
});
