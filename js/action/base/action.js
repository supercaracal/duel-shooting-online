var Action = Class.create({

    hasTouchEvent: null,
    nextCommand: null,
    isContinue: null,
    sprite: null,

    initialize: function() {
        this.hasTouchEvent = this.checkTouchEvent();
        this.isContinue = false;
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
        if (!this.isContinue) {
            this.nextCommand = null;
        }
        return command;
    }
});
