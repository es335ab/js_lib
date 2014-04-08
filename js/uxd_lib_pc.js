'use strict';

var UXDLIB_PC = {};

//heightAdjust
(function(UXDLIB_PC){
  UXDLIB_PC.heightAdjust = function(args){
    this.$targetList = $(args.targetId + ' li');
    this.targetlistlength = this.$targetList.length;
    this.multipleNum = args.multipleNum;
    this.remainderNum = this.targetlistlength % this.multipleNum;
    this.heightVal = 0;
    this.mostHighVal = 0;
    this.comparisonArr = [];

    this.init();
  }

  var fn = UXDLIB_PC.heightAdjust.prototype;

  fn.init = function(){
    for(var i = 0, I = this.targetlistlength; i < I; i++){
      this.heightVal = this.$targetList.eq(i).height();
      this.comparisonArr.push(this.heightVal);

      if((i + 1) % this.multipleNum === 0) this.adjustFunction(i);

      if(i === (this.targetlistlength - 1)) this.adjustFunctionLast();
    }
  }

  fn.getMostHighVal = function(){
    this.comparisonArr = this.comparisonArr.sort(function(a, b){
      if(a < b) return 1;
      if(a > b) return -1;
      return 0;
    });
    this.mostHighVal = this.comparisonArr[0];
  }

  fn.adjustFunction = function(parentNum){
    this.getMostHighVal();
    for(var j = 0; j < (this.multipleNum - 1); j++){
      this.$targetList.eq(parentNum - 1 - j).css('height', this.mostHighVal + 'px');
    }
    this.comparisonArr = [];
  }

  fn.adjustFunctionLast = function(){
    this.getMostHighVal();
    for(var k = 0; k < this.remainderNum; k++){
      this.$targetList.eq(this.targetlistlength - 1 - k).css('height', this.mostHighVal + 'px');
    }
  }

})(UXDLIB_PC || (UXDLIB_PC = {}));
