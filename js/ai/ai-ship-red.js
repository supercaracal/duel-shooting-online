var AIShipRed = Class.create(AI, {
    WAIT_MAX: 4,
    hasLeftAttackFunnel: false,
    hasRightAttackFunnel: false,
    considerTactics: function($super) {
        $super();
        if (this.nextCommand !== 'attack') {
            return;
        }
        var iFieldInfo = this.ship.getIFieldInfo(),
            funnelInfo = this.ship.getFunnelInfo(),
            funnelCount = 0;
        if (funnelInfo.firstLeft !== null) ++funnelCount;
        if (funnelInfo.secondLeft !== null) ++funnelCount;
        if (funnelCount < 2) {
            if (!this.hasLeftAttackFunnel && this.stayAreaIndexes.ship === 1) {
                this.hasLeftAttackFunnel = true;
                this.nextCommand = 'funnel';
                return;
            }
            if (!this.hasRightAttackFunnel && this.stayAreaIndexes.ship === 6) {
                this.hasRightAttackFunnel = true;
                this.nextCommand = 'funnel';
                return;
            }
            return;
        }
        if (this.ship.isIFieldEnable()) {
            this.nextCommand = 'barrier';
            return;
        }
        if (iFieldInfo.isActive && iFieldInfo.height < 20
            && this.stayAreaIndexes.ship !== 3 && this.stayAreaIndexes.ship !== 4) {

            this.nextCommand = 'avoid';
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
