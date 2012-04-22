var FunnelDefenceRight = Class.create(Funnel, {

    iField: null,

    initialize: function($super, carrier, iField) {
        this.iField = iField;
        $super(carrier);
        this.setTransformRotate(this.getInitTransformRotate());
    },

    getInitTop: function() {
        return this.carrier.getTop() + (this.isEnemy ? 70 : -30);
    },

    getInitLeft: function() {
        return this.carrier.getLeft() + 100;
    },

    getInitTransformRotate: function() {
        return 225;
    },

    getColor: function() {
        return '#FF9900';
    },

    move: function() {
        if (this.iField.isActive) {
            this.setTransformRotate(270);
        } else {
            var deg = this.getTransformRotate();
            deg = deg < 0 ? 360 : deg;
            this.setTransformRotate(--deg);
        }
        this.setPos({top: this.getInitTop(), left: this.getInitLeft()});
    }
});
