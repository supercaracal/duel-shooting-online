var Chat = Class.create({

    elms: null,

    initialize: function() {
        this.elms = [];
    },

    add: function(text) {
        var elm = new NicoNico(text);
        elm.renderElement();
        this.elms.push(elm);
    },

    move: function() {
        for (var i = 0, len = this.elms.size(); i < len; i++) {
            this.elms[i].move();
            if (this.elms[i].isDelete) this.elms[i] = null;
        }
        this.elms = this.elms.compact();
    }
});
