(function f(global) {
  'use strict';

  var g = global;

  g.ShipNavy = global.Class.create(global.Ship, {
    shadowSize: 20,
    colors: ['FF0000', 'FF6600', 'FFFF00', '00FF00', '00FFFF', '0000FF', '990099'],

    getColor: function getColor() {
      return '#0F0F3F';
    },

    createElement: function createElement($super) {
      return $super().setStyle({ color: '#FFFFFF' });
    },

    move: function move($super) {
      var color;
      $super();
      this.shadowSize += 1;
      color = '#' + this.colors[0];
      this.elm.down().setStyle({
        boxShadow: '0px 0px ' + this.shadowSize + 'px ' + color
      });
      this.elm.down(1).setStyle({
        boxShadow: '0px 0px ' + this.shadowSize + 'px ' + color
      });
      if (this.shadowSize > 50) {
        this.shadowSize = 20;
        this.colors.push(this.colors.shift());
      }
    }
  });
}(window));
