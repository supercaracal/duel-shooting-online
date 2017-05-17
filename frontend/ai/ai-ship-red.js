(function f(global) {
  'use strict';

  var g = global;

  g.AIShipRed = global.Class.create(global.AI, {
    WAIT_MAX: 7,

    funnelCount: 0,

    getNextCommand: function getNextCommand(recommendedCommand) {
      var iFieldInfo;
      this.updateFunnelCount();
      if (this.funnelCount < 2) {
        if (this.isShipFixedOnArea()) {
          return 'funnel';
        }
        return 'stepLeft';
      }
      if (recommendedCommand !== 'attack') {
        return this.isAvoidTiming(recommendedCommand) ? 'avoid' : recommendedCommand;
      }
      if (this.ship.isIFieldEnable()) {
        return 'barrier';
      }
      iFieldInfo = this.ship.getIFieldInfo();
      if (iFieldInfo.isActive || (13).isTiming()) {
        return 'funnel';
      }
      return recommendedCommand;
    },

    updateFunnelCount: function updateFunnelCount() {
      var funnelInfo = this.ship.getFunnelInfo();
      if (funnelInfo.firstLeft !== null && funnelInfo.secondLeft !== null) {
        this.funnelCount = 2;
      } else if (funnelInfo.firstLeft !== null && funnelInfo.secondLeft === null) {
        this.funnelCount = 1;
      } else {
        this.funnelCount = 0;
      }
    },

    isShipFixedOnArea: function isShipFixedOnArea() {
      return ((this.funnelCount === 0 &&
        this.stayAreaIndexes.ship === (this.ship.isEnemy ? 1 : 6)) ||
        (this.funnelCount === 1 &&
          this.stayAreaIndexes.ship === (this.ship.isEnemy ? 6 : 1)));
    },

    isAvoidTiming: function isAvoidTiming(recommendedCommand) {
      return ((49).isTiming() &&
        ((!this.ship.isEnemy && recommendedCommand === 'stepLeft' && this.stayAreaIndexes.ship > 3) ||
         (!this.ship.isEnemy && recommendedCommand === 'stepRight' && this.stayAreaIndexes.ship < 4) ||
         (this.ship.isEnemy && recommendedCommand === 'stepLeft' && this.stayAreaIndexes.ship < 4) ||
         (this.ship.isEnemy && recommendedCommand === 'stepRight' && this.stayAreaIndexes.ship > 3)));
    }
  });
}(window));
