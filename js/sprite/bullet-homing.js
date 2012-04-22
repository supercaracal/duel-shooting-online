var BulletHoming = Class.create(Bullet, {

    getColor: function() {
        return '#FF55FF';
    },

    move: function() {
        var enemyLeft = this.enemy.getLeft();
        var top = this.getTop();
        var left = this.getLeft();
        var range = this.isFall ? 5 : -5;

        if ((enemyLeft - 25 < left) && (left <= enemyLeft + 5) && (this.isFall ? top + range > this.clientHeight - 60 : top + range < 30)) {
            this.isDelete = true;
            this.elm.remove();
            this.enemy.hit();
            return;
        }
        if ((enemyLeft + 5 < left) && (left < enemyLeft + 60) && (this.isFall ? top + range > this.clientHeight - 90 : top + range <60)) {
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
        if (this.clientHeight < (top + range)) {
            this.isDelete = true;
            this.elm.remove();
            return;
        }
        if (this.isFall ? (this.clientHeight / 2) < top : (this.clientHeight / 2) > top) {
            range = range * 3;
            distance = 0;
        } else if (left < enemyLeft) {
            distance = 10;
        } else if ((enemyLeft + 60) < left) {
            distance = -10;
        } else {
            distance = 0;
        }
        this.setPos({top: top + range, left: left + distance});
    }
});
