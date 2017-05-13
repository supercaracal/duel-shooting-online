var FunnelDefenceLeft = Class.create(Funnel, {

  iField: null,

  initialize: function($super, carrier, iField) {
    this.iField = iField;
    $super(carrier);
    this.setTransformRotate(this.getInitTransformRotate());
  },

  getInitTop: function() {
    return this.carrier.getTop() + (this.isEnemy ? 60 : -30);
  },

  getInitLeft: function() {
    return this.carrier.getLeft() - 40;
  },

  getInitTransformRotate: function() {
    return 135;
  },

  getColor: function() {
    return '#FF9900';
  },

  move: function() {
    if (this.iField.isActive) {
      this.setTransformRotate(this.isEnemy ? 270 : 90);
    } else {
      var deg = this.getTransformRotate();
      deg = deg > 360 ? 0 : deg;
      this.setTransformRotate(++deg);
    }
    this.setPos({top: this.getInitTop(), left: this.getInitLeft()});
  }
});
