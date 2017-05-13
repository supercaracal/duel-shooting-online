var AIShipNavy = Class.create(AI, {
  WAIT_MAX: 3,
  getNextCommand: function(recommendedCommand) {
    if (recommendedCommand !== 'attack' || (2).isTiming()) {
      return recommendedCommand;
    }
    var idxs;
    switch (this.stayAreaIndexes.enemy) {
      case 0:
        idxs = this.ship.isEnemy ? [5, 4, 3] : [2, 3, 4];
        break;
      case 1:
        idxs = this.ship.isEnemy ? [4, 3, 2] : [3, 4, 5];
        break;
      case 2:
        idxs = this.ship.isEnemy ? [7, 3, 2] : [0, 4, 5];
        break;
      case 3:
        idxs = this.ship.isEnemy ? [6, 2, 1] : [1, 5, 6];
        break;
      case 4:
        idxs = this.ship.isEnemy ? [6, 5, 1] : [1, 2, 6];
        break;
      case 5:
        idxs = this.ship.isEnemy ? [5, 4, 0] : [3, 4, 7];
        break;
      case 6:
        idxs = this.ship.isEnemy ? [5, 4, 3] : [2, 3, 4];
        break;
      case 7:
        idxs = this.ship.isEnemy ? [4, 3, 2] : [3, 4, 5];
        break;
      default:
        break;
    }
    return 'attack' + (idxs[Math.floor(Math.random() * 100) % 3] + 1);
  }
});
