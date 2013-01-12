var AIShipNavy = Class.create(AI, {
    WAIT_MAX: 4,
    considerTactics: function($super) {
        $super();
        if (this.nextCommand !== 'attack') {
            return;
        }
        if ((2).isTiming()) {
            this.nextCommand = 'attack' + ((Math.floor(Math.random() * 100) % 8) + 1);
        }
    }
});
