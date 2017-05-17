(function f(global) {
  'use strict';

  var g = global;

  g.ShipFactory = {};

  g.ShipFactory.getBuilderAsShip = function getBuilderAsShip(color, sounds) {
    var isEnemy = false;
    return new global['ShipBuilder' + color.capitalize()](sounds, isEnemy);
  };

  g.ShipFactory.getBuilderAsEnemy = function getBuilderAsEnemy(color, sounds) {
    var isEnemy = true;
    return new global['ShipBuilder' + color.capitalize()](sounds, isEnemy);
  };
}(window));
