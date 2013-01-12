var AI = Class.create({
    ship: null,
    enemy: null,
    enemyWeapon: null,
    height: null,
    shipTop: null,
    risksByArea: null,
    nextCommand: null,
    wait: null,
    stayAreaIndex: null,
    seekAreaIndex: null,
    initialize: function(ship, enemy, enemyWeapon) {
        this.ship = ship;
        this.enemy = enemy;
        this.enemyWeapon = enemyWeapon;
        this.height = ship.getClientHeight();
        this.shipTop = ship.getTop();
        this.wait = 0;
        this.stayAreaIndex = {};
    },
    getCommand: function() {
        if (0 < this.wait) {
            --this.wait;
            this.nextCommand = null;
        } else {
            this.updateRisksByArea();
            this.updateStayAreaIndex();
            this.updateSeekAreaIndex();
            this.considerTactics();
        }
        if (this.wait === 0) {
            this.wait += Math.floor(Math.random() * 100) % this.WAIT_MAX;
        }
        return this.nextCommand;
    },
    updateRisksByArea: function() {
        this.risksByArea = [0, 0, 0, 0, 0, 0, 0, 0];
        this.enemyWeapon.elms.each((function(elm) {
            if (!elm.instanceOfBullet || !elm.instanceOfBullet()) {
                return;
            }
            var top = elm.getTop(),
                left = elm.getLeft(),
                risk = Math.floor(this.height - Math.abs(top - this.shipTop)),
                areaIndex = Math.floor((left) / 90);
            this.risksByArea[7 < areaIndex ? 7 : areaIndex] += risk;
        }).bind(this));
    },
    updateStayAreaIndex: function() {
        this.stayAreaIndex.ship = Math.floor((this.ship.getLeft() + 45) / 90),
        this.stayAreaIndex.enemy = Math.floor((this.enemy.getLeft() + 45) / 90);
    },
    updateSeekAreaIndex: function() {
        var seekInfo = {idx: null, minDiffEnemy: null, minRisk: null};
        for (var i = 0, length = this.risksByArea.size(); i < length; ++i) {
            var diffEnemy = Math.abs(i - this.stayAreaIndex.enemy);
            if (seekInfo.minRisk === null || this.risksByArea[i] < seekInfo.minRisk
                || (this.risksByArea[i] === seekInfo.minRisk && diffEnemy < seekInfo.minDiffEnemy)) {

                seekInfo.idx = i;
                seekInfo.minDiffEnemy = diffEnemy;
                seekInfo.minRisk = this.risksByArea[i];
            }
        }
        this.seekAreaIndex = seekInfo.idx;
    },
    considerTactics: function() {
        if (this.seekAreaIndex < this.stayAreaIndex.ship) {
            this.nextCommand = this.ship.isEnemy ? 'stepRight' : 'stepLeft';
        } else if (this.stayAreaIndex.ship < this.seekAreaIndex) {
            this.nextCommand = this.ship.isEnemy ? 'stepLeft' : 'stepRight';
        } else {
            this.nextCommand = 'attack';
        }
    }
});
