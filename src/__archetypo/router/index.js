/**
 * @module archetypo
 * @submodule view
 */

define(function (require, exports, module) {
	'use strict';

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
