(function f(global) {
  'use strict';

  var g = global;

  g.WeaponWaitStatus = global.Class.create(global.Sprite, {
    ship: null,
    isWeaponWaitStatus: true,

    initialize: function initialize($super, ship) {
      this.ship = ship;
      $super();
    },

    createElement: function createElement() {
      var color = this.getColor();
      return new global.Element('div').setStyle({
        width: '0px',
        height: '6px',
        backgroundColor: color,
        zIndex: this.Z_INDEX_BASE + 11,
        position: 'fixed',
        boxShadow: '0px 0px 1px ' + color,
        borderRadius: '1px'
      });
    },

    getColor: function getColor() {
      return '#FF0099';
    },

    getInitTop: function getInitTop() {
      return this.ship.getTop() + (this.ship.isEnemy ? 42 : 12);
    },

    getInitLeft: function getInitLeft() {
      return this.ship.getLeft() + 35;
    },

    setWidth: function setWidth(current, max) {
      this.elm.setStyle({ width: Math.floor((20 * current) / max) + 'px' });
    },

    move: function move() {
      this.setLeft(this.ship.getLeft() + 35);
    }
  });
}(window));
