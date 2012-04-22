var Ship = Class.create(Sprite, {
    
    hitPoint: null,
    soundHit: null,
    soundLose: null,
    isEnemy: null,

    initialize: function($super, isEnemy) {
        this.isEnemy = isEnemy;
        this.hitPoint = 100;
        $super();
        this.setHitPoint(this.hitPoint);
    },

    createElement: function() {
        var color = this.getColor();
        return this.isEnemy ? this.createEnemy(color) : this.createShip(color);
    },

    createEnemy: function(color) {
        var elm = new Element('div').setStyle({width: '90px', height: '60px', zIndex: this.Z_INDEX_BASE + 10, position: 'fixed', top: '0px', left: '0px'});
        elm.insert(new Element('div').setStyle({width: '90px', height: '30px', backgroundColor: color, borderRadius: '6px', boxShadow: '0px 0px 30px ' + color, textAlign: 'center', fontWeight: 800, fontSize: '20px'}).update(this.hitPoint));
        elm.insert(new Element('div').setStyle({width: '30px', height: '30px', backgroundColor: color, borderRadius: '6px', boxShadow: '0px 0px 30px ' + color, marginLeft: '30px'}));
        return elm;                
    },

    createShip: function(color) {
        var elm = new Element('div').setStyle({width: '90px', height: '60px', zIndex: this.Z_INDEX_BASE + 10, position: 'fixed', top: this.clientHeight - 60 + 'px', left: this.clientWidth - 90 + 'px'});
        elm.insert(new Element('div').setStyle({width: '30px', height: '30px', backgroundColor: color, borderRadius: '6px', boxShadow: '0px 0px 10px ' + color, marginLeft: '30px'}));
        elm.insert(new Element('div').setStyle({width: '90px', height: '30px', backgroundColor: color, borderRadius: '6px', boxShadow: '0px 0px 10px ' + color, textAlign: 'center', fontWeight: 800, fontSize: '20px'}).update(this.hitPoint));
        return elm;
    },

    getInitTop: function() {
        return this.isEnemy ? 0 : this.clientHeight - 60;
    },

    getInitLeft: function() {
        return this.isEnemy ? 0 : this.clientWidth - 90;
    },

    setSoundHit: function(audio) {
        this.soundHit = audio;
    },

    setSoundLose: function(audio) {
        this.soundLose = audio;
    },

    playSoundHit: function() {
        if (this.soundHit) this.soundHit.replay();
    },

    playSoundLose: function() {
        if (this.soundLose) this.soundLose.replay();
    },

    hit: function() {
        if (this.hitPoint < 1) {
            this.playSoundLose();
            return;
        }
        this.setHitPoint(--this.hitPoint);
        this.playSoundHit();
    },

    setHitPoint: function(num) {
        this.hitPoint = num;
        this.elm.down(this.isEnemy ? 0 : 1).update(num);
    },

    stepRight: function() {
        var max = this.clientWidth - 90;
        if (this.currentLeft + 10 <= max) {
            this.setLeft(this.currentLeft + 10);
        }
    },

    stepLeft: function() {
        var min = 0;
        if (min <= this.currentLeft - 10) {
            this.setLeft(this.currentLeft - 10);
        }
    }
});
