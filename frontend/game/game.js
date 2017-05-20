(function f(global) {
  'use strict';

  var g = global;

  g.Game = global.Class.create({

    INTERVAL_WAIT_MSEC: 16,

    timerId: null,
    routine: null,

    initialize: function initialize(routine) {
      this.routine = routine;
    },

    start: function start() {
      if (this.timerId !== null) return;
      this.timerId = global.setInterval(this.routine, this.INTERVAL_WAIT_MSEC);
    },

    pause: function pause() {
      if (this.timerId === null) {
        this.start();
      } else {
        this.stop();
      }
    },

    stop: function stop() {
      global.clearInterval(this.timerId);
      this.timerId = null;
    }
  });
}(window));
