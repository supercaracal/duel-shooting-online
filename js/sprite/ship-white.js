var ShipWhite = Class.create(Ship, {

  isMegaCannonEnabled: true,
  isNotFunnelEmpty: true,

  getColor: function() {
    return '#FFFFFF';
  },

  enableMegaCannonStatus: function() {
    this.isMegaCannonEnabled = true;
  },

  disableMegaCannonStatus: function() {
    this.isMegaCannonEnabled = false;
  },

  enableFunnelStatus: function() {
    this.isNotFunnelEmpty = true;
  },

  disableFunnelStatus: function() {
    this.isNotFunnelEmpty = false;
  }
});
