var Bullet = Class.create(Sprite, {

    ship: null,
    enemy: null,
    isFall: null,
    isDelete: null,

    initialize: function($super, ship, enemy) {
        this.ship = ship;
        this.enemy = enemy;
        this.isFall = ship.isEnemy;
        this.isDelete = false;
        $super();
    },

    getInitTop: function() {
        return this.isFall ? 60 : this.clientHeight - 90;
    },

    getInitLeft: function() {
        return this.ship.getLeft() + 30;
    },

    createElement: function() {
        var color = this.getColor();
        var outer = new Element('div').setStyle({
            width: '30px',
            height: '30px',
            zIndex: this.Z_INDEX_BASE + 6,
            position: 'fixed'
        });
        var inner = new Element('div').setStyle({
            width: '20px',
            height: '20px',
            margin: '5px',
            backgroundColor: color,
            borderRadius: '20px',
            boxShadow: '0px 0px 10px ' + color
        });
        return inner.wrap(outer);
    }
});
