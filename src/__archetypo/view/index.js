/**
 * @module archetypo
 * @submodule baseview
 */

/* jshint ignore:start */
if (typeof define !== 'function') { var define = require('amdefine')(module) }
/* jshint ignore:end */

define(function (require, exports, module) {
	'use strict';

	var _ = require('lodash'),
		subject = require('subject');

	var baseview = module.exports = subject(function baseview(options) {

		this.$el = options.$el || this.$el;
		this.map = options.map || this.map;
		this.model = options.model || this.model;
		this.options = options;

	});

});
