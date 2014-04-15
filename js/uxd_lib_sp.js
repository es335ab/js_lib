'use strict';

var UXDLIB_SP = {};

//tap
(function (UXDLIB_SP) {
  UXDLIB_SP.tap = function (args) {
    this.targetClassName = document.getElementsByClassName(args.targetClassName);
    this.addClassName = args.addClassName;

    this.init();
  }

  var fn = UXDLIB_SP.tap.prototype;

  fn.init = function () {
    var self = this;
    for (var i = 0 , I = this.targetClassName.length; i < I; i++) {
      (function (l) {
        self.targetClassName[l].addEventListener('touchstart', function () {
          self.addTapped(l);
        }, false);
      })(i);

      (function (l) {
        self.targetClassName[l].addEventListener('touchmove', function () {
          self.removeTapped(l);
        }, false);
      })(i);

      (function (l) {
        self.targetClassName[l].addEventListener('touchend', function () {
          self.removeTapped(l);
        }, false);
      })(i);
    }

    fn.addTapped = function (num) {
      this.targetClassName[num].classList.add(this.addClassName);
    };

    fn.removeTapped = function (num) {
      this.targetClassName[num].classList.remove(this.addClassName);
    };
  }

  UXDLIB_SP.modal = function(args){
      this.triggerClassName = document.getElementsByClassName(args.triggerClassName);
      this.targetClassName = args.targetClassName;
      this.bgModal = args.bgModal;
      this.triggerClose = document.getElementsByClassName(args.triggerClose);
      this.topPadding = args.topPadding;
      this.eventType = args.eventType;
      this.modalSingleMode = args.modalSingleMode;
      this.loadEvent = args.loadEvent;
      this.callBackOpen = args.callBackOpen;

    this.init();
  }

  var fn = UXDLIB_SP.modal.prototype;

  fn.init = function () {
    var self = this;

    if (self.loadEvent) {
      document.addEventListener('DOMContentLoaded', function (evt) {
        self.addWindow(0, document, window, evt);
      }, false);
    }

    for (var i = 0 , I = this.triggerClassName.length; i < I; i++) {
      (function (l) {
        self.triggerClassName[l].addEventListener(self.eventType, function (evt) {
          self.addWindow(l, document, window, evt);
        }, false);
      })(i);
    }

    for (var i = 0 , I = this.triggerClose.length; i < I; i++) {
      (function (l) {
        self.triggerClose[l].addEventListener(self.eventType, function (evt) {
          self.removeWindow(evt, document);
        }, false);
      })(i);
    }

    document.body.addEventListener(self.eventType, function (evt) {
      if (evt.target.className === self.bgModal + ' showModal') {
        self.removeWindow(evt, document);
      }
    }, false);

  }
  fn.addWindow = function (num, doc, win, e) {
    var modalWrp = doc.getElementsByClassName(this.targetClassName),
        bgModalWrp = doc.getElementsByClassName(this.bgModal);
    bgModalWrp[0].classList.add('showModal');
    bgModalWrp[0].setAttribute('style', 'width:' + doc.body.clientWidth + 'px;height:' + doc.body.clientHeight + 'px;');
    if (this.modalSingleMode) {
      modalWrp[0].classList.add('showModal');
      modalWrp[0].setAttribute('style', 'top:' + (e.view.scrollY + this.topPadding) + 'px;');
    } else if (this.loadEvent) {
      console.log(e.view);
      modalWrp[0].classList.add('showModal');
      modalWrp[0].setAttribute('style', 'top:' + this.topPadding + 'px;');
    } else {
      modalWrp[num].classList.add('showModal');
      modalWrp[num].setAttribute('style', 'top:' + (e.view.scrollY + this.topPadding) + 'px;');
    }
    if (this.callBackOpen) {
      this.callBackOpen(e);
    }
  };

  fn.removeWindow = function (e, doc) {
    doc.getElementsByClassName(this.bgModal)[0].classList.remove('showModal');
    if (this.modalSingleMode) {
      doc.getElementsByClassName(this.targetClassName)[0].classList.remove('showModal');
    } else {
      for (var m = 0 , M = doc.getElementsByClassName(this.targetClassName).length; m < M; m++) {
        doc.getElementsByClassName(this.targetClassName)[m].classList.remove('showModal');
      }
    }
  }

})(UXDLIB_SP || (UXDLIB_SP = {}));
