(function f(global) {
  'use strict';

  var g = global;

  g.Chat = global.Class.create({

    elms: null,

    initialize: function initialize() {
      this.elms = [];
    },

    add: function add(text) {
      var elm = new global.NicoNico(text);
      elm.renderElement();
      this.elms.push(elm);
    },

    move: function move() {
      var i;
      var len;
      for (i = 0, len = this.elms.size(); i < len; i += 1) {
        this.elms[i].move();
        if (this.elms[i].isDelete) this.elms[i] = null;
      }
      this.elms = this.elms.compact();
    }
  });
}(window));
