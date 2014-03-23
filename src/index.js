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

	var subject = require('subject'),
		backbone = require('lowercase-backbone'),
		dockableView = require('dockable-view'),
		q = require('q'),
		_ = require('lodash'),
		$ = require('jquery');

	// sub modules.
	var archView = require('./__archetypo/view/index'),
		archRouter = require('./__archetypo/router/index');

	// view-initialization
	var register = require('./__archetypo/view/initialize/register'),
		subviews = require('./__archetypo/view/initialize/subviews');

	/**
	 * The main class.
	 *
	 * @class archetypo
	 * @builder
	 */
	var archetypo = module.exports =
		archView
			.extend(backbone.router.prototype)
			.extend(archRouter.prototype);

	// proto
	archetypo.proto({

		/**
		 * The initialization logic is different from that of a
		 * simple archView.
		 *
		 * @method initialize
		 * @param options {Object [for both router and view]}
		 */
		initialize: function initializeArchetypo(options) {
			// initialize the arch router.
			archRouter.prototype.initialize.apply(this, arguments);

			this.isApp = true;

			/**
			 * Hash where builders are stored.
			 *
			 * @property builders
			 * @type Object
			 */
			this.builders = {
				'default': archView
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
		builder: function defineOrGetBuilder(name, extensions) {

			if (arguments.length === 2) {
				// define a builder

				// save
				this.builders[name] = this.builders['default'].extend(extensions);

				// return
				return this.builders[name];

			} else if (arguments.length === 1) {

				// retrieve a builder.

				var builder = this.builders[name];

				if (!builder) {
					throw new Error('No builder "' + name + '" defined in app.');
				}

				return builder;
			}
		},

		/**
		 *
		 *
		 * @method builder
		 * @param options
		 */
		build: function build(options) {

			arguments[0] = options || {};

			// set APP
			arguments[0].app = this;

			// initialize basic backbone view
			dockableView.prototype.initialize.apply(this, arguments);


			// check if $el is present
			if (!this.$el) {
				throw new Error('No DOM element in archetypo.');
			}

			// initialize registry
			register.apply(this, arguments);

			// start subviews
			subviews.apply(this, arguments);
		},

		/**
		 * Starts the app up.
		 *
		 * @method
		 * @param options
		 */
		start: function start(options) {
			options = options || {};

			options.el = options.el || $('[data-archetypo],[archetypo]');

			this.build(options);

			backbone.history.start(options);

			return this;
		}
	});
});
