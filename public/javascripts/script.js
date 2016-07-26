function conjugate(e){var n=Math.abs(e);return n>180?n=360-n:n}function animateClockHands(e,n,t){$("img.secondhand").animateRotate(e+6,e,1e3,"linear"),$("img.minutehand").css({"-moz-transform":"rotate("+n+"deg)","-webkit-transform":"rotate("+n+"deg)","-o-transform":"rotate("+n+"deg)","-ms-transform":"rotate("+n+"deg)",transform:"rotate("+n+"deg)"}),$("img.hourhand").css({"-moz-transform":"rotate("+t+"deg)","-webkit-transform":"rotate("+t+"deg)","-o-transform":"rotate("+t+"deg)","-ms-transform":"rotate("+t+"deg)",transform:"rotate("+t+"deg)"}),animationTimer=setTimeout(function(){e=(e+6)%360,n=(n+.1)%360,t=(t+.0083333)%360,angleBetweenHourAndSecond=t-e,angleBetweenMinuteAndSecond=n-e,angleBetweenHourAndMinute=t-n,$(".hm-content").html(conjugate(angleBetweenHourAndMinute).toFixed(1)+"°"),$(".ms-content").html(conjugate(angleBetweenMinuteAndSecond).toFixed(1)+"°"),$(".hs-content").html(conjugate(angleBetweenHourAndSecond).toFixed(1)+"°"),animateClockHands(e,n,t)},1e3)}var time=new Date,animationTimer,angleTimer,angleBetweenHourAndSecond,angleBetweenMinuteAndSecond,angleBetweenHourAndMinute,angles={hourAngle:function(){return 30*time.getHours()+.5*time.getMinutes()},minuteAngle:function(){return 6*time.getMinutes()+.1*time.getSeconds()},secondAngle:function(){return 6*time.getSeconds()}};$.fn.animateRotate=function(e,n,t,o,a){var i=$.speed(t,o,a),r=i.step;return this.each(function(t,o){i.complete=$.proxy(i.complete,o),i.step=function(e){if($.style(o,"transform","rotate("+e+"deg)"),r)return r.apply(o,arguments)},$({deg:n}).animate({deg:e},i)})},$(document).ready(function(){setTimeout(function(){$("#loading").remove()},2e3),$(".main").onepage_scroll({sectionContainer:"section",easing:"ease",responsiveFallback:600,updateURL:!0,loop:!1,direction:"vertical"}),$(".about").on("click",function(){$(".main").moveTo(2)}),$(".more").on("click",function(){$(".main").moveTo(3)}),$(".info").on("click",function(){$(".main").moveTo(4)}),$(".top").on("click",function(){$(".main").moveTo(1)});var e=angles.secondAngle(),n=angles.minuteAngle(),t=angles.hourAngle();animateClockHands(e,n,t)});