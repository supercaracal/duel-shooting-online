var ShipCreaterWhite = Class.create(ShipCreater, {

    createShip: function() {
        this.ship = new ShipWhite(this.isEnemy);
        if (!this.isEnemy) {
            this.ship.setSoundHit(this.sounds.hit);
            this.ship.setSoundLose(this.sounds.lose);
        }
        return this.ship;
    },

    createWeapon: function(enemy) {
        this.weapon = new Weapon(this.ship, enemy);
        if (this.isEnemy) return this.weapon;
        this.weapon.setSoundAttack(this.sounds.attack);
        this.weapon.setSoundMegaCannon(this.sounds.megaCannon);
        this.weapon.setSoundFunnelGo(this.sounds.funnelGo);
        this.weapon.setSoundFunnelAttack(this.sounds.funnelAtk);
        return this.weapon;
    },

    createAction: function() {
        return new ActionShipWhite();
    },

    createAI: function(enemy, enemyWeapon) {
        return new AIShipWhite(this.ship, enemy, enemyWeapon);
    },

    createCommand: function() {
        return new CommandShipWhite(this.ship, this.weapon);
    }
});
