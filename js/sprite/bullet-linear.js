var BulletLinear = Class.create(Bullet, {

  getColor: function() {
    return '#55FF55';
  },

  move: function() {
    var range = this.isFall ? 10 : -10;
    if (this.enemy.isHit(this, range)) {
      this.isDelete = true;
      this.elm.remove();
      return;
    }
    this.setTop(this.getTop() + range);
  }
});
