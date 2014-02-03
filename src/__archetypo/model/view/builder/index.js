/**
 * Defines the model view base builder
 * @module archetypo
 * @submodule model-view-view
 */

/* jshint ignore:start */
if (typeof define !== 'function') { var define = require('amdefine')(module) }
/* jshint ignore:end */

define(function (require, exports, module) {
	'use strict';

	var _ = require('lodash'),
		subject = require('subject');

	var baseView = require('../../../view/index');


	var modelView = module.exports = baseView.extend(function modelView(options) {
		// base initialize
		baseView.prototype.initialize.apply(this, arguments);
	});
});
