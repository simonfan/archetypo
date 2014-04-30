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
		modulePrefix: /^module/,
		viewPrefix:   /^view/,
	};

	// property onto which the views will be saved.
	var storage = '_arch-views';

	$.prototype.archetypo = function archetypo() {


		if (_.isString(arguments[0])) {
			// view getter
			if (arguments.length === 1) {
				// arguments[0] === viewName

				// direct view
				return this.data(storage)[arguments[0]];
			} else {

				// arguments[0] === .sub-selector
				// arguments[1] === viewName

				// subviews
				var $subs = this.find(arguments[0]);

				// return array of subvies
				return _.map($subs, function (sub) {
					return $(sub).archetypo(arguments[1]);
				})
			}

		} else {

			var options = arguments[0] || {};

			// set default options
			_.defaults(options, defaultOptions);

			// if the storage option is set,
			// reset the storage string
			storage = options.storage = options.storage || storage;

			// build up
			return buildEl(this, options);
		}
	};

});
