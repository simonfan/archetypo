/**
 * @module archetypo
 * @submodule view
 */

define(function (require, exports, module) {
	'use strict';

	var _ = require('lodash');

	var splitter = /\s+/;

	function split(str) {
		var data = str.split(splitter);

		// compact
		data = _.compact(data);

		return data.length === 1 ? data[0] : data;
	}

	/**
	 * Basically $el.data()
	 * Splits the data strings into tokens.
	 *
	 * @method elData
	 */
	exports.elData = function elData() {

		var $el = this.$el;

		if (arguments.length === 0) {
			// full getter
			return _.mapValues($el.data(), function (value, key) {
				return _.isString(value) ? split(value) : value;
			});

		} else if (arguments.length === 1 && _.isString(arguments[0])) {

			var value = $el.data(arguments[0]);

			// simple getter
			return _.isString(value) ? split(value) : value;
		} else {

			$el.data.apply($el, arguments);

			return this;
		}
	};
});
