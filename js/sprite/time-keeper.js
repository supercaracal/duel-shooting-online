var TimeKeeper = Class.create(Sprite, {
    
    timerId: null,
    time: null,

    initialize: function($super) {
        this.time = 0;
        $super();
    },

    createElement: function() {
        return new Element('div').setStyle({
            zIndex: this.Z_INDEX_BASE + 20,
            position: 'fixed',
            height: '30px',
            width: '60px',
            fontSize: '20px',
            fontWeight: 800,
            color: '#FFFFFF',
            textAlign: 'right'
        }).update(this.time);
    },

    setupPosition: function() {
        this.elm.setStyle({
            top: '2px',
            right: '10px',
        });
    },

    increment: function() {
        ++this.time;
        this.elm.update(this.time);
    },

    start: function() {
        if (this.timerId !== null) return;
        this.timeId = setInterval(this.increment.bind(this), 1000);
    },

    stop: function() {
        clearInterval(this.timerId);
        this.timerId = null;
    },

    reset: function() {
        this.time = 0;
    }
});
