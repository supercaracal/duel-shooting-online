(function f(global) {
  'use strict';

  var g = global;

  g.Sprite = global.Class.create({

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

    initialize: function initialize() {
      this.clientHeight = this.getClientHeight();
      this.clientWidth = this.getClientWidth();
      this.elm = this.createElement();
      this.initTop = this.getInitTop();
      this.initLeft = this.getInitLeft();
      this.initTransformRotate = this.getInitTransformRotate();
      this.setupPosition();
    },

    createElement: function createElement() {
      return new Element('div');
    },

    getInitTop: function getInitTop() {
      return 0;
    },

    getInitLeft: function getInitLeft() {
      return 0;
    },

    getInitTransformRotate: function getInitTransformRotate() {
      return 0;
    },

    setupPosition: function setupPosition() {
      this.setPos({ top: this.initTop, left: this.initLeft });
    },

    resetPosition: function resetPosition() {
      this.clientHeight = this.getClientHeight();
      this.clientWidth = this.getClientWidth();
      this.setupPosition();
    },

    getClientHeight: function getClientHeight() {
      return 480;
    },

    getClientWidth: function getClientWidth() {
      return 720;
    },

    renderElement: function renderElement() {
      global.$(document.body).insert(this.elm);
    },

    getTop: function getTop() {
      return this.currentTop;
    },

    getLeft: function getLeft() {
      return this.currentLeft;
    },

    getPos: function getPos() {
      return { top: this.currentTop, left: this.currentLeft };
    },

    getTransformRotate: function getTransformRotate() {
      return this.currentTransformRotate;
    },

    setTop: function setTop(px) {
      this.elm.setStyle({ top: px + 'px' });
      this.currentTop = px;
    },

    setLeft: function setLeft(px) {
      this.elm.setStyle({ left: px + 'px' });
      this.currentLeft = px;
    },

    setPos: function setPos(pxs) {
      if (pxs.top !== undefined) this.setTop(pxs.top);
      if (pxs.left !== undefined) this.setLeft(pxs.left);
    },

    setTransformRotate: function setTransformRotate(theta) {
      this.elm.setStyle({
        webkitTransform: 'rotate(' + theta + 'deg)',
        MozTransform: 'rotate(' + theta + 'deg)',
        msTransform: 'rotate(' + theta + 'deg)',
        transform: 'rotate(' + theta + 'deg)'
      });
      this.currentTransformRotate = theta;
    },

    setOpacity: function setOpacity(v) {
      this.elm.setOpacity(v);
    },

    remove: function remove() {
      this.elm.remove();
    }
  });
}(window));
