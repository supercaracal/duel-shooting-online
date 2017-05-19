(function f(global) {
  'use strict';

  var g = global;

  g.NicoNico = global.Class.create(global.Sprite, {
    text: null,
    dim: null,
    seed: null,

    initialize: function initialize($super, text) {
      this.text = text;
      this.seed = this.getSeed();
      $super();
    },

    createElement: function createElement() {
      return new Element('span').setStyle({
        color: this.getColor(),
        fontSize: this.getSeed() + 8 + 'px',
        fontWeight: 'bolder',
        zIndex: this.Z_INDEX_BASE + 1000 + this.getSeed() + 1,
        position: 'fixed',
        whiteSpace: 'nowrap'
      }).update(this.text);
    },

    getInitTop: function getInitTop() {
      return Math.floor(this.clientHeight * (this.getSeed() / 100));
    },

    getInitLeft: function getInitLeft() {
      return global.document.viewport.getWidth() ||
        global.document.documentElement.clientWidth ||
        global.document.body.clientWidth ||
        global.document.body.scrollWidth ||
        this.clientWidth;
    },

    renderElement: function renderElement($super) {
      $super();
      this.dim = this.elm.getDimensions();
      if (this.clientHeight < this.getTop() + this.dim.height) {
        this.setTop(this.clientHeight - this.dim.height);
      }
    },

    move: function move() {
      var x = this.getLeft();
      if (x < -this.dim.width) {
        this.isDelete = true;
        this.remove();
        return;
      }
      x -= (this.seed % 10) + 5;
      this.setLeft(x);
    },

    getSeed: function getSeed() {
      return Math.floor(Math.random() * 100);
    },

    getColor: function getColor() {
      var color = null;
      var changePos = this.getSeed() % 6;
      var changeVal = this.getSeed() % 16;
      var hexs = {
        0: '0F',
        1: '1F',
        2: '2F',
        3: '3F',
        4: '4F',
        5: '5F',
        6: '6F',
        7: '7F',
        8: '8F',
        9: '9F',
        10: 'AF',
        11: 'BF',
        12: 'CF',
        13: 'DF',
        14: 'EF',
        15: 'FF'
      };
      switch (changePos) {
        case 0:
          color = '#' + hexs[changeVal] + 'FFFF';
          break;
        case 1:
          color = '#FF' + hexs[changeVal] + 'FF';
          break;
        case 2:
          color = '#FFFF' + hexs[changeVal];
          break;
        case 3:
          color = '#' + hexs[changeVal] + hexs[changeVal] + 'FF';
          break;
        case 4:
          color = '#' + hexs[changeVal] + 'FF' + hexs[changeVal];
          break;
        case 5:
          color = '#FF' + hexs[changeVal] + hexs[changeVal];
          break;
        default:
          color = '#FFFFFF';
          break;
      }
      return color;
    }
  });
}(window));
