'use strict';

var UXDLIB_SP = {};

//tap
(function(UXDLIB_SP){
  UXDLIB_SP.tap = function(args){
    this.targetClassName = document.getElementsByClassName(args.targetClassName);
    this.addClassName = args.addClassName;

    this.init();
  }

  var fn = UXDLIB_SP.tap.prototype;

  fn.init = function(){
    var self = this;
    for(var i = 0 ,I = this.targetClassName.length; i < I; i++){
      (function(l) {
        self.targetClassName[l].addEventListener('touchstart', function(){
          self.addTapped(l);
        },false);
      })(i);

      (function(l) {
         self.targetClassName[l].addEventListener('touchmove', function(){
           self.removeTapped(l);
        },false);
      })(i);

      (function(l) {
        self.targetClassName[l].addEventListener('touchend', function(){
          self.removeTapped(l);
        },false);
      })(i);
    }

    fn.addTapped = function(num){
      this.targetClassName[num].classList.add(this.addClassName);
    };

    fn.removeTapped = function(num){
      this.targetClassName[num].classList.remove(this.addClassName);
    };
  }

  UXDLIB_SP.modal = function(args){
    for(var n = 0 ,N = args.length; n < N; n++){
      this.triggerClassName = document.getElementsByClassName(args[n].triggerClassName);
      this.targetClassName = args[n].targetClassName;
      this.bgModal = args[n].bgModal;
      this.triggerClose = document.getElementsByClassName(args[n].triggerClose);
      this.paddingTop = args[n].paddingTop;
    }

    this.init();
  }

  var fn = UXDLIB_SP.modal.prototype;

  fn.init = function(){
    var self = this;

    for(var i = 0 ,I = self.triggerClassName.length; i < I; i++){
      (function(l) {
        self.triggerClassName[l].addEventListener('touchstart', function(evt){
          self.addWindow(l, document, window, evt);
        },false);
      })(i);
    }

    for(var i = 0 ,I = self.triggerClose.length; i < I; i++){
      (function(l) {
      self.triggerClose[l].addEventListener('touchstart', function(evt){
        self.removeWindow(evt, document);
      },false);
      })(i);
    }

    document.body.addEventListener('touchstart', function(evt){
      if(evt.target.className === self.bgModal + ' showModal') {
      self.removeWindow(evt, document);
      }
    },false);

    fn.addWindow = function(num, doc, win, e){
      var modalWrp = doc.getElementsByClassName(this.targetClassName),
          bgModalWrp = doc.getElementsByClassName(this.bgModal);
      modalWrp[num].classList.add('showModal');
      bgModalWrp[0].classList.add('showModal');

      bgModalWrp[0].setAttribute('style', 'width:' + doc.body.clientWidth + 'px;height:' + doc.body.clientHeight + 'px;');
      modalWrp[num].setAttribute('style','top:' + (e.view.scrollY + this.paddingTop) + 'px;left:' + e.view.scrollX + 'px;');
    };

    fn.removeWindow = function(e, doc){
      doc.getElementsByClassName(this.bgModal)[0].classList.remove('showModal');
      for(var m = 0 ,M = doc.getElementsByClassName(this.targetClassName).length; m < M; m++){
        doc.getElementsByClassName(this.targetClassName)[m].classList.remove('showModal');
      }
    }
  }

})(UXDLIB_SP || (UXDLIB_SP = {}));
