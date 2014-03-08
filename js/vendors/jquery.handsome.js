/*

 handsome.js

 Author: Ken Wheeler
 Date: 06/13/13
 Version: 1.0b

 */

/*global window, document, $, setInterval, clearInterval */

var handsome = window.handsome || {};

/************ Helpers ***********/

// Function Binder

var functionBinder = function (fn, me) {
  'use strict';
  return function () {
    return fn.apply(me, arguments);
  };
};

// Mobile Detect

var mobileDetect = function () {

  var check = false;
  (function (a) {
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))check = true
  })(navigator.userAgent || navigator.vendor || window.opera);
  if(check)
    $("html").addClass("mobileDevice")
  return check;
} ;

mobileDetect();

/********** End Helpers *********/

var addLabelClickAbility = function () {
  $(".label").off("click").on("click", function () {
    var self = $(this);
    self.closest('label').find('input[type=checkbox]').trigger("click")

  })
};


/*

 ----------------
 --- CheckBox ---
 ----------------

 Options:

 none

 Usage:

 $(element).checkBox();

 */

handsome.Checkbox = (function () {

  'use strict';

  function Checkbox(element) {

    this.targetCheck = $(element);
    this.parentWrapper = null;
    this.checker = null;

    this.checkClicked = functionBinder(this.checkClicked, this);

    this.init();

  }

  Checkbox.prototype.init = function () {
    if (this.targetCheck.get(0).tagName === "INPUT") {
      if (this.targetCheck.attr('type') === "checkbox")
        if (!this.targetCheck.parent().hasClass('bt-checkbox')) {
          this.buildOut();
        }
    }
  };

  Checkbox.prototype.buildOut = function () {
    this.parentWrapper = $(this.targetCheck).wrap('<div class="bt-checkbox"/>').parent();
    this.checker = $('<a href="javascript:void(0)" class="bt-checker"><i></i></a>').appendTo(this.parentWrapper);
    this.targetCheck.hide();
    if (this.targetCheck.attr('checked') === "checked") {
      this.checker.addClass('checked');
    }
    this.intializeEvents();
  };

  Checkbox.prototype.intializeEvents = function () {
    $(".toggler_long .bt-checker span").off('click').on('click', this.checkClickedLong);
    this.checker.on('click', this.checkClicked);
  };

  Checkbox.prototype.checkClickedLong = function () {
    var $this = $(this),
      $checkbox = $this.closest(".bt-checkbox").find("input");
    if ($this.hasClass('checked')) {
      $this.removeClass('checked')
        .siblings().addClass('checked');
      $checkbox.attr('checked', $this.hasClass("bt-checker__before"));
    }
  };

  Checkbox.prototype.checkClicked = function () {
    if (this.checker.hasClass('checked')) {
      this.checker.removeClass('checked');
      this.targetCheck.attr('checked', false);
    } else {
      this.checker.addClass('checked');
      this.targetCheck.attr('checked', true);
    }

    if (this.checker.closest(".idea-card_list").length) {
      var $label = this.checker.closest("label") ;
      $label.closest(".idea-card_list__item").toggleClass("selected") ;
    }
  };

  addLabelClickAbility();

  return Checkbox;

}());


$.fn.checkBox = function (options) {

  'use strict';

  var checkboxes = [];

  return this.each(function (index) {
    checkboxes[index] = new handsome.Checkbox(this, options);
  });

};

/*

 ----- End CheckBox -----

 */

/*

 ----------------
 --- RadioButton ---
 ----------------

 Options:

 none

 Usage:

 $(element).radio();

 */

handsome.Radio = (function () {

  'use strict';

  function Radio(element) {

    this.targetRadio = $(element);
    this.parentWrapper = null;
    this.radioTrigger = null;
    this.radioSisters = null;
    this.fakeRadioSisters = null;

    this.triggerClicked = functionBinder(this.triggerClicked, this);

    this.init();

  }

  Radio.prototype.init = function () {
    if (this.targetRadio.get(0).tagName === "INPUT") {
      if (this.targetRadio.attr('type') === "radio")
        if (!this.targetRadio.parent().hasClass('bt-radio')) {
          this.buildOut();
        }
    }
  };

  Radio.prototype.buildOut = function () {
    this.parentWrapper = $(this.targetRadio).wrap('<div class="bt-radio"/>').parent();
    this.radioTrigger = $('<a href="javascript:void(0)" class="bt-radio-trigger"/>').appendTo(this.parentWrapper);
    this.targetRadio.hide();
    if (this.targetRadio.attr('checked') === "checked") {
      this.radioTrigger.addClass('checked');
    }
    this.radioSisters = $("input:radio[name='" + this.targetRadio.attr('name') + "']");
    this.radioTrigger.attr('data-radioname', this.targetRadio.attr('name'));
    this.intializeEvents();
  };

  Radio.prototype.intializeEvents = function () {
    this.radioTrigger.on('click', this.triggerClicked);
  };

  Radio.prototype.triggerClicked = function () {
    $('.bt-radio-trigger[data-radioname=' + this.targetRadio.attr('name') + ']').removeClass('checked');
    this.radioTrigger.addClass('checked');
    this.radioSisters.attr('checked', false);
    this.targetRadio.attr('checked', true);
  };

  addLabelClickAbility();

  return Radio;

}());


$.fn.radio = function (options) {
  'use strict';
  var radios = [];
  return this.each(function (index) {
    radios[index] = new handsome.Radio(this, options);
  });

};


/*

 ----- End RadioButton -----

 */


