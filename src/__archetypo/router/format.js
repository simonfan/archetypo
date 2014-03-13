/**
 * @module archetypo
 * @submodule view
 */

define(function (require, exports, module) {
	'use strict';

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
