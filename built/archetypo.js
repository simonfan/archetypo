//     Iterator
//     (c) simonfan
//     Iterator is licensed under the MIT terms.

//     Deep
//     (c) simonfan
//     Deep is licensed under the MIT terms.

//     archetypo
//     (c) simonfan
//     archetypo is licensed under the MIT terms.

define("__archetypo/build/sub",["require","exports","module","q","_q","jquery"],function(e,t,r){var n=e("q"),i=e("_q"),o=e("jquery");r.exports=function(){var e=n.defer(),t=this.el.find(this.archSelector);return i.map(t,function(e){e=o(e);var t=e.data("archetypo");if(t)return t.promise;var r=this.create({el:e});return r.promise},this).done(function(){e.resolve()}),e.promise}}),define("__archetypo/parse/value",["require","exports","module"],function(e,t,r){function n(e){return"["+e+"]"}function i(e){var t={};return e?e[2]?(t.type="invocation",t.priority=""===e[1]?"0":e[1],t.method=e[2],t.value=n(e[3])):e[4]&&(t.type="value",t.value=e[4]):t.type="empty",t}var o="\\s*",a="(?:(\\d*)!)?",s="([\\w$\\-]*)",u=":"+o+"(.*)"+o,h=["^",o,"(?:",a,o,s,o,u,"|","(.*?)",")",o,"$"].join(""),c=new RegExp(h);r.exports=function(e){var t=e.match(c);return i(t)}}),define("__archetypo/methods/data",["require","exports","module","lodash","jquery-meta-data","../parse/value"],function(e,t){var r=e("lodash"),n=(e("jquery-meta-data"),e("../parse/value"));t.archData=function(){var e=r.toArray(arguments),t=e.shift()||{};return r.defaults(t,this.archDataOptions),e.unshift(t),this.el.metaData.apply(this.el,e)},t.archDataOptions={prefix:"arch",parse:n,replace:!1}}),define("__archetypo/helpers",["require","exports","module","lodash"],function(e,t){e("lodash");t.camelCase=function(e){return e.replace(/-(.)/g,function(e,t){return t.toUpperCase()})}}),define("__archetypo/methods/arch-evaluate/invoke",["require","exports","module","q","_q","lodash","../../helpers"],function(e,t,r){function n(e){var t=o.defer(),r=u.camelCase(e.method),n=this.invoke(r,e.value);return o.isPromise(n)?n.done(t.resolve):t.resolve(n),t.promise}function i(e){var t=o.defer();return a.mapValues(e,n,this).done(s.bind(function(e){this.assign(e),t.resolve()},this)),t.promise}var o=e("q"),a=e("_q"),s=e("lodash"),u=e("../../helpers");r.exports=function(e){var t=o.defer(),r=s.unique(s.pluck(e,"priority")).sort(function(e,t){return e-t}),n=s.map(r,function(t){return s.pick(e,function(e){return e.priority===t})});return a.each(n,i,this).done(function(){t.resolve()}),t.promise}}),define("__archetypo/methods/arch-evaluate/index",["require","exports","module","lodash","q","./invoke"],function(e,t){var r=e("lodash"),n=e("q"),i=e("./invoke");t.archEvaluate=function(e){var t=n.defer(),o=r.reduce(e,function(e,t,r){return"value"===t.type&&(e[r]=this.evaluate(t.value)),e},{},this);this.assign(o);var a=r.pick(e,function(e){return"invocation"===e.type}),s=this;return i.call(this,a).done(function(){t.resolve(s)}),t.promise}}),define("iterator/base",["subject","lodash"],function(e,t){var r=e({initialize:function(e,t){this.data=e,t=t||{},this.currentIndex=t.startAt||-1,this.options=t,this.evaluate=t.evaluate||t.evaluator||this.evaluate},move:function(e){return this.index(this.currentIndex+e),this},evaluate:function(e){return e},evaluator:function(e){return this.evaluate=e,this},start:function(){return this.currentIndex=-1,this},end:function(){return this.currentIndex=this.length(),this},index:function(e){if(e>this.length()-1||0>e)throw new Error("No such index "+e);return this.currentIndex=e,this},countBefore:function(){return this.currentIndex+1},countAfter:function(){return this.length()-(this.currentIndex+1)},range:function(e,t){for(var r=[];t>=e;)r.push(this.at(e)),e++;return r},hasNext:function(){return this.currentIndex<this.length()-1},next:function(){return this.move(1),this.current()},nextN:function(e){for(var t=[],r=this.currentIndex+e-1;this.hasNext()&&this.currentIndex<=r;)t.push(this.next());return t},hasPrevious:function(){return this.currentIndex>0},previous:function(){return this.move(-1),this.current()},previousN:function(e){for(var t=[],r=this.currentIndex-e+1;this.hasPrevious()&&this.currentIndex>=r;)t.push(this.previous());return t},current:function(){return this.at(this.currentIndex)},value:function(){return this.data}});r.proto({hasPrev:r.prototype.hasPrevious,prev:r.prototype.previous,prevN:r.prototype.previousN});var n=["map","filter","compact","difference"];return t.each(n,function(e){r.proto(e,function(){var r=t(this.data);r=r[e].apply(r,arguments);var n=this.constructor(r.value());return n})}),r}),define("iterator/array",["require","exports","module","./base","lodash"],function(e){var t=e("./base"),r=e("lodash"),n=t.extend({at:function(e){return this.evaluate(this.data[e],e)},length:function(){return this.data.length}}),i=["push","reverse","shift","sort","splice","unshift"];return r.each(i,function(e){n.proto(e,function(){return this.data[e].apply(this.data,arguments),this})}),r.each(["concat","slice"],function(e){n.proto(e,function(){var t=this.data[e].apply(this.data,arguments);return this.constructor(t)})}),n}),define("iterator/object",["require","exports","module","./base","lodash"],function(e){var t=e("./base"),r=e("lodash"),n=t.extend({initialize:function(e,n){n=n||{},t.prototype.initialize.apply(this,arguments),this.order=n.order||r.keys(e)},keyAt:function(e){return this.order[e]},at:function(e){var t=this.keyAt(e),r=this.data[t];return this.evaluate(r,t)},length:function(){return this.order.length},nextKey:function(){return this.keyAt(this.currentIndex+1)},currentKey:function(){return this.keyAt(this.currentIndex)},previousKey:function(){return this.keyAt(this.currentIndex-1)},map:function(e){var t={};return r.each(this.order,function(r,n){t[r]=e(this.data[r],r,n)}.bind(this)),this.constructor(t)}});return n.proto("constructor",n),n}),define("itr",["require","exports","module","./iterator/array","./iterator/object","lodash"],function(e){var t=e("./iterator/array"),r=e("./iterator/object"),n=e("lodash"),i=function(e){var i;return n.isArray(e)?i=t:n.isObject(e)&&(i=r),i.apply(this,arguments)};return i.object=r,i.array=t,i}),define("__deep__/keys",["require","exports","module"],function(){return function(e){return e.replace(/\[(["']?)([^\1]+?)\1?\]/g,".$2").replace(/^\./,"").split(".")}}),define("__deep__/walker",["require","exports","module","lodash","itr","./keys"],function(e,t,r){var n=e("lodash"),i=e("itr"),o=e("./keys"),a=i.object.extend({nextStep:function(){var e=new RegExp("^"+this.currentKey()+"\\.");return this.nextKey().replace(e,"")},currentStep:function(){var e=new RegExp("^"+this.previousKey()+"\\.");return this.currentKey().replace(e,"")},previousStep:function(){var e=this.previousKey()||"";return n.last(e.split("."))},remainingSteps:function(){var e=new RegExp("^"+this.currentKey()+"\\.");return this.destination().replace(e,"")},destination:function(){return n.last(this.order)}});r.exports=function(e,t){t=n.isArray(t)?t:o(t);var r={"":e},i=[""];return n.every(t,function(o,a){var s=n.first(t,a+1).join(".");return i.push(s),e=e[o],r[s]=e,!n.isUndefined(e)}),a(r,{order:i})}}),define("__deep__/getset",["require","exports","module","lodash","./keys"],function(e,t){var r=e("lodash"),n=e("./keys");t.get=function(e,t){return t=r.isArray(t)?t:n(t),r.reduce(t,function(e,t){return e[t]},e)},t.set=function(e,i,o){i=r.isArray(i)?i:n(i);var a=i.pop();e=t.get(e,i),e[a]=o}}),define("deep",["require","exports","module","lodash","./__deep__/keys","./__deep__/walker","./__deep__/getset"],function(e){var t=e("lodash"),r={};return r.parseKeys=e("./__deep__/keys"),r.walker=e("./__deep__/walker"),t.extend(r,e("./__deep__/getset")),r}),define("__archetypo/methods/index",["require","exports","module","lodash","q","deep","scope"],function(e,t){var r=e("lodash"),n=e("q"),i=e("deep");t.load=function(t,r){var o=n.defer();return r?e([t],function(e){o.resolve(i.get(e,r))}):e([t],o.resolve),o.promise},t.summon=function(e){var t=Array.prototype.slice.call(arguments,1);return t=t&&t.length>0?t:[this],this.load(e).then(r.bind(function(e){e.apply(this,t)},this))},t.l=t.load,t.s=t.summon;var o=e("scope");t.create=function(e){var t=o.prototype.create.call(this,e);return t.archInit(),t}}),define("archetypo",["require","exports","module","lodash","jquery","scope","q","./__archetypo/build/sub","./__archetypo/methods/data","./__archetypo/methods/arch-evaluate/index","./__archetypo/methods/index"],function(e,t,r){var n=e("lodash"),i=(e("jquery"),e("scope")),o=e("q"),a=e("./__archetypo/build/sub"),s={enumerable:!1},u=r.exports=i.extend({initialize:function(){i.prototype.initialize.apply(this,arguments),this.archInit()},archInit:function(){this.el.data("archetypo",this);var e=this.el;if(!e||0===e.length)throw new Error("No el on for archetypo constructor.");var t=o.defer();this.promise=t.promise,this.done=n.bind(t.promise.done,t.promise);var r=this.archData();this.archEvaluate(r).then(n.bind(a,this)).done(n.partial(t.resolve,this))},archSelector:"[data-archetypo]"},s);u.assignProto(e("./__archetypo/methods/data"),s),u.assignProto(e("./__archetypo/methods/arch-evaluate/index"),s),u.assignProto(e("./__archetypo/methods/index"),s)});