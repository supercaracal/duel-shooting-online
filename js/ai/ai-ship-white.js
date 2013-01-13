var AIShipWhite = Class.create(AI, {
    WAIT_MAX: 3,
    considerTactics: function($super) {
        $super();
        if (this.nextCommand !== 'attack') {
            return;
        }
        if (this.ship.isMegaCannonEnabled
            && Math.abs(this.stayAreaIndexes.enemy - this.stayAreaIndexes.ship) < 3) {

            this.nextCommand = 'megaCannon';
        } else if (this.ship.isNotFunnelEmpty
            && this.stayAreaIndexes.ship !== this.stayAreaIndexes.enemy) {

            this.nextCommand = 'funnel';
        } else if ((97).isTiming() && (13).isTiming()) {
            this.nextCommand = 'wait';
        }
    }
});
