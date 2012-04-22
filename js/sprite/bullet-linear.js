var BulletLinear = Class.create(Bullet, {

    getColor: function() {
        return '#55FF55';
    },

    move: function() {
        var range = this.isFall ? 10 : -10;
        var enemyLeft = this.enemy.getLeft();
        var enemyIField = this.enemy.getIField();
        var top = this.getTop();
        var left = this.getLeft();
        if (enemyIField && enemyIField.isActive && (this.isFall ? top + range > this.clientHeight - 110 : top + range < 80) && enemyLeft - 25 < left && left < enemyLeft + 95) {
            this.isDelete = true;
            this.elm.remove();
            enemyIField.hit();
            return;
        }
        if ((enemyLeft - 25 < left) && (left <= enemyLeft + 5) && (this.isFall ? top + range > this.clientHeight - 60 : top + range < 30)) {
            this.isDelete = true;
            this.elm.remove();
            this.enemy.hit();
            return;
        }
        if ((enemyLeft + 5 < left) && (left < enemyLeft + 60) && (this.isFall ? top + range > this.clientHeight - 90 : top + range < 60)) {
            this.isDelete = true;
            this.elm.remove();
            this.enemy.hit();
            return;
        }
        if ((enemyLeft + 60 <= left) && (left < enemyLeft + 90) && (this.isFall ? top + range > this.clientHeight - 60 : top + range < 30)) {
            this.isDelete = true;
            this.elm.remove();
            this.enemy.hit();
            return;
        }
        if (top + range < 0) {
            this.isDelete = true;
            this.elm.remove();
            return;
        }
        this.setTop(top + range);
    }
});
