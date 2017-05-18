(function f(global) {
  'use strict';

  var g = global;

  g.FunnelDefenceRight = global.Class.create(global.Funnel, {
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
      return this.carrier.getLeft() + 100;
    },

    getInitTransformRotate: function getInitTransformRotate() {
      return 225;
    },

    getColor: function getColor() {
      return '#FF9900';
    },

    move: function move() {
      var deg;
      if (this.iField.isActive) {
        this.setTransformRotate(this.isEnemy ? 90 : 270);
      } else {
        deg = this.getTransformRotate();
        deg = deg < 0 ? 360 : deg;
        deg -= 1;
        this.setTransformRotate(deg);
      }
      this.setPos({ top: this.getInitTop(), left: this.getInitLeft() });
    }
  });
}(window));
