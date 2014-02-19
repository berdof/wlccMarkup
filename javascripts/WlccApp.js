var WlccApp;

WlccApp = (function() {
  WlccApp.prototype.pagesCoords = [826, 1390, 2132, 2766, 3600, 4348, 5179];

  WlccApp.prototype.errorClass = "error";

  WlccApp.prototype.eventHandlers = {
    hrefClick: function(e) {
      var $root, href;

      href = $(this).attr("href");
      $root = $('html, body');
      if (href[0] === "#") {
        $root.animate({
          scrollTop: $(href).offset().top
        }, this.scrollSpeed);
        e.preventDefault();
        return false;
      }
    },
    formSubmitClick: function(e) {
      var form, isValid, self;

      self = e.data.self;
      form = $(this).closest("form");
      isValid = self.validate(form);
      if (isValid) {
        self.sendDataAsync(form).done(function(data) {
          form.find(".form__success").fadeIn(350);
        });
      }
      return false;
    },
    hidePopupClick: function(e) {
      $(".modal, .modal-overlay").fadeOut();
    },
    showPopupClick: function(e) {
      var selector;

      selector = $(this).data("modalShow");
      $("" + selector + ", .modal-overlay").fadeIn();
    }
  };

  WlccApp.prototype.attachEvents = function() {
    var self;

    self = this;
    $("a").on('click', {
      self: self
    }, self.eventHandlers.hrefClick);
    $(".form input[type=submit]").on('click', {
      self: self
    }, self.eventHandlers.formSubmitClick);
    $(".modal-overlay, .modal__close").on('click', {
      self: self
    }, self.eventHandlers.hidePopupClick);
    $("[data-modal-show]").on('click', {
      self: self
    }, self.eventHandlers.showPopupClick);
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

  WlccApp.prototype.initCoords = function() {
    var offsetTop, self, wH;

    self = this;
    wH = $(window).height();
    offsetTop = wH / 3;
    $(".page").each(function(i, el) {
      self.pagesCoords[i] = Math.floor($(el).offset().top) - (i === 0 ? 0 : offsetTop);
    });
  };

  WlccApp.prototype.initCarousel = function() {
    $(".slider__container").jCarouselLite({
      visible: 3,
      start: 0,
      scroll: 1,
      btnNext: ".slider__next",
      btnPrev: ".slider__prev",
      btnGo: $(".slider__pager li")
    });
  };

  WlccApp.prototype.initTelMask = function() {
    $(".tel-input").mask("(999) 999-9999");
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
  };

  function WlccApp() {
    var self;

    self = this;
    self.initCarousel();
    self.attachEvents();
    self.initCoords();
    self.initTelMask();
    self.replaceImagesToRetina();
    self.initPlaceholder();
  }

  return WlccApp;

})();

$(document).ready(function() {
  $.fn.WlccApp = new WlccApp;
});