var DuelShootingOffline = Class.create(DuelShootingDemo, {
  setupSound: function() {
    var sound = new Sound();
    this.sounds = {};
    this.sounds.hit = sound.createAudio('/assets/audio/hit.mp3');
    this.sounds.lose = sound.createAudio('/assets/audio/lose.mp3');
    this.sounds.newtype = sound.createAudio('/assets/audio/newtype.mp3');
    this.sounds.attack = sound.createAudio('/assets/audio/attack.mp3');
    this.sounds.megaCannon = sound.createAudio('/assets/audio/mega.mp3');
    this.sounds.funnelGo = sound.createAudio('/assets/audio/funnel1.mp3');
    this.sounds.funnelAtk = sound.createAudio('/assets/audio/funnel2.mp3');
    this.sounds.iField = sound.createAudio('/assets/audio/at_field.mp3');
  },
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
    this.cmds.a.execute(nextActions.a);
    this.cmds.b.execute(nextActions.b);
  },
  stop: function() {
    this.actions.a.stop();
    this.timekeeper.stop();
    this.game.stop();
  }
});
