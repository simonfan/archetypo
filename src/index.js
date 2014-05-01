//     archetypo
//     (c) simonfan
//     archetypo is licensed under the MIT terms.

/**
 * AMD module.
 *
 * @module archetypo
 */

define(function (require, exports, module) {
	'use strict';

	var _ = require('lodash'),
		$ = require('jquery');

	var buildEl = require('./__archetypo/build-el');


	// The default options
	var defaultOptions = {
		modulePrefix: 'module',
		viewPrefix:   'archetypo',
	};



	// property onto which the views will be saved.
	var storage = '_arch-views';



	/**
	 * Retrieves a single archetypo from the $el.
	 *
	 * @method getArchetypo
	 * @private
	 */
	function getArchetypo($el, name) {

		name = name || 'main';

		// direct view
		return $el.data(storage)[name];
	}

	/**
	 * Invokes the archetypo builder on the element
	 *
	 * @method buildArchetypo
	 * @private
	 */
	function buildArchetypo($el, options) {
		options = options || {};

		// set default options
		_.defaults(options, defaultOptions);

		// if the storage option is set,
		// reset the storage string
		storage = options.storage = options.storage || storage;

		// build up
		return buildEl($el, options);
	}


	$.prototype.archetypo = function archetypo() {

		var initialized = this.data('__archetypo-initialized');

		if (initialized && (arguments.length === 0 || _.isString(arguments[0]))) {
			// get the main archetypo
			return getArchetypo(this, arguments[0]);

		} else {

			// set archetypo as initialized
			this.data('__archetypo-initialized', true);

			return buildArchetypo(this, arguments[0]);
		}
	};

});
