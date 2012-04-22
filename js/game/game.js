var Game = Class.create({

    INTERVAL_WAIT_MSEC: 16,

    timerId: null,

    routine: null,

    finalize: null,

    redeploy: null,

    initialize: function(routine, finalize, redeploy) {
        this.routine = routine;
        this.finalize = finalize || Prototype.emptyFunction;
        this.redeploy = redeploy || Prototype.emptyFunction;
        Number.prototype.isTiming = (function (num) { return Math.floor(Math.random() * 100) % num === 0; }).methodize();
        Event.observe(window, 'resize', this.redeploy.bindAsEventListener(this));
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
        this.finalize();
    }
});
