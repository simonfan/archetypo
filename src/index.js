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
		q = require('q'),
		_ = require('lodash');

	// sub modules.
	var archView = require('./__archetypo/view/index'),
		archRouter = require('./__archetypo/router/index');

	var archetypo = module.exports = archRouter.extend(function archetypoBuilder() {

		// initialize the arch router.
		archRouter.prototype.initialize.apply(this, arguments);

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
	});

	// proto
	archetypo.proto({

		/**
		 * Either defines or retrieves a constructor function.
		 *
		 * @method constructor
		 * @param type {String}
		 * @param name {String}
		 * @param [extensions] {Object}
		 */
		constructor: function defineConstructor(type, name, extensions) {

			var constructors = this.constructors[type],
				constructor = constructors[name] || constructors['default'];

			if (arguments.length === 3) {
				// define a constructor

				// Add app to extensions
				extensions.app = this;

				// save
				constructors[name] = constructor.extend(extensions);

				// return
				return constructors[name];

			} else if (arguments.length === 2) {
				// retrieve a constructor.
				return constructor;
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

		/**
		 * Instantiates a default view given an $el.
		 *
		 * @method build
		 * @param $el {jq Object}
		 */
		build: function build($el) {
			var view = this.constructor('view', 'default');

			view({
				$el: $el,
				app: this
			});

			return this;
		},

		start: function start(options) {
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
