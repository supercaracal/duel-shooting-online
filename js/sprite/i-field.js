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

    setSound: function(audio) {
        this.sound = audio;
    },

    playSound: function() {
        if (this.sound) this.sound.replay();
    },

    hit: function() {
        h = this.elm.getHeight();
        h -= 2;
        this.elm.setStyle({height: h + 'px'});
        this.setTop(this.getTop() + 1); 
        if (h <= 0) {
            this.isActive = false;
            this.elm.hide();
            this.waitCount = this.WAIT;
        }
    },

    barrier: function() {
        if (0 < this.waitCount || this.isActive) {
            return;
        }
        this.isActive = true;
        this.elm.setStyle({height: '20px'});
        this.setTop(this.getInitTop());
        this.elm.show();
        this.playSound();
    },

    move: function() {
        this.setLeft(this.carrier.getLeft() - 5);
        this.changeColor();
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
