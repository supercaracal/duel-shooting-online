var Sound = Class.create({

    hasAudioElement: null,

    initialize: function() {
        this.hasAudioElement = this.checkAudio();
        this.addAudioMethods();
    },

    checkAudio: function() {
        return typeof Audio == 'function'
            && Audio.name == 'HTMLAudioElement'
            && typeof Audio.prototype.canPlayType == 'function'
            && new Audio().canPlayType('audio/mpeg') == 'maybe';
    },

    addAudioMethods: function() {
        if (!this.hasAudioElement) {
            return;
        }
        Element.addMethods('audio', {
            stop: function (audio) {
                audio.pause();
                audio.currentTime = 0;
            },
            replay: function (audio) {
                audio.pause();
                audio.currentTime = 0;
                audio.play();
            }
        });
    },

    createAudio: function(src) {
        if (this.hasAudioElement) {
            var audio = new Element('audio', {src: src});
            if (Prototype.Browser.MobileSafari) {
                audio.load();
            }
            return audio;
        }
        return null;
    }
});
