//     archetypo
//     (c) simonfan
//     archetypo is licensed under the MIT terms.

define("__archetypo/registry/index",["require","exports","module","lodash","lowercase-backbone","backbone.model.tree"],function(e,t,i){var r=(e("lodash"),e("lowercase-backbone")),n=e("backbone.model.tree"),o=i.exports=r.model.extend(n.prototype);o.proto({initialize:function(){r.model.prototype.initialize.apply(this,arguments),n.prototype.initialize.apply(this,arguments)},descendantItems:function(e){var t=this.selectDescendants(e);return t.map(function(e){return e.get("item")})}})}),define("__archetypo/view/initialize/render",["require","exports","module","lodash"],function(e,t,i){var r=e("lodash");i.exports=function(e){this.$el=r.isObject(e.$el)?e.$el:e.el;var t=e.html||this.html;t&&this.$el.html(t)}}),define("__archetypo/view/initialize/register",["require","exports","module","lodash","../../registry/index"],function(e,t,i){var r=e("lodash"),n=e("../../registry/index");i.exports=function(e){e=e||{};var t=this.$el.data()||{};t.id=t.id||t.archId||this.cid,t["class"]=r.isString(t["class"])?t["class"].split(/\s+/):[],t.item=this,this.ancestorView=e.ancestorView||!1,this.registry=this.ancestorView?this.ancestorView.registry.addBranch(t):n(t)}}),define("__archetypo/view/initialize/subviews",["require","exports","module","lodash","jquery"],function(e,t,i){var r=e("lodash"),n=e("jquery");i.exports=function(){var e=this.app(),t=this.$el.find("[data-arch-view]");r.each(t,r.bind(function(t){var i=n(t),o=i.data();if(!o.archInstantiated){var a=o.archView||o.view,s=e.constructor("view",a),c=r.extend(o,{el:i,ancestorView:this});i.data({archInstantiated:!0}),s(c)}},this))}}),define("__archetypo/view/index",["require","exports","module","lodash","dockable-view","../registry/index","./initialize/render","./initialize/register","./initialize/subviews"],function(e,t,i){var r=e("lodash"),n=e("dockable-view"),o=(e("../registry/index"),e("./initialize/render")),a=e("./initialize/register"),s=e("./initialize/subviews"),c=i.exports=n.extend(function(){o.apply(this,arguments),n.prototype.initialize.apply(this,arguments),a.apply(this,arguments),s.apply(this,arguments)});c.proto({views:function(e){return r.isString(e)?this.registry.descendantItems({id:e}).take(1).toArray()[0]:this.registry.descendantItems(e)},app:function(){return this.isApp?this:this.ancestorView.app()}})}),define("__archetypo/router/format",["require","exports","module","lodash"],function(e,t,i){function r(e){return e.replace(/(\(|\(.*:|:|\)|\*)/,"")}var n=(e("lodash"),/\((.*?)\)/g),o=/(\(\?)?:\w+/g,a=/\*\w+/g;i.exports=function(e,t){return e=e.replace(o,function(e){var i=r(e);return t[i]?t[i]:e}),e=e.replace(a,function(e){var i=r(e);return t[i]?t[i]:""}),e.replace(n,"")}}),define("__archetypo/router/index",["require","exports","module","lodash","lowercase-backbone","./format"],function(e,t,i){{var r=e("lodash"),n=e("lowercase-backbone").router,o=e("./format");i.exports=n.extend({initialize:function(){this.routeFormats={}},route:function(e,t){return r.isString(t)&&(this.routeFormats[t]=e),n.prototype.route.apply(this,arguments)},navigate:function(e,t,i){var r=this.routeFormats[e];if(r){var a=o(r,t);return n.prototype.navigate.call(this,a,i)}return n.prototype.navigate.apply(this,arguments)}})}}),define("archetypo",["require","exports","module","subject","lowercase-backbone","dockable-view","q","lodash","./__archetypo/view/index","./__archetypo/router/index","./__archetypo/view/initialize/register","./__archetypo/view/initialize/subviews"],function(e,t,i){var r=(e("subject"),e("lowercase-backbone")),n=e("dockable-view"),o=(e("q"),e("lodash")),a=e("./__archetypo/view/index"),s=e("./__archetypo/router/index"),c=e("./__archetypo/view/initialize/register"),l=e("./__archetypo/view/initialize/subviews"),p=i.exports=a.extend(r.router.prototype).extend(s.prototype);p.proto({initialize:function(){s.prototype.initialize.apply(this,arguments),this.isApp=!0,this.constructors={view:{"default":a},model:{},collection:{}},this.instances={view:{},model:{},collection:{}}},constructor:function(e,t,i){var r=this.constructors[e];if(3===arguments.length)return r[t]=r["default"].extend(i),r[t];if(2===arguments.length){var n=r[t];if(!n)throw new Error('No constructor "'+t+'" defined in app.');return n}},instance:function(e,t,i){var r=this.instances[e]=this.instances[e]||{};return 3===arguments.length&&(r[t]=i),r[t]},build:function(){if(n.prototype.initialize.apply(this,arguments),!this.$el)throw new Error("No DOM element in archetypo.");c.apply(this,arguments),l.apply(this)},start:function(e){return this.build(e),r.history.start(e),this}}),p.proto({view:o.partial(p.prototype.instance,"view"),model:o.partial(p.prototype.instance,"model"),collection:o.partial(p.prototype.instance,"collection")})});