var IField = Class.create(Sprite, {

    isActive: null,
    carrier: null,
    isEnemy: null,

    initialize: function($super, carrier, isEnemy) {
        $super();
        this.isActive = false;
        this.carrier = carrier;
        this.isEnemy = isEnemy;
    },

    createElement: function() {
        var color = '#FFFFFF';
        return new Element('div')
            .setStyle({
                width: '100px',
                height: '20px',
                backgroundColor: color,
                zIndex: this.Z_INDEX_BASE + 11,
                position: 'fixed',
                boxShadow: '0px 0px 10px ' + color,
                borderRadius: '10px',
                display: 'none'
            }).setOpacity(0.5);
    },

    getInitTop: function() {
        return this.isEnemy ? 65 : this.clientHeight - 75; 
    },

    getInitLeft: function() {
        return this.carrier.getLeft() - 5;
    },

    hit: function() {
        h = this.elm.getHeight();
        h -= 2;
        this.elm.setStyle({height: h + 'px'});
        this.setTop(this.getTop() + (this.isEnemy ? 1 : -1)); 
        if (h <= 0) {
            this.isActive = false;
            this.elm.hide();
        }
    },

    barrier: function() {
        this.isActive = true;
        this.elm.setStyle({height: '20px'});
        this.setTop(this.getInitTop());
        this.elm.show();
    },

    move: function() {
        this.setLeft(this.carrier.getLeft() - 5);
        this.changeColor();
    },

    changeColor: function () {
        var color = '#' + Math.floor(Math.random() * 100).toColorPart() + Math.floor(Math.random() * 100).toColorPart() + Math.floor(Math.random() * 100).toColorPart();
        this.elm.setStyle({backgroundColor: color});
    }
});
