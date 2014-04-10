'use strict';

var UXDLIB_PC = {};


(function(UXDLIB_PC){
  //heightAdjust
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

  //modal
  UXDLIB_PC.modal = function(args){
    this.triggerClassName = $('.' + args.triggerClassName);
    this.targetClassName = args.targetClassName;
    this.bgModal = args.bgModal;
    this.triggerClose = $('.' + args.triggerClose);
    this.padding = args.padding;
    this.modalShingleMode = args.modalShingleMode;
    this.loadEvent = args.loadEvent;
    this.callBackOpen = args.callBackOpen;
    this.body = $('body');

    this.init();
  }

  var fn = UXDLIB_PC.modal.prototype;

  fn.init = function(){
    var self = this;

    if(self.loadEvent){
      $(document).ready(function(evt){
        self.addWindow(0, evt);
      });
    }

    for(var i = 0 ,I = self.triggerClassName.length; i < I; i++){
      (function(l) {
        self.triggerClassName.bind('click', function(evt){
          self.addWindow(l, evt);
        });
      })(i);
    }

    for(var i = 0 ,I = self.triggerClose.length; i < I; i++){
      (function(l) {
        self.triggerClose.bind('click', function(evt){
          self.removeWindow();
        });
      })(i);
    }

    self.body.bind('click', function(evt){
      if(evt.target.className === self.bgModal + ' showModal') {
        self.removeWindow();
      }
    });

    fn.addWindow = function(num, e){
      var modalWrp = $('.' + this.targetClassName),
          bgModalWrp = $('.' + this.bgModal);
      bgModalWrp.addClass('showModal');
      bgModalWrp.attr('style', 'width:' + this.body.width() + 'px;height:' + this.body.height() + 'px;');
      if(this.modalShingleMode){
        modalWrp.addClass('showModal');
        modalWrp.attr('style','top:' + (this.body.scrollTop() + this.padding) + 'px;left:' + this.padding + 'px;');
      } else if(this.loadEvent){
        modalWrp.addClass('showModal');
        modalWrp.attr('style','top:' + (0 + this.padding) + 'px;left:' + this.padding + 'px;');
      }else{
        modalWrp.addClass('showModal');
        modalWrp.attr('style','top:' + (this.body.scrollTop() + this.padding) + 'px;left:' + this.padding + 'px;');
      }
      if(this.callBackOpen){
        this.callBackOpen(e);
      }
    };

    fn.removeWindow = function(){
      $('.' + this.bgModal).removeClass('showModal');
      if(this.modalShingleMode){
        $('.' + this.targetClassName).removeClass('showModal');
      }else {
        for(var m = 0 ,M = $('.' + this.targetClassName).length; m < M; m++){
          $('.' + this.targetClassName).removeClass('showModal');
        }
      }
    }
  }

})(UXDLIB_PC || (UXDLIB_PC = {}));
