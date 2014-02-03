/**
 * @module archetypo
 * @submodule model-attributes-getters
 */

/* jshint ignore:start */
if (typeof define !== 'function') { var define = require('amdefine')(module) }
/* jshint ignore:end */

define(function (require, exports, module) {
	'use strict';

	var _ = require('lodash'),
		subject = require('subject');

	exports.get = function get(attribute) {
		return this.attributes[attribute];
	};

});
