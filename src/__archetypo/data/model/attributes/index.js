/**
 * @module archetypo
 * @submodule model-attributes
 */

/* jshint ignore:start */
if (typeof define !== 'function') { var define = require('amdefine')(module) }
/* jshint ignore:end */

define(function (require, exports, module) {
	'use strict';

	var _ = require('lodash');

	/**
	 * Initializes the attributes
	 *
	 * @methos _initializeAttributes
	 * @private
	 */
	exports._initializeAttributes = function _initializeAttributes(attributes, options) {

		// initialize attributes
		this.attributes = {};

		// set default values to the initializing attributes
		if (this.defaults) {
			_.defaults(attributes, this.defaults);
		}
		this.set(attributes, options);
	};


	/**
	 * Require and export the submodules.
	 */
	_.extend(exports, require('./setters'));
	_.extend(exports, require('./getters'));

});
