(function f(global) {
  'use strict';

  var g = global;

  g.Sound = global.Class.create({

    hasAudioElement: null,

    initialize: function initialize() {
      this.hasAudioElement = this.checkAudio();
      this.addAudioMethods();
    },

    checkAudio: function checkAudio() {
      var canPlayMpeg = typeof Audio === 'function' &&
        global.Audio.name === 'HTMLAudioElement' &&
        typeof global.Audio.prototype.canPlayType === 'function' &&
        new global.Audio().canPlayType('audio/mpeg');
      return canPlayMpeg === 'probably' || canPlayMpeg === 'maybe';
    },

    addAudioMethods: function addAudioMethods() {
      if (!this.hasAudioElement) {
        return;
      }
      global.Element.addMethods('audio', {
        stop: function stop(audio) {
          var a = audio;
          try {
            a.currentTime = 0;
          } catch (e) {
            //
          }
        },
        replay: function replay(audio) {
          var a = audio;
          try {
            a.currentTime = 0;
            audio.play();
          } catch (e) {
            //
          }
        }
      });
    },

    createAudio: function createAudio(src) {
      var audio;
      if (this.hasAudioElement) {
        audio = new global.Element('audio', { src: src });
        if (global.Prototype.Browser.MobileSafari) {
          audio.load();
        }
        return audio;
      }
      return null;
    }
  });
}(window));
