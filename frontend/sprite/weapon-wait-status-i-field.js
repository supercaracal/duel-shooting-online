(function f(global) {
  'use strict';

  var g = global;

  g.WeaponWaitStatusIField = global.Class.create(global.WeaponWaitStatus, {
    getColor: function getColor() {
      return '#99FF00';
    }
  });
}(window));
