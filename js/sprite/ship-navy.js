var ShipNavy = Class.create(Ship, {

  shadowSize : 20,
  colors: ['FF0000', 'FF6600','FFFF00','00FF00', '00FFFF','0000FF','990099'],

  getColor: function() {
    return '#0F0F3F';
  },

  createElement: function($super) {
    return $super().setStyle({color: '#FFFFFF'});
  },

  move: function($super) {
    $super();
    ++this.shadowSize;
    var color = '#' + this.colors[0];
    this.elm.down().setStyle({
      boxShadow: '0px 0px ' + this.shadowSize + 'px ' + color
    });
    this.elm.down(1).setStyle({
      boxShadow: '0px 0px ' + this.shadowSize + 'px ' + color
    });
    if (50 < this.shadowSize) {
      this.shadowSize = 20;
      this.colors.push(this.colors.shift());
    }
  }
});
