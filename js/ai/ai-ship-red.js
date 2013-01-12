var AIShipRed = Class.create(AI, {
    WAIT_MAX: 5,
    hasLeftAttackFunnel: false,
    hasRightAttackFunnel: false,
    considerTactics: function($super) {
        $super();
        var iFieldInfo = this.ship.getIFieldInfo();
        var funnelInfo = this.ship.getFunnelInfo();
        var funnelCount = 0;
        if (funnelInfo.firstLeft !== null) ++funnelCount;
        if (funnelInfo.secondLeft !== null) ++funnelCount;
        if (funnelCount < 2) {
            if (!this.hasLeftAttackFunnel && this.stayAreaIndex.ship === 1) {
                this.hasLeftAttackFunnel = true;
                this.nextCommand = 'funnel';
                return;
            }
            if (!this.hasRightAttackFunnel && this.stayAreaIndex.ship === 6) {
                this.hasRightAttackFunnel = true;
                this.nextCommand = 'funnel';
                return;
            }
            return;
        }
        if (this.nextCommand !== 'attack') {
            if (iFieldInfo.isActive && iFieldInfo.height < 20
                && this.stayAreaIndex.ship !== 3 && this.stayAreaIndex.ship !== 4) {

                this.nextCommand = 'avoid';
            } else if (!iFieldInfo.isActive && (33).isTiming()) {
                this.nextCommand = 'barrier';
            }
            return;
        }
        if (iFieldInfo.isActive && this.hasLeftAttackFunnel && this.hasRightAttackFunnel) {
            this.nextCommand = 'funnel';
            return;
        }
        if ((2).isTiming()) {
            this.nextCommand = 'funnel';
        }
    }
});
