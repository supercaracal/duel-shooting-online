var ShipFactory = {};

ShipFactory.getCreater = function(color, isEnemy, sounds) {
    switch (color) {
        case 'white':
            return new ShipCreaterWhite(sounds, isEnemy);
        case 'red':
            return new ShipCreaterRed(sounds, isEnemy);
    }
};
