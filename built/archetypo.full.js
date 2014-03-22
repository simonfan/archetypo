/**
 * @module archetypo
 * @submodule registry
 */

define('__archetypo/registry/index',['require','exports','module','lodash','lowercase-backbone','backbone.model.tree'],function (require, exports, module) {
	

	var _ = require('lodash'),
		backbone = require('lowercase-backbone'),
		Tree = require('backbone.model.tree');

	var registry = module.exports = backbone.model.extend(Tree.prototype);

	/**
	 * The registry is just a Bakbone.Model.Tree Object
	 * with some special methods to get the 'item' attributes
	 * from the branch models.
	 *
	 * @class registry
	 * @constructor
	 */
	registry.proto({
		initialize: function initializeRegistry(attributes, options) {
			backbone.model.prototype.initialize.apply(this, arguments);
			Tree.prototype.initialize.apply(this, arguments);
		},

		/**
		 * Selects the descending branch models and map
		 * the results to return directly the 'item' attribute.
		 *
		 * @method descendantItems
		 * @param criteria {Object}
		 */
		descendantItems: function descendantItems(criteria) {
			var descendants = this.selectDescendants(criteria);

			return descendants.map(function (desc) {
				return desc.get('item');
			});
		},
	});
});

/**
 * @module archetypo
 * @submodule view
 */

define('__archetypo/view/initialize/render',['require','exports','module','lodash','q'],function (require, exports, module) {
	

	var _ = require('lodash'),
		q = require('q');

	/**
	 * Does all the dirty stuff.
	 *
	 * @method _render
	 * @private
	 *
	 */
	function _render(options) {

		// create a deferred object
		var defer = q.defer();

		// [1] Templating and replacement
		// If there is an 'html' property
		// build up an element with it place it within $el.

		// [1.1] retrieve AND normalize the element object
		this.$el = _.isObject(options.$el) ? options.$el : options.el;

		var data = this.$el.data();

		// [2] retrieve html
		if (data.html) {
			// async resolution

			// if a html data property is set on
			// the html element,
			// assume it is a module name.
			require(['text!' + data.html], _.bind(function (html) {

				this.$el.html(html);

			}, this));

		} else {

			// immediate resolution
			var html = options.html || this.html;

			if (html) {
				this.$el.html(html);

				defer.resolve();
			}
		}

		// return promise no matter what.
		return defer.promise;
	};



	/**
	 * Verifies for cached render call.
	 *
	 * @method render
	 * @param options
	 */
	module.exports = function render(options) {

		if (!this.renderPromise) {
			// render was not called yet,
			// so call it, set the promise and return

			this.renderPromise = _render.apply(this, arguments);
		}

		// always return the promise.
		return this.renderPromise;
	}

});

/**
 * @module archetypo
 * @submodule view
 */

define('__archetypo/view/initialize/register',['require','exports','module','lodash','../../registry/index'],function (require, exports, module) {
	

	var _ = require('lodash');

	var registry = require('../../registry/index');

	module.exports = function register(options) {

		options = options || {};

		// [1] retrieve data that will identify this view
		var data = this.$el.data() || {};
		// id
		data.id = data.id || data.archId || this.cid;
		// classes
		data['class'] = _.isString(data['class']) ? data['class'].split(/\s+/) : [];
		// item
		data.item = this;

		// [2] ancestorView
		this.ancestorView = options.ancestorView || false;

		// [2] get registry object
		if (this.ancestorView) {
			this.registry = this.ancestorView.registry.addBranch(data);
		} else {
			this.registry = registry(data);
		}
	};

});

/**
 * @module archetypo
 * @submodule view
 */

define('__archetypo/view/initialize/subviews',['require','exports','module','lodash','jquery'],function (require, exports, module) {
	

	var _ = require('lodash'),
		$ = require('jquery');

	module.exports = function render(options) {

		var app = options.app;

		// [0] Sub-views
		// Look for child nodes that have an 'arch-view'
		// attribute defined and instantiate the corresponding view.

		// [1]
		// find all elements within this element
		// that have an 'arch-view' attribute defined.
		var $subs = this.$el.find('[data-arch-view], [data-view]');

		// [2]
		// Instantiate the sub-views
		_.each($subs, _.bind(function instantiateSubview(el) {

				// wrap el in jqObject
			var $el = $(el),
				// retrieve data
				data = $el.data();


			// retrieve the view names
			var vNames = data.archView || data.view;
			// split and remove empty values
			vNames = _.isString(vNames) ? vNames.split(/\s+/) : [];
			vNames = _.compact(vNames);

			// loop through each of the view names
			_.each(vNames, _.bind(function (vName, index) {

				if (!data['instantiated_' + vName]) {
					var view = app.builder('view', vName);

					// set el and app on the data object.
					var options = _.extend(data, {
						el: $el,
						ancestorView: this,
						app: app,
					});

					// instantiate the view.
					view(options);

					// set arch-instantiated to true
					$el.data('instantiated_' + vName, true);
				}

			}, this));
		}, this));

	};

});

/**
 * @module archetypo
 * @submodule view
 */

define('__archetypo/view/index',['require','exports','module','lodash','dockable-view','../registry/index','./initialize/render','./initialize/register','./initialize/subviews'],function (require, exports, module) {
	

	var _ = require('lodash'),
		dockableView = require('dockable-view');

	var registry = require('../registry/index');

	// view initialization steps
	var render = require('./initialize/render'),
		register = require('./initialize/register'),
		subviews = require('./initialize/subviews');

	/**
	 * The view builder. It is basically a Backbone.View
	 *
	 * @class view
	 * @constructor
	 * @param options {Object}
	 */
	var archView = module.exports = dockableView.extend(function archView(options) {

		arguments[0] = options || {};

		var args = Array.prototype.slice.call(arguments);


		// [1] Templating and replacement
		// If there is an 'html' property
		// build up an element with it place it within $el.
		// render is ASYNC
		this.render(options)
			.then(_.bind(function () {

				// [2] Invoke dockable-view.
				//     MUST come afte render.
				dockableView.prototype.initialize.apply(this, args);

				// [3] Start subviews
				subviews.apply(this, args);

			}, this));


		// [4] Register view (synchornously)
		register.apply(this, args);
	});

	archView.proto({

		/**
		 * Renders the view and returns promise.
		 *
		 * @method render
		 *
		 */
		render: render,


		/**
		 * Selects the view objcets that descend from this view.
		 *
		 * @methos selectViews
		 * @param selector {Object|[String]}
		 */
		views: function selectViews(selector) {
			if (_.isString(selector)) {
				// single, by id
				return this.registry.descendantItems({ id: selector }).take(1).toArray()[0];
			} else {
				// multiple
				return this.registry.descendantItems(selector);
			}
		},
	});
});

/**
 * @module archetypo
 * @submodule view
 */

define('__archetypo/router/format',['require','exports','module','lodash'],function (require, exports, module) {
	

	var _ = require('lodash');


	var optionalParam = /\((.*?)\)/g,
		namedParam    = /(\(\?)?:\w+/g,
		splatParam    = /\*\w+/g,
		escapeRegExp  = /[\-{}\[\]+?.,\\\^$|#\s]/g;


	/**
	 * Removes all weird tokens from the raw string and returns the key
	 * to be used when looking for the correspondant value.
	 *
	 * @method getKey
	 * @private
	 * @param str {String}
	 */
	function getKey(str) {
		return str.replace(/(\(|\(.*:|:|\)|\*)/, '');
	}

	/**
	 * Formats the data into the given route string.
	 *
	 * @method format
	 * @private
	 * @param route {String}
	 * @param data {Object}
	 */
	module.exports = function format(route, data) {

		// place named data
		route = route.replace(namedParam, function (match) {

			var key = getKey(match);

			return data[key] ? data[key] : match;
		});

		// place splat data
		route = route.replace(splatParam, function (match) {
			var key = getKey(match);

			return data[key] ? data[key] : '';
		});

		// remove optionals that were not used.
		return route.replace(optionalParam, '');
	};
});

/**
 * @module archetypo
 * @submodule view
 */

define('__archetypo/router/index',['require','exports','module','lodash','lowercase-backbone','./format'],function (require, exports, module) {
	

	var _ = require('lodash'),
		router = require('lowercase-backbone').router;

	var formatRoute = require('./format');


	var optionalParam = /\((.*?)\)/g,
		namedParam    = /(\(\?)?:\w+/g,
		splatParam    = /\*\w+/g,
		escapeRegExp  = /[\-{}\[\]+?.,\\\^$|#\s]/g;

	var archRouter = module.exports = router.extend({

		initialize: function initializeArchRouter() {
			this.routeFormats = {};
		},

		/**
		 * Intercepts calls for the route method, so that
		 * we can save the route strings to a formats hash for navigation use.
		 *
		 * @method route
		 */
		route: function defineRoute(route, name, callback) {

			// save the route to the routeFormats if a name is defined
			if (_.isString(name)) {
				this.routeFormats[name] = route;
			}

			// continue normal execution
			return router.prototype.route.apply(this, arguments);
		},

		/**
		 * Intercepts the original navigate method,
		 * so that the router automatically takes advantage
		 * of format methods.
		 *
		 * @method navigate
		 * @param route|format {String|Object}
		 * @param data|options {Object}
		 * @param [options] {Object}
		 */
		navigate: function navigate(first, second, third) {
			// [1] try to get a format
			var format = this.routeFormats[first];

			if (!format) {
				// simple navigation
				return router.prototype.navigate.apply(this, arguments);
			} else {
				// build up the route
				var route = formatRoute(format, second);

				// navigate
				return router.prototype.navigate.call(this, route, third);
			}

		},
	});
});

//     archetypo
//     (c) simonfan
//     archetypo is licensed under the MIT terms.

/**
 * AMD module.
 *
 * @module archetypo
 */

define('archetypo',['require','exports','module','subject','lowercase-backbone','dockable-view','q','lodash','jquery','./__archetypo/view/index','./__archetypo/router/index','./__archetypo/view/initialize/register','./__archetypo/view/initialize/subviews'],function (require, exports, module) {
	

	var subject = require('subject'),
		backbone = require('lowercase-backbone'),
		dockableView = require('dockable-view'),
		q = require('q'),
		_ = require('lodash'),
		$ = require('jquery');

	// sub modules.
	var archView = require('./__archetypo/view/index'),
		archRouter = require('./__archetypo/router/index');

	// view-initialization
	var register = require('./__archetypo/view/initialize/register'),
		subviews = require('./__archetypo/view/initialize/subviews');

	/**
	 * The main class.
	 *
	 * @class archetypo
	 * @builder
	 */
	var archetypo = module.exports =
		archView
			.extend(backbone.router.prototype)
			.extend(archRouter.prototype);

	// proto
	archetypo.proto({

		/**
		 * The initialization logic is different from that of a
		 * simple archView.
		 *
		 * @method initialize
		 * @param options {Object [for both router and view]}
		 */
		initialize: function initializeArchetypo(options) {
			// initialize the arch router.
			archRouter.prototype.initialize.apply(this, arguments);

			this.isApp = true;

			/**
			 * Hash where builders are stored.
			 *
			 * @property builders
			 * @type Object
			 */
			this.builders = {
				view: {
					'default': archView
				},
				model: {},
				collection: {}
			};

			/**
			 * Hash where instances are stored.
			 *
			 * @property instances
			 * @type Object
			 */
			this.instances = {
				view: {},
				model: {},
				collection: {},
			};
		},

		/**
		 * Either defines or retrieves a builder function.
		 *
		 * @method builder
		 * @param type {String}
		 * @param name {String}
		 * @param [extensions] {Object}
		 */
		builder: function defineBuilder(type, name, extensions) {

			var builders = this.builders[type];

			if (arguments.length === 3) {
				// define a builder

				// save
				builders[name] = builders['default'].extend(extensions);

				// return
				return builders[name];

			} else if (arguments.length === 2) {

				// retrieve a builder.

				var builder = builders[name];

				if (!builder) {
					throw new Error('No builder "' + name + '" defined in app.');
				}

				return builder;
			}
		},

		/**
		 * Defines or retrieves an instance.
		 *
		 * @method instance
		 * @param type {String}
		 * @param name {String}
		 * @param [obj] {Object}
		 */
		instance: function instance(type, name, obj) {

			var instances = this.instances[type] = this.instances[type] || {};

			if (arguments.length === 3) {
				instances[name] = obj;
			}

			return instances[name];
		},

		build: function build(options) {

			arguments[0] = options || {};

			// set APP
			arguments[0].app = this;

			// initialize basic backbone view
			dockableView.prototype.initialize.apply(this, arguments);


			// check if $el is present
			if (!this.$el) {
				throw new Error('No DOM element in archetypo.');
			}


			// initialize registry
			register.apply(this, arguments);

			// start subviews
			subviews.apply(this, arguments);
		},

		start: function start(options) {
			options = options || {};

			options.el = options.el || $('[data-archetypo],[archetypo]');

			this.build(options);

			backbone.history.start(options);

			return this;
		}
	});


	// partials
	archetypo.proto({
		view: _.partial(archetypo.prototype.instance, 'view'),
		model: _.partial(archetypo.prototype.instance, 'model'),
		collection: _.partial(archetypo.prototype.instance, 'collection')
	});
});

