var Sprite = Class.create({

    Z_INDEX_BASE: 3000,

    clientHeight: null,
    clientWidth: null,

    elm: null,

    initTop: null,
    initLeft: null,
    initTransformRotate: null,

    currentTop: null,
    currentLeft: null,
    currentTransformRotate: null,

    initialize: function() {
        this.clientHeight = this.getClientHeight();
        this.clientWidth = this.getClientWidth();
        this.elm = this.createElement();
        this.initTop = this.getInitTop();
        this.initLeft = this.getInitLeft();
        this.initTransformRotate = this.getInitTransformRotate();
        this.setupPosition();
    },

    createElement: function() {
        return new Element('div');
    },

    getInitTop: function() {
        return 0;
    },

    getInitLeft: function() {
        return 0;
    },

    getInitTransformRotate: function() {
        return 0;
    },

    setupPosition: function() {
        this.setPos({top: this.initTop, left: this.initLeft});
    },

    resetPosition: function() {
        this.clientHeight = this.getClientHeight();
        this.clientWidth = this.getClientWidth();
        this.setupPosition();
    },

    getClientHeight: function() {
        return 480;

        var height = document.viewport.getHeight();
        return height - (height % 10);
    },

    getClientWidth: function() {
        return 720;

        var width = document.viewport.getWidth();
        return width - (width % 10);
    },

    renderElement: function() {
        $(document.body).insert(this.elm);
    },

    getTop: function () {
        return this.currentTop;
    },

    getLeft: function () {
        return this.currentLeft;
    },

    getPos: function () {
        return {top: this.currentTop, left: this.currentLeft};
    },

    getTransformRotate: function () {
        return this.currentTransformRotate;
    },

    setTop: function (px) {
        this.elm.setStyle({top: px + 'px'});
        this.currentTop = px;
    },

    setLeft: function (px) {
        this.elm.setStyle({left: px + 'px'});
        this.currentLeft = px;
    },

    setPos: function (pxs) {
        if (pxs['top'] !== undefined) this.setTop(pxs.top);
        if (pxs['left'] !== undefined) this.setLeft(pxs.left);
    },

    setTransformRotate: function (theta) {
        this.elm.setStyle({
            webkitTransform: 'rotate(' + theta + 'deg)',
            MozTransform: 'rotate(' + theta + 'deg)',
            msTransform: 'rotate(' + theta + 'deg)',
            transform: 'rotate(' + theta + 'deg)'
        });
        this.currentTransformRotate = theta;
    }
});
