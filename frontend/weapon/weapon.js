(function f(global) {
  'use strict';

  var g = global;

  g.Weapon = global.Class.create({

    FUNNEL_SLIDER_MAX: 5,
    FUNNEL_CIRCLE_MAX: 2,
    MEGA_CANNON_WAIT: 250,
    MEGA_CANNON_HEIGHT: 29,

    ship: null,
    enemy: null,

    funnelSliderCount: null,
    funnelCircles: null,
    megaCannonWaitCount: null,
    megaCannonHeightCount: null,

    soundFunnelGo: null,
    soundFunnelAttack: null,
    soundAttack: null,
    soundMegaCannon: null,

    elms: null,

    initialize: function initialize(ship, enemy) {
      this.ship = ship;
      this.enemy = enemy;

      this.funnelSliderCount = 0;
      this.funnelCircles = [];
      this.megaCannonWaitCount = 0;
      this.megaCannonHeightCount = 0;

      this.elms = [];
    },

    move: function move() {
      var i;
      var len;
      if (this.megaCannonWaitCount > 0) {
        this.megaCannonWaitCount -= 1;
        if (!this.megaCannonWaitCount) this.ship.enableMegaCannonStatus();
      }
      if (this.megaCannonHeightCount > 0) {
        if (this.megaCannonHeightCount % 3 === 0) this.addBulletLinearFromMegaCannon();
        this.megaCannonHeightCount -= 1;
      }
      this.funnelCircles.each(function fm(x) { x.move(); });
      for (i = 0, len = this.elms.size(); i < len; i += 1) {
        this.elms[i].move();
        if (this.elms[i].isFunnelSliderAttack) {
          this.addBulletLinearFromFunnel(this.elms[i].getLeft());
          this.elms[i].isFunnelSliderAttack = false;
        }
        if (this.elms[i].isWeaponWaitStatusMegaCannon) {
          this.elms[i].setWidth(this.megaCannonWaitCount, this.MEGA_CANNON_WAIT);
        }
        if (this.elms[i].isFunnelSlider) {
          if (this.funnelSliderCount <= this.FUNNEL_SLIDER_MAX) {
            this.ship.enableFunnelStatus();
          } else {
            this.ship.disableFunnelStatus();
          }
        }
        if (this.elms[i].isDelete) {
          if (this.elms[i].isFunnelSlider) {
            this.funnelSliderCount -= 1;
          }
          this.elms[i] = null;
        }
      }
      this.elms = this.elms.compact();
    },

    setSoundFunnelGo: function setSoundFunnelGo(audio) {
      this.soundFunnelGo = audio;
    },

    setSoundFunnelAttack: function setSoundFunnelAttack(audio) {
      this.soundFunnelAttack = audio;
    },

    setSoundAttack: function setSoundAttack(audio) {
      this.soundAttack = audio;
    },

    setSoundMegaCannon: function setSoundMegaCannon(audio) {
      this.soundMegaCannon = audio;
    },

    playSoundFunnelGo: function playSoundFunnelGo() {
      if (this.soundFunnelGo) this.soundFunnelGo.replay();
    },

    playSoundFunnelAttack: function playSoundFunnelAttack() {
      if (this.soundFunnelAttack) this.soundFunnelAttack.replay();
    },

    playSoundAttack: function playSoundAttack() {
      if (this.soundAttack) this.soundAttack.replay();
    },

    playSoundMegaCannon: function playSoundMegaCannon() {
      if (this.soundMegaCannon) this.soundMegaCannon.replay();
    },

    addBulletLinear: function addBulletLinear() {
      var elm = new global.BulletLinear(this.ship, this.enemy);
      this.elms.push(elm);
      elm.renderElement();
      this.playSoundAttack();
    },

    addBulletHoming: function addBulletHoming() {
      var elm = new global.BulletHoming(this.ship, this.enemy);
      this.elms.push(elm);
      elm.renderElement();
      this.playSoundAttack();
    },

    addBulletBezierAuto: function addBulletBezierAuto() {
      var enemyLeft = this.enemy.getLeft();
      var elmL = new global.BulletBezier(this.ship, this.enemy, enemyLeft - 60);
      var elmC = new global.BulletBezier(this.ship, this.enemy, enemyLeft + 30);
      var elmR = new global.BulletBezier(this.ship, this.enemy, enemyLeft + 120);
      this.elms.push(elmL);
      this.elms.push(elmC);
      this.elms.push(elmR);
      elmL.renderElement();
      elmC.renderElement();
      elmR.renderElement();
      this.playSoundAttack();
    },

    addBulletBezierManual: function addBulletBezierManual(left) {
      var elm = new global.BulletBezier(this.ship, this.enemy, left);
      this.elms.push(elm);
      elm.renderElement();
      this.playSoundAttack();
    },

    addBulletLinearFromFunnel: function addBulletLinearFromFunnel(left) {
      var elm = new global.BulletLinear(this.ship, this.enemy);
      elm.setPos({ top: (this.ship.isEnemy ? 90 : elm.clientHeight - 120), left: left });
      this.elms.push(elm);
      elm.renderElement();
      this.playSoundFunnelAttack();
    },

    addBulletLinearFromMegaCannon: function addBulletLinearFromMegaCannon() {
      var elmL = new global.BulletLinear(this.ship, this.enemy);
      var elmM = new global.BulletLinear(this.ship, this.enemy);
      var elmR = new global.BulletLinear(this.ship, this.enemy);
      elmL.setPos({
        top: this.ship.isEnemy ? 60 : this.ship.clientHeight - 90,
        left: this.ship.getLeft()
      });
      elmM.setPos({
        top: this.ship.isEnemy ? 60 : this.ship.clientHeight - 90,
        left: this.ship.getLeft() + 30
      });
      elmR.setPos({
        top: this.ship.isEnemy ? 60 : this.ship.clientHeight - 90,
        left: this.ship.getLeft() + 60
      });
      this.elms.push(elmL);
      this.elms.push(elmM);
      this.elms.push(elmR);
      elmL.renderElement();
      elmM.renderElement();
      elmR.renderElement();
    },

    addBulletHomingFromFunnel: function addBulletHomingFromFunnel(top, left) {
      var elm = new global.BulletHoming(this.ship, this.enemy);
      elm.setPos({ top: top, left: left });
      this.elms.push(elm);
      elm.renderElement();
    },

    addFunnelSlider: function addFunnelSlider() {
      var elm;
      if (this.FUNNEL_SLIDER_MAX <= this.funnelSliderCount) {
        return;
      }
      elm = new global.FunnelSlider(this.ship, this.enemy);
      this.elms.push(elm);
      this.funnelSliderCount += 1;
      elm.renderElement();
      this.playSoundFunnelGo();
    },

    addFunnelCircle: function addFunnelCircle() {
      var funnel;
      if (this.FUNNEL_CIRCLE_MAX <= this.funnelCircles.size()) {
        this.funnelCircles.each((function fm(x) {
          this.addBulletHomingFromFunnel(
            x.getTop() + (x.isEnemy ? 30 : -30),
            x.getLeft()
          );
        }).bind(this));
        this.playSoundFunnelAttack();
        return;
      }
      funnel = new global.FunnelCircle(this.ship);
      this.ship.addFunnel(funnel);
      this.funnelCircles.push(funnel);
      funnel.renderElement();
      this.playSoundFunnelGo();
    },

    addIField: function addIField(audio) {
      var iField = new global.IField(this.ship);
      var wws = new global.WeaponWaitStatusIField(this.ship);
      iField.setSound(audio);
      iField.setWaitStatus(wws);
      this.elms.push(iField);
      this.elms.push(wws);
      iField.renderElement();
      wws.renderElement();
    },

    addFunnelDefences: function addFunnelDefences() {
      var l = new global.FunnelDefenceLeft(this.ship, this.ship.getIField());
      var r = new global.FunnelDefenceRight(this.ship, this.ship.getIField());
      this.elms.push(l);
      this.elms.push(r);
      l.renderElement();
      r.renderElement();
    },

    addWeaponWaitStatusMegaCannon: function addWeaponWaitStatusMegaCannon() {
      var wws = new global.WeaponWaitStatusMegaCannon(this.ship);
      this.elms.push(wws);
      wws.renderElement();
    },

    removeFunnelCircle: function removeFunnelCircle(num) {
      var elm;
      elm = this.funnelCircles.shift();
      if (elm) elm.remove();
      this.ship.funnels.shift();
      if (num > 1) {
        elm = this.funnelCircles.shift();
        if (elm) elm.remove();
        this.ship.funnels.shift();
      }
    },

    fireMegaCannon: function fireMegaCannon() {
      if (this.megaCannonWaitCount > 0) {
        return;
      }
      this.ship.disableMegaCannonStatus();
      this.megaCannonWaitCount = this.MEGA_CANNON_WAIT;
      this.megaCannonHeightCount = this.MEGA_CANNON_HEIGHT;
      this.playSoundMegaCannon();
    }
  });
}(window));
