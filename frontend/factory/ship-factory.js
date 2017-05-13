var ShipFactory = {};

ShipFactory.getCreater = function(color, isEnemy, sounds) {
  return new window['ShipCreater' + color.capitalize()](sounds, isEnemy);
};
