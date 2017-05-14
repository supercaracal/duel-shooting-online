var ShipFactory = {};

ShipFactory.getBuilderAsShip = function(color, sounds) {
  var isEnemy = false;
  return new window['ShipBuilder' + color.capitalize()](sounds, isEnemy);
};

ShipFactory.getBuilderAsEnemy = function(color, sounds) {
  var isEnemy = true;
  return new window['ShipBuilder' + color.capitalize()](sounds, isEnemy);
};
