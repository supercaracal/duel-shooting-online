var FunnelSlider = Class.create(Funnel, {

    target: null,
    isComeback: null,
    isFunnelSliderAttack: null,
    isFunnelSlider: null,

    initialize: function($super, carrier, target) {
        this.isComeback = false;
        this.isFunnelSliderAttack = false;
        this.isFunnelSlider = true;
        this.target = target;
        $super(carrier);
    },

    getInitTop: function() {
        return this.carrier.getTop() + (this.isEnemy ? 60 : -30);
    },

    getInitLeft: function() {
        return this.carrier.getLeft() + 30;
    },

    getColor: function() {
        return '#9999FF';
    },

    move: function() {
        this.isComeback ? this.moveComeback() : this.moveChase();
    },

    moveComeback: function() {
        var shipCenterLeft = this.carrier.getLeft() + 30;
        var left = this.getLeft();
        if (Math.abs(shipCenterLeft - left) < 30) {
            this.isDelete = true;
            this.elm.remove();
            return;
        }
        this.setLeft(left + ((shipCenterLeft - left) > 0 ? 10 : -10));
    },

    moveChase: function() {
        var enemyCenterLeft = this.target.getLeft() + 30;
        var left = this.getLeft();
        if (Math.abs(enemyCenterLeft - left) < 30) {
            this.isComeback = true;
            this.isFunnelSliderAttack = true;
            return;
        }
        this.setLeft(left + ((enemyCenterLeft - left) > 0 ? 10 : -10));
    }
});
