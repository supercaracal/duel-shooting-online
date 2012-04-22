var FunnelDefenceLeft = Class.create(Funnel, {

    iField: null,

    initialize: function($super, carrier, isEnemy, iField) {
        this.iField = iField;
        $super(carrier, isEnemy);
    },

    getInitTop: function() {
        return this.carrier.getTop() + (this.isEnemy ? 70 : -10);
    },

    getInitLeft: function() {
        return this.carrier.getLeft() - 40;
    },

    getInitTransformRotate: function() {
        return 225;
    },

    setupPosition: function($super) {
        $super.setupPosition();
        this.setTransformRotate(this.getInitTransformRotate());
    },

    getColor: function() {
        return '#FF9900';
    },

    move: function() {
        if (this.iField.isActive) {
            this.setTransformRotate(270);
            return;
        }
        var deg = this.getTransformRotate();
        deg = deg > 360 ? 0 : deg;
        this.setTransformRotate(++deg);
        this.setPos({top: this.getInitTop(), left: this.getInitLeft()});
    }
});
