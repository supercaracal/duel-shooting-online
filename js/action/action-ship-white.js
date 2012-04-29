var ActionShipWhite = Class.create(Action, {

    KEY_F: 70,
    KEY_M: 77,

    handler: function(e) {
        e.stop();
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
            case Event.KEY_DOWN:
               this.nextCommand = 'wait';
               break;
            case this.KEY_F:
               this.nextCommand = 'funnel';
               break;
            case this.KEY_M:
               this.nextCommand = 'megaCannon';
               break;

        }
    },

    convertToAction: function(x, y) {

        var screenUpperPart = (0 < y) && (y < this.sprite.clientHeight / 2);
        var screenLowerPart = (this.sprite.clientHeight / 2 < y) && (y < this.sprite.clientHeight);
        var screenLeft = (0 < x) && (x < this.sprite.clientWidth / 3);
        var screenCenter = (this.sprite.clientWidth / 3 < x) && (x < this.sprite.clientWidth / 3 * 2);
        var screenRight = (this.sprite.clientWidth / 3 * 2 < x) && (x < this.sprite.clientWidth);

        if (screenLowerPart && screenLeft) {
            this.nextCommand = 'stepLeft';

        } else if (screenLowerPart && screenCenter) {
            this.nextCommand = 'wait';

        } else if (screenLowerPart && screenRight) {
            this.nextCommand = 'stepRight';

        } else if (screenUpperPart && screenLeft) {
            this.nextCommand = 'funnel';

        } else if (screenUpperPart && screenCenter) {
            this.nextCommand = 'attack';

        } else if (screenUpperPart && screenRight) {
            this.nextCommand = 'megaCannon';
        }
    }
});
