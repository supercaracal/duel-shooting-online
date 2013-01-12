var ShipCreaterRed = Class.create(ShipCreater, {

    createShip: function() {
        this.ship = new ShipRed(this.isEnemy);
        if (!this.isEnemy) {
            this.ship.setSoundHit(this.sounds.hit);
            this.ship.setSoundLose(this.sounds.lose);
            this.ship.setSoundNewtype(this.sounds.newtype);
        }
        return this.ship;
    },

    createWeapon: function(enemy) {
        this.weapon = new Weapon(this.ship, enemy);
        this.isEnemy ?
            this.weapon.addIField() :
            this.weapon.addIField(this.sounds.iField);
        this.weapon.addFunnelDefences();
        if (this.isEnemy) return this.weapon;
        this.weapon.setSoundAttack(this.sounds.attack);
        this.weapon.setSoundFunnelGo(this.sounds.funnelGo);
        this.weapon.setSoundFunnelAttack(this.sounds.funnelAtk);
        return this.weapon;
    },

    createAction: function() {
        return new ActionShipRed();
    },

    createAI: function(enemy, enemyWeapon) {
        return new AIShipRed(this.ship, enemy, enemyWeapon);
    },

    createCommand: function() {
        return new CommandShipRed(this.ship, this.weapon);
    }
});
