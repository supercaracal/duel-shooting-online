var DuelistCounter = Class.create(Sprite, {

  createElement: function() {
    return new Element('div').setStyle({
      position: 'fixed',
      zIndex: this.Z_INDEX_BASE,
      fontSize: '20px',
      fontWeight: 800
    });
  },

  getInitTop: function() {
    return this.clientHeight + 10;
  },

  getInitLeft: function() {
    return 10;
  },

  update: function(text) {
    this.elm.update(text);
    this.remove();
    this.renderElement();
  }
});
