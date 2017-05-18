(function f(global) {
  'use strict';

  var g = global;

  g.IField = global.Class.create(global.Sprite, {
    WAIT: 250,

    isActive: null,
    carrier: null,
    isEnemy: null,
    waitCount: null,
    sound: null,
    waitStatus: null,

    initialize: function initialize($super, carrier) {
      this.isActive = false;
      this.carrier = carrier;
      this.isEnemy = carrier.isEnemy;
      this.waitCount = 0;
      $super();
      this.carrier.setIField(this);
    },

    createElement: function createElement() {
      var color = '#FFFFFF';
      return new Element('div')
        .setStyle({
          width: '100px',
          height: '20px',
          backgroundColor: color,
          zIndex: this.Z_INDEX_BASE + 11,
          position: 'fixed',
          boxShadow: '0px 0px 10px ' + color,
          borderRadius: '10px',
          display: 'none'
        }).setOpacity(0.5);
    },

    getInitTop: function getInitTop() {
      return this.carrier.getTop() + (this.isEnemy ? 65 : -25);
    },

    getInitLeft: function getInitLeft() {
      return this.carrier.getLeft() - 5;
    },

    getHeight: function getHeight() {
      return this.elm.getHeight();
    },

    setHeight: function setHeight(h) {
      this.elm.setStyle({ height: h + 'px' });
      this.setTop(this.getInitTop() + ((20 - h) / 2));
    },

    setSound: function setSound(audio) {
      this.sound = audio;
    },

    setWaitStatus: function setWaitStatus(waitStatus) {
      this.waitStatus = waitStatus;
    },

    playSound: function playSound() {
      if (this.sound) this.sound.replay();
    },

    hit: function hit() {
      var h = this.getHeight();
      h -= 2;
      this.setHeight(h);
      if (h <= 0) {
        this.cancel();
        this.waitCount = this.WAIT;
      }
    },

    isHit: function isHit(bullet, range, enemyLeft) {
      var top = bullet.getTop();
      var left = bullet.getLeft();
      if (this.isActive &&
        (bullet.isFall ? top + range > this.clientHeight - 110 : top + range < 80) &&
        enemyLeft - 25 < left &&
        left < enemyLeft + 95) {
        this.hit();
        return true;
      }
      return false;
    },

    barrier: function barrier() {
      if (this.waitCount > 0 || this.isActive) {
        return;
      }
      this.setHeight(20);
      this.invoke();
      this.playSound();
    },

    invoke: function invoke() {
      this.isActive = true;
      this.elm.show();
    },

    cancel: function cancel() {
      this.isActive = false;
      this.elm.hide();
    },

    move: function move() {
      this.setLeft(this.carrier.getLeft() - 5);
      if (this.isActive) this.changeColor();
      if (this.waitCount > 0) {
        this.waitCount -= 1;
      }
      this.waitStatus.setWidth(this.waitCount, this.WAIT);
    },

    changeColor: function changeColor() {
      var color = '#' +
        Math.floor(Math.random() * 100).toColorPart() +
        Math.floor(Math.random() * 100).toColorPart() +
        Math.floor(Math.random() * 100).toColorPart();
      this.elm.setStyle({ backgroundColor: color });
    }
  });
}(window));
