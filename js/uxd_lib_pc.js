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

  //Carousel
  UXDLIB_PC.carousel = function (args) {
    this.targetId = $(args.targetId);
    this.targetContents = this.targetId.find(args.contents);
    this.lamp = (args.lamp) ? $(args.lamp): false;
    this.autoChange = (args.autoChange) ? args.autoChange: false;
    this.autoTimer = (args.autoTimer) ? args.autoTimer: 5000;
    this.loop = (args.loop) ? args.loop: false;
    this.btnPrev = (args.btn) ? $(args.btn.prev): false;
    this.btnNext = (args.btn) ? $(args.btn.next): false;
    this.btnFlag = (args.btn) ? true: false;
    this.nextAnimationFlag = false;
    this.prevAnimationFlag = false;

    this.lamps = [];
    this.colWidth = 0;
    this.colNum = 0;
    this.colPos = 0;
    this.colOffset = 1;

    this.init();
  }

  var proto = UXDLIB_PC.carousel.prototype;

  proto.init = function() {
    this.initDom();
    this.initLamp();
    this.autoChangeFunc();
  }

  proto.initDom = function(){
    this.colWidth = this.targetContents.children('.item').outerWidth(true),
    this.colNum = this.targetContents.children('.item').length;
    this.targetContents.css('width', (this.colWidth * this.colNum) + 'px');

    if(this.loop){
      this.targetContents.children('.item:last').prependTo(this.targetContents);
      this.targetContents.css("margin-left", - this.colWidth + 'px');
    };

    if(this.btnFlag){
      this.setNextEvent();
      this.setPrevEvent();
      this.chcekPostion();
    }
  }

  proto.nextAnimation = function(){
    var self = this;

    this.nextAnimationFlag = true;

    this.targetContents.animate({
        marginLeft: parseInt(self.targetContents.css('margin-left')) - (self.colWidth * self.colOffset) + 'px'
      },
      'show', function(){
        if(self.loop){
          self.targetContents.find('div.item:first').appendTo(self.targetContents);
          self.targetContents.css("margin-left", - self.colWidth + 'px');
          self.colPos %= self.colNum;
        }
        self.chcekPostion();
        self.setLamps();
        self.nextAnimationFlag = false;
    });
  }

  proto.prevAnimation = function(){
    var self = this;

    this.prevAnimationFlag = true;

    this.targetContents.animate({
        marginLeft: parseInt(self.targetContents.css('margin-left')) + (self.colWidth * self.colOffset) + 'px'
      },
      'show', function(){
        if(self.loop){
          self.targetContents.find('div.item:last').prependTo(self.targetContents);
          self.targetContents.css("margin-left", - self.colWidth + 'px');
          if(self.colPos < 0) self.colPos += self.colNum;
        }
        self.chcekPostion();
        self.setLamps();
        self.prevAnimationFlag = false;
    });
  }

  proto.setNextEvent = function(){
    var self = this;
    this.btnNext.click(function(){
      if(!self.nextAnimationFlag){
        self.colPos++;
        self.colOffset = 1;
        self.nextAnimation();
      }
    });
  }

  proto.setPrevEvent = function(){
    var self = this;
    this.btnPrev.click(function(){
      if(!self.prevAnimationFlag){
        self.colPos--;
        self.colOffset = 1;
        self.prevAnimation();
      }
    });
  }

  proto.autoChangeFunc = function(){
    if(this.autoChange){
      var self = this;
      setInterval(function(){
        if(!self.nextAnimationFlag){
          self.colPos++;
          self.colOffset = 1;
          self.nextAnimation();
        }
      }, this.autoTimer);
    }
  }

  proto.chcekPostion = function(){
    if(this.btnFlag){
      if(this.btnNext.attr('disabled') !== undefined) this.btnNext.removeAttr('disabled');
      if(this.btnPrev.attr('disabled') !== undefined) this.btnPrev.removeAttr('disabled');
    }
    if(!this.loop){
      if(this.colPos == this.colNum - 1){
        this.btnNext.attr('disabled', true);
      }
      else if(this.colPos == 0){
        this.btnPrev.attr('disabled', true);
      }
    }
  }

  proto.initLamp = function(){
    var self = this;
    if(this.lamp){
      for(var i = 0; i < this.colNum; i++){
        this.lamps[i] = $("<div>");
        (function(pos){
          self.lamps[pos].click(function() {
            if(self.colPos < pos){
              if(!self.nextAnimationFlag){
                self.colOffset = pos - self.colPos;
                self.colPos = pos;
                self.nextAnimation();
              }
            }
            else if(self.colPos > pos){
              if(!self.prevAnimationFlag){
                self.colOffset = self.colPos - pos;
                self.colPos = pos;
                self.prevAnimation();
              }
            }
          });
        })(i);
        this.lamp.append(this.lamps[i]);
      }
      this.setLamps();
    }
  }

  proto.setLamps = function(){
    if(this.lamp){
      console.log(this.colPos);
      for(var i = 0; i < this.colNum; i++){
        this.lamps[i].removeClass('current');
      }
      this.lamps[this.colPos].addClass('current');
    }
  }

})(UXDLIB_PC || (UXDLIB_PC = {}));
