var BulletHoming = Class.create(Bullet, {

    getColor: function() {
        return '#FF55FF';
    },

    move: function() {
        var range = this.isFall ? 5 : -5;
        if (this.enemy.isHit(this, range)) {
            this.isDelete = true;
            this.elm.remove();
            return;
        }
        var top = this.getTop();
        var left = this.getLeft();
        var enemyLeft = this.enemy.getLeft();
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
