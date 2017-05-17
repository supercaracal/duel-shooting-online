(function f(global) {
  'use strict';

  var g = global;

  g.Funnel = global.Class.create(global.Sprite, {
    carrier: null,
    isEnemy: null,
    isDelete: null,

    initialize: function initialize($super, carrier) {
      this.carrier = carrier;
      this.isEnemy = carrier.isEnemy;
      this.isDelete = false;
      $super();
    },

    createElement: function createElement() {
      var color = this.getColor();
      return this.isEnemy ?
        this.createForEnemy(color) :
        this.createForShip(color);
    },

    createForShip: function createForShip(color) {
      var obj = new Element('div').setStyle({
        width: '30px',
        height: '30px',
        zIndex: this.Z_INDEX_BASE + 4,
        position: 'fixed'
      });
      obj.insert(new Element('div').setStyle({
        width: '6px',
        height: '20px',
        marginLeft: '12px',
        backgroundColor: color,
        borderRadius: '2px',
        boxShadow: '0px 0px 10px ' + color
      }));
      obj.insert(new Element('div').setStyle({
        width: '20px',
        height: '10px',
        margin: '0px 5px 0px 5px',
        backgroundColor: color,
        borderRadius: '20px',
        boxShadow: '0px 0px 10px ' + color
      }));
      return obj;
    },

    createForEnemy: function createForEnemy(color) {
      var obj = new Element('div').setStyle({
        width: '30px',
        height: '30px',
        zIndex: this.Z_INDEX_BASE + 4,
        position: 'fixed'
      });
      obj.insert(new Element('div').setStyle({
        width: '20px',
        height: '10px',
        margin: '0px 5px 0px 5px',
        backgroundColor: color,
        borderRadius: '20px',
        boxShadow: '0px 0px 10px ' + color
      }));
      obj.insert(new Element('div').setStyle({
        width: '6px',
        height: '20px',
        marginLeft: '12px',
        backgroundColor: color,
        borderRadius: '2px',
        boxShadow: '0px 0px 10px ' + color
      }));
      return obj;
    }
  });
}(window));
