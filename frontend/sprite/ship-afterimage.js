(function f(global) {
  'use strict';

  var g = global;

  g.ShipAfterimage = global.Class.create(global.Ship, {
    getColor: function getColor() {
      return '#FF5555';
    },

    spot: function spot(top, left, hitPoint) {
      this.elm.setOpacity(0.2);
      this.setPos({ top: top, left: left });
      this.setHitPoint(hitPoint);
      this.renderElement();
      (function rm() { this.elm.remove(); }).bind(this).delay(0.3);
    }
  });
}(window));
