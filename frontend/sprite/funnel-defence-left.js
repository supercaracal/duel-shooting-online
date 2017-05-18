(function f(global) {
  'use strict';

  var g = global;

  g.FunnelDefenceLeft = global.Class.create(global.Funnel, {
    iField: null,

    initialize: function initialize($super, carrier, iField) {
      this.iField = iField;
      $super(carrier);
      this.setTransformRotate(this.getInitTransformRotate());
    },

    getInitTop: function getInitTop() {
      return this.carrier.getTop() + (this.isEnemy ? 60 : -30);
    },

    getInitLeft: function getInitLeft() {
      return this.carrier.getLeft() - 40;
    },

    getInitTransformRotate: function getInitTransformRotate() {
      return 135;
    },

    getColor: function getColor() {
      return '#FF9900';
    },

    move: function move() {
      var deg;
      if (this.iField.isActive) {
        this.setTransformRotate(this.isEnemy ? 270 : 90);
      } else {
        deg = this.getTransformRotate();
        deg = deg > 360 ? 0 : deg;
        deg += 1;
        this.setTransformRotate(deg);
      }
      this.setPos({ top: this.getInitTop(), left: this.getInitLeft() });
    }
  });
}(window));
