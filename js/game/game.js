var Game = Class.create({

    INTERVAL_WAIT_MSEC: 16,

    timerId: null,
    routine: null,

    initialize: function(routine) {
        this.routine = routine;
    },

    start: function() {
        if (this.timerId !== null) return;
        this.timerId = setInterval(this.routine, this.INTERVAL_WAIT_MSEC);
    },

    pause: function() {
        this.timerId === null ? this.start() : this.stop();
    },

    stop: function() {
        clearInterval(this.timerId);
        this.timerId = null;
    }
});
