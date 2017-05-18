(function f(global) {
  'use strict';

  var g = global;

  g.ShipWhite = global.Class.create(global.Ship, {
    isMegaCannonEnabled: true,
    isNotFunnelEmpty: true,

    getColor: function getColor() {
      return '#FFFFFF';
    },

    enableMegaCannonStatus: function enableMegaCannonStatus() {
      this.isMegaCannonEnabled = true;
    },

    disableMegaCannonStatus: function disableMegaCannonStatus() {
      this.isMegaCannonEnabled = false;
    },

    enableFunnelStatus: function enableFunnelStatus() {
      this.isNotFunnelEmpty = true;
    },

    disableFunnelStatus: function disableFunnelStatus() {
      this.isNotFunnelEmpty = false;
    }
  });
}(window));
