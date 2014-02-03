/**
 * Defines the model view initializer
 * and loads the model view.
 *
 * @module archetypo
 * @submodule model-view
 */

/* jshint ignore:start */
if (typeof define !== 'function') { var define = require('amdefine')(module) }
/* jshint ignore:end */

define(function (require, exports, module) {
	'use strict';

	var _ = require('lodash');


	var modelView = require('./builder/index');


	/**
	 * Initializes the viewing system.
	 *
	 * @method _initializeView
	 * @private
	 */
	exports._initializeView = function _initializeView(attributes, options) {
		this.view = modelView.extend({
			model: this
		});
	};
});
