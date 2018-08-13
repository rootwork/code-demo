(function(factory){if(typeof define==="function"&&define.amd){define(["jquery"],function($){return factory($)})}else if(typeof module==="object"&&typeof module.exports==="object"){exports=factory(require("jquery"))}else{factory(jQuery)}})(function($){$.easing.jswing=$.easing.swing;var pow=Math.pow,sqrt=Math.sqrt,sin=Math.sin,cos=Math.cos,PI=Math.PI,c1=1.70158,c2=c1*1.525,c3=c1+1,c4=2*PI/3,c5=2*PI/4.5;function bounceOut(x){var n1=7.5625,d1=2.75;if(x<1/d1){return n1*x*x}else if(x<2/d1){return n1*(x-=1.5/d1)*x+.75}else if(x<2.5/d1){return n1*(x-=2.25/d1)*x+.9375}else{return n1*(x-=2.625/d1)*x+.984375}}$.extend($.easing,{def:"easeOutQuad",swing:function(x){return $.easing[$.easing.def](x)},easeInQuad:function(x){return x*x},easeOutQuad:function(x){return 1-(1-x)*(1-x)},easeInOutQuad:function(x){return x<.5?2*x*x:1-pow(-2*x+2,2)/2},easeInCubic:function(x){return x*x*x},easeOutCubic:function(x){return 1-pow(1-x,3)},easeInOutCubic:function(x){return x<.5?4*x*x*x:1-pow(-2*x+2,3)/2},easeInQuart:function(x){return x*x*x*x},easeOutQuart:function(x){return 1-pow(1-x,4)},easeInOutQuart:function(x){return x<.5?8*x*x*x*x:1-pow(-2*x+2,4)/2},easeInQuint:function(x){return x*x*x*x*x},easeOutQuint:function(x){return 1-pow(1-x,5)},easeInOutQuint:function(x){return x<.5?16*x*x*x*x*x:1-pow(-2*x+2,5)/2},easeInSine:function(x){return 1-cos(x*PI/2)},easeOutSine:function(x){return sin(x*PI/2)},easeInOutSine:function(x){return-(cos(PI*x)-1)/2},easeInExpo:function(x){return x===0?0:pow(2,10*x-10)},easeOutExpo:function(x){return x===1?1:1-pow(2,-10*x)},easeInOutExpo:function(x){return x===0?0:x===1?1:x<.5?pow(2,20*x-10)/2:(2-pow(2,-20*x+10))/2},easeInCirc:function(x){return 1-sqrt(1-pow(x,2))},easeOutCirc:function(x){return sqrt(1-pow(x-1,2))},easeInOutCirc:function(x){return x<.5?(1-sqrt(1-pow(2*x,2)))/2:(sqrt(1-pow(-2*x+2,2))+1)/2},easeInElastic:function(x){return x===0?0:x===1?1:-pow(2,10*x-10)*sin((x*10-10.75)*c4)},easeOutElastic:function(x){return x===0?0:x===1?1:pow(2,-10*x)*sin((x*10-.75)*c4)+1},easeInOutElastic:function(x){return x===0?0:x===1?1:x<.5?-(pow(2,20*x-10)*sin((20*x-11.125)*c5))/2:pow(2,-20*x+10)*sin((20*x-11.125)*c5)/2+1},easeInBack:function(x){return c3*x*x*x-c1*x*x},easeOutBack:function(x){return 1+c3*pow(x-1,3)+c1*pow(x-1,2)},easeInOutBack:function(x){return x<.5?pow(2*x,2)*((c2+1)*2*x-c2)/2:(pow(2*x-2,2)*((c2+1)*(x*2-2)+c2)+2)/2},easeInBounce:function(x){return 1-bounceOut(1-x)},easeOutBounce:bounceOut,easeInOutBounce:function(x){return x<.5?(1-bounceOut(1-2*x))/2:(1+bounceOut(2*x-1))/2}})});
/*!
 * Isotope PACKAGED v3.0.5
 *
 * Licensed GPLv3 for open source use
 * or Isotope Commercial License for commercial use
 *
 * https://isotope.metafizzy.co
 * Copyright 2017 Metafizzy
 */

!function(t,e){"function"==typeof define&&define.amd?define("jquery-bridget/jquery-bridget",["jquery"],function(i){return e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("jquery")):t.jQueryBridget=e(t,t.jQuery)}(window,function(t,e){"use strict";function i(i,s,a){function u(t,e,o){var n,s="$()."+i+'("'+e+'")';return t.each(function(t,u){var h=a.data(u,i);if(!h)return void r(i+" not initialized. Cannot call methods, i.e. "+s);var d=h[e];if(!d||"_"==e.charAt(0))return void r(s+" is not a valid method");var l=d.apply(h,o);n=void 0===n?l:n}),void 0!==n?n:t}function h(t,e){t.each(function(t,o){var n=a.data(o,i);n?(n.option(e),n._init()):(n=new s(o,e),a.data(o,i,n))})}a=a||e||t.jQuery,a&&(s.prototype.option||(s.prototype.option=function(t){a.isPlainObject(t)&&(this.options=a.extend(!0,this.options,t))}),a.fn[i]=function(t){if("string"==typeof t){var e=n.call(arguments,1);return u(this,t,e)}return h(this,t),this},o(a))}function o(t){!t||t&&t.bridget||(t.bridget=i)}var n=Array.prototype.slice,s=t.console,r="undefined"==typeof s?function(){}:function(t){s.error(t)};return o(e||t.jQuery),i}),function(t,e){"function"==typeof define&&define.amd?define("ev-emitter/ev-emitter",e):"object"==typeof module&&module.exports?module.exports=e():t.EvEmitter=e()}("undefined"!=typeof window?window:this,function(){function t(){}var e=t.prototype;return e.on=function(t,e){if(t&&e){var i=this._events=this._events||{},o=i[t]=i[t]||[];return o.indexOf(e)==-1&&o.push(e),this}},e.once=function(t,e){if(t&&e){this.on(t,e);var i=this._onceEvents=this._onceEvents||{},o=i[t]=i[t]||{};return o[e]=!0,this}},e.off=function(t,e){var i=this._events&&this._events[t];if(i&&i.length){var o=i.indexOf(e);return o!=-1&&i.splice(o,1),this}},e.emitEvent=function(t,e){var i=this._events&&this._events[t];if(i&&i.length){i=i.slice(0),e=e||[];for(var o=this._onceEvents&&this._onceEvents[t],n=0;n<i.length;n++){var s=i[n],r=o&&o[s];r&&(this.off(t,s),delete o[s]),s.apply(this,e)}return this}},e.allOff=function(){delete this._events,delete this._onceEvents},t}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("get-size/get-size",[],function(){return e()}):"object"==typeof module&&module.exports?module.exports=e():t.getSize=e()}(window,function(){"use strict";function t(t){var e=parseFloat(t),i=t.indexOf("%")==-1&&!isNaN(e);return i&&e}function e(){}function i(){for(var t={width:0,height:0,innerWidth:0,innerHeight:0,outerWidth:0,outerHeight:0},e=0;e<h;e++){var i=u[e];t[i]=0}return t}function o(t){var e=getComputedStyle(t);return e||a("Style returned "+e+". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"),e}function n(){if(!d){d=!0;var e=document.createElement("div");e.style.width="200px",e.style.padding="1px 2px 3px 4px",e.style.borderStyle="solid",e.style.borderWidth="1px 2px 3px 4px",e.style.boxSizing="border-box";var i=document.body||document.documentElement;i.appendChild(e);var n=o(e);s.isBoxSizeOuter=r=200==t(n.width),i.removeChild(e)}}function s(e){if(n(),"string"==typeof e&&(e=document.querySelector(e)),e&&"object"==typeof e&&e.nodeType){var s=o(e);if("none"==s.display)return i();var a={};a.width=e.offsetWidth,a.height=e.offsetHeight;for(var d=a.isBorderBox="border-box"==s.boxSizing,l=0;l<h;l++){var f=u[l],c=s[f],m=parseFloat(c);a[f]=isNaN(m)?0:m}var p=a.paddingLeft+a.paddingRight,y=a.paddingTop+a.paddingBottom,g=a.marginLeft+a.marginRight,v=a.marginTop+a.marginBottom,_=a.borderLeftWidth+a.borderRightWidth,I=a.borderTopWidth+a.borderBottomWidth,z=d&&r,x=t(s.width);x!==!1&&(a.width=x+(z?0:p+_));var S=t(s.height);return S!==!1&&(a.height=S+(z?0:y+I)),a.innerWidth=a.width-(p+_),a.innerHeight=a.height-(y+I),a.outerWidth=a.width+g,a.outerHeight=a.height+v,a}}var r,a="undefined"==typeof console?e:function(t){console.error(t)},u=["paddingLeft","paddingRight","paddingTop","paddingBottom","marginLeft","marginRight","marginTop","marginBottom","borderLeftWidth","borderRightWidth","borderTopWidth","borderBottomWidth"],h=u.length,d=!1;return s}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("desandro-matches-selector/matches-selector",e):"object"==typeof module&&module.exports?module.exports=e():t.matchesSelector=e()}(window,function(){"use strict";var t=function(){var t=window.Element.prototype;if(t.matches)return"matches";if(t.matchesSelector)return"matchesSelector";for(var e=["webkit","moz","ms","o"],i=0;i<e.length;i++){var o=e[i],n=o+"MatchesSelector";if(t[n])return n}}();return function(e,i){return e[t](i)}}),function(t,e){"function"==typeof define&&define.amd?define("fizzy-ui-utils/utils",["desandro-matches-selector/matches-selector"],function(i){return e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("desandro-matches-selector")):t.fizzyUIUtils=e(t,t.matchesSelector)}(window,function(t,e){var i={};i.extend=function(t,e){for(var i in e)t[i]=e[i];return t},i.modulo=function(t,e){return(t%e+e)%e},i.makeArray=function(t){var e=[];if(Array.isArray(t))e=t;else if(t&&"object"==typeof t&&"number"==typeof t.length)for(var i=0;i<t.length;i++)e.push(t[i]);else e.push(t);return e},i.removeFrom=function(t,e){var i=t.indexOf(e);i!=-1&&t.splice(i,1)},i.getParent=function(t,i){for(;t.parentNode&&t!=document.body;)if(t=t.parentNode,e(t,i))return t},i.getQueryElement=function(t){return"string"==typeof t?document.querySelector(t):t},i.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},i.filterFindElements=function(t,o){t=i.makeArray(t);var n=[];return t.forEach(function(t){if(t instanceof HTMLElement){if(!o)return void n.push(t);e(t,o)&&n.push(t);for(var i=t.querySelectorAll(o),s=0;s<i.length;s++)n.push(i[s])}}),n},i.debounceMethod=function(t,e,i){var o=t.prototype[e],n=e+"Timeout";t.prototype[e]=function(){var t=this[n];t&&clearTimeout(t);var e=arguments,s=this;this[n]=setTimeout(function(){o.apply(s,e),delete s[n]},i||100)}},i.docReady=function(t){var e=document.readyState;"complete"==e||"interactive"==e?setTimeout(t):document.addEventListener("DOMContentLoaded",t)},i.toDashed=function(t){return t.replace(/(.)([A-Z])/g,function(t,e,i){return e+"-"+i}).toLowerCase()};var o=t.console;return i.htmlInit=function(e,n){i.docReady(function(){var s=i.toDashed(n),r="data-"+s,a=document.querySelectorAll("["+r+"]"),u=document.querySelectorAll(".js-"+s),h=i.makeArray(a).concat(i.makeArray(u)),d=r+"-options",l=t.jQuery;h.forEach(function(t){var i,s=t.getAttribute(r)||t.getAttribute(d);try{i=s&&JSON.parse(s)}catch(a){return void(o&&o.error("Error parsing "+r+" on "+t.className+": "+a))}var u=new e(t,i);l&&l.data(t,n,u)})})},i}),function(t,e){"function"==typeof define&&define.amd?define("outlayer/item",["ev-emitter/ev-emitter","get-size/get-size"],e):"object"==typeof module&&module.exports?module.exports=e(require("ev-emitter"),require("get-size")):(t.Outlayer={},t.Outlayer.Item=e(t.EvEmitter,t.getSize))}(window,function(t,e){"use strict";function i(t){for(var e in t)return!1;return e=null,!0}function o(t,e){t&&(this.element=t,this.layout=e,this.position={x:0,y:0},this._create())}function n(t){return t.replace(/([A-Z])/g,function(t){return"-"+t.toLowerCase()})}var s=document.documentElement.style,r="string"==typeof s.transition?"transition":"WebkitTransition",a="string"==typeof s.transform?"transform":"WebkitTransform",u={WebkitTransition:"webkitTransitionEnd",transition:"transitionend"}[r],h={transform:a,transition:r,transitionDuration:r+"Duration",transitionProperty:r+"Property",transitionDelay:r+"Delay"},d=o.prototype=Object.create(t.prototype);d.constructor=o,d._create=function(){this._transn={ingProperties:{},clean:{},onEnd:{}},this.css({position:"absolute"})},d.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},d.getSize=function(){this.size=e(this.element)},d.css=function(t){var e=this.element.style;for(var i in t){var o=h[i]||i;e[o]=t[i]}},d.getPosition=function(){var t=getComputedStyle(this.element),e=this.layout._getOption("originLeft"),i=this.layout._getOption("originTop"),o=t[e?"left":"right"],n=t[i?"top":"bottom"],s=this.layout.size,r=o.indexOf("%")!=-1?parseFloat(o)/100*s.width:parseInt(o,10),a=n.indexOf("%")!=-1?parseFloat(n)/100*s.height:parseInt(n,10);r=isNaN(r)?0:r,a=isNaN(a)?0:a,r-=e?s.paddingLeft:s.paddingRight,a-=i?s.paddingTop:s.paddingBottom,this.position.x=r,this.position.y=a},d.layoutPosition=function(){var t=this.layout.size,e={},i=this.layout._getOption("originLeft"),o=this.layout._getOption("originTop"),n=i?"paddingLeft":"paddingRight",s=i?"left":"right",r=i?"right":"left",a=this.position.x+t[n];e[s]=this.getXValue(a),e[r]="";var u=o?"paddingTop":"paddingBottom",h=o?"top":"bottom",d=o?"bottom":"top",l=this.position.y+t[u];e[h]=this.getYValue(l),e[d]="",this.css(e),this.emitEvent("layout",[this])},d.getXValue=function(t){var e=this.layout._getOption("horizontal");return this.layout.options.percentPosition&&!e?t/this.layout.size.width*100+"%":t+"px"},d.getYValue=function(t){var e=this.layout._getOption("horizontal");return this.layout.options.percentPosition&&e?t/this.layout.size.height*100+"%":t+"px"},d._transitionTo=function(t,e){this.getPosition();var i=this.position.x,o=this.position.y,n=parseInt(t,10),s=parseInt(e,10),r=n===this.position.x&&s===this.position.y;if(this.setPosition(t,e),r&&!this.isTransitioning)return void this.layoutPosition();var a=t-i,u=e-o,h={};h.transform=this.getTranslate(a,u),this.transition({to:h,onTransitionEnd:{transform:this.layoutPosition},isCleaning:!0})},d.getTranslate=function(t,e){var i=this.layout._getOption("originLeft"),o=this.layout._getOption("originTop");return t=i?t:-t,e=o?e:-e,"translate3d("+t+"px, "+e+"px, 0)"},d.goTo=function(t,e){this.setPosition(t,e),this.layoutPosition()},d.moveTo=d._transitionTo,d.setPosition=function(t,e){this.position.x=parseInt(t,10),this.position.y=parseInt(e,10)},d._nonTransition=function(t){this.css(t.to),t.isCleaning&&this._removeStyles(t.to);for(var e in t.onTransitionEnd)t.onTransitionEnd[e].call(this)},d.transition=function(t){if(!parseFloat(this.layout.options.transitionDuration))return void this._nonTransition(t);var e=this._transn;for(var i in t.onTransitionEnd)e.onEnd[i]=t.onTransitionEnd[i];for(i in t.to)e.ingProperties[i]=!0,t.isCleaning&&(e.clean[i]=!0);if(t.from){this.css(t.from);var o=this.element.offsetHeight;o=null}this.enableTransition(t.to),this.css(t.to),this.isTransitioning=!0};var l="opacity,"+n(a);d.enableTransition=function(){if(!this.isTransitioning){var t=this.layout.options.transitionDuration;t="number"==typeof t?t+"ms":t,this.css({transitionProperty:l,transitionDuration:t,transitionDelay:this.staggerDelay||0}),this.element.addEventListener(u,this,!1)}},d.onwebkitTransitionEnd=function(t){this.ontransitionend(t)},d.onotransitionend=function(t){this.ontransitionend(t)};var f={"-webkit-transform":"transform"};d.ontransitionend=function(t){if(t.target===this.element){var e=this._transn,o=f[t.propertyName]||t.propertyName;if(delete e.ingProperties[o],i(e.ingProperties)&&this.disableTransition(),o in e.clean&&(this.element.style[t.propertyName]="",delete e.clean[o]),o in e.onEnd){var n=e.onEnd[o];n.call(this),delete e.onEnd[o]}this.emitEvent("transitionEnd",[this])}},d.disableTransition=function(){this.removeTransitionStyles(),this.element.removeEventListener(u,this,!1),this.isTransitioning=!1},d._removeStyles=function(t){var e={};for(var i in t)e[i]="";this.css(e)};var c={transitionProperty:"",transitionDuration:"",transitionDelay:""};return d.removeTransitionStyles=function(){this.css(c)},d.stagger=function(t){t=isNaN(t)?0:t,this.staggerDelay=t+"ms"},d.removeElem=function(){this.element.parentNode.removeChild(this.element),this.css({display:""}),this.emitEvent("remove",[this])},d.remove=function(){return r&&parseFloat(this.layout.options.transitionDuration)?(this.once("transitionEnd",function(){this.removeElem()}),void this.hide()):void this.removeElem()},d.reveal=function(){delete this.isHidden,this.css({display:""});var t=this.layout.options,e={},i=this.getHideRevealTransitionEndProperty("visibleStyle");e[i]=this.onRevealTransitionEnd,this.transition({from:t.hiddenStyle,to:t.visibleStyle,isCleaning:!0,onTransitionEnd:e})},d.onRevealTransitionEnd=function(){this.isHidden||this.emitEvent("reveal")},d.getHideRevealTransitionEndProperty=function(t){var e=this.layout.options[t];if(e.opacity)return"opacity";for(var i in e)return i},d.hide=function(){this.isHidden=!0,this.css({display:""});var t=this.layout.options,e={},i=this.getHideRevealTransitionEndProperty("hiddenStyle");e[i]=this.onHideTransitionEnd,this.transition({from:t.visibleStyle,to:t.hiddenStyle,isCleaning:!0,onTransitionEnd:e})},d.onHideTransitionEnd=function(){this.isHidden&&(this.css({display:"none"}),this.emitEvent("hide"))},d.destroy=function(){this.css({position:"",left:"",right:"",top:"",bottom:"",transition:"",transform:""})},o}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("outlayer/outlayer",["ev-emitter/ev-emitter","get-size/get-size","fizzy-ui-utils/utils","./item"],function(i,o,n,s){return e(t,i,o,n,s)}):"object"==typeof module&&module.exports?module.exports=e(t,require("ev-emitter"),require("get-size"),require("fizzy-ui-utils"),require("./item")):t.Outlayer=e(t,t.EvEmitter,t.getSize,t.fizzyUIUtils,t.Outlayer.Item)}(window,function(t,e,i,o,n){"use strict";function s(t,e){var i=o.getQueryElement(t);if(!i)return void(u&&u.error("Bad element for "+this.constructor.namespace+": "+(i||t)));this.element=i,h&&(this.$element=h(this.element)),this.options=o.extend({},this.constructor.defaults),this.option(e);var n=++l;this.element.outlayerGUID=n,f[n]=this,this._create();var s=this._getOption("initLayout");s&&this.layout()}function r(t){function e(){t.apply(this,arguments)}return e.prototype=Object.create(t.prototype),e.prototype.constructor=e,e}function a(t){if("number"==typeof t)return t;var e=t.match(/(^\d*\.?\d*)(\w*)/),i=e&&e[1],o=e&&e[2];if(!i.length)return 0;i=parseFloat(i);var n=m[o]||1;return i*n}var u=t.console,h=t.jQuery,d=function(){},l=0,f={};s.namespace="outlayer",s.Item=n,s.defaults={containerStyle:{position:"relative"},initLayout:!0,originLeft:!0,originTop:!0,resize:!0,resizeContainer:!0,transitionDuration:"0.4s",hiddenStyle:{opacity:0,transform:"scale(0.001)"},visibleStyle:{opacity:1,transform:"scale(1)"}};var c=s.prototype;o.extend(c,e.prototype),c.option=function(t){o.extend(this.options,t)},c._getOption=function(t){var e=this.constructor.compatOptions[t];return e&&void 0!==this.options[e]?this.options[e]:this.options[t]},s.compatOptions={initLayout:"isInitLayout",horizontal:"isHorizontal",layoutInstant:"isLayoutInstant",originLeft:"isOriginLeft",originTop:"isOriginTop",resize:"isResizeBound",resizeContainer:"isResizingContainer"},c._create=function(){this.reloadItems(),this.stamps=[],this.stamp(this.options.stamp),o.extend(this.element.style,this.options.containerStyle);var t=this._getOption("resize");t&&this.bindResize()},c.reloadItems=function(){this.items=this._itemize(this.element.children)},c._itemize=function(t){for(var e=this._filterFindItemElements(t),i=this.constructor.Item,o=[],n=0;n<e.length;n++){var s=e[n],r=new i(s,this);o.push(r)}return o},c._filterFindItemElements=function(t){return o.filterFindElements(t,this.options.itemSelector)},c.getItemElements=function(){return this.items.map(function(t){return t.element})},c.layout=function(){this._resetLayout(),this._manageStamps();var t=this._getOption("layoutInstant"),e=void 0!==t?t:!this._isLayoutInited;this.layoutItems(this.items,e),this._isLayoutInited=!0},c._init=c.layout,c._resetLayout=function(){this.getSize()},c.getSize=function(){this.size=i(this.element)},c._getMeasurement=function(t,e){var o,n=this.options[t];n?("string"==typeof n?o=this.element.querySelector(n):n instanceof HTMLElement&&(o=n),this[t]=o?i(o)[e]:n):this[t]=0},c.layoutItems=function(t,e){t=this._getItemsForLayout(t),this._layoutItems(t,e),this._postLayout()},c._getItemsForLayout=function(t){return t.filter(function(t){return!t.isIgnored})},c._layoutItems=function(t,e){if(this._emitCompleteOnItems("layout",t),t&&t.length){var i=[];t.forEach(function(t){var o=this._getItemLayoutPosition(t);o.item=t,o.isInstant=e||t.isLayoutInstant,i.push(o)},this),this._processLayoutQueue(i)}},c._getItemLayoutPosition=function(){return{x:0,y:0}},c._processLayoutQueue=function(t){this.updateStagger(),t.forEach(function(t,e){this._positionItem(t.item,t.x,t.y,t.isInstant,e)},this)},c.updateStagger=function(){var t=this.options.stagger;return null===t||void 0===t?void(this.stagger=0):(this.stagger=a(t),this.stagger)},c._positionItem=function(t,e,i,o,n){o?t.goTo(e,i):(t.stagger(n*this.stagger),t.moveTo(e,i))},c._postLayout=function(){this.resizeContainer()},c.resizeContainer=function(){var t=this._getOption("resizeContainer");if(t){var e=this._getContainerSize();e&&(this._setContainerMeasure(e.width,!0),this._setContainerMeasure(e.height,!1))}},c._getContainerSize=d,c._setContainerMeasure=function(t,e){if(void 0!==t){var i=this.size;i.isBorderBox&&(t+=e?i.paddingLeft+i.paddingRight+i.borderLeftWidth+i.borderRightWidth:i.paddingBottom+i.paddingTop+i.borderTopWidth+i.borderBottomWidth),t=Math.max(t,0),this.element.style[e?"width":"height"]=t+"px"}},c._emitCompleteOnItems=function(t,e){function i(){n.dispatchEvent(t+"Complete",null,[e])}function o(){r++,r==s&&i()}var n=this,s=e.length;if(!e||!s)return void i();var r=0;e.forEach(function(e){e.once(t,o)})},c.dispatchEvent=function(t,e,i){var o=e?[e].concat(i):i;if(this.emitEvent(t,o),h)if(this.$element=this.$element||h(this.element),e){var n=h.Event(e);n.type=t,this.$element.trigger(n,i)}else this.$element.trigger(t,i)},c.ignore=function(t){var e=this.getItem(t);e&&(e.isIgnored=!0)},c.unignore=function(t){var e=this.getItem(t);e&&delete e.isIgnored},c.stamp=function(t){t=this._find(t),t&&(this.stamps=this.stamps.concat(t),t.forEach(this.ignore,this))},c.unstamp=function(t){t=this._find(t),t&&t.forEach(function(t){o.removeFrom(this.stamps,t),this.unignore(t)},this)},c._find=function(t){if(t)return"string"==typeof t&&(t=this.element.querySelectorAll(t)),t=o.makeArray(t)},c._manageStamps=function(){this.stamps&&this.stamps.length&&(this._getBoundingRect(),this.stamps.forEach(this._manageStamp,this))},c._getBoundingRect=function(){var t=this.element.getBoundingClientRect(),e=this.size;this._boundingRect={left:t.left+e.paddingLeft+e.borderLeftWidth,top:t.top+e.paddingTop+e.borderTopWidth,right:t.right-(e.paddingRight+e.borderRightWidth),bottom:t.bottom-(e.paddingBottom+e.borderBottomWidth)}},c._manageStamp=d,c._getElementOffset=function(t){var e=t.getBoundingClientRect(),o=this._boundingRect,n=i(t),s={left:e.left-o.left-n.marginLeft,top:e.top-o.top-n.marginTop,right:o.right-e.right-n.marginRight,bottom:o.bottom-e.bottom-n.marginBottom};return s},c.handleEvent=o.handleEvent,c.bindResize=function(){t.addEventListener("resize",this),this.isResizeBound=!0},c.unbindResize=function(){t.removeEventListener("resize",this),this.isResizeBound=!1},c.onresize=function(){this.resize()},o.debounceMethod(s,"onresize",100),c.resize=function(){this.isResizeBound&&this.needsResizeLayout()&&this.layout()},c.needsResizeLayout=function(){var t=i(this.element),e=this.size&&t;return e&&t.innerWidth!==this.size.innerWidth},c.addItems=function(t){var e=this._itemize(t);return e.length&&(this.items=this.items.concat(e)),e},c.appended=function(t){var e=this.addItems(t);e.length&&(this.layoutItems(e,!0),this.reveal(e))},c.prepended=function(t){var e=this._itemize(t);if(e.length){var i=this.items.slice(0);this.items=e.concat(i),this._resetLayout(),this._manageStamps(),this.layoutItems(e,!0),this.reveal(e),this.layoutItems(i)}},c.reveal=function(t){if(this._emitCompleteOnItems("reveal",t),t&&t.length){var e=this.updateStagger();t.forEach(function(t,i){t.stagger(i*e),t.reveal()})}},c.hide=function(t){if(this._emitCompleteOnItems("hide",t),t&&t.length){var e=this.updateStagger();t.forEach(function(t,i){t.stagger(i*e),t.hide()})}},c.revealItemElements=function(t){var e=this.getItems(t);this.reveal(e)},c.hideItemElements=function(t){var e=this.getItems(t);this.hide(e)},c.getItem=function(t){for(var e=0;e<this.items.length;e++){var i=this.items[e];if(i.element==t)return i}},c.getItems=function(t){t=o.makeArray(t);var e=[];return t.forEach(function(t){var i=this.getItem(t);i&&e.push(i)},this),e},c.remove=function(t){var e=this.getItems(t);this._emitCompleteOnItems("remove",e),e&&e.length&&e.forEach(function(t){t.remove(),o.removeFrom(this.items,t)},this)},c.destroy=function(){var t=this.element.style;t.height="",t.position="",t.width="",this.items.forEach(function(t){t.destroy()}),this.unbindResize();var e=this.element.outlayerGUID;delete f[e],delete this.element.outlayerGUID,h&&h.removeData(this.element,this.constructor.namespace)},s.data=function(t){t=o.getQueryElement(t);var e=t&&t.outlayerGUID;return e&&f[e]},s.create=function(t,e){var i=r(s);return i.defaults=o.extend({},s.defaults),o.extend(i.defaults,e),i.compatOptions=o.extend({},s.compatOptions),i.namespace=t,i.data=s.data,i.Item=r(n),o.htmlInit(i,t),h&&h.bridget&&h.bridget(t,i),i};var m={ms:1,s:1e3};return s.Item=n,s}),function(t,e){"function"==typeof define&&define.amd?define("isotope-layout/js/item",["outlayer/outlayer"],e):"object"==typeof module&&module.exports?module.exports=e(require("outlayer")):(t.Isotope=t.Isotope||{},t.Isotope.Item=e(t.Outlayer))}(window,function(t){"use strict";function e(){t.Item.apply(this,arguments)}var i=e.prototype=Object.create(t.Item.prototype),o=i._create;i._create=function(){this.id=this.layout.itemGUID++,o.call(this),this.sortData={}},i.updateSortData=function(){if(!this.isIgnored){this.sortData.id=this.id,this.sortData["original-order"]=this.id,this.sortData.random=Math.random();var t=this.layout.options.getSortData,e=this.layout._sorters;for(var i in t){var o=e[i];this.sortData[i]=o(this.element,this)}}};var n=i.destroy;return i.destroy=function(){n.apply(this,arguments),this.css({display:""})},e}),function(t,e){"function"==typeof define&&define.amd?define("isotope-layout/js/layout-mode",["get-size/get-size","outlayer/outlayer"],e):"object"==typeof module&&module.exports?module.exports=e(require("get-size"),require("outlayer")):(t.Isotope=t.Isotope||{},t.Isotope.LayoutMode=e(t.getSize,t.Outlayer))}(window,function(t,e){"use strict";function i(t){this.isotope=t,t&&(this.options=t.options[this.namespace],this.element=t.element,this.items=t.filteredItems,this.size=t.size)}var o=i.prototype,n=["_resetLayout","_getItemLayoutPosition","_manageStamp","_getContainerSize","_getElementOffset","needsResizeLayout","_getOption"];return n.forEach(function(t){o[t]=function(){return e.prototype[t].apply(this.isotope,arguments)}}),o.needsVerticalResizeLayout=function(){var e=t(this.isotope.element),i=this.isotope.size&&e;return i&&e.innerHeight!=this.isotope.size.innerHeight},o._getMeasurement=function(){this.isotope._getMeasurement.apply(this,arguments)},o.getColumnWidth=function(){this.getSegmentSize("column","Width")},o.getRowHeight=function(){this.getSegmentSize("row","Height")},o.getSegmentSize=function(t,e){var i=t+e,o="outer"+e;if(this._getMeasurement(i,o),!this[i]){var n=this.getFirstItemSize();this[i]=n&&n[o]||this.isotope.size["inner"+e]}},o.getFirstItemSize=function(){var e=this.isotope.filteredItems[0];return e&&e.element&&t(e.element)},o.layout=function(){this.isotope.layout.apply(this.isotope,arguments)},o.getSize=function(){this.isotope.getSize(),this.size=this.isotope.size},i.modes={},i.create=function(t,e){function n(){i.apply(this,arguments)}return n.prototype=Object.create(o),n.prototype.constructor=n,e&&(n.options=e),n.prototype.namespace=t,i.modes[t]=n,n},i}),function(t,e){"function"==typeof define&&define.amd?define("masonry-layout/masonry",["outlayer/outlayer","get-size/get-size"],e):"object"==typeof module&&module.exports?module.exports=e(require("outlayer"),require("get-size")):t.Masonry=e(t.Outlayer,t.getSize)}(window,function(t,e){var i=t.create("masonry");i.compatOptions.fitWidth="isFitWidth";var o=i.prototype;return o._resetLayout=function(){this.getSize(),this._getMeasurement("columnWidth","outerWidth"),this._getMeasurement("gutter","outerWidth"),this.measureColumns(),this.colYs=[];for(var t=0;t<this.cols;t++)this.colYs.push(0);this.maxY=0,this.horizontalColIndex=0},o.measureColumns=function(){if(this.getContainerWidth(),!this.columnWidth){var t=this.items[0],i=t&&t.element;this.columnWidth=i&&e(i).outerWidth||this.containerWidth}var o=this.columnWidth+=this.gutter,n=this.containerWidth+this.gutter,s=n/o,r=o-n%o,a=r&&r<1?"round":"floor";s=Math[a](s),this.cols=Math.max(s,1)},o.getContainerWidth=function(){var t=this._getOption("fitWidth"),i=t?this.element.parentNode:this.element,o=e(i);this.containerWidth=o&&o.innerWidth},o._getItemLayoutPosition=function(t){t.getSize();var e=t.size.outerWidth%this.columnWidth,i=e&&e<1?"round":"ceil",o=Math[i](t.size.outerWidth/this.columnWidth);o=Math.min(o,this.cols);for(var n=this.options.horizontalOrder?"_getHorizontalColPosition":"_getTopColPosition",s=this[n](o,t),r={x:this.columnWidth*s.col,y:s.y},a=s.y+t.size.outerHeight,u=o+s.col,h=s.col;h<u;h++)this.colYs[h]=a;return r},o._getTopColPosition=function(t){var e=this._getTopColGroup(t),i=Math.min.apply(Math,e);return{col:e.indexOf(i),y:i}},o._getTopColGroup=function(t){if(t<2)return this.colYs;for(var e=[],i=this.cols+1-t,o=0;o<i;o++)e[o]=this._getColGroupY(o,t);return e},o._getColGroupY=function(t,e){if(e<2)return this.colYs[t];var i=this.colYs.slice(t,t+e);return Math.max.apply(Math,i)},o._getHorizontalColPosition=function(t,e){var i=this.horizontalColIndex%this.cols,o=t>1&&i+t>this.cols;i=o?0:i;var n=e.size.outerWidth&&e.size.outerHeight;return this.horizontalColIndex=n?i+t:this.horizontalColIndex,{col:i,y:this._getColGroupY(i,t)}},o._manageStamp=function(t){var i=e(t),o=this._getElementOffset(t),n=this._getOption("originLeft"),s=n?o.left:o.right,r=s+i.outerWidth,a=Math.floor(s/this.columnWidth);a=Math.max(0,a);var u=Math.floor(r/this.columnWidth);u-=r%this.columnWidth?0:1,u=Math.min(this.cols-1,u);for(var h=this._getOption("originTop"),d=(h?o.top:o.bottom)+i.outerHeight,l=a;l<=u;l++)this.colYs[l]=Math.max(d,this.colYs[l])},o._getContainerSize=function(){this.maxY=Math.max.apply(Math,this.colYs);var t={height:this.maxY};return this._getOption("fitWidth")&&(t.width=this._getContainerFitWidth()),t},o._getContainerFitWidth=function(){for(var t=0,e=this.cols;--e&&0===this.colYs[e];)t++;return(this.cols-t)*this.columnWidth-this.gutter},o.needsResizeLayout=function(){var t=this.containerWidth;return this.getContainerWidth(),t!=this.containerWidth},i}),function(t,e){"function"==typeof define&&define.amd?define("isotope-layout/js/layout-modes/masonry",["../layout-mode","masonry-layout/masonry"],e):"object"==typeof module&&module.exports?module.exports=e(require("../layout-mode"),require("masonry-layout")):e(t.Isotope.LayoutMode,t.Masonry)}(window,function(t,e){"use strict";var i=t.create("masonry"),o=i.prototype,n={_getElementOffset:!0,layout:!0,_getMeasurement:!0};for(var s in e.prototype)n[s]||(o[s]=e.prototype[s]);var r=o.measureColumns;o.measureColumns=function(){this.items=this.isotope.filteredItems,r.call(this)};var a=o._getOption;return o._getOption=function(t){return"fitWidth"==t?void 0!==this.options.isFitWidth?this.options.isFitWidth:this.options.fitWidth:a.apply(this.isotope,arguments)},i}),function(t,e){"function"==typeof define&&define.amd?define("isotope-layout/js/layout-modes/fit-rows",["../layout-mode"],e):"object"==typeof exports?module.exports=e(require("../layout-mode")):e(t.Isotope.LayoutMode)}(window,function(t){"use strict";var e=t.create("fitRows"),i=e.prototype;return i._resetLayout=function(){this.x=0,this.y=0,this.maxY=0,this._getMeasurement("gutter","outerWidth")},i._getItemLayoutPosition=function(t){t.getSize();var e=t.size.outerWidth+this.gutter,i=this.isotope.size.innerWidth+this.gutter;0!==this.x&&e+this.x>i&&(this.x=0,this.y=this.maxY);var o={x:this.x,y:this.y};return this.maxY=Math.max(this.maxY,this.y+t.size.outerHeight),this.x+=e,o},i._getContainerSize=function(){return{height:this.maxY}},e}),function(t,e){"function"==typeof define&&define.amd?define("isotope-layout/js/layout-modes/vertical",["../layout-mode"],e):"object"==typeof module&&module.exports?module.exports=e(require("../layout-mode")):e(t.Isotope.LayoutMode)}(window,function(t){"use strict";var e=t.create("vertical",{horizontalAlignment:0}),i=e.prototype;return i._resetLayout=function(){this.y=0},i._getItemLayoutPosition=function(t){t.getSize();var e=(this.isotope.size.innerWidth-t.size.outerWidth)*this.options.horizontalAlignment,i=this.y;return this.y+=t.size.outerHeight,{x:e,y:i}},i._getContainerSize=function(){return{height:this.y}},e}),function(t,e){"function"==typeof define&&define.amd?define(["outlayer/outlayer","get-size/get-size","desandro-matches-selector/matches-selector","fizzy-ui-utils/utils","isotope-layout/js/item","isotope-layout/js/layout-mode","isotope-layout/js/layout-modes/masonry","isotope-layout/js/layout-modes/fit-rows","isotope-layout/js/layout-modes/vertical"],function(i,o,n,s,r,a){return e(t,i,o,n,s,r,a)}):"object"==typeof module&&module.exports?module.exports=e(t,require("outlayer"),require("get-size"),require("desandro-matches-selector"),require("fizzy-ui-utils"),require("isotope-layout/js/item"),require("isotope-layout/js/layout-mode"),require("isotope-layout/js/layout-modes/masonry"),require("isotope-layout/js/layout-modes/fit-rows"),require("isotope-layout/js/layout-modes/vertical")):t.Isotope=e(t,t.Outlayer,t.getSize,t.matchesSelector,t.fizzyUIUtils,t.Isotope.Item,t.Isotope.LayoutMode)}(window,function(t,e,i,o,n,s,r){function a(t,e){return function(i,o){for(var n=0;n<t.length;n++){var s=t[n],r=i.sortData[s],a=o.sortData[s];if(r>a||r<a){var u=void 0!==e[s]?e[s]:e,h=u?1:-1;return(r>a?1:-1)*h}}return 0}}var u=t.jQuery,h=String.prototype.trim?function(t){return t.trim()}:function(t){return t.replace(/^\s+|\s+$/g,"")},d=e.create("isotope",{layoutMode:"masonry",isJQueryFiltering:!0,sortAscending:!0});d.Item=s,d.LayoutMode=r;var l=d.prototype;l._create=function(){this.itemGUID=0,this._sorters={},this._getSorters(),e.prototype._create.call(this),this.modes={},this.filteredItems=this.items,this.sortHistory=["original-order"];for(var t in r.modes)this._initLayoutMode(t)},l.reloadItems=function(){this.itemGUID=0,e.prototype.reloadItems.call(this)},l._itemize=function(){for(var t=e.prototype._itemize.apply(this,arguments),i=0;i<t.length;i++){var o=t[i];o.id=this.itemGUID++}return this._updateItemsSortData(t),t},l._initLayoutMode=function(t){var e=r.modes[t],i=this.options[t]||{};this.options[t]=e.options?n.extend(e.options,i):i,this.modes[t]=new e(this)},l.layout=function(){return!this._isLayoutInited&&this._getOption("initLayout")?void this.arrange():void this._layout()},l._layout=function(){var t=this._getIsInstant();this._resetLayout(),this._manageStamps(),this.layoutItems(this.filteredItems,t),this._isLayoutInited=!0},l.arrange=function(t){this.option(t),this._getIsInstant();var e=this._filter(this.items);this.filteredItems=e.matches,this._bindArrangeComplete(),this._isInstant?this._noTransition(this._hideReveal,[e]):this._hideReveal(e),this._sort(),this._layout()},l._init=l.arrange,l._hideReveal=function(t){this.reveal(t.needReveal),this.hide(t.needHide)},l._getIsInstant=function(){var t=this._getOption("layoutInstant"),e=void 0!==t?t:!this._isLayoutInited;return this._isInstant=e,e},l._bindArrangeComplete=function(){function t(){e&&i&&o&&n.dispatchEvent("arrangeComplete",null,[n.filteredItems])}var e,i,o,n=this;this.once("layoutComplete",function(){e=!0,t()}),this.once("hideComplete",function(){i=!0,t()}),this.once("revealComplete",function(){o=!0,t()})},l._filter=function(t){var e=this.options.filter;e=e||"*";for(var i=[],o=[],n=[],s=this._getFilterTest(e),r=0;r<t.length;r++){var a=t[r];if(!a.isIgnored){var u=s(a);u&&i.push(a),u&&a.isHidden?o.push(a):u||a.isHidden||n.push(a)}}return{matches:i,needReveal:o,needHide:n}},l._getFilterTest=function(t){
return u&&this.options.isJQueryFiltering?function(e){return u(e.element).is(t)}:"function"==typeof t?function(e){return t(e.element)}:function(e){return o(e.element,t)}},l.updateSortData=function(t){var e;t?(t=n.makeArray(t),e=this.getItems(t)):e=this.items,this._getSorters(),this._updateItemsSortData(e)},l._getSorters=function(){var t=this.options.getSortData;for(var e in t){var i=t[e];this._sorters[e]=f(i)}},l._updateItemsSortData=function(t){for(var e=t&&t.length,i=0;e&&i<e;i++){var o=t[i];o.updateSortData()}};var f=function(){function t(t){if("string"!=typeof t)return t;var i=h(t).split(" "),o=i[0],n=o.match(/^\[(.+)\]$/),s=n&&n[1],r=e(s,o),a=d.sortDataParsers[i[1]];return t=a?function(t){return t&&a(r(t))}:function(t){return t&&r(t)}}function e(t,e){return t?function(e){return e.getAttribute(t)}:function(t){var i=t.querySelector(e);return i&&i.textContent}}return t}();d.sortDataParsers={parseInt:function(t){return parseInt(t,10)},parseFloat:function(t){return parseFloat(t)}},l._sort=function(){if(this.options.sortBy){var t=n.makeArray(this.options.sortBy);this._getIsSameSortBy(t)||(this.sortHistory=t.concat(this.sortHistory));var e=a(this.sortHistory,this.options.sortAscending);this.filteredItems.sort(e)}},l._getIsSameSortBy=function(t){for(var e=0;e<t.length;e++)if(t[e]!=this.sortHistory[e])return!1;return!0},l._mode=function(){var t=this.options.layoutMode,e=this.modes[t];if(!e)throw new Error("No layout mode: "+t);return e.options=this.options[t],e},l._resetLayout=function(){e.prototype._resetLayout.call(this),this._mode()._resetLayout()},l._getItemLayoutPosition=function(t){return this._mode()._getItemLayoutPosition(t)},l._manageStamp=function(t){this._mode()._manageStamp(t)},l._getContainerSize=function(){return this._mode()._getContainerSize()},l.needsResizeLayout=function(){return this._mode().needsResizeLayout()},l.appended=function(t){var e=this.addItems(t);if(e.length){var i=this._filterRevealAdded(e);this.filteredItems=this.filteredItems.concat(i)}},l.prepended=function(t){var e=this._itemize(t);if(e.length){this._resetLayout(),this._manageStamps();var i=this._filterRevealAdded(e);this.layoutItems(this.filteredItems),this.filteredItems=i.concat(this.filteredItems),this.items=e.concat(this.items)}},l._filterRevealAdded=function(t){var e=this._filter(t);return this.hide(e.needHide),this.reveal(e.matches),this.layoutItems(e.matches,!0),e.matches},l.insert=function(t){var e=this.addItems(t);if(e.length){var i,o,n=e.length;for(i=0;i<n;i++)o=e[i],this.element.appendChild(o.element);var s=this._filter(e).matches;for(i=0;i<n;i++)e[i].isLayoutInstant=!0;for(this.arrange(),i=0;i<n;i++)delete e[i].isLayoutInstant;this.reveal(s)}};var c=l.remove;return l.remove=function(t){t=n.makeArray(t);var e=this.getItems(t);c.call(this,t);for(var i=e&&e.length,o=0;i&&o<i;o++){var s=e[o];n.removeFrom(this.filteredItems,s)}},l.shuffle=function(){for(var t=0;t<this.items.length;t++){var e=this.items[t];e.sortData.random=Math.random()}this.options.sortBy="random",this._sort(),this._layout()},l._noTransition=function(t,e){var i=this.options.transitionDuration;this.options.transitionDuration=0;var o=t.apply(this,e);return this.options.transitionDuration=i,o},l.getFilteredItemElements=function(){return this.filteredItems.map(function(t){return t.element})},d});
!function(i){"use strict";"function"==typeof define&&define.amd?define(["jquery"],i):"undefined"!=typeof exports?module.exports=i(require("jquery")):i(jQuery)}(function(i){"use strict";var e=window.Slick||{};(e=function(){var e=0;return function(t,o){var s,n=this;n.defaults={accessibility:!0,adaptiveHeight:!1,appendArrows:i(t),appendDots:i(t),arrows:!0,asNavFor:null,prevArrow:'<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',nextArrow:'<button class="slick-next" aria-label="Next" type="button">Next</button>',autoplay:!1,autoplaySpeed:3e3,centerMode:!1,centerPadding:"50px",cssEase:"ease",customPaging:function(e,t){return i('<button type="button" />').text(t+1)},dots:!1,dotsClass:"slick-dots",draggable:!0,easing:"linear",edgeFriction:.35,fade:!1,focusOnSelect:!1,focusOnChange:!1,infinite:!0,initialSlide:0,lazyLoad:"ondemand",mobileFirst:!1,pauseOnHover:!0,pauseOnFocus:!0,pauseOnDotsHover:!1,respondTo:"window",responsive:null,rows:1,rtl:!1,slide:"",slidesPerRow:1,slidesToShow:1,slidesToScroll:1,speed:500,swipe:!0,swipeToSlide:!1,touchMove:!0,touchThreshold:5,useCSS:!0,useTransform:!0,variableWidth:!1,vertical:!1,verticalSwiping:!1,waitForAnimate:!0,zIndex:1e3},n.initials={animating:!1,dragging:!1,autoPlayTimer:null,currentDirection:0,currentLeft:null,currentSlide:0,direction:1,$dots:null,listWidth:null,listHeight:null,loadIndex:0,$nextArrow:null,$prevArrow:null,scrolling:!1,slideCount:null,slideWidth:null,$slideTrack:null,$slides:null,sliding:!1,slideOffset:0,swipeLeft:null,swiping:!1,$list:null,touchObject:{},transformsEnabled:!1,unslicked:!1},i.extend(n,n.initials),n.activeBreakpoint=null,n.animType=null,n.animProp=null,n.breakpoints=[],n.breakpointSettings=[],n.cssTransitions=!1,n.focussed=!1,n.interrupted=!1,n.hidden="hidden",n.paused=!0,n.positionProp=null,n.respondTo=null,n.rowCount=1,n.shouldClick=!0,n.$slider=i(t),n.$slidesCache=null,n.transformType=null,n.transitionType=null,n.visibilityChange="visibilitychange",n.windowWidth=0,n.windowTimer=null,s=i(t).data("slick")||{},n.options=i.extend({},n.defaults,o,s),n.currentSlide=n.options.initialSlide,n.originalSettings=n.options,void 0!==document.mozHidden?(n.hidden="mozHidden",n.visibilityChange="mozvisibilitychange"):void 0!==document.webkitHidden&&(n.hidden="webkitHidden",n.visibilityChange="webkitvisibilitychange"),n.autoPlay=i.proxy(n.autoPlay,n),n.autoPlayClear=i.proxy(n.autoPlayClear,n),n.autoPlayIterator=i.proxy(n.autoPlayIterator,n),n.changeSlide=i.proxy(n.changeSlide,n),n.clickHandler=i.proxy(n.clickHandler,n),n.selectHandler=i.proxy(n.selectHandler,n),n.setPosition=i.proxy(n.setPosition,n),n.swipeHandler=i.proxy(n.swipeHandler,n),n.dragHandler=i.proxy(n.dragHandler,n),n.keyHandler=i.proxy(n.keyHandler,n),n.instanceUid=e++,n.htmlExpr=/^(?:\s*(<[\w\W]+>)[^>]*)$/,n.registerBreakpoints(),n.init(!0)}}()).prototype.activateADA=function(){this.$slideTrack.find(".slick-active").attr({"aria-hidden":"false"}).find("a, input, button, select").attr({tabindex:"0"})},e.prototype.addSlide=e.prototype.slickAdd=function(e,t,o){var s=this;if("boolean"==typeof t)o=t,t=null;else if(t<0||t>=s.slideCount)return!1;s.unload(),"number"==typeof t?0===t&&0===s.$slides.length?i(e).appendTo(s.$slideTrack):o?i(e).insertBefore(s.$slides.eq(t)):i(e).insertAfter(s.$slides.eq(t)):!0===o?i(e).prependTo(s.$slideTrack):i(e).appendTo(s.$slideTrack),s.$slides=s.$slideTrack.children(this.options.slide),s.$slideTrack.children(this.options.slide).detach(),s.$slideTrack.append(s.$slides),s.$slides.each(function(e,t){i(t).attr("data-slick-index",e)}),s.$slidesCache=s.$slides,s.reinit()},e.prototype.animateHeight=function(){var i=this;if(1===i.options.slidesToShow&&!0===i.options.adaptiveHeight&&!1===i.options.vertical){var e=i.$slides.eq(i.currentSlide).outerHeight(!0);i.$list.animate({height:e},i.options.speed)}},e.prototype.animateSlide=function(e,t){var o={},s=this;s.animateHeight(),!0===s.options.rtl&&!1===s.options.vertical&&(e=-e),!1===s.transformsEnabled?!1===s.options.vertical?s.$slideTrack.animate({left:e},s.options.speed,s.options.easing,t):s.$slideTrack.animate({top:e},s.options.speed,s.options.easing,t):!1===s.cssTransitions?(!0===s.options.rtl&&(s.currentLeft=-s.currentLeft),i({animStart:s.currentLeft}).animate({animStart:e},{duration:s.options.speed,easing:s.options.easing,step:function(i){i=Math.ceil(i),!1===s.options.vertical?(o[s.animType]="translate("+i+"px, 0px)",s.$slideTrack.css(o)):(o[s.animType]="translate(0px,"+i+"px)",s.$slideTrack.css(o))},complete:function(){t&&t.call()}})):(s.applyTransition(),e=Math.ceil(e),!1===s.options.vertical?o[s.animType]="translate3d("+e+"px, 0px, 0px)":o[s.animType]="translate3d(0px,"+e+"px, 0px)",s.$slideTrack.css(o),t&&setTimeout(function(){s.disableTransition(),t.call()},s.options.speed))},e.prototype.getNavTarget=function(){var e=this,t=e.options.asNavFor;return t&&null!==t&&(t=i(t).not(e.$slider)),t},e.prototype.asNavFor=function(e){var t=this.getNavTarget();null!==t&&"object"==typeof t&&t.each(function(){var t=i(this).slick("getSlick");t.unslicked||t.slideHandler(e,!0)})},e.prototype.applyTransition=function(i){var e=this,t={};!1===e.options.fade?t[e.transitionType]=e.transformType+" "+e.options.speed+"ms "+e.options.cssEase:t[e.transitionType]="opacity "+e.options.speed+"ms "+e.options.cssEase,!1===e.options.fade?e.$slideTrack.css(t):e.$slides.eq(i).css(t)},e.prototype.autoPlay=function(){var i=this;i.autoPlayClear(),i.slideCount>i.options.slidesToShow&&(i.autoPlayTimer=setInterval(i.autoPlayIterator,i.options.autoplaySpeed))},e.prototype.autoPlayClear=function(){var i=this;i.autoPlayTimer&&clearInterval(i.autoPlayTimer)},e.prototype.autoPlayIterator=function(){var i=this,e=i.currentSlide+i.options.slidesToScroll;i.paused||i.interrupted||i.focussed||(!1===i.options.infinite&&(1===i.direction&&i.currentSlide+1===i.slideCount-1?i.direction=0:0===i.direction&&(e=i.currentSlide-i.options.slidesToScroll,i.currentSlide-1==0&&(i.direction=1))),i.slideHandler(e))},e.prototype.buildArrows=function(){var e=this;!0===e.options.arrows&&(e.$prevArrow=i(e.options.prevArrow).addClass("slick-arrow"),e.$nextArrow=i(e.options.nextArrow).addClass("slick-arrow"),e.slideCount>e.options.slidesToShow?(e.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),e.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),e.htmlExpr.test(e.options.prevArrow)&&e.$prevArrow.prependTo(e.options.appendArrows),e.htmlExpr.test(e.options.nextArrow)&&e.$nextArrow.appendTo(e.options.appendArrows),!0!==e.options.infinite&&e.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true")):e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({"aria-disabled":"true",tabindex:"-1"}))},e.prototype.buildDots=function(){var e,t,o=this;if(!0===o.options.dots){for(o.$slider.addClass("slick-dotted"),t=i("<ul />").addClass(o.options.dotsClass),e=0;e<=o.getDotCount();e+=1)t.append(i("<li />").append(o.options.customPaging.call(this,o,e)));o.$dots=t.appendTo(o.options.appendDots),o.$dots.find("li").first().addClass("slick-active")}},e.prototype.buildOut=function(){var e=this;e.$slides=e.$slider.children(e.options.slide+":not(.slick-cloned)").addClass("slick-slide"),e.slideCount=e.$slides.length,e.$slides.each(function(e,t){i(t).attr("data-slick-index",e).data("originalStyling",i(t).attr("style")||"")}),e.$slider.addClass("slick-slider"),e.$slideTrack=0===e.slideCount?i('<div class="slick-track"/>').appendTo(e.$slider):e.$slides.wrapAll('<div class="slick-track"/>').parent(),e.$list=e.$slideTrack.wrap('<div class="slick-list"/>').parent(),e.$slideTrack.css("opacity",0),!0!==e.options.centerMode&&!0!==e.options.swipeToSlide||(e.options.slidesToScroll=1),i("img[data-lazy]",e.$slider).not("[src]").addClass("slick-loading"),e.setupInfinite(),e.buildArrows(),e.buildDots(),e.updateDots(),e.setSlideClasses("number"==typeof e.currentSlide?e.currentSlide:0),!0===e.options.draggable&&e.$list.addClass("draggable")},e.prototype.buildRows=function(){var i,e,t,o,s,n,r,l=this;if(o=document.createDocumentFragment(),n=l.$slider.children(),l.options.rows>1){for(r=l.options.slidesPerRow*l.options.rows,s=Math.ceil(n.length/r),i=0;i<s;i++){var d=document.createElement("div");for(e=0;e<l.options.rows;e++){var a=document.createElement("div");for(t=0;t<l.options.slidesPerRow;t++){var c=i*r+(e*l.options.slidesPerRow+t);n.get(c)&&a.appendChild(n.get(c))}d.appendChild(a)}o.appendChild(d)}l.$slider.empty().append(o),l.$slider.children().children().children().css({width:100/l.options.slidesPerRow+"%",display:"inline-block"})}},e.prototype.checkResponsive=function(e,t){var o,s,n,r=this,l=!1,d=r.$slider.width(),a=window.innerWidth||i(window).width();if("window"===r.respondTo?n=a:"slider"===r.respondTo?n=d:"min"===r.respondTo&&(n=Math.min(a,d)),r.options.responsive&&r.options.responsive.length&&null!==r.options.responsive){s=null;for(o in r.breakpoints)r.breakpoints.hasOwnProperty(o)&&(!1===r.originalSettings.mobileFirst?n<r.breakpoints[o]&&(s=r.breakpoints[o]):n>r.breakpoints[o]&&(s=r.breakpoints[o]));null!==s?null!==r.activeBreakpoint?(s!==r.activeBreakpoint||t)&&(r.activeBreakpoint=s,"unslick"===r.breakpointSettings[s]?r.unslick(s):(r.options=i.extend({},r.originalSettings,r.breakpointSettings[s]),!0===e&&(r.currentSlide=r.options.initialSlide),r.refresh(e)),l=s):(r.activeBreakpoint=s,"unslick"===r.breakpointSettings[s]?r.unslick(s):(r.options=i.extend({},r.originalSettings,r.breakpointSettings[s]),!0===e&&(r.currentSlide=r.options.initialSlide),r.refresh(e)),l=s):null!==r.activeBreakpoint&&(r.activeBreakpoint=null,r.options=r.originalSettings,!0===e&&(r.currentSlide=r.options.initialSlide),r.refresh(e),l=s),e||!1===l||r.$slider.trigger("breakpoint",[r,l])}},e.prototype.changeSlide=function(e,t){var o,s,n,r=this,l=i(e.currentTarget);switch(l.is("a")&&e.preventDefault(),l.is("li")||(l=l.closest("li")),n=r.slideCount%r.options.slidesToScroll!=0,o=n?0:(r.slideCount-r.currentSlide)%r.options.slidesToScroll,e.data.message){case"previous":s=0===o?r.options.slidesToScroll:r.options.slidesToShow-o,r.slideCount>r.options.slidesToShow&&r.slideHandler(r.currentSlide-s,!1,t);break;case"next":s=0===o?r.options.slidesToScroll:o,r.slideCount>r.options.slidesToShow&&r.slideHandler(r.currentSlide+s,!1,t);break;case"index":var d=0===e.data.index?0:e.data.index||l.index()*r.options.slidesToScroll;r.slideHandler(r.checkNavigable(d),!1,t),l.children().trigger("focus");break;default:return}},e.prototype.checkNavigable=function(i){var e,t;if(e=this.getNavigableIndexes(),t=0,i>e[e.length-1])i=e[e.length-1];else for(var o in e){if(i<e[o]){i=t;break}t=e[o]}return i},e.prototype.cleanUpEvents=function(){var e=this;e.options.dots&&null!==e.$dots&&(i("li",e.$dots).off("click.slick",e.changeSlide).off("mouseenter.slick",i.proxy(e.interrupt,e,!0)).off("mouseleave.slick",i.proxy(e.interrupt,e,!1)),!0===e.options.accessibility&&e.$dots.off("keydown.slick",e.keyHandler)),e.$slider.off("focus.slick blur.slick"),!0===e.options.arrows&&e.slideCount>e.options.slidesToShow&&(e.$prevArrow&&e.$prevArrow.off("click.slick",e.changeSlide),e.$nextArrow&&e.$nextArrow.off("click.slick",e.changeSlide),!0===e.options.accessibility&&(e.$prevArrow&&e.$prevArrow.off("keydown.slick",e.keyHandler),e.$nextArrow&&e.$nextArrow.off("keydown.slick",e.keyHandler))),e.$list.off("touchstart.slick mousedown.slick",e.swipeHandler),e.$list.off("touchmove.slick mousemove.slick",e.swipeHandler),e.$list.off("touchend.slick mouseup.slick",e.swipeHandler),e.$list.off("touchcancel.slick mouseleave.slick",e.swipeHandler),e.$list.off("click.slick",e.clickHandler),i(document).off(e.visibilityChange,e.visibility),e.cleanUpSlideEvents(),!0===e.options.accessibility&&e.$list.off("keydown.slick",e.keyHandler),!0===e.options.focusOnSelect&&i(e.$slideTrack).children().off("click.slick",e.selectHandler),i(window).off("orientationchange.slick.slick-"+e.instanceUid,e.orientationChange),i(window).off("resize.slick.slick-"+e.instanceUid,e.resize),i("[draggable!=true]",e.$slideTrack).off("dragstart",e.preventDefault),i(window).off("load.slick.slick-"+e.instanceUid,e.setPosition)},e.prototype.cleanUpSlideEvents=function(){var e=this;e.$list.off("mouseenter.slick",i.proxy(e.interrupt,e,!0)),e.$list.off("mouseleave.slick",i.proxy(e.interrupt,e,!1))},e.prototype.cleanUpRows=function(){var i,e=this;e.options.rows>1&&((i=e.$slides.children().children()).removeAttr("style"),e.$slider.empty().append(i))},e.prototype.clickHandler=function(i){!1===this.shouldClick&&(i.stopImmediatePropagation(),i.stopPropagation(),i.preventDefault())},e.prototype.destroy=function(e){var t=this;t.autoPlayClear(),t.touchObject={},t.cleanUpEvents(),i(".slick-cloned",t.$slider).detach(),t.$dots&&t.$dots.remove(),t.$prevArrow&&t.$prevArrow.length&&(t.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),t.htmlExpr.test(t.options.prevArrow)&&t.$prevArrow.remove()),t.$nextArrow&&t.$nextArrow.length&&(t.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),t.htmlExpr.test(t.options.nextArrow)&&t.$nextArrow.remove()),t.$slides&&(t.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function(){i(this).attr("style",i(this).data("originalStyling"))}),t.$slideTrack.children(this.options.slide).detach(),t.$slideTrack.detach(),t.$list.detach(),t.$slider.append(t.$slides)),t.cleanUpRows(),t.$slider.removeClass("slick-slider"),t.$slider.removeClass("slick-initialized"),t.$slider.removeClass("slick-dotted"),t.unslicked=!0,e||t.$slider.trigger("destroy",[t])},e.prototype.disableTransition=function(i){var e=this,t={};t[e.transitionType]="",!1===e.options.fade?e.$slideTrack.css(t):e.$slides.eq(i).css(t)},e.prototype.fadeSlide=function(i,e){var t=this;!1===t.cssTransitions?(t.$slides.eq(i).css({zIndex:t.options.zIndex}),t.$slides.eq(i).animate({opacity:1},t.options.speed,t.options.easing,e)):(t.applyTransition(i),t.$slides.eq(i).css({opacity:1,zIndex:t.options.zIndex}),e&&setTimeout(function(){t.disableTransition(i),e.call()},t.options.speed))},e.prototype.fadeSlideOut=function(i){var e=this;!1===e.cssTransitions?e.$slides.eq(i).animate({opacity:0,zIndex:e.options.zIndex-2},e.options.speed,e.options.easing):(e.applyTransition(i),e.$slides.eq(i).css({opacity:0,zIndex:e.options.zIndex-2}))},e.prototype.filterSlides=e.prototype.slickFilter=function(i){var e=this;null!==i&&(e.$slidesCache=e.$slides,e.unload(),e.$slideTrack.children(this.options.slide).detach(),e.$slidesCache.filter(i).appendTo(e.$slideTrack),e.reinit())},e.prototype.focusHandler=function(){var e=this;e.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick","*",function(t){t.stopImmediatePropagation();var o=i(this);setTimeout(function(){e.options.pauseOnFocus&&(e.focussed=o.is(":focus"),e.autoPlay())},0)})},e.prototype.getCurrent=e.prototype.slickCurrentSlide=function(){return this.currentSlide},e.prototype.getDotCount=function(){var i=this,e=0,t=0,o=0;if(!0===i.options.infinite)if(i.slideCount<=i.options.slidesToShow)++o;else for(;e<i.slideCount;)++o,e=t+i.options.slidesToScroll,t+=i.options.slidesToScroll<=i.options.slidesToShow?i.options.slidesToScroll:i.options.slidesToShow;else if(!0===i.options.centerMode)o=i.slideCount;else if(i.options.asNavFor)for(;e<i.slideCount;)++o,e=t+i.options.slidesToScroll,t+=i.options.slidesToScroll<=i.options.slidesToShow?i.options.slidesToScroll:i.options.slidesToShow;else o=1+Math.ceil((i.slideCount-i.options.slidesToShow)/i.options.slidesToScroll);return o-1},e.prototype.getLeft=function(i){var e,t,o,s,n=this,r=0;return n.slideOffset=0,t=n.$slides.first().outerHeight(!0),!0===n.options.infinite?(n.slideCount>n.options.slidesToShow&&(n.slideOffset=n.slideWidth*n.options.slidesToShow*-1,s=-1,!0===n.options.vertical&&!0===n.options.centerMode&&(2===n.options.slidesToShow?s=-1.5:1===n.options.slidesToShow&&(s=-2)),r=t*n.options.slidesToShow*s),n.slideCount%n.options.slidesToScroll!=0&&i+n.options.slidesToScroll>n.slideCount&&n.slideCount>n.options.slidesToShow&&(i>n.slideCount?(n.slideOffset=(n.options.slidesToShow-(i-n.slideCount))*n.slideWidth*-1,r=(n.options.slidesToShow-(i-n.slideCount))*t*-1):(n.slideOffset=n.slideCount%n.options.slidesToScroll*n.slideWidth*-1,r=n.slideCount%n.options.slidesToScroll*t*-1))):i+n.options.slidesToShow>n.slideCount&&(n.slideOffset=(i+n.options.slidesToShow-n.slideCount)*n.slideWidth,r=(i+n.options.slidesToShow-n.slideCount)*t),n.slideCount<=n.options.slidesToShow&&(n.slideOffset=0,r=0),!0===n.options.centerMode&&n.slideCount<=n.options.slidesToShow?n.slideOffset=n.slideWidth*Math.floor(n.options.slidesToShow)/2-n.slideWidth*n.slideCount/2:!0===n.options.centerMode&&!0===n.options.infinite?n.slideOffset+=n.slideWidth*Math.floor(n.options.slidesToShow/2)-n.slideWidth:!0===n.options.centerMode&&(n.slideOffset=0,n.slideOffset+=n.slideWidth*Math.floor(n.options.slidesToShow/2)),e=!1===n.options.vertical?i*n.slideWidth*-1+n.slideOffset:i*t*-1+r,!0===n.options.variableWidth&&(o=n.slideCount<=n.options.slidesToShow||!1===n.options.infinite?n.$slideTrack.children(".slick-slide").eq(i):n.$slideTrack.children(".slick-slide").eq(i+n.options.slidesToShow),e=!0===n.options.rtl?o[0]?-1*(n.$slideTrack.width()-o[0].offsetLeft-o.width()):0:o[0]?-1*o[0].offsetLeft:0,!0===n.options.centerMode&&(o=n.slideCount<=n.options.slidesToShow||!1===n.options.infinite?n.$slideTrack.children(".slick-slide").eq(i):n.$slideTrack.children(".slick-slide").eq(i+n.options.slidesToShow+1),e=!0===n.options.rtl?o[0]?-1*(n.$slideTrack.width()-o[0].offsetLeft-o.width()):0:o[0]?-1*o[0].offsetLeft:0,e+=(n.$list.width()-o.outerWidth())/2)),e},e.prototype.getOption=e.prototype.slickGetOption=function(i){return this.options[i]},e.prototype.getNavigableIndexes=function(){var i,e=this,t=0,o=0,s=[];for(!1===e.options.infinite?i=e.slideCount:(t=-1*e.options.slidesToScroll,o=-1*e.options.slidesToScroll,i=2*e.slideCount);t<i;)s.push(t),t=o+e.options.slidesToScroll,o+=e.options.slidesToScroll<=e.options.slidesToShow?e.options.slidesToScroll:e.options.slidesToShow;return s},e.prototype.getSlick=function(){return this},e.prototype.getSlideCount=function(){var e,t,o=this;return t=!0===o.options.centerMode?o.slideWidth*Math.floor(o.options.slidesToShow/2):0,!0===o.options.swipeToSlide?(o.$slideTrack.find(".slick-slide").each(function(s,n){if(n.offsetLeft-t+i(n).outerWidth()/2>-1*o.swipeLeft)return e=n,!1}),Math.abs(i(e).attr("data-slick-index")-o.currentSlide)||1):o.options.slidesToScroll},e.prototype.goTo=e.prototype.slickGoTo=function(i,e){this.changeSlide({data:{message:"index",index:parseInt(i)}},e)},e.prototype.init=function(e){var t=this;i(t.$slider).hasClass("slick-initialized")||(i(t.$slider).addClass("slick-initialized"),t.buildRows(),t.buildOut(),t.setProps(),t.startLoad(),t.loadSlider(),t.initializeEvents(),t.updateArrows(),t.updateDots(),t.checkResponsive(!0),t.focusHandler()),e&&t.$slider.trigger("init",[t]),!0===t.options.accessibility&&t.initADA(),t.options.autoplay&&(t.paused=!1,t.autoPlay())},e.prototype.initADA=function(){var e=this,t=Math.ceil(e.slideCount/e.options.slidesToShow),o=e.getNavigableIndexes().filter(function(i){return i>=0&&i<e.slideCount});e.$slides.add(e.$slideTrack.find(".slick-cloned")).attr({"aria-hidden":"true",tabindex:"-1"}).find("a, input, button, select").attr({tabindex:"-1"}),null!==e.$dots&&(e.$slides.not(e.$slideTrack.find(".slick-cloned")).each(function(t){var s=o.indexOf(t);i(this).attr({role:"tabpanel",id:"slick-slide"+e.instanceUid+t,tabindex:-1}),-1!==s&&i(this).attr({"aria-describedby":"slick-slide-control"+e.instanceUid+s})}),e.$dots.attr("role","tablist").find("li").each(function(s){var n=o[s];i(this).attr({role:"presentation"}),i(this).find("button").first().attr({role:"tab",id:"slick-slide-control"+e.instanceUid+s,"aria-controls":"slick-slide"+e.instanceUid+n,"aria-label":s+1+" of "+t,"aria-selected":null,tabindex:"-1"})}).eq(e.currentSlide).find("button").attr({"aria-selected":"true",tabindex:"0"}).end());for(var s=e.currentSlide,n=s+e.options.slidesToShow;s<n;s++)e.$slides.eq(s).attr("tabindex",0);e.activateADA()},e.prototype.initArrowEvents=function(){var i=this;!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow.off("click.slick").on("click.slick",{message:"previous"},i.changeSlide),i.$nextArrow.off("click.slick").on("click.slick",{message:"next"},i.changeSlide),!0===i.options.accessibility&&(i.$prevArrow.on("keydown.slick",i.keyHandler),i.$nextArrow.on("keydown.slick",i.keyHandler)))},e.prototype.initDotEvents=function(){var e=this;!0===e.options.dots&&(i("li",e.$dots).on("click.slick",{message:"index"},e.changeSlide),!0===e.options.accessibility&&e.$dots.on("keydown.slick",e.keyHandler)),!0===e.options.dots&&!0===e.options.pauseOnDotsHover&&i("li",e.$dots).on("mouseenter.slick",i.proxy(e.interrupt,e,!0)).on("mouseleave.slick",i.proxy(e.interrupt,e,!1))},e.prototype.initSlideEvents=function(){var e=this;e.options.pauseOnHover&&(e.$list.on("mouseenter.slick",i.proxy(e.interrupt,e,!0)),e.$list.on("mouseleave.slick",i.proxy(e.interrupt,e,!1)))},e.prototype.initializeEvents=function(){var e=this;e.initArrowEvents(),e.initDotEvents(),e.initSlideEvents(),e.$list.on("touchstart.slick mousedown.slick",{action:"start"},e.swipeHandler),e.$list.on("touchmove.slick mousemove.slick",{action:"move"},e.swipeHandler),e.$list.on("touchend.slick mouseup.slick",{action:"end"},e.swipeHandler),e.$list.on("touchcancel.slick mouseleave.slick",{action:"end"},e.swipeHandler),e.$list.on("click.slick",e.clickHandler),i(document).on(e.visibilityChange,i.proxy(e.visibility,e)),!0===e.options.accessibility&&e.$list.on("keydown.slick",e.keyHandler),!0===e.options.focusOnSelect&&i(e.$slideTrack).children().on("click.slick",e.selectHandler),i(window).on("orientationchange.slick.slick-"+e.instanceUid,i.proxy(e.orientationChange,e)),i(window).on("resize.slick.slick-"+e.instanceUid,i.proxy(e.resize,e)),i("[draggable!=true]",e.$slideTrack).on("dragstart",e.preventDefault),i(window).on("load.slick.slick-"+e.instanceUid,e.setPosition),i(e.setPosition)},e.prototype.initUI=function(){var i=this;!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow.show(),i.$nextArrow.show()),!0===i.options.dots&&i.slideCount>i.options.slidesToShow&&i.$dots.show()},e.prototype.keyHandler=function(i){var e=this;i.target.tagName.match("TEXTAREA|INPUT|SELECT")||(37===i.keyCode&&!0===e.options.accessibility?e.changeSlide({data:{message:!0===e.options.rtl?"next":"previous"}}):39===i.keyCode&&!0===e.options.accessibility&&e.changeSlide({data:{message:!0===e.options.rtl?"previous":"next"}}))},e.prototype.lazyLoad=function(){function e(e){i("img[data-lazy]",e).each(function(){var e=i(this),t=i(this).attr("data-lazy"),o=i(this).attr("data-srcset"),s=i(this).attr("data-sizes")||n.$slider.attr("data-sizes"),r=document.createElement("img");r.onload=function(){e.animate({opacity:0},100,function(){o&&(e.attr("srcset",o),s&&e.attr("sizes",s)),e.attr("src",t).animate({opacity:1},200,function(){e.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading")}),n.$slider.trigger("lazyLoaded",[n,e,t])})},r.onerror=function(){e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),n.$slider.trigger("lazyLoadError",[n,e,t])},r.src=t})}var t,o,s,n=this;if(!0===n.options.centerMode?!0===n.options.infinite?s=(o=n.currentSlide+(n.options.slidesToShow/2+1))+n.options.slidesToShow+2:(o=Math.max(0,n.currentSlide-(n.options.slidesToShow/2+1)),s=n.options.slidesToShow/2+1+2+n.currentSlide):(o=n.options.infinite?n.options.slidesToShow+n.currentSlide:n.currentSlide,s=Math.ceil(o+n.options.slidesToShow),!0===n.options.fade&&(o>0&&o--,s<=n.slideCount&&s++)),t=n.$slider.find(".slick-slide").slice(o,s),"anticipated"===n.options.lazyLoad)for(var r=o-1,l=s,d=n.$slider.find(".slick-slide"),a=0;a<n.options.slidesToScroll;a++)r<0&&(r=n.slideCount-1),t=(t=t.add(d.eq(r))).add(d.eq(l)),r--,l++;e(t),n.slideCount<=n.options.slidesToShow?e(n.$slider.find(".slick-slide")):n.currentSlide>=n.slideCount-n.options.slidesToShow?e(n.$slider.find(".slick-cloned").slice(0,n.options.slidesToShow)):0===n.currentSlide&&e(n.$slider.find(".slick-cloned").slice(-1*n.options.slidesToShow))},e.prototype.loadSlider=function(){var i=this;i.setPosition(),i.$slideTrack.css({opacity:1}),i.$slider.removeClass("slick-loading"),i.initUI(),"progressive"===i.options.lazyLoad&&i.progressiveLazyLoad()},e.prototype.next=e.prototype.slickNext=function(){this.changeSlide({data:{message:"next"}})},e.prototype.orientationChange=function(){var i=this;i.checkResponsive(),i.setPosition()},e.prototype.pause=e.prototype.slickPause=function(){var i=this;i.autoPlayClear(),i.paused=!0},e.prototype.play=e.prototype.slickPlay=function(){var i=this;i.autoPlay(),i.options.autoplay=!0,i.paused=!1,i.focussed=!1,i.interrupted=!1},e.prototype.postSlide=function(e){var t=this;t.unslicked||(t.$slider.trigger("afterChange",[t,e]),t.animating=!1,t.slideCount>t.options.slidesToShow&&t.setPosition(),t.swipeLeft=null,t.options.autoplay&&t.autoPlay(),!0===t.options.accessibility&&(t.initADA(),t.options.focusOnChange&&i(t.$slides.get(t.currentSlide)).attr("tabindex",0).focus()))},e.prototype.prev=e.prototype.slickPrev=function(){this.changeSlide({data:{message:"previous"}})},e.prototype.preventDefault=function(i){i.preventDefault()},e.prototype.progressiveLazyLoad=function(e){e=e||1;var t,o,s,n,r,l=this,d=i("img[data-lazy]",l.$slider);d.length?(t=d.first(),o=t.attr("data-lazy"),s=t.attr("data-srcset"),n=t.attr("data-sizes")||l.$slider.attr("data-sizes"),(r=document.createElement("img")).onload=function(){s&&(t.attr("srcset",s),n&&t.attr("sizes",n)),t.attr("src",o).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"),!0===l.options.adaptiveHeight&&l.setPosition(),l.$slider.trigger("lazyLoaded",[l,t,o]),l.progressiveLazyLoad()},r.onerror=function(){e<3?setTimeout(function(){l.progressiveLazyLoad(e+1)},500):(t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),l.$slider.trigger("lazyLoadError",[l,t,o]),l.progressiveLazyLoad())},r.src=o):l.$slider.trigger("allImagesLoaded",[l])},e.prototype.refresh=function(e){var t,o,s=this;o=s.slideCount-s.options.slidesToShow,!s.options.infinite&&s.currentSlide>o&&(s.currentSlide=o),s.slideCount<=s.options.slidesToShow&&(s.currentSlide=0),t=s.currentSlide,s.destroy(!0),i.extend(s,s.initials,{currentSlide:t}),s.init(),e||s.changeSlide({data:{message:"index",index:t}},!1)},e.prototype.registerBreakpoints=function(){var e,t,o,s=this,n=s.options.responsive||null;if("array"===i.type(n)&&n.length){s.respondTo=s.options.respondTo||"window";for(e in n)if(o=s.breakpoints.length-1,n.hasOwnProperty(e)){for(t=n[e].breakpoint;o>=0;)s.breakpoints[o]&&s.breakpoints[o]===t&&s.breakpoints.splice(o,1),o--;s.breakpoints.push(t),s.breakpointSettings[t]=n[e].settings}s.breakpoints.sort(function(i,e){return s.options.mobileFirst?i-e:e-i})}},e.prototype.reinit=function(){var e=this;e.$slides=e.$slideTrack.children(e.options.slide).addClass("slick-slide"),e.slideCount=e.$slides.length,e.currentSlide>=e.slideCount&&0!==e.currentSlide&&(e.currentSlide=e.currentSlide-e.options.slidesToScroll),e.slideCount<=e.options.slidesToShow&&(e.currentSlide=0),e.registerBreakpoints(),e.setProps(),e.setupInfinite(),e.buildArrows(),e.updateArrows(),e.initArrowEvents(),e.buildDots(),e.updateDots(),e.initDotEvents(),e.cleanUpSlideEvents(),e.initSlideEvents(),e.checkResponsive(!1,!0),!0===e.options.focusOnSelect&&i(e.$slideTrack).children().on("click.slick",e.selectHandler),e.setSlideClasses("number"==typeof e.currentSlide?e.currentSlide:0),e.setPosition(),e.focusHandler(),e.paused=!e.options.autoplay,e.autoPlay(),e.$slider.trigger("reInit",[e])},e.prototype.resize=function(){var e=this;i(window).width()!==e.windowWidth&&(clearTimeout(e.windowDelay),e.windowDelay=window.setTimeout(function(){e.windowWidth=i(window).width(),e.checkResponsive(),e.unslicked||e.setPosition()},50))},e.prototype.removeSlide=e.prototype.slickRemove=function(i,e,t){var o=this;if(i="boolean"==typeof i?!0===(e=i)?0:o.slideCount-1:!0===e?--i:i,o.slideCount<1||i<0||i>o.slideCount-1)return!1;o.unload(),!0===t?o.$slideTrack.children().remove():o.$slideTrack.children(this.options.slide).eq(i).remove(),o.$slides=o.$slideTrack.children(this.options.slide),o.$slideTrack.children(this.options.slide).detach(),o.$slideTrack.append(o.$slides),o.$slidesCache=o.$slides,o.reinit()},e.prototype.setCSS=function(i){var e,t,o=this,s={};!0===o.options.rtl&&(i=-i),e="left"==o.positionProp?Math.ceil(i)+"px":"0px",t="top"==o.positionProp?Math.ceil(i)+"px":"0px",s[o.positionProp]=i,!1===o.transformsEnabled?o.$slideTrack.css(s):(s={},!1===o.cssTransitions?(s[o.animType]="translate("+e+", "+t+")",o.$slideTrack.css(s)):(s[o.animType]="translate3d("+e+", "+t+", 0px)",o.$slideTrack.css(s)))},e.prototype.setDimensions=function(){var i=this;!1===i.options.vertical?!0===i.options.centerMode&&i.$list.css({padding:"0px "+i.options.centerPadding}):(i.$list.height(i.$slides.first().outerHeight(!0)*i.options.slidesToShow),!0===i.options.centerMode&&i.$list.css({padding:i.options.centerPadding+" 0px"})),i.listWidth=i.$list.width(),i.listHeight=i.$list.height(),!1===i.options.vertical&&!1===i.options.variableWidth?(i.slideWidth=Math.ceil(i.listWidth/i.options.slidesToShow),i.$slideTrack.width(Math.ceil(i.slideWidth*i.$slideTrack.children(".slick-slide").length))):!0===i.options.variableWidth?i.$slideTrack.width(5e3*i.slideCount):(i.slideWidth=Math.ceil(i.listWidth),i.$slideTrack.height(Math.ceil(i.$slides.first().outerHeight(!0)*i.$slideTrack.children(".slick-slide").length)));var e=i.$slides.first().outerWidth(!0)-i.$slides.first().width();!1===i.options.variableWidth&&i.$slideTrack.children(".slick-slide").width(i.slideWidth-e)},e.prototype.setFade=function(){var e,t=this;t.$slides.each(function(o,s){e=t.slideWidth*o*-1,!0===t.options.rtl?i(s).css({position:"relative",right:e,top:0,zIndex:t.options.zIndex-2,opacity:0}):i(s).css({position:"relative",left:e,top:0,zIndex:t.options.zIndex-2,opacity:0})}),t.$slides.eq(t.currentSlide).css({zIndex:t.options.zIndex-1,opacity:1})},e.prototype.setHeight=function(){var i=this;if(1===i.options.slidesToShow&&!0===i.options.adaptiveHeight&&!1===i.options.vertical){var e=i.$slides.eq(i.currentSlide).outerHeight(!0);i.$list.css("height",e)}},e.prototype.setOption=e.prototype.slickSetOption=function(){var e,t,o,s,n,r=this,l=!1;if("object"===i.type(arguments[0])?(o=arguments[0],l=arguments[1],n="multiple"):"string"===i.type(arguments[0])&&(o=arguments[0],s=arguments[1],l=arguments[2],"responsive"===arguments[0]&&"array"===i.type(arguments[1])?n="responsive":void 0!==arguments[1]&&(n="single")),"single"===n)r.options[o]=s;else if("multiple"===n)i.each(o,function(i,e){r.options[i]=e});else if("responsive"===n)for(t in s)if("array"!==i.type(r.options.responsive))r.options.responsive=[s[t]];else{for(e=r.options.responsive.length-1;e>=0;)r.options.responsive[e].breakpoint===s[t].breakpoint&&r.options.responsive.splice(e,1),e--;r.options.responsive.push(s[t])}l&&(r.unload(),r.reinit())},e.prototype.setPosition=function(){var i=this;i.setDimensions(),i.setHeight(),!1===i.options.fade?i.setCSS(i.getLeft(i.currentSlide)):i.setFade(),i.$slider.trigger("setPosition",[i])},e.prototype.setProps=function(){var i=this,e=document.body.style;i.positionProp=!0===i.options.vertical?"top":"left","top"===i.positionProp?i.$slider.addClass("slick-vertical"):i.$slider.removeClass("slick-vertical"),void 0===e.WebkitTransition&&void 0===e.MozTransition&&void 0===e.msTransition||!0===i.options.useCSS&&(i.cssTransitions=!0),i.options.fade&&("number"==typeof i.options.zIndex?i.options.zIndex<3&&(i.options.zIndex=3):i.options.zIndex=i.defaults.zIndex),void 0!==e.OTransform&&(i.animType="OTransform",i.transformType="-o-transform",i.transitionType="OTransition",void 0===e.perspectiveProperty&&void 0===e.webkitPerspective&&(i.animType=!1)),void 0!==e.MozTransform&&(i.animType="MozTransform",i.transformType="-moz-transform",i.transitionType="MozTransition",void 0===e.perspectiveProperty&&void 0===e.MozPerspective&&(i.animType=!1)),void 0!==e.webkitTransform&&(i.animType="webkitTransform",i.transformType="-webkit-transform",i.transitionType="webkitTransition",void 0===e.perspectiveProperty&&void 0===e.webkitPerspective&&(i.animType=!1)),void 0!==e.msTransform&&(i.animType="msTransform",i.transformType="-ms-transform",i.transitionType="msTransition",void 0===e.msTransform&&(i.animType=!1)),void 0!==e.transform&&!1!==i.animType&&(i.animType="transform",i.transformType="transform",i.transitionType="transition"),i.transformsEnabled=i.options.useTransform&&null!==i.animType&&!1!==i.animType},e.prototype.setSlideClasses=function(i){var e,t,o,s,n=this;if(t=n.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden","true"),n.$slides.eq(i).addClass("slick-current"),!0===n.options.centerMode){var r=n.options.slidesToShow%2==0?1:0;e=Math.floor(n.options.slidesToShow/2),!0===n.options.infinite&&(i>=e&&i<=n.slideCount-1-e?n.$slides.slice(i-e+r,i+e+1).addClass("slick-active").attr("aria-hidden","false"):(o=n.options.slidesToShow+i,t.slice(o-e+1+r,o+e+2).addClass("slick-active").attr("aria-hidden","false")),0===i?t.eq(t.length-1-n.options.slidesToShow).addClass("slick-center"):i===n.slideCount-1&&t.eq(n.options.slidesToShow).addClass("slick-center")),n.$slides.eq(i).addClass("slick-center")}else i>=0&&i<=n.slideCount-n.options.slidesToShow?n.$slides.slice(i,i+n.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false"):t.length<=n.options.slidesToShow?t.addClass("slick-active").attr("aria-hidden","false"):(s=n.slideCount%n.options.slidesToShow,o=!0===n.options.infinite?n.options.slidesToShow+i:i,n.options.slidesToShow==n.options.slidesToScroll&&n.slideCount-i<n.options.slidesToShow?t.slice(o-(n.options.slidesToShow-s),o+s).addClass("slick-active").attr("aria-hidden","false"):t.slice(o,o+n.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false"));"ondemand"!==n.options.lazyLoad&&"anticipated"!==n.options.lazyLoad||n.lazyLoad()},e.prototype.setupInfinite=function(){var e,t,o,s=this;if(!0===s.options.fade&&(s.options.centerMode=!1),!0===s.options.infinite&&!1===s.options.fade&&(t=null,s.slideCount>s.options.slidesToShow)){for(o=!0===s.options.centerMode?s.options.slidesToShow+1:s.options.slidesToShow,e=s.slideCount;e>s.slideCount-o;e-=1)t=e-1,i(s.$slides[t]).clone(!0).attr("id","").attr("data-slick-index",t-s.slideCount).prependTo(s.$slideTrack).addClass("slick-cloned");for(e=0;e<o+s.slideCount;e+=1)t=e,i(s.$slides[t]).clone(!0).attr("id","").attr("data-slick-index",t+s.slideCount).appendTo(s.$slideTrack).addClass("slick-cloned");s.$slideTrack.find(".slick-cloned").find("[id]").each(function(){i(this).attr("id","")})}},e.prototype.interrupt=function(i){var e=this;i||e.autoPlay(),e.interrupted=i},e.prototype.selectHandler=function(e){var t=this,o=i(e.target).is(".slick-slide")?i(e.target):i(e.target).parents(".slick-slide"),s=parseInt(o.attr("data-slick-index"));s||(s=0),t.slideCount<=t.options.slidesToShow?t.slideHandler(s,!1,!0):t.slideHandler(s)},e.prototype.slideHandler=function(i,e,t){var o,s,n,r,l,d=null,a=this;if(e=e||!1,!(!0===a.animating&&!0===a.options.waitForAnimate||!0===a.options.fade&&a.currentSlide===i))if(!1===e&&a.asNavFor(i),o=i,d=a.getLeft(o),r=a.getLeft(a.currentSlide),a.currentLeft=null===a.swipeLeft?r:a.swipeLeft,!1===a.options.infinite&&!1===a.options.centerMode&&(i<0||i>a.getDotCount()*a.options.slidesToScroll))!1===a.options.fade&&(o=a.currentSlide,!0!==t?a.animateSlide(r,function(){a.postSlide(o)}):a.postSlide(o));else if(!1===a.options.infinite&&!0===a.options.centerMode&&(i<0||i>a.slideCount-a.options.slidesToScroll))!1===a.options.fade&&(o=a.currentSlide,!0!==t?a.animateSlide(r,function(){a.postSlide(o)}):a.postSlide(o));else{if(a.options.autoplay&&clearInterval(a.autoPlayTimer),s=o<0?a.slideCount%a.options.slidesToScroll!=0?a.slideCount-a.slideCount%a.options.slidesToScroll:a.slideCount+o:o>=a.slideCount?a.slideCount%a.options.slidesToScroll!=0?0:o-a.slideCount:o,a.animating=!0,a.$slider.trigger("beforeChange",[a,a.currentSlide,s]),n=a.currentSlide,a.currentSlide=s,a.setSlideClasses(a.currentSlide),a.options.asNavFor&&(l=(l=a.getNavTarget()).slick("getSlick")).slideCount<=l.options.slidesToShow&&l.setSlideClasses(a.currentSlide),a.updateDots(),a.updateArrows(),!0===a.options.fade)return!0!==t?(a.fadeSlideOut(n),a.fadeSlide(s,function(){a.postSlide(s)})):a.postSlide(s),void a.animateHeight();!0!==t?a.animateSlide(d,function(){a.postSlide(s)}):a.postSlide(s)}},e.prototype.startLoad=function(){var i=this;!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow.hide(),i.$nextArrow.hide()),!0===i.options.dots&&i.slideCount>i.options.slidesToShow&&i.$dots.hide(),i.$slider.addClass("slick-loading")},e.prototype.swipeDirection=function(){var i,e,t,o,s=this;return i=s.touchObject.startX-s.touchObject.curX,e=s.touchObject.startY-s.touchObject.curY,t=Math.atan2(e,i),(o=Math.round(180*t/Math.PI))<0&&(o=360-Math.abs(o)),o<=45&&o>=0?!1===s.options.rtl?"left":"right":o<=360&&o>=315?!1===s.options.rtl?"left":"right":o>=135&&o<=225?!1===s.options.rtl?"right":"left":!0===s.options.verticalSwiping?o>=35&&o<=135?"down":"up":"vertical"},e.prototype.swipeEnd=function(i){var e,t,o=this;if(o.dragging=!1,o.swiping=!1,o.scrolling)return o.scrolling=!1,!1;if(o.interrupted=!1,o.shouldClick=!(o.touchObject.swipeLength>10),void 0===o.touchObject.curX)return!1;if(!0===o.touchObject.edgeHit&&o.$slider.trigger("edge",[o,o.swipeDirection()]),o.touchObject.swipeLength>=o.touchObject.minSwipe){switch(t=o.swipeDirection()){case"left":case"down":e=o.options.swipeToSlide?o.checkNavigable(o.currentSlide+o.getSlideCount()):o.currentSlide+o.getSlideCount(),o.currentDirection=0;break;case"right":case"up":e=o.options.swipeToSlide?o.checkNavigable(o.currentSlide-o.getSlideCount()):o.currentSlide-o.getSlideCount(),o.currentDirection=1}"vertical"!=t&&(o.slideHandler(e),o.touchObject={},o.$slider.trigger("swipe",[o,t]))}else o.touchObject.startX!==o.touchObject.curX&&(o.slideHandler(o.currentSlide),o.touchObject={})},e.prototype.swipeHandler=function(i){var e=this;if(!(!1===e.options.swipe||"ontouchend"in document&&!1===e.options.swipe||!1===e.options.draggable&&-1!==i.type.indexOf("mouse")))switch(e.touchObject.fingerCount=i.originalEvent&&void 0!==i.originalEvent.touches?i.originalEvent.touches.length:1,e.touchObject.minSwipe=e.listWidth/e.options.touchThreshold,!0===e.options.verticalSwiping&&(e.touchObject.minSwipe=e.listHeight/e.options.touchThreshold),i.data.action){case"start":e.swipeStart(i);break;case"move":e.swipeMove(i);break;case"end":e.swipeEnd(i)}},e.prototype.swipeMove=function(i){var e,t,o,s,n,r,l=this;return n=void 0!==i.originalEvent?i.originalEvent.touches:null,!(!l.dragging||l.scrolling||n&&1!==n.length)&&(e=l.getLeft(l.currentSlide),l.touchObject.curX=void 0!==n?n[0].pageX:i.clientX,l.touchObject.curY=void 0!==n?n[0].pageY:i.clientY,l.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(l.touchObject.curX-l.touchObject.startX,2))),r=Math.round(Math.sqrt(Math.pow(l.touchObject.curY-l.touchObject.startY,2))),!l.options.verticalSwiping&&!l.swiping&&r>4?(l.scrolling=!0,!1):(!0===l.options.verticalSwiping&&(l.touchObject.swipeLength=r),t=l.swipeDirection(),void 0!==i.originalEvent&&l.touchObject.swipeLength>4&&(l.swiping=!0,i.preventDefault()),s=(!1===l.options.rtl?1:-1)*(l.touchObject.curX>l.touchObject.startX?1:-1),!0===l.options.verticalSwiping&&(s=l.touchObject.curY>l.touchObject.startY?1:-1),o=l.touchObject.swipeLength,l.touchObject.edgeHit=!1,!1===l.options.infinite&&(0===l.currentSlide&&"right"===t||l.currentSlide>=l.getDotCount()&&"left"===t)&&(o=l.touchObject.swipeLength*l.options.edgeFriction,l.touchObject.edgeHit=!0),!1===l.options.vertical?l.swipeLeft=e+o*s:l.swipeLeft=e+o*(l.$list.height()/l.listWidth)*s,!0===l.options.verticalSwiping&&(l.swipeLeft=e+o*s),!0!==l.options.fade&&!1!==l.options.touchMove&&(!0===l.animating?(l.swipeLeft=null,!1):void l.setCSS(l.swipeLeft))))},e.prototype.swipeStart=function(i){var e,t=this;if(t.interrupted=!0,1!==t.touchObject.fingerCount||t.slideCount<=t.options.slidesToShow)return t.touchObject={},!1;void 0!==i.originalEvent&&void 0!==i.originalEvent.touches&&(e=i.originalEvent.touches[0]),t.touchObject.startX=t.touchObject.curX=void 0!==e?e.pageX:i.clientX,t.touchObject.startY=t.touchObject.curY=void 0!==e?e.pageY:i.clientY,t.dragging=!0},e.prototype.unfilterSlides=e.prototype.slickUnfilter=function(){var i=this;null!==i.$slidesCache&&(i.unload(),i.$slideTrack.children(this.options.slide).detach(),i.$slidesCache.appendTo(i.$slideTrack),i.reinit())},e.prototype.unload=function(){var e=this;i(".slick-cloned",e.$slider).remove(),e.$dots&&e.$dots.remove(),e.$prevArrow&&e.htmlExpr.test(e.options.prevArrow)&&e.$prevArrow.remove(),e.$nextArrow&&e.htmlExpr.test(e.options.nextArrow)&&e.$nextArrow.remove(),e.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden","true").css("width","")},e.prototype.unslick=function(i){var e=this;e.$slider.trigger("unslick",[e,i]),e.destroy()},e.prototype.updateArrows=function(){var i=this;Math.floor(i.options.slidesToShow/2),!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&!i.options.infinite&&(i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false"),i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false"),0===i.currentSlide?(i.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true"),i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false")):i.currentSlide>=i.slideCount-i.options.slidesToShow&&!1===i.options.centerMode?(i.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")):i.currentSlide>=i.slideCount-1&&!0===i.options.centerMode&&(i.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")))},e.prototype.updateDots=function(){var i=this;null!==i.$dots&&(i.$dots.find("li").removeClass("slick-active").end(),i.$dots.find("li").eq(Math.floor(i.currentSlide/i.options.slidesToScroll)).addClass("slick-active"))},e.prototype.visibility=function(){var i=this;i.options.autoplay&&(document[i.hidden]?i.interrupted=!0:i.interrupted=!1)},i.fn.slick=function(){var i,t,o=this,s=arguments[0],n=Array.prototype.slice.call(arguments,1),r=o.length;for(i=0;i<r;i++)if("object"==typeof s||void 0===s?o[i].slick=new e(o[i],s):t=o[i].slick[s].apply(o[i].slick,n),void 0!==t)return t;return o}});

/* ========================================================================
 * Bootstrap: dropdown.js v3.3.7
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle="dropdown"]'
  var Dropdown = function (element) {
    $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.VERSION = '3.3.7'

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }

  function clearMenus(e) {
    if (e && e.which === 3) return
    $(backdrop).remove()
    $(toggle).each(function () {
      var $this         = $(this)
      var $parent       = getParent($this)
      var relatedTarget = { relatedTarget: this }

      if (!$parent.hasClass('open')) return

      if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target)) return

      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this.attr('aria-expanded', 'false')
      $parent.removeClass('open').trigger($.Event('hidden.bs.dropdown', relatedTarget))
    })
  }

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $(document.createElement('div'))
          .addClass('dropdown-backdrop')
          .insertAfter($(this))
          .on('click', clearMenus)
      }

      var relatedTarget = { relatedTarget: this }
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this
        .trigger('focus')
        .attr('aria-expanded', 'true')

      $parent
        .toggleClass('open')
        .trigger($.Event('shown.bs.dropdown', relatedTarget))
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if (!isActive && e.which != 27 || isActive && e.which == 27) {
      if (e.which == 27) $parent.find(toggle).trigger('focus')
      return $this.trigger('click')
    }

    var desc = ' li:not(.disabled):visible a'
    var $items = $parent.find('.dropdown-menu' + desc)

    if (!$items.length) return

    var index = $items.index(e.target)

    if (e.which == 38 && index > 0)                 index--         // up
    if (e.which == 40 && index < $items.length - 1) index++         // down
    if (!~index)                                    index = 0

    $items.eq(index).trigger('focus')
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.dropdown')

      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.dropdown

  $.fn.dropdown             = Plugin
  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown)
    .on('keydown.bs.dropdown.data-api', '.dropdown-menu', Dropdown.prototype.keydown)

}(jQuery);

;
/**
 *  util.js
 *
 *
 */
var SITE = (function (module) {

  'use strict';

  module.util = (function () {

    var _name = 'util',
        load_log = false,
        debug_enable = true; /* Global flag; overrides module flags */

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    function debug(obj) {
      if (debug_enable === false) {
        return;
      }
      if ((typeof window.console !== 'undefined' && window.console !== null) && typeof window.console === 'object' && window.console.log) {
        window.console.log(obj);
      }
    }

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    if (debug_enable) debug('SITE.' + _name + ' :: loaded');

    return {
      debug: debug
    };

  }) ();

  return module;

}) (SITE || {});

;
/**
 *  window-events.js
 *
 *  requires: 
 *    jQuery
 *    Underscore
 *    util.js
 *
 *  description:
 *    This module allows aggregation of window events like
 *    resize and scroll in a central, throttleable location.
 *
 *    Messages are broadcasted from here which can be
 *    subscribed to from any location.
 *
 *    For ex., 
 *      Broadcast: $('body').trigger('SITE.windowEvents.displayChange');
 *      Subscribe: $('body').on('SITE.windowEvents.displayChange');
 *
 */

var SITE = (function (module, $) {

  'use strict';

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  module.windowEvents = (function () {

    var _name = 'windowEvents',
        load_log = true,
        debug_enable = true,
        debug = debug_enable ? module.util.debug : function () {},
        globalWindowEvents = null;

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    function WindowEvents() {

      this.classNames = {
        'mqHelper': 'aa-mq-helper'
      };
      this.selectors = {
        'mqHelper': '.' + this.classNames.mqHelper
      };
      this.cssLoadInt = null;
      this.currentWidth = null;
      this.cssIsLoaded = false;
      this.pollInterval = 10;
      this.maxWait = 180000;
      this.waited = 0;
      this.firstRequestMade = false;
      this.keyCapture = [
        37,  // left arrow
        38,  // up arrow
        39,  // right arrow
        40,  // down arrow
        79,  // o 
        83   // s 
      ];

      this.bindEvents();

      this.init();

    }

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    WindowEvents.prototype.init = function () {

      var self = this;

      if ($('body').find(self.selectors.mqHelper).length < 1) {
        $('body').prepend('<span class="' + self.classNames.mqHelper + '"></span>');
      }

      // Monitor CSS load state
      this.cssLoadInt = setInterval(function () {
        self.pollCSS(self);
      }, self.pollInterval);

      this.getSetWidth();

    };

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    WindowEvents.prototype.pollCSS = function (self) {

      var self = this;

      if ($(self.selectors.mqHelper).css('display') === 'block') {

        // debug(_name + ': CSS Loaded');
        if (self.cssLoadInt) clearInterval(self.cssLoadInt);

        $('body').trigger('SITE.windowEvents.cssLoaded', {
          width: self.getSetWidth()
        });

        $('body').attr('data-cssloaded', 'true');

        self.cssIsLoaded = true;
        // debug(_name + ': CSS loaded');

      } else if (self.waited >= self.maxWait) {

        if (self.cssLoadInt) clearInterval(self.cssLoadInt);

        throw new Error("Error: CSS not loaded");

      }

      self.waited += self.pollInterval;

    };

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    WindowEvents.prototype.triggerChange = function () {

      var self = this;

      $('body')
        .trigger('SITE.windowEvents.windowResize', {
          width: self.getSetWidth(),
          displaySize: $('body').attr('data-display-size')
        });

      self.detectChange();

    };

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    WindowEvents.prototype.setDisplayType = function () {

      var self = this;

      // Exit if mobile
      if (($('body').attr('data-display-size') === 'xs') ||
          ($('body').attr('data-display-size') === 'sm') ||
          ($('body').attr('data-display-size') === 'md')) {

        $('html').addClass('aa-display-mobile');
        $('html').removeClass('aa-display-desktop');

      } else {

        $('html').removeClass('aa-display-mobile');
        $('html').addClass('aa-display-desktop');

      }

    };

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    /**
     *  Sync these breakpoints with variables.scss
     *
     *  $screen-xs: 576px
     *  $screen-sm: 768px
     *  $screen-md: 992px
     *  $screen-lg: 1200px
     *  $screen-xl: 1400px
     *
     *  Note that syncing via media query is more reliable
     *  than measuring window.innerWidth because of
     *  scrollbar implementation variations.
     */

    WindowEvents.prototype.getSetWidth = function () {

      var self = this,
          selector = this.selectors.mqHelper,
          displayWidth = parseInt($(selector).css('width'), 10),
          displaySize = 'xl';

      if (displayWidth >= 1400) {
        displaySize = 'xl';
      } else if (displayWidth >= 1200) {
        displaySize = 'lg';
      } else if (displayWidth >= 992) {
        displaySize = 'md';
      } else if (displayWidth >= 768) {
        displaySize = 'sm';
      } else {
        displaySize = 'xs';
      }

      $('body').attr('data-display-size', displaySize);

      self.setDisplayType();

      return displaySize;

    };

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    WindowEvents.prototype.bindEvents = function () {

      var self = this;

      $(window)
        .resize(_.throttle(function () {
          self.triggerChange();
        }, 10))
        .resize(_.debounce(function () {
          // Trigger once more in case of performance lag
          self.triggerChange();
          self.debouncedChangeTrigger();
        }, 200));

      $('body').on('SITE.windowEvents.windowCheck', function () {
        self.detectChange();
      });

      $(window)
        .scroll(_.throttle(function () {
          $('body').trigger('SITE.windowEvents.windowScroll');
        }, 10))
        .resize(_.debounce(function () {
          $('body').trigger('SITE.windowEvents.windowScroll');
        }, 10));

      $(window)
        .scroll(_.debounce(function () {
          $('body').trigger('SITE.windowEvents.windowScrollDebounced');
        }, 150));

      $(window)
        .on('keydown', function (e) {
          var keyCode = e.which;
          if ($.inArray(keyCode, self.keyCapture) >= 0) {
          }
        });

      $(window)
        .on('keyup', function (e) {
          var keyCode = e.which;
          // debug(keyCode);
          if ($.inArray(keyCode, self.keyCapture) >= 0) {
            $('body').trigger('SITE.windowEvents.keyUp', {
              keyCode: keyCode
            });
          }
        });

    };

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    WindowEvents.prototype.detectChange = function () {

      var thisWidth = this.getSetWidth();
      // debug('this.firstRequestMade: ' + this.firstRequestMade);

      if (this.firstRequestMade === false) {

        // debug('this.firstRequestMade');
        this.currentWidth = thisWidth;

        $('body')
          .trigger('SITE.windowEvents.displayChange', {
            width: thisWidth
          });

        this.firstRequestMade = true;

      } else if (this.currentWidth === thisWidth) {

      } else {

        this.currentWidth = thisWidth;

        $('body')
          .trigger('SITE.windowEvents.displayChange', {
            width: thisWidth
          });

      }

    };

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    WindowEvents.prototype.debouncedChangeTrigger = function () {

      var thisWidth = this.getSetWidth();

      $('body')
        .trigger('SITE.windowEvents.displayChange', {
          width: thisWidth
        });

      $('body')
        .trigger('SITE.windowEvents.debouncedResize', {
          width: thisWidth
        });

    };

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    if (debug_enable && load_log) debug('SITE.' + _name + ' :: loaded');

    return {
      WindowEvents: WindowEvents
    };

  }) ();

  return module;

}) (SITE || {}, jQuery);

;
/**
 *  block-toggle-item.js
 *
 *
 */

var SITE = (function (module, $) {

  'use strict';

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  module.blockToggleItem = (function () {

    var _name = 'blockToggleItem',
        load_log = true,
        debug_enable = true,
        debug = debug_enable ? module.util.debug : function () {};

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    function BlockToggleItem() {

      this.classNames = {
        'context':          'aa-block-toggle-item',
        'toggle':           'aa-block-toggle-item__toggle',
        'contentWrap':      'aa-block-toggle-item__content-wrap',
        'content':          'aa-block-toggle-item__content'
      };
      this.selectors = {
        'context':          '.' + this.classNames.context,
        'toggle':           '.' + this.classNames.toggle,
        'contentWrap':      '.' + this.classNames.contentWrap,
        'content':          '.' + this.classNames.content
      };

      this.$context = $(this.selectors.context);

      if (this.$context.length > 0) {
        this.init();
      }

    }

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    BlockToggleItem.prototype.init = function () {

      var self = this;

      $.each(self.$context, function (index, context) {
        self.bindMainEvents($(context));
      });

    };

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    BlockToggleItem.prototype.bindMainEvents = function ($context) {

      var self = this,
          $toggle;

      $toggle = $context.find(self.selectors.toggle);

      $toggle.on('click', function () {
        self.openClose($context);
      });

    };

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    BlockToggleItem.prototype.openClose = function ($context) {

      var self = this;

      if ($context.attr('aria-expanded') === 'false') {
        self.openItem($context);
      } else {
        self.closeItem($context);
      }

    };

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    BlockToggleItem.prototype.openItem = function ($context) {

      var self = this;

      $context
        .find(self.selectors.contentWrap)
        .stop()
        .animate({
          'height': $context.find(self.selectors.content).outerHeight()
        },{
          'duration': 150,
          'easing': 'easeInOutQuad',
          'complete': function () {
            $context.attr('aria-expanded', 'true');
          }
        });

    };

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    BlockToggleItem.prototype.closeItem = function ($context) {

      var self = this;

      $context
        .find(self.selectors.contentWrap)
        .stop()
        .animate({
          'height': 0
        },{
          'duration': 150,
          'easing': 'easeInOutQuad',
          'complete': function () {
            $context.attr('aria-expanded', 'false');
          }
        });

    };

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    if (debug_enable && load_log) debug('SITE.' + _name + ' :: loaded');

    return {
      BlockToggleItem: BlockToggleItem
    };

  }) ();

  return module;

}) (SITE || {}, jQuery);

;
/**
 *  carousel-article.js
 *
 *
 */

var SITE = (function (module, $) {

  'use strict';

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  module.carouselArticle = (function () {

    var _name = 'carouselArticle',
        load_log = true,
        debug_enable = true,
        debug = debug_enable ? module.util.debug : function () {};

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    function CarouselArticle() {

      this.classNames = {
        'context':          'aa-carousel-article',
        'slides':           'aa-carousel-article__slides',
        'slide':            'aa-carousel-article-slide',
        'textCard':         'aa-carousel-article-slide__text-card',
        'initClass':        'aa-carousel-article--init',
        'navigation':       'aa-carousel-article__navigation',
        'caption':          'aa-carousel-article__caption'
      };
      this.selectors = {
        'context':          '.' + this.classNames.context,
        'slides':           '.' + this.classNames.slides,
        'slide':            '.' + this.classNames.slide,
        'textCard':         '.' + this.classNames.textCard,
        'initClass':        '.' + this.classNames.initClass,
        'navigation':       '.' + this.classNames.navigation,
        'caption':          '.' + this.classNames.caption
      };

      this.requiredAspectRatio = (1280/418);
      this.$context = $(this.selectors.context);

      if (this.$context.length > 0) {
        this.init();
      }

    }

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    CarouselArticle.prototype.init = function () {

      var self = this;

      $.each(self.$context, function (index, context) {
        if ($(context).hasClass(self.classNames.initClass)) {
          // Only proceed if there is an initialize class
          // self.prepareImages($(context));
          self.initLayout($(context));
        }
      });

      self.bindMainEvents();

    };

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    /**
     *  Detect image aspect ratios and apply requisite
     *  auto-fill behavior to ensure that the image fills
     *  the slide container as best it can, regardless
     *  of the aspect ratio of the image. 
     *
     *  This implementation is preferred over the more
     *  unpredictable behavior of "background-image: cover"
     *  as implemented by CSS.
     *
     */
    CarouselArticle.prototype.prepareImages = function ($context) {

      var self = this,
          $slides,
          dims = {};

      $context.data('slideImages', []);
      $slides = $context.find(self.selectors.slide);

      $.each($slides, function (index, slide) {
        self.preloadImage($context, $(slide), index);
      });

    };

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    CarouselArticle.prototype.preloadImage = function ($context, $slide, index) {

      var self = this,
          $image,
          thisAspectRatio;

      $image = $slide.find('img');

      $context.data('slideImages')[index] = new Image();
      $context.data('slideImages')[index].src = $image.attr('src');
      $context.data('slideImages')[index].onload = function () {
        thisAspectRatio = this.width/this.height;
        // debug('thisAspectRatio: '  + thisAspectRatio);
        // debug('self.requiredAspectRatio: ' + self.requiredAspectRatio);
        if (thisAspectRatio > self.requiredAspectRatio) {
          $image.css({
            'width': 'auto',
            'height': '100%'
          });
        } else if (thisAspectRatio < self.requiredAspectRatio) {
          $image.css({
            'width': '100%',
            'height': 'auto'
          });
        }
      };

    };

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    CarouselArticle.prototype.initLayout = function ($context) {

      var self = this;

      $context
        .find(self.selectors.slides)
        .slick({
          infinite: true,
          speed: 300,
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          appendDots: $context.find(self.selectors.navigation),
          prevArrow: $context.find('.slick-prev'),
          nextArrow: $context.find('.slick-next'),
          responsive: [
            {
              breakpoint: 576,
              settings: {
                adaptiveHeight: true
              }
            }
          ]
        });

      $context.on('afterChange', function (event, slick) {
        self.updateText($context, event, slick);
      });

    };

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    CarouselArticle.prototype.updateText = function ($context, event, slick) {

      var self = this,
          $currentSlide,
          html;

      $currentSlide = $context.find('.slick-current');
      html = $currentSlide.find(self.selectors.textCard).clone();
      $context.find(self.selectors.caption).empty().html(html);

    };

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    CarouselArticle.prototype.bindMainEvents = function () {

      var self = this;

    };

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    if (debug_enable && load_log) debug('SITE.' + _name + ' :: loaded');

    return {
      CarouselArticle: CarouselArticle
    };

  }) ();

  return module;

}) (SITE || {}, jQuery);

;
/**
 *  carousel-hero.js
 *
 *
 */

var SITE = (function (module, $) {

  'use strict';

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  module.carouselHero = (function () {

    var _name = 'carouselHero',
        load_log = true,
        debug_enable = true,
        debug = debug_enable ? module.util.debug : function () {};

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    function CarouselHero() {

      this.classNames = {
        'context':          'aa-carousel-hero',
        'slides':           'aa-carousel-hero__slides',
        'slide':            'aa-carousel-hero-slide',
        'textCard':         'aa-carousel-hero-slide__text-card',
        'initClass':        'aa-carousel-hero--init',
        'navigation':       'aa-carousel-hero__navigation',
        'caption':          'aa-carousel-hero__caption'
      };
      this.selectors = {
        'context':          '.' + this.classNames.context,
        'slides':           '.' + this.classNames.slides,
        'slide':            '.' + this.classNames.slide,
        'textCard':         '.' + this.classNames.textCard,
        'initClass':        '.' + this.classNames.initClass,
        'navigation':       '.' + this.classNames.navigation,
        'caption':          '.' + this.classNames.caption
      };

      this.requiredAspectRatio = (1280/418);
      this.$context = $(this.selectors.context);

      if (this.$context.length > 0) {
        this.init();
      }

    }

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    CarouselHero.prototype.init = function () {

      var self = this;

      $.each(self.$context, function (index, context) {
        if ($(context).hasClass(self.classNames.initClass)) {
          // Only proceed if there is an initialize class
          self.prepareImages($(context));
          self.initLayout($(context));
        }
      });

      self.bindMainEvents();

    };

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    /**
     *  Detect image aspect ratios and apply requisite
     *  auto-fill behavior to ensure that the image fills
     *  the slide container as best it can, regardless
     *  of the aspect ratio of the image. 
     *
     *  This implementation is preferred over the more
     *  unpredictable behavior of "background-image: cover"
     *  as implemented by CSS.
     *
     */
    CarouselHero.prototype.prepareImages = function ($context) {

      var self = this,
          $slides,
          dims = {};

      $context.data('slideImages', []);
      $slides = $context.find(self.selectors.slide);

      $.each($slides, function (index, slide) {
        self.preloadImage($context, $(slide), index);
      });

    };

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    CarouselHero.prototype.preloadImage = function ($context, $slide, index) {

      var self = this,
          $image,
          thisAspectRatio;

      $image = $slide.find('img');

      $context.data('slideImages')[index] = new Image();
      $context.data('slideImages')[index].src = $image.attr('src');
      $context.data('slideImages')[index].onload = function () {
        thisAspectRatio = this.width/this.height;
        // debug('thisAspectRatio: '  + thisAspectRatio);
        // debug('self.requiredAspectRatio: ' + self.requiredAspectRatio);
        if (thisAspectRatio > self.requiredAspectRatio) {
          $image.css({
            'width': 'auto',
            'height': '100%'
          });
        } else if (thisAspectRatio < self.requiredAspectRatio) {
          $image.css({
            'width': '100%',
            'height': 'auto'
          });
        }
      };

    };

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    CarouselHero.prototype.initLayout = function ($context) {

      var self = this;

      $context
        .find(self.selectors.slides)
        .slick({
          infinite: true,
          speed: 300,
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          appendDots: $context.find(self.selectors.navigation),
          prevArrow: $context.find('.slick-prev'),
          nextArrow: $context.find('.slick-next'),
          responsive: [
            {
              breakpoint: 576,
              settings: {
                adaptiveHeight: true
              }
            }
          ]
        });

      $context.on('afterChange', function (event, slick) {
        self.updateText($context, event, slick);
      });

    };

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    CarouselHero.prototype.updateText = function ($context, event, slick) {

      var self = this,
          $currentSlide,
          html;

      $currentSlide = $context.find('.slick-current');
      html = $currentSlide.find(self.selectors.textCard).clone();
      $context.find(self.selectors.caption).empty().html(html);

    };

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    CarouselHero.prototype.bindMainEvents = function () {

      var self = this;

    };

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    if (debug_enable && load_log) debug('SITE.' + _name + ' :: loaded');

    return {
      CarouselHero: CarouselHero
    };

  }) ();

  return module;

}) (SITE || {}, jQuery);

;
/**
 *  carousel-social.js
 *
 *
 */

var SITE = (function (module, $) {

  'use strict';

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  module.carouselSocial = (function () {

    var _name = 'carouselSocial',
        load_log = true,
        debug_enable = true,
        debug = debug_enable ? module.util.debug : function () {};

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    function CarouselSocial() {

      this.classNames = {
        'context':          'aa-carousel-social',
        'slides':           'aa-carousel-social__slides',
        'initClass':        'aa-carousel-social--init',
        'pagination':       'aa-carousel-social__pagination'
      };
      this.selectors = {
        'context':          '.' + this.classNames.context,
        'slides':           '.' + this.classNames.slides,
        'initClass':        '.' + this.classNames.initClass,
        'pagination':       '.' + this.classNames.pagination
      };

      this.$context = $(this.selectors.context);

      if (this.$context.length > 0) {
        this.init();
      }

    }

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    CarouselSocial.prototype.init = function () {

      var self = this;

      $.each(self.$context, function (index, context) {
        if ($(context).hasClass(self.classNames.initClass)) {
          // Only proceed if there is an initialize class
          self.initLayout($(context));
        }
      });

      self.bindMainEvents();

    };

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    CarouselSocial.prototype.initLayout = function ($context) {

      var self = this;

      $context
        .find(self.selectors.slides)
        .slick({
          dots: true,
          infinite: true,
          speed: 300,
          slidesToShow: 1,
          slidesToScroll: 1,
          prevArrow: $context.find('.slick-prev'),
          nextArrow: $context.find('.slick-next'),
          appendDots: $context.find(self.selectors.pagination),
          responsive: [
            {
              breakpoint: 992,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true
              }
            },
            {
              breakpoint: 576,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,
                adaptiveHeight: true
              }
            }
          ]
        });

    };

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    CarouselSocial.prototype.bindMainEvents = function () {

      var self = this;

    };

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    if (debug_enable && load_log) debug('SITE.' + _name + ' :: loaded');

    return {
      CarouselSocial: CarouselSocial
    };

  }) ();

  return module;

}) (SITE || {}, jQuery);

;
/**
 *  carousel-text.js
 *
 *
 */

var SITE = (function (module, $) {

  'use strict';

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  module.carouselText = (function () {

    var _name = 'carouselText',
        load_log = true,
        debug_enable = true,
        debug = debug_enable ? module.util.debug : function () {};

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    function CarouselText() {

      this.classNames = {
        'context':          'aa-carousel-text',
        'slides':           'aa-carousel-text__slides',
        'initClass':        'aa-carousel-text--init',
        'hideButtonClass':  'aa-carousel-text--hide-buttons'
      };
      this.selectors = {
        'context':          '.' + this.classNames.context,
        'slides':           '.' + this.classNames.slides,
        'initClass':        '.' + this.classNames.initClass,
        'hideButtonClass':  '.' + this.classNames.hideButtonClass
      };

      this.breakpoints = ['xs','sm','md','lg','xl'];
      this.$context = $(this.selectors.context);

      if (this.$context.length > 0) {
        this.init();
      }

    }

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    CarouselText.prototype.init = function () {

      var self = this;

      $.each(self.$context, function (index, context) {
        if ($(context).hasClass(self.classNames.initClass)) {
          // Only proceed if there is an initialize class
          self.initLayout($(context));
        }
      });

      self.bindMainEvents();

    };

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    CarouselText.prototype.initLayout = function ($context) {

      var self = this,
          tempArr = [1,2,3,4,4],
          slidesToShow;

      if (typeof $context.attr('data-slides-to-show') !== 'undefined') {
        tempArr = $context.attr('data-slides-to-show').split(',');
      }

      slidesToShow = {
        'xs': parseInt(tempArr[0], 10),
        'sm': parseInt(tempArr[1], 10),
        'md': parseInt(tempArr[2], 10),
        'lg': parseInt(tempArr[3], 10),
        'xl': parseInt(tempArr[4], 10)
      };

      $context
        .find(self.selectors.slides)
        .slick({
          dots: false,
          infinite: true,
          speed: 300,
          slidesToShow: slidesToShow.lg,
          slidesToScroll: slidesToShow.lg,
          prevArrow: $context.find('.slick-prev'),
          nextArrow: $context.find('.slick-next'),
          responsive: [
            {
              breakpoint: 1200,
              settings: {
                slidesToShow: slidesToShow.md,
                slidesToScroll: slidesToShow.md,
                infinite: true
              }
            },
            {
              breakpoint: 992,
              settings: {
                slidesToShow: slidesToShow.sm,
                slidesToScroll: slidesToShow.sm,
                infinite: true
              }
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: slidesToShow.xs,
                slidesToScroll: slidesToShow.xs,
                infinite: true,
                adaptiveHeight: true
              }
            }
          ]
        });

    };

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    /**
     *  Add a class to the context to show/hide
     *  the prev and next buttons if the viewable area is
     *  equal to or larger than the total slide count
     *
     */
    CarouselText.prototype.showHideButtons = function () {

      var self = this,
          threshold,
          thresholdIndex,
          slidesToShow;

      _.each(self.breakpoints, function (breakpoint, index) {
        if (breakpoint === $('body').attr('data-display-size')) {
          thresholdIndex = index;
        }
      });

      $.each(self.$context, function (index, context) {
        slidesToShow = $(context).attr('data-slides-to-show').split(',');
        threshold = parseInt(slidesToShow[thresholdIndex], 10);
        if(parseInt($(context).attr('data-slide-count'), 10) <= threshold) {
          $(context).addClass(self.classNames.hideButtonClass);
        } else {
          $(context).removeClass(self.classNames.hideButtonClass);
        }
      });

    };

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    CarouselText.prototype.bindMainEvents = function () {

      var self = this;

      $('body').on('SITE.windowEvents.windowResize', function () {
        self.showHideButtons();
      });

    };

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    if (debug_enable && load_log) debug('SITE.' + _name + ' :: loaded');

    return {
      CarouselText: CarouselText
    };

  }) ();

  return module;

}) (SITE || {}, jQuery);

;
/**
 *  filter-checkbox.js
 *
 *
 */

var SITE = (function (module, $) {

  'use strict';

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  module.filterCheckbox = (function () {

    var _name = 'filterCheckbox',
        load_log = true,
        debug_enable = true,
        debug = debug_enable ? module.util.debug : function () {};

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    function FilterCheckbox() {

      this.classNames = {
        'context':            'aa-filter',
        'toggleWrap':         'aa-filter__toggle-wrap',
        'toggle':             'aa-filter__toggle',
        'contentWrap':        'aa-filter__content-wrap',
        'content':            'aa-filter__content',
        'sortWrap':           'aa-filter__sort-wrap',
        'sortOption':         'aa-filter__sort-option',
        'sortStatus':         'aa-filter__sort-status',
        'checkbox':           'aa-filter__checkbox',
        'labelWithCheckbox':  'aa-filter__label--with-checkbox',
        'subOptionWrap':      'aa-filter__sub-option-wrap',
        'subOptions':         'aa-filter__sub-options',
        'optionLabel':        'aa-filter__option-label'
      };
      this.selectors = {
        'context':            '.' + this.classNames.context,
        'toggleWrap':         '.' + this.classNames.toggleWrap,
        'toggle':             '.' + this.classNames.toggle,
        'contentWrap':        '.' + this.classNames.contentWrap,
        'content':            '.' + this.classNames.content,
        'sortWrap':           '.' + this.classNames.sortWrap,
        'sortOption':         '.' + this.classNames.sortOption,
        'sortStatus':         '.' + this.classNames.sortStatus,
        'checkbox':           '.' + this.classNames.checkbox,
        'labelWithCheckbox':  '.' + this.classNames.labelWithCheckbox,
        'subOptionWrap':      '.' + this.classNames.subOptionWrap,
        'subOptions':         '.' + this.classNames.subOptions,
        'optionLabel':        '.' + this.classNames.optionLabel
      };

      this.$context = $(this.selectors.context);

      if (this.$context.length > 0) {
        this.init();
      }

    }

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    FilterCheckbox.prototype.init = function () {

      var self = this;

      $.each(self.$context, function (index, context) {
        self.bindMainEvents($(context));
      });

    };

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    FilterCheckbox.prototype.bindMainEvents = function ($context) {

      var self = this,
          $sortStatus,
          $sortOptions,
          $parentLabels,
          $childLabels,
          selector;

      $childLabels = $context
        .find(self.selectors.subOptions)
        .find(self.selectors.labelWithCheckbox);
      $sortOptions = $context.find(self.selectors.sortOption);
      $sortStatus = $context.find(self.selectors.sortStatus);
      selector = self.selectors.content;
      selector += ' > ul > li > ';
      selector += self.selectors.labelWithCheckbox;
      $parentLabels = $context.find(selector);

      $('body').on('SITE.filterCheckbox.sortSelected', function (e, args) {
        $sortStatus.html(args.$sortOption);
      });

      $sortOptions.on('click', function (e) {
        $('body').trigger('SITE.filterCheckbox.sortSelected', {
          '$sortOption': $(this).attr('data-sort-option-display')
        });
      });

      $('body').on('SITE.filterCheckbox.uncheckFilterItem', function (e, args) {
        self.uncheckItem(args);
      });

      $.each($parentLabels, function (index, label) {
        self.bindParentLabelEvents($(label));
      });

      $.each($childLabels, function (index, label) {
        self.bindChildLabelEvents($(label));
      });

    };

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    FilterCheckbox.prototype.bindParentLabelEvents = function ($label) {

      var self = this;

      $label
        .on('mouseup', function (e) {
          self.onParentLabelCheck($label);
          self.onBasicLabelChecked($label);
          $('body').trigger('SITE.filterHighlights.updateHighlight', {
            'feedbackText': ''
          });
        });

    };

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    FilterCheckbox.prototype.onParentLabelCheck = function ($label) {

      var self = this,
          $checkbox,
          $children;

      $checkbox = $label.find(self.selectors.checkbox);
      $children = $label
        .closest(self.selectors.subOptionWrap)
        .find(self.selectors.subOptions)
        .find(self.selectors.labelWithCheckbox);

      // Auto-check or uncheck children
      if ($children.length > 0) {
        if ($checkbox.is(':checked') === true) {
          $children.find(self.selectors.checkbox).prop('checked', false);
        } else {
          $children.find(self.selectors.checkbox).prop('checked', true);
        }
      }

    };

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    FilterCheckbox.prototype.bindChildLabelEvents = function ($label) {

      var self = this;

      $label
        .on('mouseup', function (e) {
          self.onChildLabelCheck($label);
          self.onBasicLabelChecked($label);
        });

    };

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    FilterCheckbox.prototype.onChildLabelCheck = function ($label) {

      var self = this,
          $checkbox,
          $checkboxes,
          $checkboxSiblings,
          $parentCheckbox,
          allChecked = 0,
          allUnchecked = 0,
          siblingCount = 0;

      $checkbox = $label.find(self.selectors.checkbox);
      $checkboxSiblings = $label
        .closest(self.selectors.subOptions)
        .find(self.selectors.checkbox);
      siblingCount = $checkboxSiblings.length;

      // Check will not yet be applied at this time,
      // so let's predict the future
      if ($checkbox.is(':checked') === true) {
        allUnchecked++;
      } else if ($checkbox.is(':checked') === false) {
        allChecked++;
      }

      $parentCheckbox = $label
        .closest(self.selectors.subOptionWrap)
        .find('> ' + self.selectors.labelWithCheckbox)
        .find(self.selectors.checkbox);

      $.each($checkboxSiblings, function (index, checkbox) {
        if (!$(checkbox).is($checkbox)) {
          if ($(checkbox).is(':checked') === true) {
            allChecked++;
          } else {
            allUnchecked++;
          }
        }
      });

      if (allChecked === siblingCount) {

        $parentCheckbox.prop('checked', true);
        // Automatically add parent
        self.addRemoveFilterItem($parentCheckbox, 'add');

      } else if (allUnchecked === siblingCount) {

        $parentCheckbox.prop('checked', false);
        // Automatically remove parent
        self.addRemoveFilterItem($parentCheckbox, 'remove');

      }

    };

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    FilterCheckbox.prototype.onBasicLabelChecked = function ($label) {

      var self = this,
          optionProps,
          $checkbox,
          $childrenCheckboxes,
          itemFilterLevel;

      $checkbox = $label.find(self.selectors.checkbox);
      itemFilterLevel = parseInt($checkbox.attr('data-filter-level'), 10);

      if (!$checkbox.is(':checked')) {

        self.addRemoveFilterItem($checkbox, 'add');

        // Add children, if any
        if (itemFilterLevel === 1) {
          $childrenCheckboxes = self.getChildrenCheckboxes($label);
          $.each($childrenCheckboxes, function (index, checkbox) {
            self.addRemoveFilterItem($(checkbox), 'add');
          });
        }

      } else {

        self.addRemoveFilterItem($checkbox, 'remove');

        // Add children, if any
        if (itemFilterLevel === 1) {
          $childrenCheckboxes = self.getChildrenCheckboxes($label);
          $.each($childrenCheckboxes, function (index, checkbox) {
            self.addRemoveFilterItem($(checkbox), 'remove');
          });
        }

      }

    };

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    FilterCheckbox.prototype.addRemoveFilterItem = function($checkbox, theAction) {

      var self = this,
          optionProps,
          $label,
          triggerID;

      if (theAction === 'add') {
        triggerID = 'SITE.filterSelected.addItem';
      } else if (theAction === 'remove') {
        triggerID = 'SITE.filterSelected.removeItem';
      }

      $label = $checkbox.closest(self.selectors.labelWithCheckbox);

      optionProps = {
        '$filter':            $checkbox.closest(self.selectors.context),
        'itemLabel':          $label.find(self.selectors.optionLabel).html(),
        'itemValue':          $checkbox.attr('value'),
        'itemFilterType':     $checkbox.attr('data-filter-type'),
        'itemFilterCategory': $checkbox.attr('data-filter-category'),
        'itemFilterLevel':    $checkbox.attr('data-filter-level')
      }
      if (typeof $checkbox.attr('data-parent-value') !== 'undefined') {
        optionProps.itemParentValue = $checkbox.attr('data-parent-value');
      }
      $('body').trigger(triggerID, optionProps);

    };

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    FilterCheckbox.prototype.getChildrenCheckboxes = function ($label) {

      var self = this;

      return $label
        .closest(self.selectors.subOptionWrap)
        .find(self.selectors.subOptions)
        .find(self.selectors.checkbox);

    };

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    FilterCheckbox.prototype.uncheckItem = function (args) {

      var self = this,
          selector,
          $label,
          $checkbox,
          $childrenCheckboxes;

      selector = self.selectors.checkbox;
      selector += '[value="' + args.itemValue + '"]';
      selector += '[data-filter-level="' + args.itemFilterLevel + '"]';
      selector += '[data-filter-type="' + args.itemFilterType + '"]';
      selector += '[data-filter-category="' + args.itemFilterCategory + '"]';
      if (args.itemParentValue) {
        selector += '[data-parent-value="' + args.itemParentValue + '"]';
      }

      $label = $(selector).closest(self.selectors.labelWithCheckbox);
      $checkbox = $label.find(self.selectors.checkbox);

      // Trigger the necessary selection states first
      if (args.itemFilterLevel === 1) {
        self.onParentLabelCheck($label);
        self.onBasicLabelChecked($label);
      } else if (args.itemFilterLevel === 2) {
        self.onChildLabelCheck($label);
        self.onBasicLabelChecked($label);
      }

      // Manually set the checkbox state
      if ($checkbox.is(':checked')) {
        $checkbox.prop('checked', false);
      } else {
        $checkbox.prop('checked', true);
      }

    };

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    if (debug_enable && load_log) debug('SITE.' + _name + ' :: loaded');

    return {
      FilterCheckbox: FilterCheckbox
    };

  }) ();

  return module;

}) (SITE || {}, jQuery);

;
/**
 *  filter-date.js
 *
 *
 */

var SITE = (function (module, $) {

  'use strict';

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  module.filterDate = (function () {

    var _name = 'filterDate',
        load_log = true,
        debug_enable = true,
        debug = debug_enable ? module.util.debug : function () {};

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    function FilterDate() {

      this.classNames = {
        'context':           'aa-filter__filter-cell--date',
        'filterContentWrap': 'aa-filter__content-wrap',
        'rangeButton':       'aa-filter__date-range-button',
        'filter':            'aa-filter',
        'filterToggleWrap':  'aa-filter__toggle-wrap',
        'inputStart':        'aa-filter__input--start',
        'inputEnd':          'aa-filter__input--end'
      };
      this.selectors = {
        'context':           '.' + this.classNames.context,
        'filterContentWrap': '.' + this.classNames.filterContentWrap,
        'rangeButton':       '.' + this.classNames.rangeButton,
        'filter':            '.' + this.classNames.filter,
        'filterToggleWrap':  '.' + this.classNames.filterToggleWrap,
        'inputStart':        '.' + this.classNames.inputStart,
        'inputEnd':          '.' + this.classNames.inputEnd
      };

      this.$context = $(this.selectors.context);

      if (this.$context.length > 0) {
        this.init();
      }

    }

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    FilterDate.prototype.init = function () {

      var self = this;

      $.each(self.$context, function (index, context) {
        if (!$(context).hasClass('initialized')) {
          $(context).addClass('initialized');
          self.bindMainEvents($(context));
        }
      });

    };

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    FilterDate.prototype.bindMainEvents = function ($context) {

      var self = this,
          $rangeButtons;

      $rangeButtons = $context.find(self.selectors.rangeButton);

      $.each($rangeButtons, function (index, button) {
        self.bindRangeButton($(button));
      });

      $('body').on('SITE.filterDate.reset', function (e, args) {
        self.resetButtons(args);
        self.resetInputs(args);
      });

      $('html').on('click', function () {
        self.testDateStartEnd();
      });

      $(self.selectors.context)
        .find(self.selectors.filterContentWrap)
        .on('click', function () {
          self.testDateStartEnd();
        });

    };

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    FilterDate.prototype.testDateStartEnd = function () {

      var self = this,
          $context,
          $filter,
          $inputStart,
          $inputEnd,
          $toggleWrap,
          buttonProps,
          startValueValid = false,
          endValueValid = false;

      $context = $(self.selectors.context);
      $toggleWrap = $context.find(self.selectors.filterToggleWrap + '.expanded');

      if ($toggleWrap.length < 1) {
        // Exit if the user is not currently interacting
        // with the date filter
        return;
      }

      $filter = $toggleWrap.closest(self.selectors.filter);
      $inputStart = $context.find(self.selectors.inputStart);
      $inputEnd = $context.find(self.selectors.inputEnd);

      startValueValid = ($inputStart.val().length === 10);
      endValueValid = ($inputEnd.val().length === 10);

      // Exit if neither start nor end inputs are valid
      if (!startValueValid && !endValueValid) {
        self.removeStartEndSelectedFilters($filter);
        return;
      }

      // If either value is valid, clear any existing
      // fixed-range filters
      if (startValueValid || endValueValid) {
        self.removeStartEndSelectedFilters($filter, ['fixed']);
      }

      if ($inputStart.val().length === 10) {
        self.removeStartEndSelectedFilters($filter, ['from']);
        buttonProps = {
          '$filter':            $filter,
          '$item':              null,
          'itemFilterLevel':    1,
          'itemLabel':          'From: ' + $inputStart.val(),
          'itemValue':          'from:' + $inputStart.val(),
          'itemFilterType':     'date',
          'itemFilterCategory': 'date'
        };
        $('body').trigger('SITE.filterSelected.addItem', buttonProps);
      }

      if ($inputEnd.val().length === 10) {
        self.removeStartEndSelectedFilters($filter, ['to']);
        buttonProps = {
          '$filter':            $filter,
          '$item':              null,
          'itemFilterLevel':    1,
          'itemLabel':          'To: ' + $inputEnd.val(),
          'itemValue':          'to:' + $inputEnd.val(),
          'itemFilterType':     'date',
          'itemFilterCategory': 'date'
        };
        $('body').trigger('SITE.filterSelected.addItem', buttonProps);
      }

      self.resetButtons({
        '$filter': $filter
      });

      $('body').trigger('SITE.filterHighlights.updateHighlight', {
        'feedbackText': ''
      });

    };

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    FilterDate.prototype.removeStartEndSelectedFilters = function ($filter, prefixes) {

      var self = this;

      _.each(prefixes, function (prefix, index) {
        $('body').trigger('SITE.filterSelected.removeItem', {
          '$filter':            $filter,
          '$item':              null,
          'itemFilterLevel':    1,
          'itemLabel':          '',
          'itemValue':          prefix + ':',
          'itemFilterType':     'date',
          'itemFilterCategory': 'date'
        });
      });

    };

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    FilterDate.prototype.bindRangeButton = function ($button) {

      var self = this,
          $context;

      $context = $button.closest(self.selectors.filter);

      $button.on('mouseup', function (e) {
        self.onClickRangeButton($context, $(this));
        $('body').trigger('SITE.filterHighlights.updateHighlight', {
          'feedbackText': ''
        });
      });

    };

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    FilterDate.prototype.onClickRangeButton = function ($context, $button) {

      var self = this,
          $filter,
          $rangeButtons;

      $rangeButtons = $context.find(self.selectors.rangeButton);

      // If a fixed-range button is clicked, 
      // automatically remove start/end filters
      $filter = $button.closest(self.selectors.filter);
      self.removeStartEndSelectedFilters($filter, ['from','to']);

      $.each($rangeButtons, function (index, button) {
        var buttonProps;
        if ($(button).is($button)) {
          buttonProps = {
            '$filter':            null,
            '$item':              null,
            'itemFilterLevel':    1,
            'itemLabel':          $button.html(),
            'itemValue':          $button.attr('data-value'),
            'itemFilterType':     'date',
            'itemFilterCategory': 'date'
          };
          $('body').trigger('SITE.filterSelected.addItem', buttonProps);
          $(button).addClass('selected');
        } else {
          $(button).removeClass('selected');
          buttonProps = {
            '$filter':            $(button).closest(self.selectors.filter),
            '$item':              null,
            'itemFilterLevel':    1,
            'itemLabel':          $(button).html(),
            'itemValue':          $(button).attr('data-value'),
            'itemFilterType':     'date',
            'itemFilterCategory': 'date'
          };
          $('body').trigger('SITE.filterSelected.removeItem', buttonProps);
        }
      });

      // Force-clear this input
      self.resetInputs({
        '$filter': $button.closest(self.selectors.filter),
        'itemValue': 'from:'
      });

      // Force-clear this input
      self.resetInputs({
        '$filter': $button.closest(self.selectors.filter),
        'itemValue': 'to:'
      });

    };

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    FilterDate.prototype.resetButtons = function (args) {

      var self = this;

      args.$filter
        .find(self.selectors.rangeButton + '.selected')
        .removeClass('selected');

    };

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    FilterDate.prototype.resetInputs = function (args) {

      var self = this;

      if (args.itemValue) {
        if (args.itemValue.indexOf('from:') !== -1) {
          args.$filter
            .find(self.selectors.inputStart)
            .val('');
        } else if (args.itemValue.indexOf('to:') !== -1) {
          args.$filter
            .find(self.selectors.inputEnd)
            .val('');
        }
      }

    };

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    if (debug_enable && load_log) debug('SITE.' + _name + ' :: loaded');

    return {
      FilterDate: FilterDate
    };

  }) ();

  return module;

}) (SITE || {}, jQuery);

;
/**
 *  filter-highlights.js
 *
 *
 */

var SITE = (function (module, $) {

  'use strict';

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  module.filterHighlights = (function () {

    var _name = 'filterHighlights',
        load_log = true,
        debug_enable = true,
        debug = debug_enable ? module.util.debug : function () {};

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    function FilterHighlights() {

      this.classNames = {
        'context':           'aa-filter__filter-sub-type'
      }
      this.selectors = {
        'context':           '.' + this.classNames.context
      };

      this.$context = $(this.selectors.context);

      if (this.$context.length > 0) {
        this.init();
      }

    }

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    FilterHighlights.prototype.init = function () {

      var self = this;

      $.each(self.$context, function (index, context) {
        if (!$(context).hasClass('initialized')) {
          $(context).addClass('initialized');
          self.bindMainEvents($(context));
        }
      });

    };

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    FilterHighlights.prototype.bindMainEvents = function ($context) {

      var self = this;

      $('body').on('SITE.filterHighlights.updateHighlight', function (e, args) {
        self.setFeedbackText($context, args);
      });

    };

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    FilterHighlights.prototype.setFeedbackText = function ($context, args) {

      var self = this;

      debug($context);

      $context.html(args.feedbackText);

    };

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    if (debug_enable && load_log) debug('SITE.' + _name + ' :: loaded');

    return {
      FilterHighlights: FilterHighlights
    };

  }) ();

  return module;

}) (SITE || {}, jQuery);

;
/**
 *  filter-primary-search.js
 *
 *
 */

var SITE = (function (module, $) {

  'use strict';

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  module.filterPrimarySearch = (function () {

    var _name = 'filterPrimarySearch',
        load_log = true,
        debug_enable = true,
        debug = debug_enable ? module.util.debug : function () {};

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    function FilterPrimarySearch() {

      this.classNames = {
        'context':            'aa-filter__form-group--search',
        'input':              'aa-input-search__input--filter'
      };
      this.selectors = {
        'context':            '.' + this.classNames.context,
        'input':              '.' + this.classNames.input
      };

      this.$context = $(this.selectors.context);

      if (this.$context.length > 0) {
        this.init();
      }

    }

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    FilterPrimarySearch.prototype.init = function () {

      var self = this;

      $.each(self.$context, function (index, context) {
        self.initAutocomplete($(context).find(self.selectors.input));
      });

    };

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    FilterPrimarySearch.prototype.initAutocomplete = function ($input) {

      var self = this,
          availableTags = window.placeholderDataFilterPrimarySearch || [];

      $input.autocomplete({
        source: availableTags,
        select: function(event, ui) {
          self.setSuggest({
            '$filter':            null,
            'itemFilterLevel':    1,
            '$item':              $(event.target),
            'itemLabel':          ui.item.label,
            'itemValue':          ui.item.value,
            'itemFilterType':     'program',
            'itemFilterCategory': 'program'
          });
        },
        classes: {
          'ui-autocomplete': 'aa-filter__primary-search-ui-autocomplete'
        },
        open: function (event, ui) {

          var $results = $("ul.ui-autocomplete > li.ui-menu-item > div"),
              searchTerm = $.trim($input.val()).split (/\s+/).join ('|');

          $results.each (function () {
            var $this = $(this),
                regX = new RegExp('(' + searchTerm + ')', "ig"),
                oldTxt = $this.text();
            $this.html(oldTxt.replace(regX, '<strong>$1</strong>'));
          } );
        }

      });

    };

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    if (debug_enable && load_log) debug('SITE.' + _name + ' :: loaded');

    return {
      FilterPrimarySearch: FilterPrimarySearch
    };

  }) ();

  return module;

}) (SITE || {}, jQuery);

;
/**
 *  filter-program.js
 *
 *
 */

var SITE = (function (module, $) {

  'use strict';

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  module.filterProgram = (function () {

    var _name = 'filterProgram',
        load_log = true,
        debug_enable = true,
        debug = debug_enable ? module.util.debug : function () {};

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    function FilterProgram() {

      this.classNames = {
        'context':          'aa-filter',
        'suggestItem':      'aa-filter__program-suggest',
        'suggestButton':    'aa-filter__search-suggest-button',
        'searchInput':      'aa-filter__program-search-input',
        'uiAutocomplete':   'ui-autocomplete'
      };
      this.selectors = {
        'context':          '.' + this.classNames.context,
        'suggestItem':      '.' + this.classNames.suggestItem,
        'suggestButton':    '.' + this.classNames.suggestButton,
        'searchInput':      '.' + this.classNames.searchInput,
        'uiAutocomplete':   '.' + this.classNames.uiAutocomplete
      };

      this.$context = $(this.selectors.context);

      if (this.$context.length > 0) {
        this.init();
      }

    }

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    FilterProgram.prototype.init = function () {

      var self = this;

      $.each(self.$context, function (index, context) {
        self.bindMainEvents($(context));
        self.initAutocomplete($(context).find(self.selectors.searchInput));
      });

    };

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    FilterProgram.prototype.bindMainEvents = function ($context) {

      var self = this,
          $suggestItems;

      $suggestItems = $context.find(self.selectors.suggestItem);

      $.each($suggestItems, function (index, item) {
        self.bindSuggestClick($(item));
      });

      $(self.selectors.uiAutocomplete).on('click', function (e) {
        e.stopPropagation();
      });

      $(self.selectors.searchInput).bind('enterKey', function (e) {
        self.setSuggest({
          '$filter':            null,
          'itemFilterLevel':    1,
          '$item':              $(this),
          'itemLabel':          $(this).val(),
          'itemValue':          $(this).val(),
          'itemFilterType':     'program',
          'itemFilterCategory': 'program'
        });
      });

      $(self.selectors.searchInput).on('keyup', function (e) {
        if (e.keyCode == 13) {
          $(this).trigger('enterKey');
        }
      });

    };

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    FilterProgram.prototype.bindSuggestClick = function ($item) {

      var self = this;

      $item
        .find(self.selectors.suggestButton)
        .on('click', function () {
          self.setSuggest({
            '$filter':            null,
            'itemFilterLevel':    1,
            '$item':              $item,
            'itemLabel':          $(this).html(),
            'itemValue':          $(this).attr('data-value'),
            'itemFilterType':     'program',
            'itemFilterCategory': 'program'
          });
        });

    };

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    FilterProgram.prototype.setSuggest = function (args) {

      var self = this,
          $context,
          $input;

      $context = args.$item.closest(self.selectors.context);
      $input = $context.find(self.selectors.searchInput);
      $input.val(args.itemValue);
      $('body').trigger('SITE.filterSelected.addItem', args);
      $('body').trigger('SITE.filterHighlights.updateHighlight', {
        'feedbackText': ''
      });

    };

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    FilterProgram.prototype.initAutocomplete = function ($input) {

      var self = this,
          availableTags = window.placeholderDataProgramSearch || [];

      $input.autocomplete({
        source: availableTags,
        select: function(event, ui) {
          self.setSuggest({
            '$filter':            null,
            'itemFilterLevel':    1,
            '$item':              $(event.target),
            'itemLabel':          ui.item.label,
            'itemValue':          ui.item.value,
            'itemFilterType':     'program',
            'itemFilterCategory': 'program'
          });
        }
      });

    };

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    if (debug_enable && load_log) debug('SITE.' + _name + ' :: loaded');

    return {
      FilterProgram: FilterProgram
    };

  }) ();

  return module;

}) (SITE || {}, jQuery);

;
/**
 *  filter-selected.js
 *
 *
 */

var SITE = (function (module, $) {

  'use strict';

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  module.filterSelected = (function () {

    var _name = 'filterSelected',
        load_log = true,
        debug_enable = true,
        debug = debug_enable ? module.util.debug : function () {};

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    function FilterSelected() {

      this.classNames = {
        'context':              'aa-filter__selected',
        'filter':               'aa-filter',
        'itemList':             'aa-filter__selected-list',
        'itemLabel':            'aa-filter__selected-label',
        'item':                 'aa-filter__selected-item',
        'isEmpty':              'aa-filter__selected--empty'
      };
      this.selectors = {
        'context':              '.' + this.classNames.context,
        'filter':               '.' + this.classNames.filter,
        'itemList':             '.' + this.classNames.itemList,
        'itemLabel':            '.' + this.classNames.itemLabel,
        'item':                 '.' + this.classNames.item,
        'isEmpty':              '.' + this.classNames.isEmpty
      };
      this.ids = {
        'filterSelectedItem':   '#template-selected-item'
      };

      this.$context = $(this.selectors.context);

      if (this.$context.length > 0) {
        this.init();
      }

    }

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    FilterSelected.prototype.init = function () {

      var self = this;

      $.each(self.$context, function (index, context) {
        self.bindMainEvents($(context));
      });

    };

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    FilterSelected.prototype.bindMainEvents = function ($context) {

      var self = this,
          $items;

      $items = $context.find(self.selectors.item);

      $('body').on('SITE.filterSelected.addItem', function (e, args) {
        self.addItem($context, args);
      });

      $('body').on('SITE.filterSelected.removeItem', function (e, args) {
        self.removeItem(args);
      });

      $.each($items, function (index, item) {
        self.bindItemClick($(item));
      });

    };

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    FilterSelected.prototype.bindItemClick = function ($item) {

      var self = this;

      $item
        .on('mouseup', function (e) {
          self.removeFromSelected({
            '$filter':            $item.closest(self.selectors.filter),
            'itemFilterType':     $item.attr('data-filter-type'),
            'itemFilterCategory': $item.attr('data-filter-category'),
            'itemParentValue':    $item.attr('data-parent-value'),
            'itemFilterLevel':    parseInt($item.attr('data-filter-level'), 10),
            'itemValue':          $item.attr('data-value')
          });
        });

    };

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    FilterSelected.prototype.removeFromSelected = function (args) {

      var self = this;

      if (args.itemFilterType === 'checkbox') {

        // Trigger the checkbox module which will act as the controller
        $('body').trigger('SITE.filterCheckbox.uncheckFilterItem', args);

      } else if (args.itemFilterType === 'program') {

        // Safe to remove directly
        self.removeItem(args);

      } else if (args.itemFilterType === 'date') {

        // Safe to remove directly
        $('body').trigger('SITE.filterDate.reset', args);
        self.removeItem(args);

      }

    };

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    FilterSelected.prototype.removeItem = function (args) {

      var self = this,
          $context,
          $item,
          selector;

      $context = args.$filter.find(self.selectors.context);
      selector = self.selectors.item;
      if ((args.itemValue.indexOf('from:') !== -1) ||
          (args.itemValue.indexOf('to:') !== -1)) {
        selector += '[data-value^="' + args.itemValue + '"]';
      } else if (args.itemValue.indexOf('fixed:') !== -1) {
        selector += '[data-value^="' + args.itemValue + '"]';
      } else {
        selector += '[data-value="' + args.itemValue + '"]';
      }
      selector += '[data-filter-type="' + args.itemFilterType + '"]';
      selector += '[data-filter-level="' + args.itemFilterLevel + '"]';
      selector += '[data-filter-category="' + args.itemFilterCategory + '"]';
      if (args.itemParentValue) {
        selector += '[data-parent-value="' + args.itemParentValue + '"]';
      }
      $item = $context.find(selector);
      $item.remove();
      self.updateContext($context);

    };

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    FilterSelected.prototype.updateContext = function ($context) {

      var self = this,
          itemCount;

      itemCount = $context.find(self.selectors.item).length;

      if (itemCount < 1) {
        self.collapseContext($context);
      } else {
        self.expandContext($context);
      }

    };

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    FilterSelected.prototype.addItem = function ($context, item) {

      var self = this,
          $itemList,
          html,
          $newItem,
          alreadyAdded = false,
          selectorTest;

      // Prepare the new filter element to be added
      html = $(self.ids.filterSelectedItem).html();
      $itemList = $context.find(self.selectors.itemList);
      $newItem = $(html);
      $newItem.find(self.selectors.itemLabel).html(item.itemLabel);
      $newItem.attr('data-value', item.itemValue);
      $newItem.attr('data-filter-level', item.itemFilterLevel);
      $newItem.attr('data-filter-type', item.itemFilterType);
      $newItem.attr('data-filter-category', item.itemFilterCategory);
      if (item.itemParentValue) {
        $newItem.attr('data-parent-value', item.itemParentValue);
      }

      // Selector for testing if the filter already exists
      selectorTest = self.selectors.item;
      selectorTest += '[data-value="' + item.itemValue + '"]';
      selectorTest += '[data-filter-type="' + item.itemFilterType + '"]';
      selectorTest += '[data-filter-category="' + item.itemFilterCategory + '"]';
      if (item.itemParentValue) {
        selectorTest += '[data-parent-value="' + item.itemParentValue + '"]';
      }

      alreadyAdded = ($itemList.find(selectorTest).length > 0);

      if (alreadyAdded === true) {
        // Exit if item already exists
        return;
      }

      $itemList.append($newItem);

      if ($context.hasClass(self.classNames.isEmpty)) {
        self.expandContext($context);
      }

      self.bindItemClick($newItem);
      self.updateContext($context);

      // If a date range start is added, remove any fixed-range filters


    };

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    FilterSelected.prototype.collapseContext = function ($context) {

      var self = this;

      $context
        .stop()
        .animate({
          'height': 0
        },{
          'duration': 200,
          'easing': 'easeInOutQuad',
          'complete': function () {
            $context.addClass(self.classNames.isEmpty)
            $context.css({
              'height': ''
            });
          }
        });

    };

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    FilterSelected.prototype.expandContext = function ($context) {

      var self = this,
          $itemList;

      $itemList = $context.find(self.selectors.itemList);

      $context
        .stop()
        .animate({
          'height': $itemList.outerHeight()
        },{
          'duration': 200,
          'easing': 'easeInOutQuad',
          'complete': function () {
            $context.removeClass(self.classNames.isEmpty)
            $context.css({
              'height': 'auto'
            });
          }
        });

    };

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    if (debug_enable && load_log) debug('SITE.' + _name + ' :: loaded');

    return {
      FilterSelected: FilterSelected
    };

  }) ();

  return module;

}) (SITE || {}, jQuery);

;
/**
 *  filter-sub-option-toggle.js
 *
 *
 */

var SITE = (function (module, $) {

  'use strict';

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  module.filterSubOptionToggle = (function () {

    var _name = 'filterSubOptionToggle',
        load_log = true,
        debug_enable = true,
        debug = debug_enable ? module.util.debug : function () {};

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    function FilterSubOptionToggle() {

      this.classNames = {
        'context':          'aa-filter__sub-option-wrap'
      };
      this.selectors = {
        'context':          '.' + this.classNames.context
      };

      this.$context = $(this.selectors.context);

      if (this.$context.length > 0) {
        this.init();
      }

    }

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    FilterSubOptionToggle.prototype.init = function () {

      var self = this,
          $wrap = self.$context;

      $.each($wrap, function (index, wrap) {
        self.bindMainEvents($(wrap));
      });

    };

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    FilterSubOptionToggle.prototype.bindMainEvents = function ($wrap) {

      var self = this,
          $toggle;

      if ($wrap.hasClass('initialized')) {
        return;
      }

      $wrap.addClass('initialized');
      $wrap.addClass('collapsed');
      $toggle = $wrap.find($wrap.attr('data-toggle'));

      $toggle.on('click', function (e) {
        self.toggleSubmenu($(this));
        e.stopPropagation();
      });

      $wrap.on('click', function(e) {
        // Stop propagation if clicking within the dropdowns
        e.stopPropagation();
      });

    };

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    FilterSubOptionToggle.prototype.toggleSubmenu = function ($toggle) {

      var self = this,
          $wrap = $toggle.closest(self.selectors.context);

      if ($wrap.hasClass('collapsed')) {
        self.openSubmenu($wrap);
      } else {
        self.closeSubmenu($wrap);
      }

    };

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    FilterSubOptionToggle.prototype.openSubmenu = function ($wrap) {

      var self = this,
          $contentWrap,
          $content;

      $contentWrap = $wrap.find($wrap.attr('data-content-wrap'));
      $content = $wrap.find($wrap.attr('data-content'));

      // Open only the selected toggle
      $contentWrap
        .stop()
        .animate({
          'height': $content.outerHeight(true)
        },{
          'duration': 150,
          'easing': 'easeInOutQuad',
          'complete': function () {
            $wrap.addClass('expanded');
            $wrap.removeClass('collapsed');
            $contentWrap.css({
              'height': ''
            });
          }
        });

    };

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    FilterSubOptionToggle.prototype.closeSubmenu = function ($wrap) {

      var self = this,
          $contentWrap;

      $contentWrap = $wrap.find($wrap.attr('data-content-wrap'));

      $contentWrap
        .stop()
        .animate({
          'height': 0
        },{
          'duration': 150,
          'easing': 'easeInOutQuad',
          'complete': function () {
            $wrap.removeClass('expanded');
            $wrap.addClass('collapsed');
            $contentWrap.css({
              'height': ''
            });
          }
        });

    };

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    if (debug_enable && load_log) debug('SITE.' + _name + ' :: loaded');

    return {
      FilterSubOptionToggle: FilterSubOptionToggle
    };

  }) ();

  return module;

}) (SITE || {}, jQuery);

;
/**
 *  filter-toggle.js
 *
 *
 */

var SITE = (function (module, $) {

  'use strict';

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  module.filterToggle = (function () {

    var _name = 'filterToggle',
        load_log = true,
        debug_enable = true,
        debug = debug_enable ? module.util.debug : function () {};

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    function FilterToggle() {

      this.classNames = {
        'context':          'aa-filter',
        'toggleWrap':       'aa-filter__toggle-wrap',
        'toggle':           'aa-filter__toggle',
        'contentWrap':      'aa-filter__content-wrap',
        'content':          'aa-filter__content'
      };
      this.selectors = {
        'context':          '.' + this.classNames.context,
        'toggleWrap':       '.' + this.classNames.toggleWrap,
        'toggle':           '.' + this.classNames.toggle,
        'contentWrap':      '.' + this.classNames.contentWrap,
        'content':          '.' + this.classNames.content
      };

      this.$context = $(this.selectors.context);

      if (this.$context.length > 0) {
        this.init();
      }

    }

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    FilterToggle.prototype.init = function () {

      var self = this,
          $toggleWraps;

      $.each(self.$context, function (index, context) {
        $toggleWraps = $(context).find(self.selectors.toggleWrap);
        $.each($toggleWraps, function (index, toggleWrap) {
          self.bindMainEvents($(toggleWrap));
        });
      });

    };

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    FilterToggle.prototype.bindMainEvents = function ($toggleWrap) {

      var self = this,
          $toggle;

      if ($toggleWrap.hasClass('initialized')) {
        return;
      }

      $toggleWrap.addClass('initialized');
      $toggleWrap.addClass('collapsed');
      $toggle = $toggleWrap.find(self.selectors.toggle);

      $toggle.on('click', function (e) {
        self.toggleSubmenu($toggleWrap);
        e.stopPropagation();
      });

      $('html').on('click', function() {
        // Close all submenus when clicking outside
        self.closeAllSubmenus();
      });

      $toggleWrap.on('click', function(e) {
        // Stop propagation if clicking within the filter dropdowns
        // to keep the outer html click handler from receiving the event
        e.stopPropagation();
      });

    };

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    FilterToggle.prototype.toggleSubmenu = function ($toggleWrap) {

      var self = this;

      if ($toggleWrap.hasClass('collapsed')) {
        self.openSubmenu($toggleWrap);
      } else {
        self.closeSubmenu($toggleWrap);
      }

    };

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    FilterToggle.prototype.openSubmenu = function ($toggleWrap) {

      var self = this,
          $contentWrap,
          $content,
          $context,
          $toggleWraps;

      $context = $toggleWrap.closest(self.selectors.context);
      $toggleWraps = $context.find(self.selectors.toggleWrap);
      $contentWrap = $toggleWrap.find(self.selectors.contentWrap);
      $content = $toggleWrap.find(self.selectors.content);

      $.each($toggleWraps, function (index, toggleWrap) {
        if ($(toggleWrap).is($toggleWrap)) {
          // Open only the selected toggle
          $contentWrap
            .stop()
            .animate({
              'height': $content.outerHeight()
            },{
              'duration': 150,
              'easing': 'easeInOutQuad',
              'complete': function () {
                $toggleWrap.addClass('expanded');
                $toggleWrap.removeClass('collapsed');
                $contentWrap.css({
                  'height': ''
                });
              }
            });
        } else {
          // Close all others
          self.closeSubmenu($(toggleWrap));
        }
      });

    };

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    FilterToggle.prototype.closeSubmenu = function ($toggleWrap) {

      var self = this,
          $contentWrap,
          $content;

      $contentWrap = $toggleWrap.find(self.selectors.contentWrap);
      $content = $toggleWrap.find(self.selectors.content);

      $contentWrap
        .stop()
        .animate({
          'height': 0
        },{
          'duration': 150,
          'easing': 'easeInOutQuad',
          'complete': function () {
            $toggleWrap.removeClass('expanded');
            $toggleWrap.addClass('collapsed');
            $contentWrap.css({
              'height': ''
            });
          }
        });

    };

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    FilterToggle.prototype.closeAllSubmenus = function () {

      var self = this,
          $toggleWraps;

      $.each(self.$context, function (index, context) {
        $toggleWraps = $(context).find(self.selectors.toggleWrap);
        $.each($toggleWraps, function (index, toggleWrap) {
          self.closeSubmenu($(toggleWrap));
        });
      });

    };

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    if (debug_enable && load_log) debug('SITE.' + _name + ' :: loaded');

    return {
      FilterToggle: FilterToggle
    };

  }) ();

  return module;

}) (SITE || {}, jQuery);

;
/**
 *  overlay-link.js
 *
 *
 */

var SITE = (function (module, $) {

  'use strict';

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  module.overlayLink = (function () {

    var _name = 'overlayLink',
        load_log = true,
        debug_enable = true,
        debug = debug_enable ? module.util.debug : function () {};

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    function OverlayLink() {

      this.classNames = {
        'context':         'aa-overlay-link'
      };
      this.selectors = {
        'context':         '.' + this.classNames.context
      };

      this.$context = $(this.selectors.context);

      if (this.$context.length > 0) {
          this.init();
      }

    }

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    OverlayLink.prototype.init = function () {

      var self = this;

      $.each(self.$context, function (index, link) {
        self.bindMainEvents($(link));
      });

    };

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    OverlayLink.prototype.bindMainEvents = function ($link) {

      var self = this;

      $link.on('mouseenter', function (e) {
        $link.parent().addClass('hovering');
      });

      $link.on('mouseleave', function (e) {
        $link.parent().removeClass('hovering');
      });

    };

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    if (debug_enable && load_log) debug('SITE.' + _name + ' :: loaded');

    return {
      OverlayLink: OverlayLink
    };

  }) ();

  return module;

}) (SITE || {}, jQuery);

;
/**
 *  layout-masonry.js
 *
 *
 */

var SITE = (function (module, $) {

  'use strict';

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  module.layoutMasonry = (function () {

    var _name = 'layoutMasonry',
        load_log = true,
        debug_enable = true,
        debug = debug_enable ? module.util.debug : function () {};

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    function LayoutMasonry() {

      this.classNames = {
        'masonry':           'aa-masonry',
        'wrap':              'aa-masonry__wrap',
        'listView':          'aa-masonry__wrap--list-view'
      };
      this.selectors = {
        'masonry':           '.' + this.classNames.masonry,
        'wrap':              '.' + this.classNames.wrap,
        'listView':          '.' + this.classNames.listView
      };

      this.$context = $(this.selectors.masonry);

      if (this.$context.length > 0) {
        setTimeout(function () {
          this.init();
        }.bind(this), 200);
      }

    }

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    LayoutMasonry.prototype.init = function () {

      var self = this;

      $.each(self.$context, function (index, item) {
        self.initLayout($(item));
      });

      self.bindMainEvents();

    };

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    LayoutMasonry.prototype.initLayout = function ($context) {

      var self = this;

      if ($context.closest(self.selectors.wrap).hasClass(self.classNames.listView)) {
        /**
         *  Do not initialize in list view
         *
         *
         */
        return;
      }

      $context.isotope({
        itemSelector: '.' + $context.attr('data-item-class'),
        horizontalOrder: true
      });

    };

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    LayoutMasonry.prototype.bindMainEvents = function () {

      var self = this;

    };

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    if (debug_enable && load_log) debug('SITE.' + _name + ' :: loaded');

    return {
      LayoutMasonry: LayoutMasonry
    };

  }) ();

  return module;

}) (SITE || {}, jQuery);

;
/**
 *  main-search.js
 *
 *
 */

var SITE = (function (module, $) {

  'use strict';

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  module.mainSearch = (function () {

    var _name = 'mainSearch',
        load_log = true,
        debug_enable = true,
        debug = debug_enable ? module.util.debug : function () {};

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    function MainSearch() {

      this.classNames = {
        'toggle':           'aa-button-search--site-header-toggle',
        'skipToSearch':     'aa-skip-to-main--search'
      };
      this.selectors = {
        'toggle':           '.' + this.classNames.toggle,
        'skipToSearch':     '.' + this.classNames.skipToSearch,
        'mainSearchInput':  '#site-search-field'
      };

      this.$toggle = null;
      this.$toggleGroup = null;
      this.$searchInput = null;

      this.init();

    }

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    MainSearch.prototype.init = function () {

      var self = this;

      self.$toggle = $(self.selectors.toggle);
      self.$toggleGroup = self.$toggle.closest(
        self.$toggle.attr('data-toggle-group')
      );
      self.$toggleGroup.addClass('collapsed');
      this.$mainSearchInput = $(self.selectors.mainSearchInput);

      self.bindMainEvents();

    };

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    MainSearch.prototype.bindMainEvents = function () {

      var self = this;

      self.$toggle.on('click', function (e) {
        self.openClose();
      });

      // Receive external requests to open search
      $('body').on('SITE.mainSearch.openSearch', function () {
        self.openSearch();
      });

      // Receive external requests to close search
      $('body').on('SITE.mainSearch.closeSearch', function () {
        self.closeSearch();
      });

      $(self.selectors.skipToSearch).on('click', function () {
        self.openSearch();
        setTimeout(function () {
          self.$mainSearchInput.focus();
        }, 250);
      });

    };

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    MainSearch.prototype.openClose = function () {

      var self = this;

      if (self.$toggleGroup.hasClass('expanded')) {
        self.closeSearch();
      } else {
        self.openSearch();
      }

    };

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    MainSearch.prototype.openSearch = function () {

      var self = this;

      self.$toggleGroup.addClass('expanded');
      self.$toggleGroup.removeClass('collapsed');

    };

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    MainSearch.prototype.closeSearch = function () {

      var self = this;

      self.$toggleGroup.removeClass('expanded');
      self.$toggleGroup.addClass('collapsed');

    };

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    if (debug_enable && load_log) debug('SITE.' + _name + ' :: loaded');

    return {
      MainSearch: MainSearch
    };

  }) ();

  return module;

}) (SITE || {}, jQuery);

;
/**
 *  window-events.js
 *
 *
 */

var SITE = (function (module, $) {

  'use strict';

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  module.mobileNav = (function () {

    var _name = 'mobileNav',
        load_log = true,
        debug_enable = true,
        debug = debug_enable ? module.util.debug : function () {};

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    function MobileNav() {

      this.classNames = {
        'toggle':         'aa-toggle-menu-init',
        'toggleGroup':    'aa-toggle-menu-group'
      };
      this.selectors = {
        'el':             '.' + this.classNames.el,
        'toggle':         '.' + this.classNames.toggle,
        'toggleGroup':    '.' + this.classNames.toggleGroup
      };

      this.$toggles = $(this.selectors.toggle);

      this.init();

    }

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    MobileNav.prototype.init = function () {

      var self = this;

      self.bindMainEvents();

    };

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    MobileNav.prototype.bindMainEvents = function () {

      var self = this;

      $.each(self.$toggles, function (index, item) {
        self.bindToggleEvents({
          '$toggle': $(item)
        });
      });

      $('body').on('SITE.mobileNav.openMenu', function () {
        self.openMenu();
      });

      $('body').on('SITE.mobileNav.closeMenu', function () {
        self.closeMenu();
      });

      $('body').on('SITE.windowEvents.windowResize', function (e, args) {
        self.onWindowResize(args);
      });

    };

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    MobileNav.prototype.bindToggleEvents = function (args) {

      var self = this,
          $toggle,
          $toggleGroup,
          $menuWrap,
          $menuContents;

      $toggle = args.$toggle;
      $toggleGroup = $toggle.closest($toggle.attr('data-toggle-group'));
      $menuWrap = $toggleGroup.find($toggle.attr('data-menu-wrap'));
      $menuContents = $toggleGroup.find($toggle.attr('data-menu-contents'));

      $toggle.on('click', function (e) {
        e.preventDefault();
        self.openClose({
          '$menuWrap': $menuWrap,
          '$menuContents': $menuContents,
          '$toggleGroup': $toggleGroup
        });
      });

    };

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    MobileNav.prototype.onWindowResize = function (args) {

      var self = this;

      if (args.displaySize === 'xs') {

      } else {

      }

    };

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    MobileNav.prototype.openMenu = function (args) {

      var self = this,
          $toggleGroup,
          $menuWrap,
          $menuContents;

      $toggleGroup = args.$toggleGroup;
      $menuWrap = args.$menuWrap;
      $menuContents = args.$menuContents;

      $menuWrap.animate({
        'height': $menuContents.outerHeight()
      },{
        'duration': 350,
        'easing': 'easeInOutQuad',
        'complete': function () {
          $(this).css({
            'height': 'auto'
          });
        }
      });
      $toggleGroup.addClass('opened');
      $toggleGroup.removeClass('closed');

    };

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    MobileNav.prototype.closeMenu = function (args) {

      var self = this,
          $toggleGroup,
          $menuWrap,
          $menuContents;

      $toggleGroup = args.$toggleGroup;
      $menuWrap = args.$menuWrap;
      $menuContents = args.$menuContents;

      $menuWrap.animate({
        'height': 0
      },{
        'duration': 350,
        'easing': 'easeInOutQuad',
        'complete': function () {
          $(this).css({
            'height': ''
          });
        }
      });
      $toggleGroup.removeClass('opened');
      $toggleGroup.addClass('closed');

    };

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    MobileNav.prototype.openClose = function (args) {

      var self = this,
          $toggleGroup;

      $toggleGroup = args.$toggleGroup;

      if ($toggleGroup.hasClass('opened')) {
        self.closeMenu(args);
      } else {
        self.openMenu(args);
      }

    };

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    if (debug_enable && load_log) debug('SITE.' + _name + ' :: loaded');

    return {
      MobileNav: MobileNav
    };

  }) ();

  return module;

}) (SITE || {}, jQuery);

/**
 *  init.js
 *
 *  Centralize instantiation here.
 *  Avoid instantiation in individual modules as much as possible.
 *
 */

(function () {

  var windowEvents = new SITE.windowEvents.WindowEvents(), // First
      mainSearch = new SITE.mainSearch.MainSearch(),
      mobileNav = new SITE.mobileNav.MobileNav(),
      layoutMasonry = new SITE.layoutMasonry.LayoutMasonry(),
      carouselArticle = new SITE.carouselArticle.CarouselArticle(),
      carouselHero = new SITE.carouselHero.CarouselHero(),
      carouselSocial = new SITE.carouselSocial.CarouselSocial(),
      carouselText = new SITE.carouselText.CarouselText(),
      filterCheckbox = new SITE.filterCheckbox.FilterCheckbox(),
      filterDate = new SITE.filterDate.FilterDate(),
      filterHighlights = new SITE.filterHighlights.FilterHighlights(),
      filterPrimarySearch = new SITE.filterPrimarySearch.FilterPrimarySearch(),
      filterProgram = new SITE.filterProgram.FilterProgram(),
      filterSelected = new SITE.filterSelected.FilterSelected(),
      filterSubOptionToggle = new SITE.filterSubOptionToggle.FilterSubOptionToggle(),
      filterToggle = new SITE.filterToggle.FilterToggle(),
      overlayLink = new SITE.overlayLink.OverlayLink(),
      blockToggleItem = new SITE.blockToggleItem.BlockToggleItem(),
      imageAspectRatio = new SITE.imageAspectRatio.ImageAspectRatio();

}) ();
