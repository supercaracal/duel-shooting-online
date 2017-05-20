(function f(global) {
  'use strict';

  var g = global;

  g.Background = global.Class.create(global.Sprite, {
    createElement: function createElement() {
      return new global.Element('div').setStyle({
        display: 'block',
        position: 'fixed',
        zIndex: this.Z_INDEX_BASE,
        backgroundColor: '#333333',
        height: this.clientHeight + 'px',
        width: this.clientWidth + 'px',
        borderRight: 'solid 1px #AAAAAA',
        borderBottom: 'solid 1px #AAAAAA'
      }).setOpacity(0.8);
    },

    resetPosition: function resetPosition($super) {
      $super();
      this.elm.setStyle({
        height: this.clientHeight + 'px',
        width: this.clientWidth + 'px'
      });
    }
  });
}(window));
