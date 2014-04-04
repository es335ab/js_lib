'use strict';

var UXDLIB_SP = {};

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

})(UXDLIB_SP || (UXDLIB_SP = {}));