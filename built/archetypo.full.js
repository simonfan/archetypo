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
		initialize: function initialize() {
			this.initializeArchRouter.apply(this, arguments);
		},


		initializeArchRouter: function initializeArchRouter() {
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

define('archetypo',['require','exports','module','lowercase-backbone','lodash','jquery','archetypo-view','./__archetypo/router/index'],function (require, exports, module) {
	

	var backbone = require('lowercase-backbone'),
		_ = require('lodash'),
		$ = require('jquery'),

		archetypoView = require('archetypo-view');

	// sub modules.
	var archRouter = require('./__archetypo/router/index');

	/**
	 * The main class.
	 *
	 * @class archetypo
	 * @builder
	 */
	var archetypo = module.exports = archetypoView
		.extend(backbone.router.prototype)
		.extend(archRouter.prototype);

	// proto
	archetypo.proto({

		/**
		 * The initialization logic is different from that of a
		 * simple archetypoView.
		 *
		 * @method initialize
		 * @param options {Object [for both router and view]}
		 */
		initialize: function initializeArchetypo(options) {
			// initialize the arch router.
			this.initializeArchRouter.apply(this, arguments);

			this.initializeArchetypo.apply(this, arguments);
		},

		initializeArchetypo: function initializeArchetypo(options) {

			/**
			 * Hash where builders are stored.
			 *
			 * @property builders
			 * @type Object
			 */
			this.builders = {
				'default': archetypoView
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
		builder: function defineOrGetBuilder(name, builder) {

			if (arguments.length === 2) {
				// define a builder

				this.builder[name] = builder;

				// return
				return this.builders[name];

			} else if (arguments.length === 1) {

				// retrieve a builder.

				builder = this.builders[name];

				if (!builder) {
					throw new Error('No builder "' + name + '" defined in app.');
				}

				return builder;
			}
		},

		/**
		 * Starts the app up.
		 *
		 * @method
		 * @param options
		 */
		start: function start(options) {
			options = options || {};

			// set app option
			options.app = this;

			options.el = options.el || $('[data-archetypo],[archetypo]');

			// initialize basic backbone view
			backbone.view.prototype.initialize.apply(this, arguments);

			// initialize archetypoView
			this.initializeArchetypoView(options);

			backbone.history.start(options);

			return this;
		}
	});
});

