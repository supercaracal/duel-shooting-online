var AutomaticControls = Class.create({

    FUNNEL_SLIDER_MAX: 5,

    FUNNEL_CIRCLE_MAX: 2,

    MEGA_CANNON_WAIT: 250,

    I_FIELD_WAIT: 250,

    MEGA_CANNON_HEIGHT: 29,

    ship: null,
    enemy: null,

    funnelSliderCount: null,
    funnelCircleCount: null,
    iFieldWaitCount: null,
    megaCannonWaitCount: null,
    megaCannonHeightCount: null,
    isEnemyMegaCannon: null,

    soundFunnelGo: null,
    soundFunnelAttack: null,
    soundAttack: null,
    soundMegaCannon: null,

    elms: null,

    initialize: function(ship, enemy) {
        this.ship = ship;
        this.enemy = enemy;

        this.funnelSliderCount = 0;
        this.funnelCircleCount = 0;
        this.iFieldWaitCount = 0;
        this.megaCannonWaitCount = 0;
        this.megaCannonHeightCount = 0;

        this.elms = [];
    },

    move: function() {
        if (0 < this.megaCannonWaitCount) {
            --this.megaCannonWaitCount;
        }
        if (0 < this.megaCannonHeightCount) {
            if (this.megaCannonHeightCount % 3 === 0) this.addBulletFromMegaCannon(this.isEnemyMegaCannon);
            --this.megaCannonHeightCount;
        }
        for (var i = 0, len = this.elms.size(); i < len; i++) {
            this.elms[i].move();
            if (this.elms[i].isFunnelSliderAttack) {
                this.addBulletLinearFromFunnel(this.elms[i].getLeft(), this.elms[i].isEnemy);
                this.elms[i].isFunnelSliderAttack = false;
            }
            if (this.elms[i].isFunnelCircle && (99).isTiming()) {
                this.addBulletHomingFromFunnel(
                    this.elms[i].getTop() + (this.elms[i].isEnemy ? 30 : -30),
                    this.elms[i].getLeft(),
                    this.elms[i].isEnemy
                );
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

    addBulletLinear: function(isEnemy) {
        var elm = isEnemy ? 
            new BulletLinear(this.enemy, this.ship) : 
            new BulletLinear(this.ship, this.enemy);
        this.elms.push(elm);
        elm.renderElement();
        this.playSoundAttack();
    },

    addBulletHoming: function(isEnemy) {
        var elm = isEnemy ?
            new BulletHoming(this.enemy, this.ship) :
            new BulletHoming(this.ship, this.enemy);
        this.elms.push(elm);
        elm.renderElement();       
        this.playSoundAttack();
    },

    addBulletLinearFromFunnel: function(left, isEnemy) {
        var elm = isEnemy ?
            new BulletLinear(this.enemy, this.ship) :
            new BulletLinear(this.ship, this.enemy);
        elm.setPos({top: (isEnemy ? 90 : elm.clientHeight - 120), left: left});
        this.elms.push(elm);
        elm.renderElement();
        this.playSoundFunnelAttack();
    },

    addBulletHomingFromFunnel: function(top, left, isEnemy) {
        var elm = isEnemy ?
            new BulletHoming(this.enemy, this.ship) :
            new BulletHoming(this.ship, this.enemy);
        elm.setPos({top: top, left: left});
        this.elms.push(elm);
        elm.renderElement();
        this.playSoundFunnelAttack();
    },

    addFunnelSlider: function(isEnemy) {
        if (this.FUNNEL_SLIDER_MAX <= this.funnelSliderCount) {
            return;
        }
        var elm = isEnemy ?
            new FunnelSlider(this.enemy, this.ship) :
            new FunnelSlider(this.ship, this.enemy);
        this.elms.push(elm);
        ++this.funnelSliderCount;
        elm.renderElement();
        this.playSoundFunnelGo();
    },

    addFunnelCircle: function(isEnemy) {
        if (this.FUNNEL_CIRCLE_MAX <= this.funnelCircleCount) {
            return;
        }
        var funnel = new FunnelCircle(isEnemy ? this.enemy : this.ship);
        this.elms.push(funnel);
        ++this.funnelCircleCount;
        funnel.renderElement();
        this.playSoundFunnelGo();
    },

    addIField: function(isEnemy) {
        var iField = new IField(isEnemy ? this.enemy : this.ship);
        this.elms.push(iField);
        iField.renderElement();
    },

    addFunnelDefences: function(isEnemy) {
        var carrier = isEnemy ? this.enemy : this.ship;
        var l = new FunnelDefenceLeft(carrier, carrier.getIField());
        var r = new FunnelDefenceRight(carrier, carrier.getIField());
        this.elms.push(l);
        this.elms.push(r);
        l.renderElement();
        r.renderElement();
    },

    fireMegaCannon: function(isEnemy) {
        if (0 < this.megaCannonWaitCount) {
            return;
        }
        this.isEnemyMegaCannon = isEnemy;
        this.megaCannonWaitCount = this.MEGA_CANNON_WAIT;
        this.megaCannonHeightCount = this.MEGA_CANNON_HEIGHT;
        this.playSoundMegaCannon();
    },

    addBulletFromMegaCannon: function(isEnemy) {
        var elmL = isEnemy ?
            new BulletLinear(this.enemy, this.ship) :
            new BulletLinear(this.ship, this.enemy);
        var elmM = isEnemy ?
            new BulletLinear(this.enemy, this.ship) :
            new BulletLinear(this.ship, this.enemy);
        var elmR = isEnemy ?
            new BulletLinear(this.enemy, this.ship) :
            new BulletLinear(this.ship, this.enemy);
        elmL.setPos({
            top: (isEnemy ? 60 : this.ship.clientHeight - 90),
            left: (isEnemy ? this.enemy.getLeft() : this.ship.getLeft())
        });
        elmM.setPos({
            top: (isEnemy ? 60 : this.ship.clientHeight - 90),
            left: (isEnemy ? this.enemy.getLeft() : this.ship.getLeft()) + 30
        });
        elmR.setPos({
            top: (isEnemy ? 60 : this.ship.clientHeight - 90),
            left: (isEnemy ? this.enemy.getLeft() : this.ship.getLeft()) + 60
        });
        this.elms.push(elmL);
        this.elms.push(elmM);
        this.elms.push(elmR);
        elmL.renderElement();
        elmM.renderElement();
        elmR.renderElement();
    }
});
