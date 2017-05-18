(function f(global) {
  'use strict';

  var g = global;

  g.FunnelSlider = global.Class.create(global.Funnel, {
    target: null,
    isComeback: null,
    isFunnelSliderAttack: null,
    isFunnelSlider: null,

    initialize: function initialize($super, carrier, target) {
      this.isComeback = false;
      this.isFunnelSliderAttack = false;
      this.isFunnelSlider = true;
      this.target = target;
      $super(carrier);
    },

    getInitTop: function getInitTop() {
      return this.carrier.getTop() + (this.isEnemy ? 60 : -30);
    },

    getInitLeft: function getInitLeft() {
      return this.carrier.getLeft() + 30;
    },

    getColor: function getColor() {
      return '#9999FF';
    },

    move: function move() {
      if (this.isComeback) {
        this.moveComeback();
      } else {
        this.moveChase();
      }
    },

    moveComeback: function moveComeback() {
      var shipCenterLeft = this.carrier.getLeft() + 30;
      var left = this.getLeft();
      if (Math.abs(shipCenterLeft - left) < 30) {
        this.isDelete = true;
        this.elm.remove();
        return;
      }
      this.setLeft(left + ((shipCenterLeft - left) > 0 ? 10 : -10));
    },

    moveChase: function moveChase() {
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
}(window));
