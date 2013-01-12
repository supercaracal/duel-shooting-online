var AIShipWhite = Class.create(AI, {
    WAIT_MAX: 3,
    considerTactics: function($super) {
        $super();
        if (this.nextCommand !== 'attack') {
            return;
        }
        if ((9).isTiming()) {
            this.nextCommand = 'funnel';
        } else if ((33).isTiming()) {
            this.nextCommand = 'megaCannon';
        }
    }
});
