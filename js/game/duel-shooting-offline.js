var DuelShootingOffline = Class.create(DuelShootingDemo, {
    setupActions: function() {
        this.actions = {};
        this.actions.a = this.factories.a.createAction();
        this.actions.b = null;
    },
    setupAIs: function() {
        this.ais = {};
        this.ais.a = null;
        this.ais.b = this.factories.b.createAI(this.ships.a, this.weapons.a);
    },
    routine: function() {
        this.ships.a.move();
        this.ships.b.move();
        this.weapons.a.move();
        this.weapons.b.move();
        if (!this.ships.b.getHitPoint()) {
            this.condition.update('You win.', '#9999FF');
            new ForkMeOnGitHub().renderElement();
            this.stop();
        }
        if (!this.ships.a.getHitPoint()) {
            this.condition.update('You lose.', '#FF9999');
            this.stop();
        }
        var nextActions = {
            a: this.actions.a.getCommand(),
            b: this.ais.b.getCommand()
        };
        this.ships.a.nextCmd = nextActions.a;
        this.ships.b.nextCmd = nextActions.b;
        this.cmds.a.execute(nextActions.a)
        this.cmds.b.execute(nextActions.b)
    },
    stop: function() {
        this.action.stop();
        this.timekeeper.stop();
        this.game.stop();
    }
});
