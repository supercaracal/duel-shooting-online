var WeaponWaitStatus = Class.create(Sprite, {
    ship: null,
    isWeaponWaitStatus: true,
    initialize: function($super, ship) {
        this.ship = ship;
        $super();
    },
    createElement: function() {
        var color = this.getColor();
        return new Element('div').setStyle({
            width: '0px',
            height: '6px',
            backgroundColor: color,
            zIndex: this.Z_INDEX_BASE + 11,
            position: 'fixed',
            boxShadow: '0px 0px 1px ' + color,
            borderRadius: '1px'
        });
    },
    getColor: function() {
        return '#FF0099';
    },
    getInitTop: function() {
        return this.ship.getTop() + (this.ship.isEnemy ? 42 : 12);
    },
    getInitLeft: function() {
        return this.ship.getLeft() + 35;
    },
    setWidth: function(current, max) {
        this.elm.setStyle({width: Math.floor(20 * current / max) + 'px'});
    },
    move: function() {
        this.setLeft(this.ship.getLeft() + 35);
    }
});
