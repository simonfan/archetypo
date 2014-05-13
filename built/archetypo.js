//     archetypo
//     (c) simonfan
//     archetypo is licensed under the MIT terms.

define("__archetypo/parse/value",["require","exports","module"],function(e,r,t){function i(e){return"["+e+"]"}function n(e){var r={};return e?e[2]?(r.type="invocation",r.priority=""===e[1]?"0":e[1],r.method=e[2],r.value=i(e[3])):e[4]&&(r.type="literal",r.value=e[4]):r.type="empty",r}var o="\\s*",a="(?:(\\d*)!)?",u="([\\w$\\-]*)",s="\\("+o+"(.*)"+o+"\\)",p=[o,"(?:",a,o,u,o,s,"|",u,")"+o].join(""),c=new RegExp(p);t.exports=function(e){var r=e.match(c);return n(r)}}),define("__archetypo/helpers",["require","exports","module","lodash"],function(e,r){e("lodash");r.camelCase=function(e){return e.toLowerCase().replace(/-(.)/g,function(e,r){return r.toUpperCase()})}}),define("__archetypo/build/evaluate/invoke",["require","exports","module","q","_q","lodash","../../helpers"],function(e,r,t){function i(e){var r=o.defer(),t=s.camelCase(e.method),i=this.invoke(t,e.value);return o.isPromise(i)?i.then(r.resolve):r.resolve(i),r.promise}function n(e){var r=o.defer();return a.mapValues(e,i,this).done(u.bind(function(e){this.assign(e),r.resolve()},this)),r.promise}var o=e("q"),a=e("_q"),u=e("lodash"),s=e("../../helpers");t.exports=function(e){var r=o.defer(),t=u.unique(u.pluck(e,"priority")).sort(function(e,r){return e-r}),i=u.map(t,function(r){return u.pick(e,function(e){return e.priority===r})});return a.each(i,n,this).done(function(){r.resolve()}),r.promise}}),define("__archetypo/build/evaluate/index",["require","exports","module","lodash","q","jquery-meta-data","../../parse/value","./invoke"],function(e,r,t){var i=e("lodash"),n=e("q"),o=(e("jquery-meta-data"),e("../../parse/value")),a=e("./invoke");t.exports=function(){var e=n.defer(),r=this.el.metaData({prefix:"arch",parse:o}),t=i.pick(r,function(e){return"literal"===e.type});this.assign(t);var u=i.pick(r,function(e){return"invocation"===e.type});return a.call(this,u).done(function(){e.resolve()}),e.promise}}),define("__archetypo/build/sub/index",["require","exports","module","q","_q","jquery"],function(e,r,t){var i=e("q"),n=e("_q"),o=e("jquery");t.exports=function(){var e=i.defer(),r=this.el.find("[data-archetypo]");return n.map(r,function(e){e=o(e);var r=e.data("archetypo");if(r)return r.done;var t=this.createSubArchetypo({el:e});return t.done},this).done(function(){e.resolve()}),e.promise}}),define("__archetypo/methods/require",["require","exports","module","lodash","q"],function(e,r){function t(r){var t=o.defer();return e([r],t.resolve),t.promise}function i(e,r){return this.require(e).then(n.bind(function(e){return this.partial(e,r)},this))}var n=e("lodash"),o=e("q");r.require=t,r.requireFn=i}),define("archetypo",["require","exports","module","lodash","jquery","scope","q","./__archetypo/build/evaluate/index","./__archetypo/build/sub/index","./__archetypo/methods/require"],function(e,r,t){var i=e("lodash"),n=(e("jquery"),e("scope")),o=e("q"),a=e("./__archetypo/build/evaluate/index"),u=e("./__archetypo/build/sub/index"),s=t.exports=n.extend({initialize:function(){n.prototype.initialize.apply(this,arguments),this.initializeArchetypo()},initializeArchetypo:function(){this.el.data("archetypo",this);var e=this.el;if(!e)throw new Error("No el on archetypo.");var r=o.defer();this.done=r.promise,a.call(this).then(i.bind(u,this)).done(i.partial(r.resolve,this))},createSubArchetypo:function(e){var r=this.create(e);return r.initializeArchetypo(),r},jqMetaDataOptions:{prefix:"arch",replace:!0}},{enumerable:!1});s.assignProto(e("./__archetypo/methods/require"))});