define(function (require, exports, module) {
	'use strict';

	var _ = require('lodash');

	exports.camelCase = function camelCase(str) {
		return str.replace(/-(.)/g, function (match, capture1) {
			return capture1.toUpperCase();
		});
	};
});
