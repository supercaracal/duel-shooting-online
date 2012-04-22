var ShipAfterimage = Class.create({

    isRed: null,

    initialize: function($super, isRed) {
        this.isRed = isRed;
        $super();
    },

    createElement: function() {
        var color = this.isRed ? '#FF5555' : '#FFFFFF';
        var obj = new Element('div').setStyle({width: '90px', height: '60px', zIndex: this.Z_INDEX_BASE + 1, position: 'fixed', top: '0px', left: '0px', opacity: '0.2'});
        obj.insert(new Element('div').setStyle({width: '90px', height: '30px', backgroundColor: color, borderRadius: '6px', textAlign: 'center'}).update(this.enemyHP));
        obj.insert(new Element('div').setStyle({width: '30px', height: '30px', backgroundColor: color, borderRadius: '6px', marginLeft: '30px'}));
        return obj;
    },

    move: function() {
        if (!lefts) {
            return;
        }
        lefts.each((function (left) {
            var afterimage = this.getEnemyAfterimage();
            afterimage.setPos({top: this.enemy.getTop(), left: left});
            $(document.body).insert(afterimage);
            (function () { afterimage.remove(); }).delay(0.3);
        }).bind(this));
    }
});
