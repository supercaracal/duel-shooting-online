var AutomaticControls = Class.create({

    FUNNEL_SLIDER_MAX: 5,

    FUNNEL_CIRCLE_MAP: 2,

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
        var elm = new BulletLinear(this.ship, this.enemy, isEnemy);
        this.elms.push(elm);
        elm.renderElement();
        this.playSoundAttack();
    },

    addBulletLinearFromFunnel: function(left, isEnemy) {
        var elm = new BulletLinear(this.ship, this.enemy, isEnemy);
        elm.setPos({top: (isEnemy ? 60 : elm.clientHeight - 120), left: left});
        this.elms.push(elm);
        elm.renderElement();
        this.playSoundFunnelAttack();
    },

    addFunnelSlider: function(isEnemy) {
        if (this.FUNNEL_SLIDER_MAX <= this.funnelSliderCount) {
            return;
        }
        var elm = new FunnelSlider(this.ship, isEnemy, this.enemy);
        this.elms.push(elm);
        ++this.funnelSliderCount;
        elm.renderElement();
        this.playSoundFunnelGo();
    },

    fireMegaCannon: function(isEnemy) {
        if (0 < this.megaCannonWaitCount) {
            return;
        }
        this.megaCannonWaitCount = this.MEGA_CANNON_WAIT;
        this.megaCannonHeightCount = this.MEGA_CANNON_HEIGHT;
        this.playSoundMegaCannon();
    },

    addBulletFromMegaCannon: function(isEnemy) {
        var elmL = new BulletLinear(this.ship, this.enemy, isEnemy);
        var elmM = new BulletLinear(this.ship, this.enemy, isEnemy);
        var elmR = new BulletLinear(this.ship, this.enemy, isEnemy);
        elmL.setPos({top: this.ship.clientHeight - 90, left: (isEnemy ? this.enemy.getLeft() : this.ship.getLeft())});
        elmM.setPos({top: this.ship.clientHeight - 90, left: (isEnemy ? this.enemy.getLeft() : this.ship.getLeft()) + 30});
        elmR.setPos({top: this.ship.clientHeight - 90, left: (isEnemy ? this.enemy.getLeft() : this.ship.getLeft()) + 60});
        this.elms.push(elmL);
        this.elms.push(elmM);
        this.elms.push(elmR);
        elmL.renderElement();
        elmM.renderElement();
        elmR.renderElement();
    }
});
