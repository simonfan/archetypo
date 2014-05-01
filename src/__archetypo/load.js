define(function (require, exports, module) {
	'use strict';

	var _ = require('lodash'),
		q = require('q');


	function validatePaths(modules) {

		_.each(modules, function (path, name) {

			if (!path) {
				throw new Error('Module \'' + name + '\' does not have a valid path.');
			}
		});

	}

	/**
	 * Loads a series of modules
	 *
	 * @method load
	 * @private
	 * @param modules {Object} { name: path }
	 * @returns {Object} { name: module }
	 */
	module.exports = function load(modules) {

		validatePaths(modules);

		var defer = q.defer();

		var names = _.keys(modules),
			paths = _.values(modules);

		// require the paths
		require(paths, function () {

			// resolve the defer with an object
			// keyed by names and valued by the loaded modules.
			defer.resolve(_.zipObject(names, arguments));
		});

		return defer.promise;
	};
});
