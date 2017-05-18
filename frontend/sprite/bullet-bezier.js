(function f(global) {
  'use strict';

  var g = global;

  g.BulletBezier = global.Class.create(global.Bullet, {
    ATTAINABLE_COUNT: 40,

    pos: null,
    leftRange: null,
    topRange: null,
    count: null,

    initialize: function initialize($super, ship, enemy, left) {
      $super(ship, enemy);
      this.pos = {
        ship: {
          top: ship.getTop() + (this.isFall ? 60 : -30),
          left: ship.getLeft() + 30
        },
        enemy: {
          top: enemy.getTop() + (this.isFall ? -30 : 60),
          left: left
        }
      };
      this.leftRange = -(this.pos.ship.left - this.pos.enemy.left) / this.ATTAINABLE_COUNT;
      this.topRange = -(this.pos.ship.top - this.pos.enemy.top) / this.ATTAINABLE_COUNT;
      this.count = 0;
    },

    getColor: function getColor() {
      return '#FFFF33';
    },

    move: function move() {
      var left;
      this.count += 1;
      if (this.enemy.isHit(this, this.topRange)) {
        this.isDelete = true;
        this.elm.remove();
        return;
      }
      left = this.pos.ship.left + (this.leftRange * this.count);
      this.setPos({
        top: this.pos.ship.top +
          ((this.topRange * this.count * this.count) / this.ATTAINABLE_COUNT),
        left: left + (((this.pos.enemy.left - left) * this.count) / this.ATTAINABLE_COUNT)
      });
    }
  });
}(window));
