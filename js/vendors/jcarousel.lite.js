/*!
 * jCarousel Lite - v1.8.5 - 2013-05-20
 * http://kswedberg.github.com/jquery-carousel-lite/
 * Copyright (c) 2013 Karl Swedberg
 * Licensed MIT (http://kswedberg.github.com/jquery-carousel-lite/blob/master/LICENSE-MIT)
 */

(function(e){function t(e,t){return t.autoStop&&(t.circular?t.autoStop:Math.min(e,t.autoStop))}function i(e){this.id&&(this.id+=e)}e.jCarouselLite={version:"1.8.5",curr:0},e.fn.jCarouselLite=function(a){var s=e.extend(!0,{},e.fn.jCarouselLite.defaults,a),n=Math.ceil,l=Math.abs;return this.each(function(){function a(){return X.slice(H).slice(0,P)}function o(t,i){if(g)return!1;i=i||{};var n=H,l=t>H,o=i.speed||s.speed,r=i.offset||0;return s.beforeStart&&s.beforeStart.call(w,a(),l),X.removeClass(s.activeClass),s.circular?(t>H&&t>Y-P?(H%=z,t=H+(i.auto?O:s.scroll),T.css(j,-H*p.liSize-r)):H>t&&0>t&&(H+=z,t+=z,T.css(j,-H*p.liSize-r)),H=t+t%1):(0>t?t=0:t>Y-N&&(t=Y-N),H=t,0===H&&s.first&&s.first.call(this,a(),l),H===Y-N&&s.last&&s.last.call(this,a(),l),s.btnPrev&&s.$btnPrev.toggleClass(s.btnDisabledClass,0===H),s.btnNext&&s.$btnNext.toggleClass(s.btnDisabledClass,H===Y-N)),F(H,G),e.jCarouselLite.curr=H,n!==H||i.force?(g=!0,m[j]=-(H*p.liSize),T.animate(m,o,s.easing,function(){s.afterEnd&&s.afterEnd.call(w,a(),l),g=!1}),X.eq(H).addClass(s.activeClass),H):(s.afterEnd&&s.afterEnd.call(w,a(),l),H)}var r,c,u,d,v,f,h,b="ontouchend"in document,p={div:{},ul:{},li:{}},C=!0,g=!1,j=s.vertical?"top":"left",m={},S=s.vertical?"height":"width",A=s.vertical?"outerHeight":"outerWidth",x=this,w=e(this),T=w.find("ul").eq(0),D=T.children("li"),z=D.length,y=s.visible,P=n(y),N=Math.floor(y),$=Math.min(s.start,z-1),L=1,E=0,G={},M={},W={},q=s.vertical?"y":"x",I=s.vertical?"x":"y",k=s.init.call(this,s,D);if(k!==!1){w.data("dirjc",L),w.data(j+"jc",w.css(j)),s.circular&&(r=D.slice(z-P).clone(!0).each(i),c=D.slice(0,P).clone(!0).each(i),T.prepend(r).append(c),$+=P,E=P);var F=function(t,i){t=n(t);var a,l=(t-E)%z,o=l+N;return i.go&&(a=e(s.btnGo),a.removeClass(s.activeClass).removeClass(s.visibleClass),a.eq(l).addClass(s.activeClass),a.slice(l,l+N).addClass(s.visibleClass),o>a.length&&a.slice(0,o-a.length).addClass(s.visibleClass)),i.pager&&(u.removeClass(s.activeClass),u.eq(n(l/y)).addClass(s.activeClass)),l},X=T.children("li"),Y=X.length,H=$;e.jCarouselLite.curr=H;var Q=function(e){var t,i,a;return e?(p.div[S]="",p.li={width:"",height:""},p):(t=X[A](!0),i=t*Y,a=t*y,p.div[S]=a+"px",p.ul[S]=i+"px",p.ul[j]=-(H*t)+"px",p.li={width:X.width(),height:X.height()},p.liSize=t,p)},B=function(t){var i,a,n={div:{visibility:"visible",position:"relative",zIndex:2,left:"0"},ul:{margin:"0",padding:"0",position:"relative",listStyleType:"none",zIndex:1},li:{overflow:s.vertical?"hidden":"visible","float":s.vertical?"none":"left"}};t&&(i=Q(!0),w.css(i.div),T.css(i.ul),X.css(i.li)),i=Q(),s.autoCSS&&C&&(e.extend(!0,i,n),C=!1),s.autoWidth&&(a=parseInt(w.css(S),10),p.liSize=a/s.visible,i.li[S]=p.liSize-(X[A](!0)-parseInt(X.css(S),10)),i.ul[S]=p.liSize*Y+"px",i.ul[j]=-(H*p.liSize)+"px",i.div[S]=a),s.autoCSS&&(X.css(i.li),T.css(i.ul),w.css(i.div))};B();var J=0,K=t(z,s),O="number"==typeof s.auto?s.auto:s.scroll,R=function(){x.setAutoAdvance=setTimeout(function(){(!K||K>J)&&(L=w.data("dirjc"),o(H+L*O,{auto:!0}),J++,R())},s.timeout)};if(e.each(["btnPrev","btnNext"],function(t,i){s[i]&&(s["$"+i]=e.isFunction(s[i])?s[i].call(w[0]):e(s[i]),s["$"+i].bind("click.jc",function(e){e.preventDefault();var i=0===t?H-s.scroll:H+s.scroll;return s.directional&&w.data("dirjc",t?1:-1),o(i)}))}),s.circular||(s.btnPrev&&0===$&&s.$btnPrev.addClass(s.btnDisabledClass),s.btnNext&&$+N>=Y&&s.$btnNext.addClass(s.btnDisabledClass)),s.btnGo&&(e.each(s.btnGo,function(t,i){e(i).bind("click.jc",function(e){return e.preventDefault(),o(s.circular?y+t:t)})}),G.go=1),s.autoPager){d=n(z/y),u=[];for(var U=0;d>U;U++)u.push('<li><a href="#">'+(U+1)+"</a></li>");u.length>1&&(u=e("<ul>"+u.join("")+"</ul>").appendTo(s.autoPager).find("li"),u.find("a").each(function(t){e(this).bind("click.jc",function(e){e.preventDefault();var i=t*y;return s.circular&&(i+=y),o(i)})}),G.pager=1)}F($,G),s.mouseWheel&&w.mousewheel&&w.bind("mousewheel.jc",function(e,t){return t>0?o(H-s.scroll):o(H+s.scroll)}),s.pause&&s.auto&&!b&&w.bind("mouseenter.jc",function(){w.trigger("pauseCarousel.jc")}).bind("mouseleave.jc",function(){w.trigger("resumeCarousel.jc")}),s.auto&&R(),e.jCarouselLite.vis=a,w.bind("go.jc",function(e,t,i){t===void 0&&(t="+=1");var a="string"==typeof t&&/(\+=|-=)(\d+)/.exec(t);a?t="-="===a[1]?H-1*a[2]:H+1*a[2]:t+=$,o(t,i)}).bind("startCarousel.jc",function(){clearTimeout(x.setAutoAdvance),x.setAutoAdvance=void 0,w.trigger("go","+="+s.scroll),R(),w.removeData("pausedjc").removeData("stoppedjc")}).bind("resumeCarousel.jc",function(e,t){if(!x.setAutoAdvance){clearTimeout(x.setAutoAdvance),x.setAutoAdvance=void 0;var i=w.data("stoppedjc");(t||!i)&&(R(),w.removeData("pausedjc"),i&&w.removeData("stoppedjc"))}}).bind("pauseCarousel.jc",function(){clearTimeout(x.setAutoAdvance),x.setAutoAdvance=void 0,w.data("pausedjc",!0)}).bind("stopCarousel.jc",function(){clearTimeout(x.setAutoAdvance),x.setAutoAdvance=void 0,w.data("stoppedjc",!0)}).bind("refreshCarousel.jc",function(){B(s.autoCSS)}).bind("endCarousel.jc",function(){x.setAutoAdvance&&(clearTimeout(x.setAutoAdvance),x.setAutoAdvance=void 0),s.btnPrev&&s.$btnPrev.addClass(s.btnDisabledClass).unbind(".jc"),s.btnNext&&s.$btnNext.addClass(s.btnDisabledClass).unbind(".jc"),s.btnGo&&e.each(s.btnGo,function(t,i){e(i).unbind(".jc")}),s.circular&&(X.slice(0,P).remove(),X.slice(-P).remove()),e.each([j+"jc","pausedjc","stoppedjc","dirjc"],function(e,t){w.removeData(t)}),w.unbind(".jc")}),h={touchstart:function(e){W.x=0,W.y=0,M.x=e.targetTouches[0].pageX,M.y=e.targetTouches[0].pageY,M[j]=parseFloat(T.css(j)),M.time=+new Date},touchmove:function(e){var t=e.targetTouches.length;1===t?(e.preventDefault(),W.x=e.targetTouches[0].pageX,W.y=e.targetTouches[0].pageY,m[j]=M[j]+(W[q]-M[q]),T.css(m)):W=M},touchend:function(){if(W.x){var e=M[q]-W[q],t=l(e),i=t>s.swipeThresholds[q],a=l(M[I]-W[I])<s.swipeThresholds[I],n=+new Date-M.time,o=s.swipeThresholds.time>n,r=e>0?"+=":"-=",c=r+s.scroll,u={force:!0};o&&i&&a?u.speed=s.speed/2:!o&&p.liSize/2>t||!i||o&&!a?c="+=0":!o&&t>p.liSize/2&&(c=Math.round(t/p.liSize),c=r+(c>s.visible?s.visible:c),u.offset=e),w.trigger("go.jc",[c,u]),W={}}}},b&&s.swipe&&w.bind("touchstart touchmove touchend",function(e){e=e.originalEvent,h[e.type](e)}),s.responsive&&(f=s.autoCSS,e(window).bind("resize",function(){f&&(T.width(2*T.width()),f=!1),clearTimeout(v),v=setTimeout(function(){w.trigger("refreshCarousel.jc"),f=s.autoCSS},100)}))}}),this},e.fn.jCarouselLite.defaults={btnPrev:null,btnNext:null,btnGo:null,autoPager:null,btnDisabledClass:"disabled",activeClass:"active",visibleClass:"vis",mouseWheel:!1,speed:200,easing:null,timeout:4e3,auto:!1,directional:!1,autoStop:!1,pause:!0,vertical:!1,circular:!0,visible:3,start:0,scroll:1,autoCSS:!0,responsive:!1,autoWidth:!1,swipe:!0,swipeThresholds:{x:80,y:120,time:150},init:function(){},first:null,last:null,beforeStart:null,afterEnd:null}})(jQuery);
