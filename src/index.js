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

	var backbone = require('lowercase-backbone'),
		_ = require('lodash'),
		$ = require('jquery'),

		archetypoView = require('archetypo-view');

	// sub modules.
	var archRouter = require('./__archetypo/router/index');

	/**
	 * The main class.
	 *
	 * @class archetypo
	 * @builder
	 */
	var archetypo = module.exports = archetypoView
		.extend(backbone.router.prototype)
		.extend(archRouter.prototype);

	// proto
	archetypo.proto({

		/**
		 * The initialization logic is different from that of a
		 * simple archetypoView.
		 *
		 * @method initialize
		 * @param options {Object [for both router and view]}
		 */
		initialize: function initializeArchetypo(options) {
			this.initializeArchetypo.apply(this, arguments);
		},

		initializeArchetypo: function initializeArchetypo(options) {
			// initialize the arch router.
			// the arch router is considered part of archetypo
			this.initializeArchRouter(options);

			/**
			 * Hash where builders are stored.
			 *
			 * @property builders
			 * @type Object
			 */
			this.builders = {
				'default': archetypoView
			};
		},

		/**
		 * Starts the app up.
		 *
		 * @method
		 * @param options
		 */
		start: function start(options) {
			options = options || {};

			// set app option
			options.app = this;

			options.el = options.el || $('[data-archetypo],[archetypo]');

			// initialize basic backbone view
			backbone.view.prototype.initialize.apply(this, arguments);

			// initialize archetypoView
			this.initializeArchetypoView(options);

			backbone.history.start(options);

			return this;
		}
	});

	archetypo.proto(require('./__archetypo/builder'));
});
