var ActionShipRed = Class.create(Action, {

    handler: function (e) {
        e.stop();
        var KEY_F = 70;
        var KEY_I = 73;
        var KEY_N = 78;
        switch (e.keyCode) {
            case Event.KEY_RIGHT:
               this.nextCommand = 'stepRight';
               break;
            case Event.KEY_LEFT:
               this.nextCommand = 'stepLeft';
               break;
            case Event.KEY_UP:
               this.nextCommand = 'attack';
               break;
            case KEY_I:
               this.nextCommand = 'barrier';
               break;
            case KEY_F:
               this.nextCommand = 'funnel';
               break;
            case KEY_N:
               this.nextCommand = 'avoid';
               break;
        }
    },

    convertToAction: function (x, y) {
        if ((this.clientHeight / 2 < y) && (x < this.sprite.clientWidth / 3)) {
            this.nextCommand = 'stepLeft';
        } else if ((this.clientHeight / 2 < y) && (this.sprite.clientWidth / 3 < x) && (x < this.sprite.clientWidth / 3 * 2)) {
            this.nextCommand = 'avoid';
        } else if ((this.clientHeight / 2 < y) && (this.sprite.clientWidth / 3 * 2 < x)) {
            this.nextCommand = 'stepRight';
        } else if ((y < this.clientHeight / 2) && (x < this.sprite.clientWidth / 3)) {
            this.nextCommand = 'funnel';
        } else if ((y < this.clientHeight / 2) && (this.sprite.clientWidth / 3 < x) && (x < this.sprite.clientWidth / 3 * 2)) {
            this.nextCommand = 'attack';
        } else if ((y < this.clientHeight / 2) && (this.sprite.clientWidth / 3 * 2 < x)) {
            this.nextCommand = 'barrier';
        }
    }
});
