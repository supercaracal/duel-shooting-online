(function f(global) {
  'use strict';

  var g = global;

  g.Bullet = global.Class.create(global.Sprite, {
    ship: null,
    enemy: null,
    isFall: null,
    isDelete: null,

    initialize: function initialize($super, ship, enemy) {
      this.ship = ship;
      this.enemy = enemy;
      this.isFall = ship.isEnemy;
      this.isDelete = false;
      $super();
    },

    getInitTop: function getInitTop() {
      return this.isFall ? 60 : this.clientHeight - 90;
    },

    getInitLeft: function getInitLeft() {
      return this.ship.getLeft() + 30;
    },

    createElement: function createElement() {
      var color = this.getColor();
      var outer = new global.Element('div').setStyle({
        width: '30px',
        height: '30px',
        zIndex: this.Z_INDEX_BASE + 6,
        position: 'fixed'
      });
      var inner = new global.Element('div').setStyle({
        width: '20px',
        height: '20px',
        margin: '5px',
        backgroundColor: color,
        borderRadius: '20px',
        boxShadow: '0px 0px 10px ' + color
      });
      return inner.wrap(outer);
    },

    instanceOfBullet: function instanceOfBullet() {
      return true;
    }
  });
}(window));
