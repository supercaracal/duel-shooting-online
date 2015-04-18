var ChatForm = Class.create(Sprite, {

  textField: null,

  createElement: function() {
    var form = new Element('form', {action: '#', method: 'post'}).setStyle({
      zIndex: this.Z_INDEX_BASE + 2000,
      position: 'fixed',
      backgroundColor: '#EFEFEF'
    });
    this.textField = new Element('input', { type: 'text', value: '' })
      .setStyle({ width: '400px' });
    var button = new Element('input', { type: 'submit', value: 'send' });
    form.insert(this.textField).insert(button);
    return form;
  },

  getInitTop: function() {
    return this.clientHeight + 10;
  },

  getInitLeft: function() {
    return 270;
  },

  getValue: function() {
    return $F(this.textField);
  }
});
