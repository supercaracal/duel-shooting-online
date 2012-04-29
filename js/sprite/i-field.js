var IField = Class.create(Sprite, {

    WAIT: 250,

    isActive: null,
    carrier: null,
    isEnemy: null,

    waitCount: null,

    sound: null,

    initialize: function($super, carrier) {
        this.isActive = false;
        this.carrier = carrier;
        this.isEnemy = carrier.isEnemy;
        this.waitCount = 0;
        $super();
        this.carrier.setIField(this);
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
        return this.carrier.getTop() + (this.isEnemy ? 65 : -25); 
    },

    getInitLeft: function() {
        return this.carrier.getLeft() - 5;
    },

    getHeight: function() {
        return this.elm.getHeight();
    },

    setHeight: function(h) {
        this.elm.setStyle({height: h + 'px'});
        this.setTop(this.getInitTop() + (20 - h) / 2);
    },

    setSound: function(audio) {
        this.sound = audio;
    },

    playSound: function() {
        if (this.sound) this.sound.replay();
    },

    hit: function() {
        h = this.getHeight();
        h -= 2;
        this.setHeight(h);
        if (h <= 0) {
            this.cancel();
            this.waitCount = this.WAIT;
        }
    },

    barrier: function() {
        if (0 < this.waitCount || this.isActive) {
            return;
        }
        this.setHeight(20);
        this.invoke();
        this.playSound();
    },

    invoke: function() {
        this.isActive = true;
        this.elm.show();
    },

    cancel: function() {
        this.isActive = false;
        this.elm.hide();
    },

    move: function() {
        this.setLeft(this.carrier.getLeft() - 5);
        if (this.isActive) this.changeColor();
        if (0 < this.waitCount) {
            --this.waitCount;
        }
    },

    changeColor: function () {
        var color = '#'
            + Math.floor(Math.random() * 100).toColorPart()
            + Math.floor(Math.random() * 100).toColorPart()
            + Math.floor(Math.random() * 100).toColorPart();
        this.elm.setStyle({backgroundColor: color});
    }
});
