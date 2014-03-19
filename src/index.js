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
		_ = require('lodash');

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
	 * @constructor
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
			 * Hash where constructors are stored.
			 *
			 * @property constructors
			 * @type Object
			 */
			this.constructors = {
				view: {
					'default': archView
				},
				model: {},
				collection: {}
			};

			/**
			 * Hash where instances are stored.
			 *
			 * @property instances
			 * @type Object
			 */
			this.instances = {
				view: {},
				model: {},
				collection: {},
			};
		},

		/**
		 * Either defines or retrieves a constructor function.
		 *
		 * @method constructor
		 * @param type {String}
		 * @param name {String}
		 * @param [extensions] {Object}
		 */
		constructor: function defineConstructor(type, name, extensions) {

			var constructors = this.constructors[type];

			if (arguments.length === 3) {
				// define a constructor

				// save
				constructors[name] = constructors['default'].extend(extensions);

				// return
				return constructors[name];

			} else if (arguments.length === 2) {

				// retrieve a constructor.
				return constructors[name];
			}
		},

		/**
		 * Defines or retrieves an instance.
		 *
		 * @method instance
		 * @param type {String}
		 * @param name {String}
		 * @param [obj] {Object}
		 */
		instance: function instance(type, name, obj) {

			var instances = this.instances[type] = this.instances[type] || {};

			if (arguments.length === 3) {
				instances[name] = obj;
			}

			return instances[name];
		},

		build: function build(options) {


			// initialize basic backbone view
			dockableView.prototype.initialize.apply(this, arguments);


			// check if $el is present
			if (!this.$el) {
				throw new Error('No DOM element in archetypo.');
			}


			// initialize registry
			register.apply(this, arguments);

			// start subviews
			subviews.apply(this);
		},

		start: function start(options) {

			this.build(options);

			backbone.history.start(options);

			return this;
		}
	});


	// partials
	archetypo.proto({
		view: _.partial(archetypo.prototype.instance, 'view'),
		model: _.partial(archetypo.prototype.instance, 'model'),
		collection: _.partial(archetypo.prototype.instance, 'collection')
	});
});
