(function f(global) {
  'use strict';

  var g = global;

  g.DuelistCounter = global.Class.create(global.Sprite, {
    createElement: function createElement() {
      return new Element('div').setStyle({
        position: 'fixed',
        zIndex: this.Z_INDEX_BASE,
        fontSize: '20px',
        fontWeight: 800
      });
    },

    getInitTop: function getInitTop() {
      return this.clientHeight + 10;
    },

    getInitLeft: function getInitLeft() {
      return 10;
    },

    update: function update(text) {
      this.elm.update(text);
      this.remove();
      this.renderElement();
    }
  });
}(window));
