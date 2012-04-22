var FunnelCircle = Class.create(Funnel, {

    r: null,
    theta: null,
    speed: null,
    isClockwise: null,

    initialize: function($super, carrier) {
        this.r = 70;
        this.theta = 0;
        this.speed = 3;
        this.isCloclwise = true;
        $super(carrier);
    },

    getInitTop: function() {
        return this.carrier.getTop() + (this.isEnemy ? 60 : -30);
    },

    getInitLeft: function() {
        return this.carrier.getLeft() + 30;
    },

    getColor: function() {
        return '#FF9900';
    },

    move: function() {
        var y = this.initTop + Math.sin(Math.PI / 180 * this.theta) * this.r;
        var x = this.initLeft + this.r - Math.cos(Math.PI / 180 * this.theta) * this.r;
        this.setPos({top: x, left: y});
        this.theta += this.isClockwise ? this.speed : -this.speed;
        if (this.theta < 0 || 360 < this.theta ) {
            this.theta = this.isClockwise ? 0 : 360;
        }
    }
});
