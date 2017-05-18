(function f(global) {
  'use strict';

  var g = global;

  g.BulletLinear = global.Class.create(global.Bullet, {
    getColor: function getColor() {
      return '#55FF55';
    },

    move: function move() {
      var range = this.isFall ? 10 : -10;
      if (this.enemy.isHit(this, range)) {
        this.isDelete = true;
        this.elm.remove();
        return;
      }
      this.setTop(this.getTop() + range);
    }
  });
}(window));
