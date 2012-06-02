var Weapon = Class.create({

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

    initialize: function(ship, enemy) {
        this.ship = ship;
        this.enemy = enemy;

        this.funnelSliderCount = 0;
        this.funnelCircles = [];
        this.megaCannonWaitCount = 0;
        this.megaCannonHeightCount = 0;

        this.elms = [];
    },

    move: function() {
        if (0 < this.megaCannonWaitCount) {
            --this.megaCannonWaitCount;
        }
        if (0 < this.megaCannonHeightCount) {
            if (this.megaCannonHeightCount % 3 === 0) this.addBulletLinearFromMegaCannon();
            --this.megaCannonHeightCount;
        }
        this.funnelCircles.each(function(x) { x.move(); });
        for (var i = 0, len = this.elms.size(); i < len; i++) {
            this.elms[i].move();
            if (this.elms[i].isFunnelSliderAttack) {
                this.addBulletLinearFromFunnel(this.elms[i].getLeft());
                this.elms[i].isFunnelSliderAttack = false;
            }
            if (this.elms[i].isDelete) {
                if (this.elms[i].isFunnelSlider) {
                    --this.funnelSliderCount;
                }
                this.elms[i] = null;
            }
        }
        this.elms = this.elms.compact();
    },

    setSoundFunnelGo: function(audio) {
        this.soundFunnelGo = audio;
    },

    setSoundFunnelAttack: function(audio) {
        this.soundFunnelAttack = audio;
    },

    setSoundAttack: function(audio) {
        this.soundAttack = audio;
    },

    setSoundMegaCannon: function(audio) {
        this.soundMegaCannon = audio;
    },

    playSoundFunnelGo: function(audio) {
        if (this.soundFunnelGo) this.soundFunnelGo.replay();
    },

    playSoundFunnelAttack: function() {
        if (this.soundFunnelAttack) this.soundFunnelAttack.replay();
    },

    playSoundAttack: function() {
        if (this.soundAttack) this.soundAttack.replay(); 
    },

    playSoundMegaCannon: function() {
        if (this.soundMegaCannon) this.soundMegaCannon.replay();
    },

    addBulletLinear: function() {
        var elm = new BulletLinear(this.ship, this.enemy);
        this.elms.push(elm);
        elm.renderElement();
        this.playSoundAttack();
    },

    addBulletHoming: function() {
        var elm = new BulletHoming(this.ship, this.enemy);
        this.elms.push(elm);
        elm.renderElement();       
        this.playSoundAttack();
    },

    addBulletBezierAuto: function() {
        var enemyLeft = this.enemy.getLeft();
        var elmL = new BulletBezier(this.ship, this.enemy, enemyLeft - 60);
        var elmC = new BulletBezier(this.ship, this.enemy, enemyLeft + 30);
        var elmR = new BulletBezier(this.ship, this.enemy, enemyLeft + 120);
        this.elms.push(elmL);
        this.elms.push(elmC);
        this.elms.push(elmR);
        elmL.renderElement();
        elmC.renderElement();
        elmR.renderElement();
        this.playSoundAttack();
    },

    addBulletBezierManual: function(left) {
        var elm = new BulletBezier(this.ship, this.enemy, left);
        this.elms.push(elm);
        elm.renderElement();
        this.playSoundAttack();
    },

    addBulletLinearFromFunnel: function(left) {
        var elm = new BulletLinear(this.ship, this.enemy);
        elm.setPos({top: (this.ship.isEnemy ? 90 : elm.clientHeight - 120), left: left});
        this.elms.push(elm);
        elm.renderElement();
        this.playSoundFunnelAttack();
    },

    addBulletLinearFromMegaCannon: function() {
        var elmL = new BulletLinear(this.ship, this.enemy);
        var elmM = new BulletLinear(this.ship, this.enemy);
        var elmR = new BulletLinear(this.ship, this.enemy);
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

    addBulletHomingFromFunnel: function(top, left) {
        var elm = new BulletHoming(this.ship, this.enemy);
        elm.setPos({top: top, left: left});
        this.elms.push(elm);
        elm.renderElement();
    },

    addFunnelSlider: function() {
        if (this.FUNNEL_SLIDER_MAX <= this.funnelSliderCount) {
            return;
        }
        var elm = new FunnelSlider(this.ship, this.enemy);
        this.elms.push(elm);
        ++this.funnelSliderCount;
        elm.renderElement();
        this.playSoundFunnelGo();
    },

    addFunnelCircle: function() {
        if (this.FUNNEL_CIRCLE_MAX <= this.funnelCircles.size()) {
            this.funnelCircles.each((function(x) {
                this.addBulletHomingFromFunnel(
                    x.getTop() + (x.isEnemy ? 30 : -30),
                    x.getLeft()
                );                       
            }).bind(this));
            this.playSoundFunnelAttack();
            return;
        }
        var funnel = new FunnelCircle(this.ship);
        this.funnelCircles.push(funnel);
        funnel.renderElement();
        this.playSoundFunnelGo();
    },

    addIField: function(audio) {
        var iField = new IField(this.ship);
        iField.setSound(audio);
        this.elms.push(iField);
        iField.renderElement();
    },

    addFunnelDefences: function() {
        var l = new FunnelDefenceLeft(this.ship, this.ship.getIField());
        var r = new FunnelDefenceRight(this.ship, this.ship.getIField());
        this.elms.push(l);
        this.elms.push(r);
        l.renderElement();
        r.renderElement();
    },

    removeFunnelCircle: function(num) {
        var elm;
        elm = this.funnelCircles.shift();
        if (elm) elm.remove();
        this.ship.funnels.shift();
        if (1 < num) {
            elm = this.funnelCircles.shift();
            if (elm) elm.remove();
            this.ship.funnels.shift();
        }
    },

    fireMegaCannon: function() {
        if (0 < this.megaCannonWaitCount) {
            return;
        }
        this.megaCannonWaitCount = this.MEGA_CANNON_WAIT;
        this.megaCannonHeightCount = this.MEGA_CANNON_HEIGHT;
        this.playSoundMegaCannon();
    }
});
