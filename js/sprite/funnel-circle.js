var FunnelCircle = Class.create(Funnel, {

    r: null,
    theta: null,
    speed: null,
    isClockwise: null,
    isFunnelCircle: null,

    initialize: function($super, carrier) {
        $super(carrier);
        this.r = 70;
        this.theta = this.isEnemy ? 0 : 180;
        this.speed = 3;
        this.isCloclwise = this.isEnemy;
        this.isFunnelCircle = true;
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
        var y = this.initLeft + Math.sin(Math.PI / 180 * this.theta) * this.r;
        var x = this.initTop + (this.isEnemy ? 0 : -140) + this.r - Math.cos(Math.PI / 180 * this.theta) * this.r;
        this.setPos({top: x, left: y});
        this.theta += this.isClockwise ? this.speed : -this.speed;
        if (this.theta < 0 || 360 < this.theta ) {
            this.theta = this.isClockwise ? 0 : 360;
        }
    }
});
