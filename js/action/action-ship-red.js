var ActionShipRed = Class.create(Action, {

    handler: function (e) {
        e.stop();
        var KEY_F = 70;
        var KEY_I = 73;
        var KEY_N = 78;
        switch (e.keyCode) {
            case Event.KEY_RIGHT:
               this.nextCommand = 'stepRight';
               this.isContinue = true;
               break;
            case Event.KEY_LEFT:
               this.nextCommand = 'stepLeft';
               this.isContinue = true;
               break;
            case Event.KEY_UP:
               this.nextCommand = 'attack';
               this.isContinue = false;
               break;
            case KEY_I:
               this.nextCommand = 'barrier';
               this.isContinue = false;
               break;
            case KEY_F:
               this.nextCommand = 'funnel';
               this.isContinue = false;
               break;
            case KEY_N:
               this.nextCommand = 'avoid';
               this.isContinue = false;
               break;
        }
    },

    handlerMouse: function (e) {
        e.stop();
        this.convertToAction(e.pageX, e.pageY);
    },

    handlerSmart: function (e) {
        e.stop();
        this.convertToAction(e.touches[0].pageX, e.touches[0].pageY);
    },

    convertToAction: function (x, y) {
        if ((this.clientHeight / 2 < y) && (x < this.sprite.clientWidth / 3)) {
            this.nextCommand = 'stepLeft';
            this.isContinue = true;
        } else if ((this.clientHeight / 2 < y) && (this.sprite.clientWidth / 3 < x) && (x < this.sprite.clientWidth / 3 * 2)) {
            this.nextCommand = 'avoid';
            this.isContinue = false;
        } else if ((this.clientHeight / 2 < y) && (this.sprite.clientWidth / 3 * 2 < x)) {
            this.nextCommand = 'stepRight';
            this.isContinue = true;
        } else if ((y < this.clientHeight / 2) && (x < this.sprite.clientWidth / 3)) {
            this.nextCommand = 'funnel';
            this.isContinue = false;
        } else if ((y < this.clientHeight / 2) && (this.sprite.clientWidth / 3 < x) && (x < this.sprite.clientWidth / 3 * 2)) {
            this.nextCommand = 'attack';
            this.isContinue = false;
        } else if ((y < this.clientHeight / 2) && (this.sprite.clientWidth / 3 * 2 < x)) {
            this.nextCommand = 'barrier';
            this.isContinue = false;
        }
    }
});
