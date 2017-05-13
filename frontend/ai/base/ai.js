var AI = Class.create({
  ship: null,
  enemy: null,
  enemyWeapon: null,
  height: null,
  shipTop: null,
  risksByArea: null,
  wait: null,
  stayAreaIndexes: null,
  seekAreaIndex: null,
  initialize: function(ship, enemy, enemyWeapon) {
    this.ship = ship;
    this.enemy = enemy;
    this.enemyWeapon = enemyWeapon;
    this.height = ship.getClientHeight();
    this.shipTop = ship.getTop();
    this.wait = 0;
    this.stayAreaIndexes = {};
  },
  getCommand: function() {
    if (0 < this.wait) {
      --this.wait;
      return null;
    }
    this.wait += Math.floor(Math.random() * 100) % this.WAIT_MAX;
    this.updateStayAreaIndexes();
    this.updateRisksByArea();
    this.updateSeekAreaIndex();
    return this.getNextCommand(this.getRecommendedCommand());
  },
  updateStayAreaIndexes: function() {
    this.stayAreaIndexes.ship = Math.floor((this.ship.getLeft() + 45) / 90);
    this.stayAreaIndexes.enemy = Math.floor((this.enemy.getLeft() + 45) / 90);
  },
  updateRisksByArea: function() {
    this.risksByArea = [0, 0, 0, 0, 0, 0, 0, 0];
    this.enemyWeapon.elms.each((function(elm) {
      if (!elm.instanceOfBullet || !elm.instanceOfBullet()) {
        return;
      }
      var top = elm.getTop(),
        left = elm.getLeft(),
        risk = Math.floor(this.height - Math.abs(top - this.shipTop)),
        areaIndex = Math.floor((left + 15) / 90);
      this.risksByArea[7 < areaIndex ? 7 : areaIndex] += risk;
    }).bind(this));
  },
  updateSeekAreaIndex: function() {
    var seekInfo = {idx: null, minDiffEnemy: null, minRisk: null};
    for (var i = 0, length = this.risksByArea.size(); i < length; ++i) {
      var diffEnemy = Math.abs(i - this.stayAreaIndexes.enemy);
      if (seekInfo.minRisk === null || this.risksByArea[i] < seekInfo.minRisk ||
        (this.risksByArea[i] === seekInfo.minRisk && diffEnemy < seekInfo.minDiffEnemy)) {

        seekInfo.idx = i;
        seekInfo.minDiffEnemy = diffEnemy;
        seekInfo.minRisk = this.risksByArea[i];
      }
    }
    this.seekAreaIndex = seekInfo.idx;
  },
  getRecommendedCommand: function() {
    var shipLeftAreaIndex = Math.floor(this.ship.getLeft() / 90),
      shipRightAreaIndex = Math.floor((this.ship.getLeft() + 89) / 90);

    if (this.seekAreaIndex < this.stayAreaIndexes.ship ||
      this.seekAreaIndex < shipLeftAreaIndex ||
      this.seekAreaIndex < shipRightAreaIndex) {

      return this.ship.isEnemy ? 'stepRight' : 'stepLeft';
    }
    if (this.stayAreaIndexes.ship < this.seekAreaIndex ||
      shipLeftAreaIndex < this.seekAreaIndex ||
      shipRightAreaIndex < this.seekAreaIndex) {

      return this.ship.isEnemy ? 'stepLeft' : 'stepRight';
    }
    return 'attack';
  }
});
