module.exports=function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object.keys(e).reduce(function(t,n){return t+(encodeURIComponent(n)+"=")+encodeURIComponent(e[n])+"&"},"")},o={config:{baseUrl:"",transformRequest:function(e){return e},headers:{},timeout:1e4,responseType:"json",withCredentials:!1},interceptor:{success:function(e){return e},fail:function(e){return e}},post:function(e,t,n){return t=(t=this.config.transformRequest(t))instanceof FormData?t:r(t).substr(1),this.ajax("post",e,t,n)},get:function(e,t,n){t=this.config.transformRequest(t);var o=r(t);return o&&(e+="?"+o.substr(1)),t=null,this.ajax("get",e,t,n)},ajax:function(e,t,n,r){var o=this;return function(e,t,n,r,o){return new Promise(function(i,u){var s=new XMLHttpRequest;t=r.baseUrl+t,s.open(e,t),"post"===e&&n.length&&s.setRequestHeader("Content-type","application/x-www-form-urlencoded"),s.responseType=r.responseType,s.withCredentials=r.withCredentials,s.timeout=r.timeout;var c=r.headers||{},a=Object.keys(c);a.forEach(function(e){s.setRequestHeader(e,c[e])}),s.onreadystatechange=function(){4===s.readyState&&200===s.status&&i(o.success(s.response))},s.ontimeout=function(e){u(o.fail(e.target))},s.onerror=function(e){u(o.fail(e.target))},s.send(n)})}(e,t,n,r?(Object.keys(this.config).forEach(function(e){void 0===r[e]&&(r[e]=o.config[e])}),r):this.config,this.interceptor)},install:function(e,t){try{t&&t(this.config)}catch(e){console.error("options 必须是一个函数")}e.prototype.$get=this.get.bind(this),e.prototype.$post=this.post.bind(this)}};var i=Object.create(o);t.default=i}]).default;