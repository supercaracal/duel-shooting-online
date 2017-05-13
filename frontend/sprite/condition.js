var Condition = Class.create(Sprite, {

  timerId: null,

  createElement: function() {
    return new Element('div').setStyle({
      display: 'none',
      position: 'fixed',
      zIndex: this.Z_INDEX_BASE + 101,
      fontSize: '20px',
      fontWeight: 800,
      top: '0px',
      left: '0px'
    });
  },

  setupPosition: function() {
    var dim = this.elm.getDimensions();
    this.elm.setStyle({
      display: 'block',
      top: this.clientHeight / 2 - (dim.height / 2 - 0) + 100 + 'px',
      left: this.clientWidth / 2 - (dim.width / 2 - 0) + 'px'
    });
  },

  update: function(text, color) {
    if (this.timerId) clearTimeout(this.timerId);
    this.elm.update(text);
    this.elm.setStyle({color: color});
    this.setupPosition();
    this.elm.show();
  },

  updateAndDelayHide: function(text, color) {
    this.update(text, color);
    this.timerId = this.elm.hide.bind(this.elm).delay(7);
  }
});
