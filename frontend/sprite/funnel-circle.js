(function f(global) {
  'use strict';

  var g = global;

  g.FunnelCircle = global.Class.create(global.Funnel, {
    r: null,
    theta: null,
    speed: null,
    isClockwise: null,

    initialize: function initialize($super, carrier) {
      $super(carrier);
      this.r = 70;
      this.theta = this.isEnemy ? 0 : 180;
      this.speed = 3;
      this.isCloclwise = this.isEnemy;
    },

    getInitTop: function getInitTop() {
      return this.carrier.getTop() + (this.isEnemy ? 60 : -30);
    },

    getInitLeft: function getInitLeft() {
      return this.carrier.getLeft() + 30;
    },

    getColor: function getColor() {
      return '#FF9900';
    },

    move: function move() {
      var y = this.initLeft + (Math.sin((Math.PI / 180) * this.theta) * this.r);
      var x = (this.initTop + (this.isEnemy ? 0 : -140) + this.r) -
        (Math.cos((Math.PI / 180) * this.theta) * this.r);
      this.setPos({ top: x, left: y });
      this.theta += this.isClockwise ? this.speed : -this.speed;
      if (this.theta < 0 || this.theta > 360) {
        this.theta = this.isClockwise ? 0 : 360;
      }
    }
  });
}(window));
