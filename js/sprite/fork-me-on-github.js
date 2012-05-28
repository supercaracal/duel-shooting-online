var ForkMeOnGitHub = Class.create(Sprite, {

    createElement: function() {
        return new Element('img', {
            src: 'https://s3.amazonaws.com/github/ribbons/forkme_left_white_ffffff.png',
            alt: 'Fork me on GitHub'
        }).wrap(new Element('a', {
            href: 'https://github.com/supercaracal/duelshooting_online'
        })).setStyle({
            position: 'fixed',
            zIndex: this.Z_INDEX_BASE + 4000
        });
    },

    getInitTop: function() {
        return 0;
    },

    getInitLeft: function() {
        return 0;
    }
});
