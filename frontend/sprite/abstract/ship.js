(function f(global) {
  'use strict';

  var g = global;

  g.Ship = global.Class.create(global.Sprite, {
    hitPoint: null,
    soundHit: null,
    soundLose: null,
    isEnemy: null,
    way: null,
    nextCmd: null,

    initialize: function initialize($super, isEnemy) {
      this.isEnemy = isEnemy;
      this.hitPoint = 100;
      $super();
      this.setHitPoint(this.hitPoint);
    },

    createElement: function createElement() {
      var color = this.getColor();
      return this.isEnemy ?
        this.createEnemy(color) :
        this.createShip(color);
    },

    createEnemy: function createEnemy(color) {
      var elm = new Element('div').setStyle({
        width: '90px',
        height: '60px',
        zIndex: this.Z_INDEX_BASE + 10,
        position: 'fixed',
        top: '0px',
        left: '0px'
      });
      elm.insert(new Element('div').setStyle({
        width: '90px',
        height: '30px',
        backgroundColor: color,
        borderRadius: '6px',
        boxShadow: '0px 0px 30px ' + color,
        textAlign: 'center',
        fontWeight: 800,
        fontSize: '20px'
      }).update(this.hitPoint));
      elm.insert(new Element('div').setStyle({
        width: '30px',
        height: '30px',
        backgroundColor: color,
        borderRadius: '6px',
        boxShadow: '0px 0px 30px ' + color,
        marginLeft: '30px'
      }));
      return elm;
    },

    createShip: function createShip(color) {
      var elm = new Element('div').setStyle({
        width: '90px',
        height: '60px',
        zIndex: this.Z_INDEX_BASE + 10,
        position: 'fixed',
        top: (this.clientHeight - 60) + 'px',
        left: (this.clientWidth - 90) + 'px'
      });
      elm.insert(new Element('div').setStyle({
        width: '30px',
        height: '30px',
        backgroundColor: color,
        borderRadius: '6px',
        boxShadow: '0px 0px 10px ' + color,
        marginLeft: '30px'
      }));
      elm.insert(new Element('div').setStyle({
        width: '90px',
        height: '30px',
        backgroundColor: color,
        borderRadius: '6px',
        boxShadow: '0px 0px 10px ' + color,
        textAlign: 'center',
        fontWeight: 800,
        fontSize: '20px'
      }).update(this.hitPoint));
      return elm;
    },

    getInitTop: function getInitTop() {
      return this.isEnemy ? 0 : this.clientHeight - 60;
    },

    getInitLeft: function getInitLeft() {
      return this.isEnemy ? 0 : this.clientWidth - 90;
    },

    setSoundHit: function setSoundHit(audio) {
      this.soundHit = audio;
    },

    setSoundLose: function setSoundLose(audio) {
      this.soundLose = audio;
    },

    playSoundHit: function playSoundHit() {
      if (this.soundHit) this.soundHit.replay();
    },

    playSoundLose: function playSoundLose() {
      if (this.soundLose) this.soundLose.replay();
    },

    hit: function hit() {
      if (this.hitPoint < 1) {
        return;
      }
      this.hitPoint -= 1;
      this.setHitPoint(this.hitPoint);
      if (this.hitPoint === 0) {
        this.playSoundLose();
      } else {
        this.playSoundHit();
      }
    },

    isHit: function isHit(bullet, range) {
      var enemyLeft = this.getLeft();
      var enemyIField = this.getIField ? this.getIField() : null;
      var top = bullet.getTop();
      var left = bullet.getLeft();

      if (enemyIField && enemyIField.isHit(bullet, range, enemyLeft)) {
        return true;
      }

      if ((enemyLeft - 25 < left) &&
        (left <= enemyLeft + 5) &&
        (bullet.isFall ? top + range > this.clientHeight - 60 : top + range < 30)) {
        this.hit();
        return true;
      }

      if ((enemyLeft + 5 < left) &&
        (left < enemyLeft + 60) &&
        (bullet.isFall ? top + range > this.clientHeight - 90 : top + range < 60)) {
        this.hit();
        return true;
      }

      if ((enemyLeft + 60 <= left) &&
        (left < enemyLeft + 90) &&
        (bullet.isFall ? top + range > this.clientHeight - 60 : top + range < 30)) {
        this.hit();
        return true;
      }

      if ((top + range < 0) || (this.clientHeight < (top + range))) {
        return true;
      }

      return false;
    },

    setHitPoint: function setHitPoint(num) {
      this.hitPoint = num;
      this.elm.down(this.isEnemy ? 0 : 1).update(num);
    },

    getHitPoint: function getHitPoint() {
      return this.hitPoint;
    },

    stepRight: function stepRight() {
      this.way = this.isEnemy ? 'left' : 'right';
    },

    stepLeft: function stepLeft() {
      this.way = this.isEnemy ? 'right' : 'left';
    },

    moveRight: function moveRight() {
      var max = this.clientWidth - 90;
      if (this.currentLeft + 10 <= max) {
        this.setLeft(this.currentLeft + 10);
      }
    },

    moveLeft: function moveLeft() {
      var min = 0;
      if (min <= this.currentLeft - 10) {
        this.setLeft(this.currentLeft - 10);
      }
    },

    move: function move() {
      if (this.nextCmd !== null &&
        this.nextCmd !== 'stepRight' &&
        this.nextCmd !== 'stepLeft') {
        this.way = null;
      }
      if (this.way === 'right') this.moveRight();
      if (this.way === 'left') this.moveLeft();
    }
  });
}(window));
