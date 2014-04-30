define(function (require, exports, module) {
	'use strict';

	var _ = require('lodash'),
		q = require('q');


	/**
	 * The real loader.
	 *
	 * @method load
	 * @private
	 * @param names {Array}
	 *      names of the modules
	 * @param paths {Array}
	 *      the path to the modules
	 * @returns { name: module }
	 */
	function load(names, paths) {
		var defer = q.defer();

		// require the paths
		require(paths, function () {

			// resolve the defer with an object
			// keyed by names and valued by the loaded modules.
			defer.resolve(_.zipObject(names, arguments));
		});

		return defer.promise;
	}



	/**
	 *
	 *
	 * @method load
	 * @param $el {jq Object}
	 * @param loadableProperties {Array}
	 */
	exports.modules = function modules($el, loadableProperties) {

		var data = $el.data();

		// filter valid names and paths
		var names = [],
			paths = [];

		_.each(loadableProperties, function (prop) {
			var location = data[prop];

			if (_.isString(location)) {
				names.push(prop);
				paths.push(location);
			}
		});

		return load(names, paths);
	};





	/**
	 * Converts a string into an array.
	 *
	 * @method tokenize
	 * @param str
	 */
	var whitespaces = /\s+/;
	function tokenize(str) {
		return _.isString(str) ? str.split(whitespaces) : [];
	}

	/**
	 * Loads the builders defined in $el.
	 *
	 * @method load.builders
	 *
	 */
	exports.builders = function loadBuilders($el) {
		// retrieve the builder definition strings
		// they are of the format: [builderName:]builderModulePath
		var builderStrings = tokenize($el.data('builder'));


		// retrieve names and paths
		var names = [],
			paths = [];

		_.each(builderStrings, function (str) {
			var split = str.split(':');

			if (split.length === 2) {
				names.push(split[0]);
				paths.push(split[1]);
			} else {
				names.push(str);
				paths.push(str);
			}
		});

		return load(names, paths);
	};
});
