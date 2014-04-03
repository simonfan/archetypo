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
			// initialize the arch router.
			this.initializeArchRouter.apply(this, arguments);

			this.initializeArchetypo.apply(this, arguments);
		},

		initializeArchetypo: function initializeArchetypo(options) {

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
		 * Either defines or retrieves a builder function.
		 *
		 * @method builder
		 * @param type {String}
		 * @param name {String}
		 * @param [extensions] {Object}
		 */
		builder: function defineOrGetBuilder(name, builder) {

			if (arguments.length === 2) {
				// define a builder

				if (_.isFunction(builder)) {
					// builder is a constructor by itself
					this.builder[name] = builder;

				} else if (_.isObject(builder)) {
					// builder is a set of properties that the defautl
					// view must extend
					this.builder[name] = archetypoView.extend(builder);
				}

				// save
				this.builders[name] = this.builders['default'].extend(builder);

				// return
				return this.builders[name];

			} else if (arguments.length === 1) {

				// retrieve a builder.

				builder = this.builders[name];

				if (!builder) {
					throw new Error('No builder "' + name + '" defined in app.');
				}

				return builder;
			}
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
});
