'use strict';

var UXDLIB_PC = {};


(function(UXDLIB_PC){
  //heightAdjust
  UXDLIB_PC.heightAdjust = function(args){
    this.$targetList = $(args.targetId + ' li');
    this.targetlistlength = this.$targetList.length;
    this.multipleNum = args.multipleNum;
    this.remainderNum = this.targetlistlength % this.multipleNum;
    this.heightVal = 0;
    this.mostHighestVal = 0;
    this.comparisonArr = [];

    this.init();
  }

  var proto = UXDLIB_PC.heightAdjust.prototype;

  proto.init = function(){
    for(var i = 0, I = this.targetlistlength; i < I; i++){
      this.heightVal = this.$targetList.eq(i).height();
      this.comparisonArr.push(this.heightVal);

      if((i + 1) % this.multipleNum === 0) this.adjustFunction(i);

      if(i === (this.targetlistlength - 1)) this.adjustFunctionLast();
    }
  }

  proto.getMostHighestVal = function(){
    this.comparisonArr = this.comparisonArr.sort(function(a, b){
      if(a < b) return 1;
      if(a > b) return -1;
      return 0;
    });
    this.mostHighestVal = this.comparisonArr[0];
  }

  proto.adjustFunction = function(parentNum){
    this.getMostHighestVal();
    for(var j = 0; j < (this.multipleNum - 1); j++){
      this.$targetList.eq(parentNum - 1 - j).css('height', this.mostHighestVal + 'px');
    }
    this.comparisonArr = [];
  }

  proto.adjustFunctionLast = function(){
    this.getMostHighestVal();
    for(var k = 0; k < this.remainderNum; k++){
      this.$targetList.eq(this.targetlistlength - 1 - k).css('height', this.mostHighestVal + 'px');
    }
  }

  //modal
  UXDLIB_PC.modal = function(args){
    this.triggerClassName = $('.' + args.triggerClassName);
    this.targetClassName = args.targetClassName;
    this.bgModal = args.bgModal;
    this.topPadding = args.topPadding;
    this.triggerClose = $('.' + args.triggerClose);
    this.topPadding = args.topPadding;
    this.modalSingleMode = args.modalSingleMode;
    this.loadEvent = args.loadEvent;
    this.callBackOpen = args.callBackOpen;
    this.body = $('body');

    this.init();
  }

  var proto = UXDLIB_PC.modal.prototype;

  proto.init = function(){
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

  }

  proto.addWindow = function(num, e){
    var modalWrp = $('.' + this.targetClassName),
        bgModalWrp = $('.' + this.bgModal);
    bgModalWrp.addClass('showModal');
    bgModalWrp.attr('style', 'width:' + this.body.width() + 'px;height:' + this.body.height() + 'px;');
    modalWrp.attr('style','top:' + (this.body.scrollTop() + this.topPadding) + 'px;');
    modalWrp.addClass('showModal');
    if(this.callBackOpen){
      this.callBackOpen(e);
    }
  };

  proto.removeWindow = function(){
    $('.' + this.bgModal).removeClass('showModal');
    if(this.modalSingleMode){
      $('.' + this.targetClassName).removeClass('showModal');
    }else {
      for(var m = 0 ,M = $('.' + this.targetClassName).length; m < M; m++){
        $('.' + this.targetClassName).removeClass('showModal');
      }
    }
  }

  proto.addWindow = function (num, e) {
    var modalWrp = $('.' + this.targetClassName),
        bgModalWrp = $('.' + this.bgModal);
    bgModalWrp.addClass('showModal');
    bgModalWrp.attr('style', 'width:' + this.body.width() + 'px;height:' + this.body.height() + 'px;');

    modalWrp.addClass('showModal');
    modalWrp.attr('style', 'top:' + (this.body.scrollTop() + this.topPadding) + 'px;');
    if (this.callBackOpen) {
      this.callBackOpen(e);
    }
  };

  proto.removeWindow = function () {
    $('.' + this.bgModal).removeClass('showModal');
    if (this.modalSingleMode) {
      $('.' + this.targetClassName).removeClass('showModal');
    } else {
      for (var m = 0 , M = $('.' + this.targetClassName).length; m < M; m++) {
        $('.' + this.targetClassName).removeClass('showModal');
      }
    }
  }

  //UA check
  UXDLIB_PC.uaCheck = function (args) {
    this.callBackOpen = args.callBackOpen;
    this.ua = navigator.userAgent;
    this.msie = this.ua.indexOf('MSIE');
    this.ff = this.ua.indexOf('Firefox');
    this.chrome = this.ua.indexOf('Chrome');
    this.safari = this.ua.indexOf('Safari');
    this.opera = this.ua.indexOf('opera');
    this.iPhone = this.ua.indexOf('iPhone');
    this.iPad = this.ua.indexOf('iPad');
    this.iPod = this.ua.indexOf('iPod');
    this.Android = this.ua.indexOf('Android');
    this.Tablet = this.ua.indexOf('Tablet');
    this.Nexus = this.ua.indexOf('Nexus');
    this.device1 = '';
    this.device2 = '';
    this.version = '';
    this.browser = '';
    this.arryUA = [];
    this.init();
  }

  var proto = UXDLIB_PC.uaCheck.prototype;

  proto.init = function (evt) {
    var self = this,
        device = self.deviceCheck();
    this.callBackOpen(device);
  }

  proto.deviceCheck = function () {

    this.browser = this.browserCheck();
    if (this.iPhone !== -1 || this.iPad !== -1 || this.iPod !== -1 || this.Android !== -1) {
      //SP
      if(this.Tablet !== -1) {
        this.device1 = 'TABLET';
      }else {
        if(this.Nexus !== -1) {
          this.device1 = 'TABLET';
        }else {
         this.device1 = 'SP';
        }
      }
      this.browser = this.browserCheck();
      //Android
      if (this.Android !== -1) {
        this.device2 = 'Android';
        //android2.2以下
        if (this.lowerAndroid(2.2) == true) {
          this.version = '2.1';
        } else {
          //Android2.2~4.3
          switch (parseFloat(this.ua.toLowerCase().slice(this.ua.indexOf("Android") + 8))) {
            case 2.2:
              this.version = '2.2';
              break;
            case 2.3:
              this.version = '2.3';
              break;
            case 4.0:
              this.version = '4.0';
              break;
            case 4.1:
              this.version = '4.1';
              break;
            case 4.2:
              this.version = '4.2';
              break;
            case 4.3:
              this.version = '4.3';
              break;
          }
        }
      }else if(this.iPhone !== -1){
        this.device2 = 'iPhone';
      }else if(this.iPod !== -1){
        this.device2 = 'iPod';
      }else if(this.iPad !== -1){
        this.device2 = 'iPad';
      }
    } else {
      //PC
      this.device1 = 'PC';
    }
    this.arryUA = [this.device1, this.device2, this.version, this.browser];

    return this.arryUA;
  }

  proto.lowerAndroid = function (n) {
    var flag = false,
        ua_lower = navigator.userAgent.toLowerCase(),
        version = ua_lower.substr(ua_lower.indexOf('android') + 8, 3);
    if (ua_lower.indexOf("android")) if (parseFloat(version) < n) flag = true;
    return flag;
  }

  proto.browserCheck = function () {
    if (this.msie !== -1 && this.device1 === 'PC') {
      //IE
      this.browser = 'msie';
    } else if (this.ff !== -1) {
      //FF
      this.browser = 'FF';
    } else if (this.chrome !== -1) {
      //chrome
      this.browser = 'chrome';
    } else if (this.safari !== -1) {
      //safari
      this.browser = 'safari';
    } else if (this.opera !== -1) {
      //opera
      this.browser = 'opera';
    }
    return this.browser;
  }

})(UXDLIB_PC || (UXDLIB_PC = {}));
