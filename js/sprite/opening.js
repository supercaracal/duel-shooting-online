var Opening = Class.create(Sprite, {

    timerId: null,
    title: null,
    titleOpacity: 0.0,
    backgroundOpacity: 1.0,

    initialize: function($super, title) {
        this.title = title;
        $super();
    },

    createElement: function() {
        var background = new Element('div').setStyle({
            display: 'block',
            position: 'fixed',
            zIndex: this.Z_INDEX_BASE + 100,
            backgroundColor: '#111111',
            height: this.clientHeight + 'px',
            width: this.clientWidth + 'px'
        }).setOpacity(this.backgroundOpacity);
        return background;
    },

    show: function() {
        this.title.renderElement();
        this.renderElement();
        this.timerId = setInterval(this.appear.bind(this), 128);            
    },

    appear: function() {
        if (this.titleOpacity >= 1.0) {
            clearInterval(this.timerId);
        }
        this.titleOpacity += 0.1;
        this.title.setOpacity(this.titleOpacity);
    },

    hide: function() {
        clearInterval(this.timerId);
        this.title.remove();
        this.timerId = setInterval(this.fade.bind(this), 32);
    },

    fade: function() {
        if (this.backgroundOpacity <= 0.0) {
            clearInterval(this.timerId);
            this.elm.remove();
        }
        this.backgroundOpacity -= 0.1;
        this.elm.setOpacity(this.backgroundOpacity);
    }
});
