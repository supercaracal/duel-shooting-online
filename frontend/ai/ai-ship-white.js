(function f(global) {
  'use strict';

  var g = global;

  g.AIShipWhite = global.Class.create(global.AI, {
    WAIT_MAX: 3,

    getNextCommand: function getNextCommand(recommendedCommand) {
      if (recommendedCommand !== 'attack') {
        return recommendedCommand;
      }
      if (this.ship.isMegaCannonEnabled &&
        Math.abs(this.stayAreaIndexes.enemy - this.stayAreaIndexes.ship) < 3) {
        return 'megaCannon';
      }
      if (this.ship.isNotFunnelEmpty &&
        this.stayAreaIndexes.ship !== this.stayAreaIndexes.enemy) {
        return 'funnel';
      }
      if ((49).isTiming() && (13).isTiming()) {
        return 'wait';
      }
      return recommendedCommand;
    }
  });
}(window));
