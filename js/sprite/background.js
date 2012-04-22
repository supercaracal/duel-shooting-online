var Background = Class.create(Sprite, {

    createElement: function() {
        return new Element('div').setStyle({
            display: 'block',
            position: 'fixed',
            zIndex: this.Z_INDEX_BASE,
            backgroundColor: '#333333',
            height: this.clientHeight + 'px',
            width: this.clientWidth + 'px',
        }).setOpacity(0.8);
    },

    resetPosition: function($super) {
        $super.resetPosition();
        this.elm.setStyle({
            height: this.clientHeight + 'px',
            width: this.clientWidth + 'px'
        });
    }
});
