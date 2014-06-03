/**
 * Defines logic for loading and summoning.
 */

define(function (require, exports, module) {
	'use strict';

	var _     = require('lodash'),
		q     = require('q'),
		deep  = require('deep'),
		scope = require('scope');

	/**
	 * A more intelligent 'require'.
	 * Requires the module and returns the property required.
	 *
	 * @param  {[type]} modname  [description]
	 * @param  {[type]} property [description]
	 * @return {[type]}          [description]
	 */
	exports.load = function archLoad(modname, property) {


		var deferred = q.defer();

		if (_.isString(modname)) {
			// single module
			if (!property) {
				// simple require
				require([modname], deferred.resolve, deferred.reject);
			} else {
				// require property
				require([modname], function (mod) {
					// use deep getter.
					// and solve using the response.
					deferred.resolve(deep.get(mod, property));
				}, deferred.reject);
			}

		} else if (_.isArray(modname)) {
			// multiple modules
			require(modname, function () {

				// the modules
				var mods = _.toArray(arguments);

				if (!property) {
					// simply return array of modules.
					deferred.resolve(mods);

				} else {
					// "deep-pluck" modules.
					deferred.resolve(_.map(mods, function (mod) {
						return deep.get(mod, property);
					}));
				}
			}, deferred.reject);
		}

		return deferred.promise;
	};

	// shorteners
	exports.l = exports.load;

});
