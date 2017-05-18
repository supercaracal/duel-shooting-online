(function f(global) {
  'use strict';

  var g = global;

  g.BulletHoming = global.Class.create(global.Bullet, {
    getColor: function getColor() {
      return '#FF55FF';
    },

    move: function move() {
      var top;
      var left;
      var enemyLeft;
      var distance;
      var range = this.isFall ? 5 : -5;
      if (this.enemy.isHit(this, range)) {
        this.isDelete = true;
        this.elm.remove();
        return;
      }
      top = this.getTop();
      left = this.getLeft();
      enemyLeft = this.enemy.getLeft();
      if (this.isFall ? (this.clientHeight / 2) < top : (this.clientHeight / 2) > top) {
        range *= 3;
        distance = 0;
      } else if (left < enemyLeft) {
        distance = 10;
      } else if ((enemyLeft + 60) < left) {
        distance = -10;
      } else {
        distance = 0;
      }
      this.setPos({ top: top + range, left: left + distance });
    }
  });
}(window));
