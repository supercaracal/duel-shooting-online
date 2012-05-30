var BulletBezier = Class.create(Bullet, {

    ATTAINABLE_COUNT: 100,
    pos: null,
    xRange: null,
    yRange: null,

    initialize: function($super, ship, enemy) {
        $super(ship, enemy);
        this.pos = {
            ship: {top: ship.getTop(), left: ship.getLeft()},
            enemy: {top: enemy.getTop(), left: enemy.getLeft()}
        };
        this.xRange = -(this.pos.ship.left - this.pos.enemy.left) / this.ATTAINABLE_COUNT;
        this.yRange = (this.pos.ship.top - this.pos.enemy.top) / this.ATTAINABLE_COUNT;
    },

    getColor: function() {
        return '#FFFF33';
    },

    move: function() { // TODO
        var range = this.isFall ? this.yRange : -this.yRange;
        if (this.enemy.isHit(this, range)) {
            this.isDelete = true;
            this.elm.remove();
            return;
        }
        this.setPos({top: this.getTop() + range, left: this.getLeft() + this.xRange});
    }
});
