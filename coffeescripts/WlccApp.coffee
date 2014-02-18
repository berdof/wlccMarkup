class WlccApp
  pagesCoords: [826, 1390, 2132, 2766, 3600, 4348, 5179 ]
  errorClass: "error"
  eventHandlers:
    hrefClick: (e)->
      href = $(@).attr("href")
      $root = $('html, body')
      if href[0] is "#"
        $root.animate({
          scrollTop: $(href).offset().top
        }, @scrollSpeed);
        e.preventDefault()
        return false
      return
    formSubmitClick: (e)->
      self = e.data.self
      form = $(@).closest("form")
      isValid = self.validate(form)
      if isValid
        self.sendDataAsync(form).done(
          (data)->
            form.find(".form__success").fadeIn(350)
            return
        )
      return false
    hidePopupClick: (e)->
      $(".modal, .modal-overlay").fadeOut()
      return
    showPopupClick: (e)->
      selector = $(@).data("modalShow")
      $("#{selector}, .modal-overlay").fadeIn()
      return
  attachEvents: ->
    self = this
    $("a").on('click', {self: self}, self.eventHandlers.hrefClick)
    $(".form input[type=submit]").on('click', {self: self}, self.eventHandlers.formSubmitClick)
    $(".modal-overlay, .modal__close").on('click', {self: self}, self.eventHandlers.hidePopupClick)
    $("[data-modal-show]").on('click', {self: self}, self.eventHandlers.showPopupClick)
    return

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
      return

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

  initCoords: ()->
    self = @
    wH = $(window).height()
    offsetTop = wH / 3
    $(".page").each((i, el)->
      self.pagesCoords[i] = Math.floor($(el).offset().top) - if i is 0 then  0 else offsetTop
      return)
    return

  initCarousel: ()->
    $(".slider__container").jCarouselLite({
      visible: 3,
      start: 0,
      scroll: 1
      btnNext: ".slider__next",
      btnPrev: ".slider__prev",
      btnGo: $(".slider__pager li")
    })
    return

  initTelMask: ()->
    $(".tel-input").mask("(999) 999-9999")
    return
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
    return

  initBlur: ()->
    $('.slider-bg').gaussianBlur(
      deviation: 7 #level of blur
    )
    on



  constructor: ()->
    self = this
    self.initBlur()
    self.initCarousel()
    self.attachEvents()
    self.initCoords()
    self.initTelMask()
    self.replaceImagesToRetina()
    self.initPlaceholder()


$(document).ready(
  ()->
    $.fn.WlccApp = new WlccApp
    return
)
