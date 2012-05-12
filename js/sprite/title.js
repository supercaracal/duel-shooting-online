var Title = Class.create(Sprite, {

    TITLE_TEXT: 'Duel Shooting',

    createElement: function() {
        return new Element('div').setStyle({
            display: 'none',
            position: 'fixed',
            zIndex: this.Z_INDEX_BASE + 101,
            fontSize: '36px',
            color: '#FFFFFF',
            top: '0px',
            left: '0px'
        }).update(this.TITLE_TEXT).setOpacity(0.0);
    },

    setupPosition: function() {
        this.renderElement();
        var dim = this.elm.getDimensions();
        this.elm.setStyle({
            display: 'block',
            top: this.clientHeight / 2 - (dim.height / 2 - 0) + 'px',
            left: this.clientWidth / 2 - (dim.width / 2 - 0) + 'px'
        });
        this.remove();
    }
});
