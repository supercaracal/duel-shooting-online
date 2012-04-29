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
            Event.observe(document, 'touchstart', this.handlerSmart.bindAsEventListener(this));
            return;
        }
        Event.observe(document, 'keydown', this.handler.bindAsEventListener(this));
        Event.observe(document, 'mousedown', this.handlerMouse.bindAsEventListener(this));
    },

    getCommand: function() {
        var command = this.nextCommand;
        this.nextCommand = null;
        return command;
    },

    handlerMouse: function(e) {
        e.stop();
        this.convertToAction(e.pageX, e.pageY);
    },

    handlerSmart: function(e) {
        e.stop();
        this.convertToAction(e.touches[0].pageX, e.touches[0].pageY);
    }
});
