var Action = Class.create({

  hasTouchEvent: null,
  hasMousedownEvent: null,
  hasKeydownEvent: null,
  nextCommand: null,
  sprite: null,

  initialize: function() {
    this.hasTouchEvent = typeof new Element('div', {ontouchstart: 'return;'}).ontouchstart == 'function';
    this.hasMousedownEvent = typeof new Element('div', {onmousedown: 'return;'}).onmousedown == 'function';
    this.hasKeydownEvent = typeof new Element('div', {onkeydown: 'return;'}).onkeydown == 'function';
    this.sprite = new Sprite();
    this.setEventListener();
  },

  setEventListener: function() {
    if (this.hasTouchEvent) {
      $(document).observe('touchstart', this.handlerTouch.bindAsEventListener(this));
    }
    if (this.hasMousedownEvent) {
      $(document).observe('mousedown', this.handlerMouse.bindAsEventListener(this));
    }
    if (this.hasKeydownEvent) {
      $(document).observe('keydown', this.handler.bindAsEventListener(this));
    }
  },

  stop: function() {
    if (this.hasTouchEvent) {
      $(document).stopObserving('touchstart');
    }
    if (this.hasMousedownEvent) {
      $(document).stopObserving('mousedown');
    }
    if (this.hasKeydownEvent) {
      $(document).stopObserving('keydown');
    }
  },

  getCommand: function() {
    return this.nextCommand;
  },

  resetCommand: function() {
    this.nextCommand = null;
  },

  handlerTouch: function(e) {
    if (this.convertToAction(e.touches[0].pageX, e.touches[0].pageY)) e.stop();
  },

  handlerMouse: function(e) {
    if (this.convertToAction(e.pageX, e.pageY)) e.stop();
  }
});
