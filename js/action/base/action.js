var Action = Class.create({

  hasTouchEvent: null,
  nextCommand: null,
  sprite: null,

  initialize: function() {
    this.hasTouchEvent = this.checkTouchEvent();
    this.sprite = new Sprite();
    this.setEventListener();
  },

  checkTouchEvent: function() {
    return typeof new Element('div', {ontouchstart: 'return;'}).ontouchstart == 'function';
  },

  setEventListener: function() {
    if (this.hasTouchEvent) {
      $(document).observe('touchstart', this.handlerSmart.bindAsEventListener(this));
      return;
    }
    $(document).observe('keydown', this.handler.bindAsEventListener(this));
    $(document).observe('mousedown', this.handlerMouse.bindAsEventListener(this));
  },

  stop: function() {
    if (this.hasTouchEvent) {
      $(document).stopObserving('touchstart');
      return;
    }
    $(document).stopObserving('keydown');
    $(document).stopObserving('mousedown');
  },

  getCommand: function() {
    var command = this.nextCommand;
    this.nextCommand = null;
    return command;
  },

  handlerMouse: function(e) {
    if (this.convertToAction(e.pageX, e.pageY)) e.stop();
  },

  handlerSmart: function(e) {
    if (this.convertToAction(e.touches[0].pageX, e.touches[0].pageY)) e.stop();
  }
});
