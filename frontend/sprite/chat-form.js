(function f(global) {
  'use strict';

  var g = global;

  g.ChatForm = global.Class.create(global.Sprite, {
    textField: null,

    createElement: function createElement() {
      var button;
      var form = new global.Element('form', { action: '#', method: 'post' }).setStyle({
        zIndex: this.Z_INDEX_BASE + 2000,
        position: 'fixed',
        backgroundColor: '#EFEFEF'
      });
      this.textField = new global.Element('input', { type: 'text', value: '' })
        .setStyle({ width: '400px' });
      button = new global.Element('input', { type: 'submit', value: 'send' });
      form.insert(this.textField).insert(button);
      return form;
    },

    getInitTop: function getInitTop() {
      return this.clientHeight + 10;
    },

    getInitLeft: function getInitLeft() {
      return 270;
    },

    getValue: function getValue() {
      return global.$F(this.textField);
    }
  });
}(window));
