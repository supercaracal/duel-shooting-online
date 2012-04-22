var BulletHoming = Class.create(Bullet, {

    getColor: function() {
        return '#FF55FF';
    },

    move: function() {
        var enemyLeft = this.enemy.getLeft();
        var top = this.elm.getTop();
        var left = this.elm.getLeft();
        var range = this.isEnemy ? 10 : -10;

        if ((enemyLeft - 25 < left) && (left <= enemyLeft + 5) && ((top + range) > (this.clientHeight - 30))) {
            this.isDelete = true;
            this.elm.remove();
            this.enemy.hit();
            return;
        }
        if ((enemyLeft + 5 < left) && (left < enemyLeft + 60) && ((top + range) > (this.clientHeight - 60))) {
            this.isDelete = true;
            this.elm.remove();
            this.enemy.hit();
            return;
        }
        if ((enemyLeft + 60 <= left) && (left < enemyLeft + 90) && ((top + range) > (this.clientHeight - 30))) {
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
        if ((this.clientHeight / 2) < top) {
            distance = 0;
        } else if (left < enemyLeft) {
            distance = 10;
        } else if ((enemyLeft + 60) < left) {
            distance = -10;
        } else {
            distance = 0;
        }
        this.elm.setPos({top: top + range, left: left + distance});
    }
});
