var ShipRed = Class.create(Ship, {
    
    soundNewtype: null,
    iField: null,
    funnels: [],

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

    getIFieldInfo: function() {
        return {isActive: this.iField.isActive, height: this.iField.getHeight()};
    },

    getFunnelInfo: function() {
        return {
            firstLeft: this.funnels[0] ? this.funnels[0].initLeft : null,
            firstTheta: this.funnels[0] ? this.funnels[0].theta : null,
            secondLeft: this.funnels[1] ? this.funnels[1].initLeft : null,
            secondTheta: this.funnels[1] ? this.funnels[1].theta : null
        };
    },

    addFunnel: function(funnel) {
        this.funnels.push(funnel);
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
            shadow.spot(top, left, this.hitPoint);
        }).bind(this));
        this.playSoundNewtype();
    }
});
