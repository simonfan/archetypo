/*!
 *
 * Copyright 2009-2012 Kris Kowal under the terms of the MIT
 * license found at http://github.com/kriskowal/q/raw/master/LICENSE
 *
 * With parts by Tyler Close
 * Copyright 2007-2009 Tyler Close under the terms of the MIT X license found
 * at http://www.opensource.org/licenses/mit-license.html
 * Forked at ref_send.js version: 2009-05-11
 *
 * With parts by Mark Miller
 * Copyright (C) 2011 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

//     BackboneCollectionLazy
//     (c) simonfan
//     BackboneCollectionLazy is licensed under the MIT terms.

//     subject
//     (c) simonfan
//     subject is licensed under the MIT terms.

//     Iterator
//     (c) simonfan
//     Iterator is licensed under the MIT terms.

//     Deep
//     (c) simonfan
//     Deep is licensed under the MIT terms.

//     Containers
//     (c) simonfan
//     Containers is licensed under the MIT terms.

//     ObjectMatcher
//     (c) simonfan
//     ObjectMatcher is licensed under the MIT terms.

//     Backbone.Collection.Queryable
//     (c) simonfan
//     Backbone.Collection.Queryable is licensed under the MIT terms.

//     backbone.model.tree
//     (c) simonfan
//     backbone.model.tree is licensed under the MIT terms.

//     archetypo
//     (c) simonfan
//     archetypo is licensed under the MIT terms.

!function(t){if("function"==typeof bootstrap)bootstrap("promise",t);else if("object"==typeof exports)module.exports=t();else if("function"==typeof define&&define.amd)define("q",t);else if("undefined"!=typeof ses){if(!ses.ok())return;ses.makeQ=t}else Q=t()}(function(){function t(t){return function(){return G.apply(t,arguments)}}function e(t){return t===Object(t)}function n(t){return"[object StopIteration]"===re(t)||t instanceof L}function r(t,e){if(C&&e.stack&&"object"==typeof t&&null!==t&&t.stack&&-1===t.stack.indexOf(ie)){for(var n=[],r=e;r;r=r.source)r.stack&&n.unshift(r.stack);n.unshift(t.stack);var i=n.join("\n"+ie+"\n");t.stack=o(i)}}function o(t){for(var e=t.split("\n"),n=[],r=0;r<e.length;++r){var o=e[r];s(o)||i(o)||!o||n.push(o)}return n.join("\n")}function i(t){return-1!==t.indexOf("(module.js:")||-1!==t.indexOf("(node.js:")}function u(t){var e=/at .+ \((.+):(\d+):(?:\d+)\)$/.exec(t);if(e)return[e[1],Number(e[2])];var n=/at ([^ ]+):(\d+):(?:\d+)$/.exec(t);if(n)return[n[1],Number(n[2])];var r=/.*@(.+):(\d+)$/.exec(t);return r?[r[1],Number(r[2])]:void 0}function s(t){var e=u(t);if(!e)return!1;var n=e[0],r=e[1];return n===M&&r>=Q&&pe>=r}function a(){if(C)try{throw new Error}catch(t){var e=t.stack.split("\n"),n=e[0].indexOf("@")>0?e[1]:e[2],r=u(n);if(!r)return;return M=r[0],r[1]}}function c(t,e,n){return function(){return"undefined"!=typeof console&&"function"==typeof console.warn&&console.warn(e+" is deprecated, use "+n+" instead.",new Error("").stack),t.apply(t,arguments)}}function p(t){return m(t)?t:x(t)?z(t):$(t)}function f(){function t(t){e=t,i.source=t,X(n,function(e,n){W(function(){t.promiseDispatch.apply(t,n)})},void 0),n=void 0,r=void 0}var e,n=[],r=[],o=te(f.prototype),i=te(h.prototype);if(i.promiseDispatch=function(t,o,i){var u=H(arguments);n?(n.push(u),"when"===o&&i[1]&&r.push(i[1])):W(function(){e.promiseDispatch.apply(e,u)})},i.valueOf=function(){if(n)return i;var t=v(e);return m(t)&&(e=t),t},i.inspect=function(){return e?e.inspect():{state:"pending"}},p.longStackSupport&&C)try{throw new Error}catch(u){i.stack=u.stack.substring(u.stack.indexOf("\n")+1)}return o.promise=i,o.resolve=function(n){e||t(p(n))},o.fulfill=function(n){e||t($(n))},o.reject=function(n){e||t(A(n))},o.notify=function(t){e||X(r,function(e,n){W(function(){n(t)})},void 0)},o}function l(t){if("function"!=typeof t)throw new TypeError("resolver must be a function.");var e=f();try{t(e.resolve,e.reject,e.notify)}catch(n){e.reject(n)}return e.promise}function d(t){return l(function(e,n){for(var r=0,o=t.length;o>r;r++)p(t[r]).then(e,n)})}function h(t,e,n){void 0===e&&(e=function(t){return A(new Error("Promise does not support operation: "+t))}),void 0===n&&(n=function(){return{state:"unknown"}});var r=te(h.prototype);if(r.promiseDispatch=function(n,o,i){var u;try{u=t[o]?t[o].apply(r,i):e.call(r,o,i)}catch(s){u=A(s)}n&&n(u)},r.inspect=n,n){var o=n();"rejected"===o.state&&(r.exception=o.reason),r.valueOf=function(){var t=n();return"pending"===t.state||"rejected"===t.state?r:t.value}}return r}function y(t,e,n,r){return p(t).then(e,n,r)}function v(t){if(m(t)){var e=t.inspect();if("fulfilled"===e.state)return e.value}return t}function m(t){return e(t)&&"function"==typeof t.promiseDispatch&&"function"==typeof t.inspect}function x(t){return e(t)&&"function"==typeof t.then}function g(t){return m(t)&&"pending"===t.inspect().state}function b(t){return!m(t)||"fulfilled"===t.inspect().state}function _(t){return m(t)&&"rejected"===t.inspect().state}function k(){!ae&&"undefined"!=typeof window&&window.console&&console.warn("[Q] Unhandled rejection reasons (should be empty):",ue),ae=!0}function w(){for(var t=0;t<ue.length;t++){var e=ue[t];console.warn("Unhandled rejection reason:",e)}}function j(){ue.length=0,se.length=0,ae=!1,ce||(ce=!0,"undefined"!=typeof process&&process.on&&process.on("exit",w))}function q(t,e){ce&&(se.push(t),ue.push(e&&"undefined"!=typeof e.stack?e.stack:"(no stack) "+e),k())}function R(t){if(ce){var e=Y(se,t);-1!==e&&(se.splice(e,1),ue.splice(e,1))}}function A(t){var e=h({when:function(e){return e&&R(this),e?e(t):this}},function(){return this},function(){return{state:"rejected",reason:t}});return q(e,t),e}function $(t){return h({when:function(){return t},get:function(e){return t[e]},set:function(e,n){t[e]=n},"delete":function(e){delete t[e]},post:function(e,n){return null===e||void 0===e?t.apply(void 0,n):t[e].apply(t,n)},apply:function(e,n){return t.apply(e,n)},keys:function(){return ne(t)}},void 0,function(){return{state:"fulfilled",value:t}})}function z(t){var e=f();return W(function(){try{t.then(e.resolve,e.reject,e.notify)}catch(n){e.reject(n)}}),e.promise}function O(t){return h({isDef:function(){}},function(e,n){return D(t,e,n)},function(){return p(t).inspect()})}function S(t,e,n){return p(t).spread(e,n)}function N(t){return function(){function e(t,e){var u;if(oe){try{u=r[t](e)}catch(s){return A(s)}return u.done?u.value:y(u.value,o,i)}try{u=r[t](e)}catch(s){return n(s)?s.value:A(s)}return y(u,o,i)}var r=t.apply(this,arguments),o=e.bind(e,"next"),i=e.bind(e,"throw");return o()}}function I(t){p.done(p.async(t)())}function E(t){throw new L(t)}function T(t){return function(){return S([this,B(arguments)],function(e,n){return t.apply(e,n)})}}function D(t,e,n){return p(t).dispatch(e,n)}function B(t){return y(t,function(t){var e=0,n=f();return X(t,function(r,o,i){var u;m(o)&&"fulfilled"===(u=o.inspect()).state?t[i]=u.value:(++e,y(o,function(r){t[i]=r,0===--e&&n.resolve(t)},n.reject,function(t){n.notify({index:i,value:t})}))},void 0),0===e&&n.resolve(t),n.promise})}function P(t){return y(t,function(t){return t=Z(t,p),y(B(Z(t,function(t){return y(t,J,J)})),function(){return t})})}function K(t){return p(t).allSettled()}function V(t,e){return p(t).then(void 0,void 0,e)}function F(t,e){return p(t).nodeify(e)}var C=!1;try{throw new Error}catch(U){C=!!U.stack}var M,L,Q=a(),J=function(){},W=function(){function t(){for(;e.next;){e=e.next;var n=e.task;e.task=void 0;var o=e.domain;o&&(e.domain=void 0,o.enter());try{n()}catch(u){if(i)throw o&&o.exit(),setTimeout(t,0),o&&o.enter(),u;setTimeout(function(){throw u},0)}o&&o.exit()}r=!1}var e={task:void 0,next:null},n=e,r=!1,o=void 0,i=!1;if(W=function(t){n=n.next={task:t,domain:i&&process.domain,next:null},r||(r=!0,o())},"undefined"!=typeof process&&process.nextTick)i=!0,o=function(){process.nextTick(t)};else if("function"==typeof setImmediate)o="undefined"!=typeof window?setImmediate.bind(window,t):function(){setImmediate(t)};else if("undefined"!=typeof MessageChannel){var u=new MessageChannel;u.port1.onmessage=function(){o=s,u.port1.onmessage=t,t()};var s=function(){u.port2.postMessage(0)};o=function(){setTimeout(t,0),s()}}else o=function(){setTimeout(t,0)};return W}(),G=Function.call,H=t(Array.prototype.slice),X=t(Array.prototype.reduce||function(t,e){var n=0,r=this.length;if(1===arguments.length)for(;;){if(n in this){e=this[n++];break}if(++n>=r)throw new TypeError}for(;r>n;n++)n in this&&(e=t(e,this[n],n));return e}),Y=t(Array.prototype.indexOf||function(t){for(var e=0;e<this.length;e++)if(this[e]===t)return e;return-1}),Z=t(Array.prototype.map||function(t,e){var n=this,r=[];return X(n,function(o,i,u){r.push(t.call(e,i,u,n))},void 0),r}),te=Object.create||function(t){function e(){}return e.prototype=t,new e},ee=t(Object.prototype.hasOwnProperty),ne=Object.keys||function(t){var e=[];for(var n in t)ee(t,n)&&e.push(n);return e},re=t(Object.prototype.toString);L="undefined"!=typeof ReturnValue?ReturnValue:function(t){this.value=t};var oe;try{new Function("(function* (){ yield 1; })"),oe=!0}catch(U){oe=!1}var ie="From previous event:";p.resolve=p,p.nextTick=W,p.longStackSupport=!1,p.defer=f,f.prototype.makeNodeResolver=function(){var t=this;return function(e,n){e?t.reject(e):t.resolve(arguments.length>2?H(arguments,1):n)}},p.promise=l,p.passByCopy=function(t){return t},h.prototype.passByCopy=function(){return this},p.join=function(t,e){return p(t).join(e)},h.prototype.join=function(t){return p([this,t]).spread(function(t,e){if(t===e)return t;throw new Error("Can't join: not the same: "+t+" "+e)})},p.race=d,h.prototype.race=function(){return this.then(p.race)},p.makePromise=h,h.prototype.toString=function(){return"[object Promise]"},h.prototype.then=function(t,e,n){function o(e){try{return"function"==typeof t?t(e):e}catch(n){return A(n)}}function i(t){if("function"==typeof e){r(t,s);try{return e(t)}catch(n){return A(n)}}return A(t)}function u(t){return"function"==typeof n?n(t):t}var s=this,a=f(),c=!1;return W(function(){s.promiseDispatch(function(t){c||(c=!0,a.resolve(o(t)))},"when",[function(t){c||(c=!0,a.resolve(i(t)))}])}),s.promiseDispatch(void 0,"when",[void 0,function(t){var e,n=!1;try{e=u(t)}catch(r){if(n=!0,!p.onerror)throw r;p.onerror(r)}n||a.notify(e)}]),a.promise},p.when=y,h.prototype.thenResolve=function(t){return this.then(function(){return t})},p.thenResolve=function(t,e){return p(t).thenResolve(e)},h.prototype.thenReject=function(t){return this.then(function(){throw t})},p.thenReject=function(t,e){return p(t).thenReject(e)},p.nearer=v,p.isPromise=m,p.isPromiseAlike=x,p.isPending=g,h.prototype.isPending=function(){return"pending"===this.inspect().state},p.isFulfilled=b,h.prototype.isFulfilled=function(){return"fulfilled"===this.inspect().state},p.isRejected=_,h.prototype.isRejected=function(){return"rejected"===this.inspect().state};var ue=[],se=[],ae=!1,ce=!0;p.resetUnhandledRejections=j,p.getUnhandledReasons=function(){return ue.slice()},p.stopUnhandledRejectionTracking=function(){j(),"undefined"!=typeof process&&process.on&&process.removeListener("exit",w),ce=!1},j(),p.reject=A,p.fulfill=$,p.master=O,p.spread=S,h.prototype.spread=function(t,e){return this.all().then(function(e){return t.apply(void 0,e)},e)},p.async=N,p.spawn=I,p["return"]=E,p.promised=T,p.dispatch=D,h.prototype.dispatch=function(t,e){var n=this,r=f();return W(function(){n.promiseDispatch(r.resolve,t,e)}),r.promise},p.get=function(t,e){return p(t).dispatch("get",[e])},h.prototype.get=function(t){return this.dispatch("get",[t])},p.set=function(t,e,n){return p(t).dispatch("set",[e,n])},h.prototype.set=function(t,e){return this.dispatch("set",[t,e])},p.del=p["delete"]=function(t,e){return p(t).dispatch("delete",[e])},h.prototype.del=h.prototype["delete"]=function(t){return this.dispatch("delete",[t])},p.mapply=p.post=function(t,e,n){return p(t).dispatch("post",[e,n])},h.prototype.mapply=h.prototype.post=function(t,e){return this.dispatch("post",[t,e])},p.send=p.mcall=p.invoke=function(t,e){return p(t).dispatch("post",[e,H(arguments,2)])},h.prototype.send=h.prototype.mcall=h.prototype.invoke=function(t){return this.dispatch("post",[t,H(arguments,1)])},p.fapply=function(t,e){return p(t).dispatch("apply",[void 0,e])},h.prototype.fapply=function(t){return this.dispatch("apply",[void 0,t])},p["try"]=p.fcall=function(t){return p(t).dispatch("apply",[void 0,H(arguments,1)])},h.prototype.fcall=function(){return this.dispatch("apply",[void 0,H(arguments)])},p.fbind=function(t){var e=p(t),n=H(arguments,1);return function(){return e.dispatch("apply",[this,n.concat(H(arguments))])}},h.prototype.fbind=function(){var t=this,e=H(arguments);return function(){return t.dispatch("apply",[this,e.concat(H(arguments))])}},p.keys=function(t){return p(t).dispatch("keys",[])},h.prototype.keys=function(){return this.dispatch("keys",[])},p.all=B,h.prototype.all=function(){return B(this)},p.allResolved=c(P,"allResolved","allSettled"),h.prototype.allResolved=function(){return P(this)},p.allSettled=K,h.prototype.allSettled=function(){return this.then(function(t){return B(Z(t,function(t){function e(){return t.inspect()}return t=p(t),t.then(e,e)}))})},p.fail=p["catch"]=function(t,e){return p(t).then(void 0,e)},h.prototype.fail=h.prototype["catch"]=function(t){return this.then(void 0,t)},p.progress=V,h.prototype.progress=function(t){return this.then(void 0,void 0,t)},p.fin=p["finally"]=function(t,e){return p(t)["finally"](e)},h.prototype.fin=h.prototype["finally"]=function(t){return t=p(t),this.then(function(e){return t.fcall().then(function(){return e})},function(e){return t.fcall().then(function(){throw e})})},p.done=function(t,e,n,r){return p(t).done(e,n,r)},h.prototype.done=function(t,e,n){var o=function(t){W(function(){if(r(t,i),!p.onerror)throw t;p.onerror(t)})},i=t||e||n?this.then(t,e,n):this;"object"==typeof process&&process&&process.domain&&(o=process.domain.bind(o)),i.then(void 0,o)},p.timeout=function(t,e,n){return p(t).timeout(e,n)},h.prototype.timeout=function(t,e){var n=f(),r=setTimeout(function(){n.reject(new Error(e||"Timed out after "+t+" ms"))},t);return this.then(function(t){clearTimeout(r),n.resolve(t)},function(t){clearTimeout(r),n.reject(t)},n.notify),n.promise},p.delay=function(t,e){return void 0===e&&(e=t,t=void 0),p(t).delay(e)},h.prototype.delay=function(t){return this.then(function(e){var n=f();return setTimeout(function(){n.resolve(e)},t),n.promise})},p.nfapply=function(t,e){return p(t).nfapply(e)},h.prototype.nfapply=function(t){var e=f(),n=H(t);return n.push(e.makeNodeResolver()),this.fapply(n).fail(e.reject),e.promise},p.nfcall=function(t){var e=H(arguments,1);return p(t).nfapply(e)},h.prototype.nfcall=function(){var t=H(arguments),e=f();return t.push(e.makeNodeResolver()),this.fapply(t).fail(e.reject),e.promise},p.nfbind=p.denodeify=function(t){var e=H(arguments,1);return function(){var n=e.concat(H(arguments)),r=f();return n.push(r.makeNodeResolver()),p(t).fapply(n).fail(r.reject),r.promise}},h.prototype.nfbind=h.prototype.denodeify=function(){var t=H(arguments);return t.unshift(this),p.denodeify.apply(void 0,t)},p.nbind=function(t,e){var n=H(arguments,2);return function(){function r(){return t.apply(e,arguments)}var o=n.concat(H(arguments)),i=f();return o.push(i.makeNodeResolver()),p(r).fapply(o).fail(i.reject),i.promise}},h.prototype.nbind=function(){var t=H(arguments,0);return t.unshift(this),p.nbind.apply(void 0,t)},p.nmapply=p.npost=function(t,e,n){return p(t).npost(e,n)},h.prototype.nmapply=h.prototype.npost=function(t,e){var n=H(e||[]),r=f();return n.push(r.makeNodeResolver()),this.dispatch("post",[t,n]).fail(r.reject),r.promise},p.nsend=p.nmcall=p.ninvoke=function(t,e){var n=H(arguments,2),r=f();return n.push(r.makeNodeResolver()),p(t).dispatch("post",[e,n]).fail(r.reject),r.promise},h.prototype.nsend=h.prototype.nmcall=h.prototype.ninvoke=function(t){var e=H(arguments,1),n=f();return e.push(n.makeNodeResolver()),this.dispatch("post",[t,e]).fail(n.reject),n.promise},p.nodeify=F,h.prototype.nodeify=function(t){return t?void this.then(function(e){W(function(){t(null,e)})},function(e){W(function(){t(e)})}):this};var pe=a();return p});var lazyJsName="function"==typeof define?"lazy":"lazy.js";define("backbone.collection.lazy",["backbone",lazyJsName],function(t,e){function n(t){r.prototype[t]=function(){var n=e(this.models),r=Array.prototype.slice.call(arguments);return n[t].apply(n,r)}}var r=t.Collection.extend({}),o=["forEach","each","map","collect","reduce","foldl","inject","reduceRight","foldr","find","detect","filter","select","reject","every","all","some","any","include","contains","invoke","max","min","toArray","size","first","head","take","initial","rest","tail","drop","last","without","difference","indexOf","shuffle","lastIndexOf","isEmpty","chain","sample"];return e(o).each(n),r}),define("subject",["lodash"],function(t){var e={initialize:function(){}},n=function(){};return n.prototype=e,n.proto=function(e,n){return t.isObject(e)?t.assign(this.prototype,e):this.prototype[e]=n,this},n.extend=function(e,n,r){var o,i;t.isFunction(e)?(o=t.assign({},n,{initialize:e}),i=r):t.isObject(e)&&(o=e||{},i=r);var u,s=this;return u=function(){var t=Object.create(u.prototype);return t.initialize.apply(t,arguments),t},t.assign(u,s,i),u.prototype=Object.create(s.prototype),u.prototype.constructor=u,u.proto(o),u.__super__=s.prototype,u},n.extend.bind(n)}),define("iterator/base",["subject","lodash"],function(t,e){var n=t(function(t,e){this.data=t,e=e||{},this.currentIndex=e.startAt||-1,this.options=e,this.evaluate=e.evaluate||e.evaluator||this.evaluate});n.proto({move:function(t){return this.index(this.currentIndex+t),this},evaluate:function(t){return t},evaluator:function(t){return this.evaluate=t,this},start:function(){return this.currentIndex=-1,this},end:function(){return this.currentIndex=this.length(),this},index:function(t){if(t>this.length()-1||0>t)throw new Error("No such index "+t);return this.currentIndex=t,this},countBefore:function(){return this.currentIndex+1},countAfter:function(){return this.length()-(this.currentIndex+1)},range:function(t,e){for(var n=[];e>=t;)n.push(this.at(t)),t++;return n},hasNext:function(){return this.currentIndex<this.length()-1},next:function(){return this.move(1),this.current()},nextN:function(t){for(var e=[],n=this.currentIndex+t-1;this.hasNext()&&this.currentIndex<=n;)e.push(this.next());return e},hasPrevious:function(){return this.currentIndex>0},previous:function(){return this.move(-1),this.current()},previousN:function(t){for(var e=[],n=this.currentIndex-t+1;this.hasPrevious()&&this.currentIndex>=n;)e.push(this.previous());return e},current:function(){return this.at(this.currentIndex)},value:function(){return this.data}}),n.proto({hasPrev:n.prototype.hasPrevious,prev:n.prototype.previous,prevN:n.prototype.previousN});var r=["map","filter","compact","difference"];return e.each(r,function(t){n.proto(t,function(){var n=e(this.data);n=n[t].apply(n,arguments);var r=this.constructor(n.value());return r})}),n}),define("iterator/array",["require","exports","module","./base","lodash"],function(t){var e=t("./base"),n=t("lodash"),r=e.extend({at:function(t){return this.evaluate(this.data[t],t)},length:function(){return this.data.length}}),o=["push","reverse","shift","sort","splice","unshift"];return n.each(o,function(t){r.proto(t,function(){return this.data[t].apply(this.data,arguments),this})}),n.each(["concat","slice"],function(t){r.proto(t,function(){var e=this.data[t].apply(this.data,arguments);return this.constructor(e)})}),r}),define("iterator/object",["require","exports","module","./base","lodash"],function(t){var e=t("./base"),n=t("lodash"),r=e.extend({initialize:function(t,r){r=r||{},e.prototype.initialize.apply(this,arguments),this.order=r.order||n.keys(t)},keyAt:function(t){return this.order[t]},at:function(t){var e=this.keyAt(t),n=this.data[e];return this.evaluate(n,e)},length:function(){return this.order.length},nextKey:function(){return this.keyAt(this.currentIndex+1)},currentKey:function(){return this.keyAt(this.currentIndex)},previousKey:function(){return this.keyAt(this.currentIndex-1)},map:function(t){var e={};return n.each(this.order,function(n,r){e[n]=t(this.data[n],n,r)}.bind(this)),this.constructor(e)}});return r.proto("constructor",r),r}),define("iterator/number",["require","exports","module","./base"],function(t){var e=t("./base"),n=e.extend({at:function(t){return this.evaluate(t,t)},length:function(){return this.data}});return n}),define("itr",["require","exports","module","./iterator/array","./iterator/object","./iterator/number","lodash"],function(t){var e=t("./iterator/array"),n=t("./iterator/object"),r=t("./iterator/number"),o=t("lodash"),i=function(t){var i;return o.isArray(t)?i=e:o.isObject(t)?i=n:o.isNumber(t)&&(i=r),i.apply(this,arguments)};return i.object=n,i.array=e,i.number=r,i}),define("__deep__/keys",["require","exports","module"],function(){return function(t){return t.replace(/\[(["']?)([^\1]+?)\1?\]/g,".$2").replace(/^\./,"").split(".")}}),define("__deep__/walker",["require","exports","module","lodash","itr","./keys"],function(t,e,n){var r=t("lodash"),o=t("itr"),i=t("./keys"),u=o.object.extend({nextStep:function(){var t=new RegExp("^"+this.currentKey()+"\\.");return this.nextKey().replace(t,"")},currentStep:function(){var t=new RegExp("^"+this.previousKey()+"\\.");return this.currentKey().replace(t,"")},previousStep:function(){var t=this.previousKey()||"";return r.last(t.split("."))},remainingSteps:function(){var t=new RegExp("^"+this.currentKey()+"\\.");return this.destination().replace(t,"")},destination:function(){return r.last(this.order)}});n.exports=function(t,e){e=r.isArray(e)?e:i(e);var n={"":t},o=[""];return r.every(e,function(i,u){var s=r.first(e,u+1).join(".");return o.push(s),t=t[i],n[s]=t,!r.isUndefined(t)}),u(n,{order:o})}}),define("__deep__/getset",["require","exports","module","lodash","./keys"],function(t,e){var n=t("lodash"),r=t("./keys");e.get=function(t,e){return e=n.isArray(e)?e:r(e),n.reduce(e,function(t,e){return t[e]},t)},e.set=function(t,o,i){o=n.isArray(o)?o:r(o);var u=o.pop();t=e.get(t,o),t[u]=i}}),define("deep",["require","exports","module","lodash","./__deep__/keys","./__deep__/walker","./__deep__/getset"],function(t){var e=t("lodash"),n={};return n.parseKeys=t("./__deep__/keys"),n.walker=t("./__deep__/walker"),e.extend(n,t("./__deep__/getset")),n}),define("containers",["lodash"],function(){function t(t,e){return _.all(e,function(e){return _.contains(t,e)})}function e(t,e){return _.any(e,function(e){return _.contains(t,e)})}function n(t,e){return t[0]<e&&e<t[1]}function r(t,e){return t[0]<=e&&e<=t[1]}function o(t,e,o){var i=o?n:r;return i=_.partial(i,t),_.isArray(e)?_.every(e,i):i(e)}return{containsAll:t,containsAny:e,exclusiveWithin:n,inclusiveWithin:r,within:o}}),define("__object-query__/operators/match",["require","exports","module","lodash"],function(t,e){var n=t("lodash");e.$matchSingle=function(t,e){return n.isRegExp(t)?t.test(e):t===e},e.$match=function(t,r){return n.isArray(r)?n.any(r,function(n){return e.$matchSingle(t,n)}):e.$matchSingle(t,r)}}),define("__object-query__/operators/range",["require","exports","module"],function(t,e){e.$lt=function(t,e){return t>e},e.$lte=function(t,e){return t>=e},e.$gt=function(t,e){return e>t},e.$gte=function(t,e){return e>=t}}),define("__object-query__/operators/set",["require","exports","module","lodash","containers"],function(t,e){var n=t("lodash"),r=t("containers");e.$in=function(t,e){return n.isArray(e)?r.containsAny(t,e):n.contains(t,e)},e.$nin=function(t,e){return n.isArray(e)?!r.containsAny(t,e):!n.contains(t,e)},e.$all=function(t,e){return r.containsAll(e,t)}}),define("__object-query__/operators/boolean",["require","exports","module"],function(t,e){e.$e=function(){},e.$ne=function(){},e.$not=function(){},e.$or=function(){},e.$and=function(){},e.$exists=function(){}}),define("__object-query__/operators/index",["require","exports","module","lodash","deep","containers","./match","./range","./set","./boolean"],function(t,e){var n=t("lodash");t("deep"),t("containers"),n.extend(e,t("./match"),t("./range"),t("./set"),t("./boolean")),e.evaluateValue=function(t,r){return n.isObject(t)&&!n.isRegExp(t)?n.every(t,function(t,n){var o=e[n];if(o)return o(t,r);throw new Error("The operator "+n+" is not supported by object-query.")}):e.$match(t,r)}}),define("__object-query__/match",["require","exports","module","lodash","deep","./operators/index"],function(t,e,n){var r=t("lodash"),o=t("deep"),i=t("./operators/index"),u=/[0-9]+/,s=function(t,e,n){return r.any(e,function(e){return a(t,e,n)})},a=n.exports=function(t,e,n){for(var a,c=o.walker(e,n);c.hasNext();){var p=c.next();if(!c.hasNext()){a=i.evaluateValue(t,p);break}if(r.isArray(p)&&!u.test(c.nextStep())){a=s(t,p,c.remainingSteps());break}}return a}}),define("__object-query__/find",["require","exports","module","lodash","deep","./operators/index"],function(t,e,n){var r=t("lodash"),o=t("deep"),i=t("./operators/index"),u=/[0-9]+/,s=function(t,e,n){return r.any(e,function(e){return a(t,e,n)})},a=n.exports=function(t,e,n){for(var a,c=o.walker(e,n);c.hasNext();){var p=c.next();if(!c.hasNext()){a=i.evaluateValue(t,p);break}if(r.isArray(p)&&!u.test(c.nextStep())){a=s(t,p,c.remainingSteps());break}}return a}}),define("object-query",["require","exports","module","lodash","./__object-query__/match","./__object-query__/find"],function(t){function e(t,e){return n.every(t,function(t,n){return r(t,e,n)})}var n=t("lodash"),r=t("./__object-query__/match");t("./__object-query__/find");var o=function(t){return t=t||{},n.partial(e,t)},i=["every","all","some","any","filter","find","reject"];return n.each(i,function(t){o[t]=function(e,r){return n[t](e,o(r))}}),o}),define("backbone.collection.queryable",["require","exports","module","backbone.collection.lazy","object-query","lodash"],function(t){var e=t("backbone.collection.lazy"),n=t("object-query"),r=t("lodash"),o=e.extend({find:function(t,e){var r=this,o=n(t),i=this.filter(function(t){return o(t.attributes)});return e?i.map(function(t){return r.project(t.attributes,e)}):i},findOne:function(t){var e=this.find(t).take(1).first();return e},project:function(t,e){if(r.isString(e))return t[e];if(r.isArray(e)){var n={};return r.each(e,function(e){n[e]=t[e]}),n}if(r.isObject(e)){var n={};return r.each(e,r.bind(function(e,r){n[r]=e===!0?t[r]:this.project(t[r],e)},this)),n}}});return o}),define("backbone.model.tree",["require","exports","module","backbone","backbone.collection.queryable","lodash"],function(t,e,n){var r=t("backbone"),o=t("backbone.collection.queryable"),i=t("lodash"),u=o.extend({}),s=n.exports=r.Model.extend({Branches:u,extend:function(){var t=r.Model.extend.apply(this,arguments),e=u.extend({model:t});return t.prototype.Branches=e,t},initialize:function(){this.branches=new this.Branches},addBranch:function(){var t=this.branches.add.apply(this.branches,arguments);return t.ancestor=this,t},selectBranches:function(t){return this.branches.find(t)},selectSiblings:function(t){return this.isRoot()?[]:this.root.selectBranches(t)},selectDescendants:function(t){if(this.isLeaf())return!1;var e=this.selectBranches(t),n=this.branches.map(function(e){return e.selectDescendants(t)}).compact();return e.concat(n)},isLeaf:function(){return 0===this.branches.length},isRoot:function(){return i.isObject(this.ancestor)}});s.prototype.siblings=s.prototype.selectSiblings,s.prototype.descendants=s.prototype.selectDescendants,s.Branches=u,s.extend=s.prototype.extend,u.prototype.model=s}),define("__archetypo/registry/index",["require","exports","module","lodash","lowercase-backbone","backbone.model.tree"],function(t,e,n){var r=(t("lodash"),t("lowercase-backbone")),o=t("backbone.model.tree"),i=n.exports=r.model.extend(o.prototype);i.proto({initialize:function(){r.model.prototype.initialize.apply(this,arguments),o.prototype.initialize.apply(this,arguments)},descendantItems:function(t){var e=this.selectDescendants(t);return e.map(function(t){return t.get("item")})}})}),define("__archetypo/view/initialize/render",["require","exports","module","lodash"],function(t,e,n){var r=t("lodash");n.exports=function(t){this.$el=r.isObject(t.$el)?t.$el:t.el;var e=t.html||this.html;e&&this.$el.html(e)}}),define("__archetypo/view/initialize/register",["require","exports","module","lodash","../../registry/index"],function(t,e,n){var r=(t("lodash"),t("../../registry/index"));n.exports=function(t){var e=this.$el.data();e.id=this.cid,e.item=this,this.ancestorView=t.ancestorView||!1,this.registry=this.ancestorView?this.ancestorView.registry.addBranch(e):r(e)}}),define("__archetypo/view/initialize/subviews",["require","exports","module","lodash"],function(t,e,n){var r=t("lodash");n.exports=function(){var t=this.$el.find("[data-arch-view]");r.each(t,r.bind(function(t){var e=$(t),n=e.data(),o=this.app.constructor("view",n.archView),i=r.extend(n,{el:e,app:this.app,registry:this.registry});o(i)},this))}}),define("__archetypo/view/index",["require","exports","module","lodash","dockable-view","../registry/index","./initialize/render","./initialize/register","./initialize/subviews"],function(t,e,n){var r=(t("lodash"),t("dockable-view")),o=(t("../registry/index"),t("./initialize/render")),i=t("./initialize/register"),u=t("./initialize/subviews"),s=n.exports=r.extend(function(t){r.prototype.initialize.apply(this,arguments),this.app=t.app,o.apply(this,arguments),i.apply(this,arguments),u.apply(this,arguments)});s.proto({views:function(t){return this.registry.descendantItems(t)}})}),define("__archetypo/router/format",["require","exports","module","lodash"],function(t,e,n){function r(t){return t.replace(/(\(|\(.*:|:|\)|\*)/,"")}var o=(t("lodash"),/\((.*?)\)/g),i=/(\(\?)?:\w+/g,u=/\*\w+/g;n.exports=function(t,e){return t=t.replace(i,function(t){var n=r(t);return e[n]?e[n]:t}),t=t.replace(u,function(t){var n=r(t);return e[n]?e[n]:""}),t.replace(o,"")}}),define("__archetypo/router/index",["require","exports","module","lodash","lowercase-backbone","./format"],function(t,e,n){{var r=t("lodash"),o=t("lowercase-backbone").router,i=t("./format");n.exports=o.extend({initialize:function(){this.routeFormats={}},route:function(t,e){return r.isString(e)&&(this.routeFormats[e]=t),o.prototype.route.apply(this,arguments)},navigate:function(t,e,n){var r=this.routeFormats[t];if(r){var u=i(r,e);return o.prototype.navigate.call(this,u,n)}return o.prototype.navigate.apply(this,arguments)}})}}),define("archetypo",["require","exports","module","subject","lowercase-backbone","q","lodash","./__archetypo/view/index","./__archetypo/router/index"],function(t,e,n){var r=(t("subject"),t("lowercase-backbone")),o=(t("q"),t("lodash")),i=t("./__archetypo/view/index"),u=t("./__archetypo/router/index"),s=n.exports=u.extend(function(){u.prototype.initialize.apply(this,arguments),this.constructors={view:{"default":i},model:{},collection:{}},this.instances={view:{},model:{},collection:{}}});s.proto({constructor:function(t,e,n){var r=this.constructors[t],i=r[e]||r["default"];return 3===arguments.length?(n.app=this,r[e]=i.extend(n),r[e]):2===arguments.length?(o.isObject(e)&&o.each(e,o.bind(this,function(e,n){this.constructor(t,n,e)})),i):void 0},instance:function(t,e,n){var r=this.instances[t]=this.instances[t]||{};return 3===arguments.length&&(r[e]=n),r[e]},build:function(t){var e=this.constructor("view","default");return e({$el:t,app:this}),this},start:function(t){return r.history.start(t),this}}),s.proto({view:o.partial(s.prototype.instance,"view"),model:o.partial(s.prototype.instance,"model"),collection:o.partial(s.prototype.instance,"collection")})});