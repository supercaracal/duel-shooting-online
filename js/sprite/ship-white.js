var ShipWhite = Class.create(Sprite, {

    hitPoint: null,
    soundLose: null,

    initialize: function($super) {
        $super();
        this.hitPoint = 100;
        this.setHitPoint(this.hitPoint);
    },

    createElement: function() {
        var color = '#FFFFFF';
        var obj = new Element('div').setStyle({width: '90px', height: '60px', zIndex: this.Z_INDEX_BASE + 10, position: 'fixed', top: this.clientHeight - 60 + 'px', left: this.clientWidth - 90 + 'px'});
        obj.insert(new Element('div').setStyle({width: '30px', height: '30px', backgroundColor: color, borderRadius: '6px', boxShadow: '0px 0px 10px ' + color, marginLeft: '30px'}));
        obj.insert(new Element('div').setStyle({width: '90px', height: '30px', backgroundColor: color, borderRadius: '6px', boxShadow: '0px 0px 10px ' + color, textAlign: 'center', fontWeight: 800, fontSize: '20px'}).update(this.hitPoint));
        return obj;
    },

    getInitTop: function() {
        return this.clientHeight - 60;
    },

    getInitLeft: function() {
        return this.clientWidth - 90;
    },

    setSoundLose: function(audio) {
        this.soundLose = audio;
    },

    playSoundLose: function() {
        if (this.soundLose) this.soundLose.replay();
    },

    hit: function() {
        if (this.hitPoint < 1) return;
        this.elm.down(1).update(--this.hitPoint);
    },

    setHitPoint: function (num) {
        this.hitPoint = num;
        this.elm.down(1).update(num);
    },

    stepRight: function () {
        var max = this.clientWidth - 90;
        if (this.currentLeft + 10 <= max) {
            this.setLeft(this.currentLeft + 10);
        }
    },

    stepLeft: function () {
        var min = 0;
        if (min <= this.currentLeft - 10) {
            this.setLeft(this.currentLeft - 10);
        }
    }
});
