class WlccApp
  errorClass: "error"
  curOffset:[0,0]
  eventHandlers:
    formSubmitClick:()->

      on
    hidePopupClick:()->

      on
    showPopupClick:()->

      on
    toggleClassClick:()->
      $this = $(@)
      toggleInfo = $this.data("toggle-class").split("|")
      className = toggleInfo[0]
      targetMethod = toggleInfo[1] #closest or any
      targetSelector = toggleInfo[2]
      if targetMethod is "closest"
        $this.closest(targetSelector).toggleClass(className)
      else if targetMethod is "any"
        $(targetSelector).toggleClass(className)
      on
    regUserClick:()->
      $('body').removeClass('auth-opened').addClass('registration-opened')
      on
    authUserClick:()->
      $('body').removeClass('registration-opened').addClass('auth-opened')
      on
    authRegHide:()->
      $('body').removeClass('registration-opened auth-opened')
      on
    windowScroll:(e)->
      self = e.data.self
      scrollTop = $(window).scrollTop()
      console.log scrollTop
      if scrollTop > 133
        $('body').addClass('scrolled')
      else
        $('body').removeClass('scrolled')
      on
    postEditBtnClick:()->
      $(@).closest('.post').addClass('editable')
      .find('.post__article p, .post__article h2').attr('contenteditable','true')
      on
    postCancelEditBtnClick:()->

      on
    settingsNavClick:()->
      $this = $(@)
      $this.addClass('active').siblings().removeClass('active')
      $this.closest('.settings').find('.settings__item').hide()
        .eq($this.index()).fadeIn(200)
      on

  attachEvents: ->
    self = this
    $("[data-toggle-class]").on('click', {self: self}, self.eventHandlers.toggleClassClick)
    $(".btn_activated").on('click', {self: self}, ()->$(@).toggleClass('active'))
    $(".form input[type=submit]").on('click', {self: self}, self.eventHandlers.formSubmitClick)
    $(".modal-overlay, .modal__close").on('click', {self: self}, self.eventHandlers.hidePopupClick)
    $("[data-modal-show]").on('click', {self: self}, self.eventHandlers.showPopupClick)
    $(".post__edit-btn").on('click', {self: self}, self.eventHandlers.postEditBtnClick)
    $(".post__edit-btn").on('click', {self: self}, self.eventHandlers.postEditBtnClick)
    $(window).on('scroll load resize',{self:self},self.eventHandlers.windowScroll.throttle(100))
    #todo refactor these
    $(".regUser").on('click', {self: self}, self.eventHandlers.regUserClick)
    $(".authUser").on('click', {self: self}, self.eventHandlers.authUserClick)
    $(".authRegHide").on('click', {self: self}, self.eventHandlers.authRegHide)


    $(".settings__nav li").on('click', {self: self}, self.eventHandlers.settingsNavClick)

    on

  validate: (form)->
    hasErrors = 0 # if it equals to 0 => no errors
    inputs = form.find("[data-validate]");
    self = @

    validateGeneral = (input, flag)->
      if flag
        input["removeClass"](self.errorClass)
      else
        hasErrors++;
        input["addClass"](self.errorClass)
      off

    validateOnEmpty = (input)->
      length = 2
      inputLength = input.val().length;
      validateGeneral(input, inputLength >= length)
      return

    validateOnEmail = (input)->
      res = /^([a-zA-Z0-9+_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      validateGeneral(input, res.test(input.val()))
      return;

    validateOnPhone = (input)->
      regex = /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/
      validateGeneral(input, regex.test(input.val()))
      return;

    inputs.each(
      (i, el)->
        $el = $(el)
        switch $el.attr("data-validate")
          when "empty"
            validateOnEmpty($el)
          when "email"
            validateOnEmail($el)
          when "tel"
            validateOnPhone($el)
          else
            validateOnEmpty($el)
        return
    )
    return hasErrors is 0

  ###
  * ajax sending form data
  * @param form - form that needs to send, action attr needed
  ###
  sendDataAsync: (form, dataType = "text", showStatusText = "Sending ...", actionButton = "input[type=submit]")->
    data = form.serialize()
    url = form.attr("action");
    submit = form.find(actionButton);
    originText = submit.val()
    submit.val(showStatusText)
    self = @
    $.ajax(
      "type": "get"
      "url": url
      "data": data
      "dataType": dataType,
      success: (response)->
        submit.val(originText)
        return
      error: (err)->
        console.log err
        submit.val(originText)
        return
    )

  initSliders: ()->
    $(".slider__slide")
    off

  initTelMask: ()->
    $(".tel-input").mask("(999) 999-9999")
    off

  #img has to have data-src-retina attr to be replaced
  replaceImagesToRetina: ()->
    if(window.devicePixelRatio isnt undefined)
      dpr = window.devicePixelRatio;
      if dpr is 2
        $("[data-src-retina]").each((i, el)->
          img = $(el)
          src = img.data("srcRetina")
          img.attr("src", src)
          return)
    return

  initMap: ()->
    markerLatLng = new google.maps.LatLng(30.269622, -97.742325)
    mapLatLng = new google.maps.LatLng(30.269622, -97.732325)
    mapEl = document.getElementById('map-canvas')
    if mapEl isnt null
      mapOptions = {
        zoom: 15,
        center: mapLatLng,
        disableDefaultUI: true,
        zoomControl: false,
        scaleControl: false,
        scrollwheel: false,
        disableDoubleClickZoom: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
      map = new google.maps.Map(mapEl, mapOptions);
      marker = new google.maps.Marker({
        position: markerLatLng,
        map: map,
        icon: "images/marker.png"
      });

    return

  initPlaceholder: ()->
    unless Modernizr.input.placeholder
      $("[placeholder]").focus(->
        input = $(this)
        if input.val() is input.attr("placeholder")
          input.val ""
          input.removeClass "placeholder"
      ).blur(->
        input = $(this)
        if input.val() is "" or input.val() is input.attr("placeholder")
          input.addClass "placeholder"
          input.val input.attr("placeholder")
      ).blur()
      $("[placeholder]").parents("form").submit ->
        $(this).find("[placeholder]").each ->
          input = $(this)
          input.val ""  if input.val() is input.attr("placeholder")
    off

  initTabs:()->
    $('.widget__tabs__nav li').on('click',
      ()->
        $this = $(@)
        $this.addClass('active').siblings().removeClass('active')
        $this.closest('.widget__tabs')
          .find('.widget__tabs__item').eq($this.index()).fadeIn()
            .siblings().fadeOut(1)
    )
    on

  initDatePicker:()->

    $('.select_date__input').appendDtpicker(
      "closeOnSelected": true
#      "dateOnly": true
      "locale": "ru"
    );

    on

  initHandsome:()->
    $('input[type=checkbox]').checkBox();
    $('input[type=radio]').radio();
#    $('select').dropDown();
    on

  initRangeSlider:()->
    $("#ageRange").ionRangeSlider(
      min: 10,
      max: 100,
      type: 'double',
      step: 1,
      prettify: off,

      onChange: (obj)->
        console.log(obj)
      onFinish: (obj)->
        console.log(obj);
    );
    on

  initPhotos:()->
    $('figure.media-photo').on('click',()->
      window.location.href = "./media-photo-photo.html";
      on)
    $photo =  $(".media-photo_small")
    $photo.fancybox(
      afterShow:(a)->
        _this = @
        $photo.removeClass('active').eq(_this.index).addClass('active')
        $photo.parent().addClass('fancybox-opened')
        on
      afterClose:(a)->
        $photo.parent().removeClass('fancybox-opened')
        $photo.removeClass('active')
        on
    )

    on

  constructor: ()->
    self = this
    self.initSliders()
    self.attachEvents()
    self.initTelMask()
    self.initPlaceholder()
    self.initTabs()
    self.initDatePicker()
    self.initHandsome()
    self.initRangeSlider()
    self.replaceImagesToRetina()
    self.initPhotos()

$(document).ready(
  ()->
    window.wlccApp = new WlccApp
)
