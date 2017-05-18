(function f(global) {
  'use strict';

  var g = global;

  g.ShipRed = global.Class.create(global.Ship, {
    soundNewtype: null,
    iField: null,
    funnels: null,

    initialize: function initialize($super, isEnemy) {
      $super(isEnemy);
      this.funnels = [];
    },

    getColor: function getColor() {
      return '#FF5555';
    },

    setSoundNewtype: function setSoundNewtype(audio) {
      this.soundNewtype = audio;
    },

    playSoundNewtype: function playSoundNewtype() {
      if (this.soundNewtype) this.soundNewtype.replay();
    },

    setIField: function setIField(iField) {
      this.iField = iField;
    },

    getIField: function getIField() {
      return this.iField;
    },

    getIFieldInfo: function getIFieldInfo() {
      return { isActive: this.iField.isActive, height: this.iField.getHeight() };
    },

    getFunnelInfo: function getFunnelInfo() {
      return {
        firstLeft: this.funnels[0] ? this.funnels[0].initLeft : null,
        firstTheta: this.funnels[0] ? this.funnels[0].theta : null,
        secondLeft: this.funnels[1] ? this.funnels[1].initLeft : null,
        secondTheta: this.funnels[1] ? this.funnels[1].theta : null
      };
    },

    addFunnel: function addFunnel(funnel) {
      this.funnels.push(funnel);
    },

    isIFieldEnable: function isIFieldEnable() {
      return (!this.iField.isActive && !this.iField.waitCount);
    },

    barrier: function barrier() {
      this.iField.barrier();
    },

    avoid: function avoid() {
      var sign = (this.getLeft() + 45) < this.clientWidth / 2 ? 1 : -1;
      var top = this.getTop();
      var left = this.getLeft();
      this.setLeft(left + (90 * sign));
      [left, left + (10 * 3 * sign), left + (10 * 6 * sign)].each((function sp(imgLeft) {
        var shadow = new global.ShipAfterimage(this.isEnemy);
        shadow.spot(top, imgLeft, this.hitPoint);
      }).bind(this));
      this.playSoundNewtype();
    }
  });
}(window));
