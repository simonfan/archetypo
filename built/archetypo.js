//     archetypo
//     (c) simonfan
//     archetypo is licensed under the MIT terms.

define("__archetypo/build/sub",["require","exports","module","q","_q","jquery"],function(e,r,t){var a=e("q"),o=e("_q"),i=e("jquery");t.exports=function(){var e=a.defer(),r=this.el.find(this.archSelector);return o.map(r,function(e){e=i(e);var r=e.data("archetypo");if(r)return r.promise;var t=this.create({el:e});return t.promise},this).done(function(){e.resolve()}),e.promise}}),define("__archetypo/parse/value",["require","exports","module"],function(e,r,t){function a(e){return"["+e+"]"}function o(e){var r={};return e?e[2]?(r.type="invocation",r.priority=""===e[1]?"0":e[1],r.method=e[2],r.value=a(e[3])):e[4]&&(r.type="value",r.value=e[4]):r.type="empty",r}var i="\\s*",n="(?:(\\d*)!)?",s="([\\w$\\-]*)",u=":"+i+"(.*)"+i,h=["^",i,"(?:",n,i,s,i,u,"|","(.*?)",")",i,"$"].join(""),c=new RegExp(h);t.exports=function(e){var r=e.match(c);return o(r)}}),define("__archetypo/methods/data",["require","exports","module","lodash","jquery-meta-data","../parse/value"],function(e,r){var t=e("lodash"),a=(e("jquery-meta-data"),e("../parse/value"));r.archData=function(){var e=t.toArray(arguments),r=e.shift()||{};return t.defaults(r,this.archDataOptions),e.unshift(r),this.el.metaData.apply(this.el,e)},r.archDataOptions={prefix:"arch",parse:a,replace:!1}}),define("__archetypo/helpers",["require","exports","module","lodash"],function(e,r){e("lodash");r.camelCase=function(e){return e.replace(/-(.)/g,function(e,r){return r.toUpperCase()})}}),define("__archetypo/methods/arch-evaluate/invoke",["require","exports","module","q","../../helpers"],function(e,r,t){var a=e("q"),o=e("../../helpers");t.exports=function(e){var r=a.defer(),t=o.camelCase(e.method),i=this.invoke(t,e.value);return a.isPromise(i)?i.done(r.resolve):r.resolve(i),r.promise}}),define("__archetypo/methods/arch-evaluate/index",["require","exports","module","lodash","q","_q","./invoke"],function(e,r){function t(e){var r=o.defer(),t=a.reduce(e,function(e,r,t){return"value"===r.type&&(e[t]=this.evaluate(r.value)),e},{},this);this.assign(t);var s=a.pick(e,function(e){return"invocation"===e.type});return i.mapValues(s,n,this).done(a.bind(function(e){this.assign(e),r.resolve()},this)),r.promise}var a=e("lodash"),o=e("q"),i=e("_q"),n=e("./invoke");r.archEvaluate=function(e){var r=o.defer(),n=a.unique(a.pluck(e,"priority")).sort(function(e,r){return e-r}),s=a.map(n,function(r){return a.pick(e,function(e){return e.priority===r})});return i.each(s,t,this).done(a.partial(r.resolve,this)),r.promise}}),define("__archetypo/methods/index",["require","exports","module","lodash","q","deep","scope"],function(e,r){var t=e("lodash"),a=e("q"),o=e("deep");r.load=function(r,i){var n=a.defer();return t.isString(r)?i?e([r],function(e){n.resolve(o.get(e,i))}):e([r],n.resolve):t.isArray(r)&&e(r,function(){var e=t.toArray(arguments);n.resolve(i?t.map(e,function(e){return o.get(e,i)}):e)}),n.promise},r.summon=function(e){var r=Array.prototype.slice.call(arguments,1);return r=r&&r.length>0?r:[this],this.load(e).done(t.bind(function(e){e.apply(this,r)},this))},r.l=r.load,r.s=r.summon;var i=e("scope");r.create=function(e){var r=i.prototype.create.call(this,e);return r.archInit(),r}}),define("archetypo",["require","exports","module","lodash","jquery","scope","q","./__archetypo/build/sub","./__archetypo/methods/data","./__archetypo/methods/arch-evaluate/index","./__archetypo/methods/index"],function(e,r,t){var a=e("lodash"),o=(e("jquery"),e("scope")),i=e("q"),n=e("./__archetypo/build/sub"),s={enumerable:!1},u=t.exports=o.extend({initialize:function(){o.prototype.initialize.apply(this,arguments),this.archInit()},archInit:function(){this.el.data("archetypo",this);var e=this.el;if(!e||0===e.length)throw new Error("No el on for archetypo constructor.");var r=i.defer();this.promise=r.promise,this.done=a.bind(r.promise.done,r.promise);var t=this.archData();this.archEvaluate(t).then(a.bind(n,this)).done(a.partial(r.resolve,this))},archSelector:"[data-archetypo]"},s);u.assignProto(e("./__archetypo/methods/data"),s),u.assignProto(e("./__archetypo/methods/arch-evaluate/index"),s),u.assignProto(e("./__archetypo/methods/index"),s)});