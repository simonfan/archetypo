define(function (require, exports, module) {
	'use strict';

	var _ = require('lodash');

	exports.camelCase = function camelCase(str) {
		return str.replace(/-(.)/g, function (match, capture1) {
			return capture1.toUpperCase();
		});
	};


	/**
	 * Finds the closest ancestor that has the selector.
	 *
	 * @param  {[type]} $el      [description]
	 * @param  {[type]} selector [description]
	 * @return {[type]}          [description]
	 */
	exports.closestAncestor = function closestAncestor($el, selector) {
		return $el.parent().closest(selector);
	};
});
