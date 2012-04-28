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
            width: '100px',
            fontSize: '20px',
            fontWeight: 800,
            color: '#FFFFFF',
            textAlign: 'right'
        }).update(this.time);
    },

    getInitTop: function() {
        return 2;
    },

    getInitLeft: function() {
        return this.clientWidth - 110;
    },

    increment: function() {
        this.elm.update(++this.time);
    },

    start: function() {
        if (this.timerId !== null) return;
        this.timerId = setInterval(this.increment.bind(this), 1000);
    },

    stop: function() {
        clearInterval(this.timerId);
        this.timerId = null;
    }
});
