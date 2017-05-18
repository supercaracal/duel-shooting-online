(function f(global) {
  'use strict';

  var g = global;

  g.Title = global.Class.create(global.Sprite, {
    TITLE_TEXT: 'Duel Shooting',

    createElement: function createElement() {
      return new Element('div').setStyle({
        display: 'none',
        position: 'fixed',
        zIndex: this.Z_INDEX_BASE + 101,
        fontSize: '36px',
        color: '#FFFFFF',
        top: '0px',
        left: '0px'
      }).update(this.TITLE_TEXT).setOpacity(0.0);
    },

    setupPosition: function setupPosition() {
      var dim;
      this.renderElement();
      dim = this.elm.getDimensions();
      this.elm.setStyle({
        display: 'block',
        top: ((this.clientHeight / 2) - ((dim.height / 2) - 0)) + 'px',
        left: ((this.clientWidth / 2) - ((dim.width / 2) - 0)) + 'px'
      });
      this.remove();
    }
  });
}(window));
