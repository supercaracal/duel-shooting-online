(function f(global) {
  'use strict';

  var g = global;

  g.TimeKeeper = global.Class.create(global.Sprite, {
    timerId: null,
    time: null,

    initialize: function initialize($super) {
      this.time = 0;
      $super();
    },

    createElement: function createElement() {
      return new global.Element('div').setStyle({
        zIndex: this.Z_INDEX_BASE + 20,
        position: 'fixed',
        height: '30px',
        width: '100px',
        fontSize: '20px',
        fontWeight: 800,
        color: '#FFFFFF',
        textAlign: 'right'
      }).update(this.time);
    },

    getInitTop: function getInitTop() {
      return 2;
    },

    getInitLeft: function getInitLeft() {
      return this.clientWidth - 110;
    },

    increment: function increment() {
      this.time += 1;
      this.elm.update(this.time);
    },

    start: function start() {
      if (this.timerId !== null) return;
      this.timerId = global.setInterval(this.increment.bind(this), 1000);
    },

    stop: function stop() {
      global.clearInterval(this.timerId);
      this.timerId = null;
    }
  });
}(window));
