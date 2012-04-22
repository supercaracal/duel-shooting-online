var ShipRed = Class.create(Ship, {
    
    soundNewtype: null,
    iField: null,

    initialize: function($super, isEnemy) {
        $super(isEnemy);
        this.iField = new IField(this, this.isEnemy);
        this.iField.renderElement();
    },

    getColor: function() {
        return '#FF5555';
    },

    setSoundNewtype: function(audio) {
        this.soundNewtype = audio;
    },

    playSoundNewtype: function() {
        if (this.soundNewtype) this.soundNewtype.replay();
    },

    getIField: function() {
        return this.iField;
    },

    barrier: function() {
        this.iField.barrier();
    },

    avoid: function() {
        this.playSoundNewtype();
    }
});
