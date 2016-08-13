var Sound = Class.create({

  hasAudioElement: null,

  initialize: function() {
    this.hasAudioElement = this.checkAudio();
    this.addAudioMethods();
  },

  checkAudio: function() {
    var canPlayMpeg = typeof Audio == 'function' &&
      Audio.name == 'HTMLAudioElement' &&
      typeof Audio.prototype.canPlayType == 'function' &&
      new Audio().canPlayType('audio/mpeg');
    return canPlayMpeg == 'probably' || canPlayMpeg == 'maybe';
  },

  addAudioMethods: function() {
    if (!this.hasAudioElement) {
      return;
    }
    Element.addMethods('audio', {
      stop: function (audio) {
        try {
          audio.currentTime = 0;
        } catch(e) {
          if (console) console.log(e);
        }
      },
      replay: function (audio) {
        try {
          audio.currentTime = 0;
          audio.play();
        } catch(e) {
          if (console) console.log(e);
        }
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
