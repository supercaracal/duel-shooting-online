var BulletBezier = Class.create(Bullet, {

    ATTAINABLE_COUNT: 500,
    pos: null,
    xRange: null,
    yRange: null,
    count: null,

    initialize: function($super, ship, enemy) {
        $super(ship, enemy);
        this.pos = {
            ship: {top: ship.getTop(), left: ship.getLeft()},
            enemy: {top: enemy.getTop(), left: enemy.getLeft()}
        };
        this.xRange = -(this.pos.ship.left - this.pos.enemy.left) / this.ATTAINABLE_COUNT;
        this.yRange = (this.pos.ship.top - this.pos.enemy.top) / this.ATTAINABLE_COUNT;
        this.count = 0;
    },

    getColor: function() {
        return '#FFFF33';
    },

    move: function() { // TODO
        ++this.count;
        var range = this.isFall ? this.yRange : -this.yRange;
        if (this.enemy.isHit(this, range)) {
            this.isDelete = true;
            this.elm.remove();
            return;
        }
        var x = this.pos.ship.left + this.xRange * this.count;
        var y = this.pos.ship.top + range * this.count;
        this.setPos({
            top: y - y * this.count / this.ATTAINABLE_COUNT,
            left: x + (this.pos.enemy.left - x) * this.count / this.ATTAINABLE_COUNT
        });
    }
});
