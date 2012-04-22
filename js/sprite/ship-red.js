var ShipRed = Class.create(Ship, {
    
    soundNewtype: null,
    iField: null,

    getColor: function() {
        return '#FF5555';
    },

    setSoundNewtype: function(audio) {
        this.soundNewtype = audio;
    },

    playSoundNewtype: function() {
        if (this.soundNewtype) this.soundNewtype.replay();
    },

    setIField: function(iField) {
        this.iField = iField;
    },

    getIField: function() {
        return this.iField;
    },

    barrier: function() {
        this.iField.barrier();
    },

    avoid: function() {
        var sign = this.getLeft() < this.clientWidth / 2 ? 1 : -1;
        var top = this.getTop();
        var left = this.getLeft();
        this.setLeft(left + 90 * sign);
        [left, left + (10 * 3 * sign), left + (10 * 6 * sign)].each((function(left) {
            var shadow = new ShipAfterimage(this.isEnemy);
            shadow.spot(top, left);
            this.playSoundNewtype();
        }).bind(this));
    }
});
