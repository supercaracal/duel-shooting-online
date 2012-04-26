var Opening = Class.create(Sprite, {

    TITLE_TEXT: 'Duel Shooting',

    title: null,

    titleOpacity: 0.0,

    backgroundOpacity: 1.0,

    timerId: null,

    getClientHeight: function() {
        return document.viewport.getHeight();
    },

    getClientWidth: function() {
        return document.viewport.getWidth();
    },

    createElement: function() {
        var background = new Element('div').setStyle({
            display: 'block',
            position: 'absolute',
            zIndex: this.Z_INDEX_BASE + 100,
            backgroundColor: '#111111',
            height: this.clientHeight + 'px',
            width: this.clientWidth + 'px',
        }).setOpacity(this.backgroundOpacity);
        this.title = new Element('div').setStyle({
            display: 'none',
            position: 'absolute',
            zIndex: this.Z_INDEX_BASE + 101,
            fontSize: '36px',
            color: '#FFFFFF',
            top: '0px',
            left: '0px'
        }).update(this.TITLE_TEXT).setOpacity(this.titleOpacity);
        background.insert(this.title);
        $(document.body).insert(this.title);
        return background;
    },

    setupPosition: function($super) {
        $super();
        var dim = this.title.getDimensions();
        this.title.setStyle({
            display: 'block',
            top: this.clientHeight / 2 - (dim.height / 2 - 0) + 'px',
            left: this.clientWidth / 2 - (dim.width / 2 - 0) + 'px'
        });
    },

    show: function() {
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
