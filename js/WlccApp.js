var WlccApp;

WlccApp = (function() {
  WlccApp.prototype.errorClass = "error";

  WlccApp.prototype.curOffset = [0, 0];

  WlccApp.prototype.eventHandlers = {
    formSubmitClick: function() {
      return true;
    },
    hidePopupClick: function() {
      return true;
    },
    showPopupClick: function() {
      return true;
    },
    toggleClassClick: function() {
      var $this, className, targetMethod, targetSelector, toggleInfo;

      $this = $(this);
      toggleInfo = $this.data("toggle-class").split("|");
      className = toggleInfo[0];
      targetMethod = toggleInfo[1];
      targetSelector = toggleInfo[2];
      if (targetMethod === "closest") {
        $this.closest(targetSelector).toggleClass(className);
      } else if (targetMethod === "any") {
        $(targetSelector).toggleClass(className);
      }
      return true;
    },
    regUserClick: function() {
      $('body').removeClass('auth-opened').addClass('registration-opened');
      return true;
    },
    authUserClick: function() {
      $('body').removeClass('registration-opened').addClass('auth-opened');
      return true;
    },
    windowScroll: function(e) {
      var self;

      self = e.data.self;
      return true;
    },
    postEditBtnClick: function() {
      $(this).closest('.post').addClass('editable').find('.post__article p, .post__article h2').attr('contenteditable', 'true');
      return true;
    },
    postCancelEditBtnClick: function() {
      return true;
    }
  };

  WlccApp.prototype.attachEvents = function() {
    var self;

    self = this;
    $("[data-toggle-class]").on('click', {
      self: self
    }, self.eventHandlers.toggleClassClick);
    $(".btn_activated").on('click', {
      self: self
    }, function() {
      return $(this).toggleClass('active');
    });
    $(".form input[type=submit]").on('click', {
      self: self
    }, self.eventHandlers.formSubmitClick);
    $(".modal-overlay, .modal__close").on('click', {
      self: self
    }, self.eventHandlers.hidePopupClick);
    $("[data-modal-show]").on('click', {
      self: self
    }, self.eventHandlers.showPopupClick);
    $(".post__edit-btn").on('click', {
      self: self
    }, self.eventHandlers.postEditBtnClick);
    $(".post__edit-btn").on('click', {
      self: self
    }, self.eventHandlers.postEditBtnClick);
    $(window).on('scroll load resize', {
      self: self
    }, self.eventHandlers.windowScroll);
    $(".regUser").on('click', {
      self: self
    }, self.eventHandlers.regUserClick);
    $(".authUser").on('click', {
      self: self
    }, self.eventHandlers.authUserClick);
    return true;
  };

  WlccApp.prototype.validate = function(form) {
    var hasErrors, inputs, self, validateGeneral, validateOnEmail, validateOnEmpty, validateOnPhone;

    hasErrors = 0;
    inputs = form.find("[data-validate]");
    self = this;
    validateGeneral = function(input, flag) {
      if (flag) {
        input["removeClass"](self.errorClass);
      } else {
        hasErrors++;
        input["addClass"](self.errorClass);
      }
      return false;
    };
    validateOnEmpty = function(input) {
      var inputLength, length;

      length = 2;
      inputLength = input.val().length;
      validateGeneral(input, inputLength >= length);
    };
    validateOnEmail = function(input) {
      var res;

      res = /^([a-zA-Z0-9+_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      validateGeneral(input, res.test(input.val()));
    };
    validateOnPhone = function(input) {
      var regex;

      regex = /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/;
      validateGeneral(input, regex.test(input.val()));
    };
    inputs.each(function(i, el) {
      var $el;

      $el = $(el);
      switch ($el.attr("data-validate")) {
        case "empty":
          validateOnEmpty($el);
          break;
        case "email":
          validateOnEmail($el);
          break;
        case "tel":
          validateOnPhone($el);
          break;
        default:
          validateOnEmpty($el);
      }
    });
    return hasErrors === 0;
  };

  /*
  * ajax sending form data
  * @param form - form that needs to send, action attr needed
  */


  WlccApp.prototype.sendDataAsync = function(form, dataType, showStatusText, actionButton) {
    var data, originText, self, submit, url;

    if (dataType == null) {
      dataType = "text";
    }
    if (showStatusText == null) {
      showStatusText = "Sending ...";
    }
    if (actionButton == null) {
      actionButton = "input[type=submit]";
    }
    data = form.serialize();
    url = form.attr("action");
    submit = form.find(actionButton);
    originText = submit.val();
    submit.val(showStatusText);
    self = this;
    return $.ajax({
      "type": "get",
      "url": url,
      "data": data,
      "dataType": dataType,
      success: function(response) {
        submit.val(originText);
      },
      error: function(err) {
        console.log(err);
        submit.val(originText);
      }
    });
  };

  WlccApp.prototype.initSliders = function() {
    $(".slider__slide");
    return false;
  };

  WlccApp.prototype.initTelMask = function() {
    $(".tel-input").mask("(999) 999-9999");
    return false;
  };

  WlccApp.prototype.replaceImagesToRetina = function() {
    var dpr;

    if (window.devicePixelRatio !== void 0) {
      dpr = window.devicePixelRatio;
      if (dpr === 2) {
        $("[data-src-retina]").each(function(i, el) {
          var img, src;

          img = $(el);
          src = img.data("srcRetina");
          img.attr("src", src);
        });
      }
    }
  };

  WlccApp.prototype.initMap = function() {
    var map, mapEl, mapLatLng, mapOptions, marker, markerLatLng;

    markerLatLng = new google.maps.LatLng(30.269622, -97.742325);
    mapLatLng = new google.maps.LatLng(30.269622, -97.732325);
    mapEl = document.getElementById('map-canvas');
    if (mapEl !== null) {
      mapOptions = {
        zoom: 15,
        center: mapLatLng,
        disableDefaultUI: true,
        zoomControl: false,
        scaleControl: false,
        scrollwheel: false,
        disableDoubleClickZoom: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      map = new google.maps.Map(mapEl, mapOptions);
      marker = new google.maps.Marker({
        position: markerLatLng,
        map: map,
        icon: "images/marker.png"
      });
    }
  };

  WlccApp.prototype.initPlaceholder = function() {
    if (!Modernizr.input.placeholder) {
      $("[placeholder]").focus(function() {
        var input;

        input = $(this);
        if (input.val() === input.attr("placeholder")) {
          input.val("");
          return input.removeClass("placeholder");
        }
      }).blur(function() {
        var input;

        input = $(this);
        if (input.val() === "" || input.val() === input.attr("placeholder")) {
          input.addClass("placeholder");
          return input.val(input.attr("placeholder"));
        }
      }).blur();
      $("[placeholder]").parents("form").submit(function() {
        return $(this).find("[placeholder]").each(function() {
          var input;

          input = $(this);
          if (input.val() === input.attr("placeholder")) {
            return input.val("");
          }
        });
      });
    }
    return false;
  };

  WlccApp.prototype.initTabs = function() {
    $('.widget__tabs__nav li').on('click', function() {
      var $this;

      $this = $(this);
      $this.addClass('active').siblings().removeClass('active');
      return $this.closest('.widget__tabs').find('.widget__tabs__item').eq($this.index()).fadeIn().siblings().fadeOut(1);
    });
    return true;
  };

  WlccApp.prototype.initDatePicker = function() {
    $('.select_date__input').appendDtpicker({
      "closeOnSelected": true,
      "locale": "ru"
    });
    return true;
  };

  WlccApp.prototype.initHandsome = function() {
    $('input[type=checkbox]').checkBox();
    $('input[type=radio]').radio();
    return true;
  };

  WlccApp.prototype.initRangeSlider = function() {
    $("#someID").ionRangeSlider({
      min: 10,
      max: 100,
      type: 'double',
      step: 1,
      prettify: false,
      onChange: function(obj) {
        return console.log(obj);
      },
      onFinish: function(obj) {
        return console.log(obj);
      }
    });
    return true;
  };

  function WlccApp() {
    var self;

    self = this;
    self.initSliders();
    self.attachEvents();
    self.initTelMask();
    self.initPlaceholder();
    self.initTabs();
    self.initDatePicker();
    self.initHandsome();
    self.initRangeSlider();
    self.replaceImagesToRetina();
  }

  return WlccApp;

})();

$(document).ready(function() {
  return window.wlccApp = new WlccApp;
});
