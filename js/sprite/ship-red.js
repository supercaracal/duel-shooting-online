var ShipRed = Class.create(Sprite, {
    
    hitPoint: null,
    soundNewtype: null,
    iField: null,

    initialize: function($super) {
        $super();
        this.hitPoint = 100;
    },

    createElement: function() {
        var color = '#FF5555';
        var obj = new Element('div').setStyle({width: '90px', height: '60px', zIndex: this.Z_INDEX_BASE + 10, position: 'fixed', top: '0px', left: '0px'});
        obj.insert(new Element('div').setStyle({width: '90px', height: '30px', backgroundColor: color, borderRadius: '6px', boxShadow: '0px 0px 30px ' + color, textAlign: 'center', fontWeight: 800, fontSize: '20px'}).update(this.hitPoint));
        obj.insert(new Element('div').setStyle({width: '30px', height: '30px', backgroundColor: color, borderRadius: '6px', boxShadow: '0px 0px 30px ' + color, marginLeft: '30px'}));
        return obj;
    },

    setSoundNewtype: function(audio) {
        this.soundNewtype = audio;
    },

    setIField: function(iField) {
        this.iField = iFleid;
    },

    hit: function() {
        if (this.hitPoint < 1) return;
        this.elm.down(0).update(--this.hitPoint);
    },

    setHitPoint: function(num) {
        this.hitPoint = num;
        this.elm.down(0).update(num);
    },

    getIField: function() {
        return this.iField;
    }
});
