(function f(global) {
  'use strict';

  var g = global;

  g.Action = global.Class.create({

    hasTouchEvent: null,
    hasMousedownEvent: null,
    hasKeydownEvent: null,
    nextCommand: null,
    sprite: null,

    initialize: function initialize() {
      this.hasTouchEvent = typeof new Element('div', { ontouchstart: 'return;' }).ontouchstart === 'function';
      this.hasMousedownEvent = typeof new Element('div', { onmousedown: 'return;' }).onmousedown === 'function';
      this.hasKeydownEvent = typeof new Element('div', { onkeydown: 'return;' }).onkeydown === 'function';
      this.sprite = new global.Sprite();
      this.setEventListener();
    },

    setEventListener: function setEventListener() {
      if (this.hasTouchEvent) {
        global.$(global.document).observe('touchstart', this.handlerTouch.bindAsEventListener(this));
      }
      if (this.hasMousedownEvent) {
        global.$(global.document).observe('mousedown', this.handlerMouse.bindAsEventListener(this));
      }
      if (this.hasKeydownEvent) {
        global.$(global.document).observe('keydown', this.handler.bindAsEventListener(this));
      }
    },

    stop: function stop() {
      if (this.hasTouchEvent) {
        global.$(global.document).stopObserving('touchstart');
      }
      if (this.hasMousedownEvent) {
        global.$(global.document).stopObserving('mousedown');
      }
      if (this.hasKeydownEvent) {
        global.$(global.document).stopObserving('keydown');
      }
    },

    getCommand: function getCommand() {
      return this.nextCommand;
    },

    resetCommand: function resetCommand() {
      this.nextCommand = null;
    },

    handlerTouch: function handlerTouch(e) {
      if (this.convertToAction(e.touches[0].pageX, e.touches[0].pageY)) e.stop();
    },

    handlerMouse: function handlerMouse(e) {
      if (this.convertToAction(e.pageX, e.pageY)) e.stop();
    }
  });
}(window));
