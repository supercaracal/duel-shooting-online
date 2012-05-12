var ActionShipWhite = Class.create(Action, {

    KEY_F: 70,
    KEY_M: 77,

    handler: function(e) {
        if (e.altGraphKey || e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
        switch (e.keyCode) {
            case Event.KEY_RIGHT:
                this.nextCommand = 'stepRight';
                e.stop();
                break;
            case Event.KEY_LEFT:
                this.nextCommand = 'stepLeft';
                e.stop();
                break;
            case Event.KEY_UP:
                this.nextCommand = 'attack';
                e.stop();
                break;
            case Event.KEY_DOWN:
                this.nextCommand = 'wait';
                e.stop();
                break;
            case this.KEY_F:
                this.nextCommand = 'funnel';
                e.stop();
                break;
            case this.KEY_M:
                this.nextCommand = 'megaCannon';
                e.stop();
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
            return true;
        }
        if (screenLowerPart && screenCenter) {
            this.nextCommand = 'wait';
            return true;
        }
        if (screenLowerPart && screenRight) {
            this.nextCommand = 'stepRight';
            return true;
        }
        if (screenUpperPart && screenLeft) {
            this.nextCommand = 'funnel';
            return true;
        }
        if (screenUpperPart && screenCenter) {
            this.nextCommand = 'attack';
            return true;
        }
        if (screenUpperPart && screenRight) {
            this.nextCommand = 'megaCannon';
            return true;
        }
        return false;
    }
});
