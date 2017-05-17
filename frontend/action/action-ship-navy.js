(function f(global) {
  'use strict';

  var g = global;

  g.ActionShipNavy = global.Class.create(global.Action, {

    KEY_A: 65,
    KEY_S: 83,
    KEY_D: 68,
    KEY_F: 70,
    KEY_Z: 90,
    KEY_X: 88,
    KEY_C: 67,
    KEY_V: 86,

    handler: function handler(e) {
      if (e.altGraphKey || e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
      switch (e.keyCode) {
        case Event.KEY_RIGHT:
          this.nextCommand = 'stepRight';
          e.stop();
          break;
        case Event.KEY_LEFT:
          this.nextCommand = 'stepLeft';
          e.stop();
          break;
        case Event.KEY_UP:
          this.nextCommand = 'attack';
          e.stop();
          break;
        case this.KEY_A:
          this.nextCommand = 'attack1';
          e.stop();
          break;
        case this.KEY_S:
          this.nextCommand = 'attack2';
          e.stop();
          break;
        case this.KEY_D:
          this.nextCommand = 'attack3';
          e.stop();
          break;
        case this.KEY_F:
          this.nextCommand = 'attack4';
          e.stop();
          break;
        case this.KEY_Z:
          this.nextCommand = 'attack5';
          e.stop();
          break;
        case this.KEY_X:
          this.nextCommand = 'attack6';
          e.stop();
          break;
        case this.KEY_C:
          this.nextCommand = 'attack7';
          e.stop();
          break;
        case this.KEY_V:
          this.nextCommand = 'attack8';
          e.stop();
          break;
        default:
          break;
      }
    },

    convertToAction: function convertToAction(x, y) {
      var screenUpperPart = (y > 0) && (y < this.sprite.clientHeight / 2);
      var screenLowerPart = (this.sprite.clientHeight / 2 < y) && (y < this.sprite.clientHeight);
      var screenLeft = (x > 0) && (x < this.sprite.clientWidth / 3);
      var screenCenter =
        (this.sprite.clientWidth / 3 < x) && (x < (this.sprite.clientWidth / 3) * 2);
      var screenRight = ((this.sprite.clientWidth / 3) * 2 < x) && (x < this.sprite.clientWidth);

      if (screenLowerPart && screenLeft) {
        this.nextCommand = 'stepLeft';
        return true;
      }
      if (screenLowerPart && screenCenter) {
        this.nextCommand = 'attack';
        return true;
      }
      if (screenLowerPart && screenRight) {
        this.nextCommand = 'stepRight';
        return true;
      }
      if (screenUpperPart && screenLeft) {
        this.nextCommand = 'stepLeft';
        return true;
      }
      if (screenUpperPart && screenCenter) {
        this.nextCommand = 'attack';
        return true;
      }
      if (screenUpperPart && screenRight) {
        this.nextCommand = 'stepRight';
        return true;
      }
      return false;
    }
  });
}(window));
