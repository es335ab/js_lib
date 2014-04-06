'use strict';

var UXDLIB_PC = {};

//heightAdjust
(function(UXDLIB_PC){
  UXDLIB_PC.heightAdjust = function(args){
    this.$targetList = $(args.targetId + ' li');
    this.targetlistlength = $targetList.length;
    this.multipleNum = args.multipleNum;
    this.comparisonArr = [];

    this.init();
  }

  var fn = UXDLIB_PC.heightAdjust.prototype;

  fn.init = function(){
    for(var i = 0 ,I = this.targetlistlength; i < I; i++){
      this.$targetList
    }
  }

})(UXDLIB_PC || (UXDLIB_PC = {}));
