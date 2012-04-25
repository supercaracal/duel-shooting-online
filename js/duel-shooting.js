var DuelShooting = Class.create({

    sync: null,

    initialize: function() {
        this.sync = new Synchronizer('/', this.callback.bind(this));
    },

    // TODO
    callback: function(data) {

        var sound = new SoundCreater();
        var hitSE = sound.createAudio('/se/hit.mp3');
        var loseSE = sound.createAudio('/se/lose.mp3');
        var newtypeSE = sound.createAudio('/se/newtype.mp3');
        var attackSE = sound.createAudio('/se/attack.mp3')
        var megaCannonSE = sound.createAudio('/se/mega.mp3')
        var funnelGoSE = sound.createAudio('/se/funnel1.mp3')
        var funnelAtkSE = sound.createAudio('/se/funnel2.mp3')

        var bg = new Background();

        switch (this.sync.controlShip) {
            case 'white':
                var white = new ShipWhite(false);
                var red = new ShipRed(true);
                var shipWeapons = new AutomaticControls(white, red);
                var enemyWeapons = new AutomaticControls(red, white);
                enemyWeapons.addIField(true);
                enemyWeapons.addFunnelDefences(true);
                var action = new ActionShipWhite();
                var shipCmd = new CommandShipWhite(white, shipWeapons);
                var enemyCmd = new CommandShipRed(red, enemyWeapons);
                this.sync.listenShipWhiteCommand(shipCmd, white);
                this.sync.listenShipRedCommand(enemyCmd, red);
                break;
            case 'red':
                var white = new ShipWhite(true);
                var red = new ShipRed(false);
                var shipWeapons = new AutomaticControls(red, white);
                var enemyWeapons = new AutomaticControls(white, red);
                shipWeapons.addIField(false);
                shipWeapons.addFunnelDefences(false);
                var action = new ActionShipRed();
                var shipCmd = new CommandShipRed(red, shipWeapons);
                var enemyCmd = new CommandShipWhite(white, enemyWeapons);
                this.sync.listenShipRedCommand(shipCmd, red);
                this.sync.listenShipWhiteCommand(enemyCmd, white);
                break;
            default:
                var white = new ShipWhite(false);
                var red = new ShipRed(true);
                var shipWeapons = new AutomaticControls(white, red);
                var enemyWeapons = new AutomaticControls(red, white);
                enemyWeapons.addIField(true);
                enemyWeapons.addFunnelDefences(true);
                var shipCmd = new CommandShipWhite(white, shipWeapons);
                var enemyCmd = new CommandShipRed(red, enemyWeapons);
                this.sync.listenShipWhiteCommand(shipCmd, white);
                this.sync.listenShipRedCommand(enemyCmd, red);
                break;
        }

        red.setSoundHit(hitSE);
        red.setSoundLose(loseSE);
        red.setSoundNewtype(newtypeSE);

        white.setSoundHit(hitSE);
        white.setSoundLose(loseSE);

        shipWeapons.setSoundAttack(attackSE);
        shipWeapons.setSoundMegaCannon(megaCannonSE);
        shipWeapons.setSoundFunnelGo(funnelGoSE);
        shipWeapons.setSoundFunnelAttack(funnelAtkSE);

        var game = new Game((function() {
            if (action) {
                switch (this.sync.controlShip) {
                    case 'white':
                        this.sync.pushShipWhiteCommand(action.getCommand(), white.getHitPoint());
                        break;
                    case 'red':
                        this.sync.pushShipRedCommand(action.getCommand(), red.getHitPoint());
                        break;
                }
            }
            shipWeapons.move();
            enemyWeapons.move();
        }).bind(this));
    
        bg.renderElement();
        red.renderElement();
        white.renderElement();

        game.start();
    }
});
