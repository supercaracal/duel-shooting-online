(function f(global) {
  'use strict';

  var g = global;

  g.ForkMeOnGitHub = global.Class.create(global.Sprite, {
    createElement: function createElement() {
      return new global.Element('img', {
        src: 'https://s3.amazonaws.com/github/ribbons/forkme_left_white_ffffff.png',
        alt: 'Fork me on GitHub'
      }).setStyle({ border: 'none' }).wrap(new global.Element('a', {
        href: 'https://github.com/supercaracal/duelshooting_online'
      })).setStyle({
        position: 'fixed',
        zIndex: this.Z_INDEX_BASE + 4000
      });
    },

    getInitTop: function getInitTop() {
      return 0;
    },

    getInitLeft: function getInitLeft() {
      return 0;
    }
  });
}(window));
