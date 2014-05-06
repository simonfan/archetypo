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
		$ = require('jquery'),
		subject = require('subject'),
		q = require('q');

	// internal
	var build = require('./__archetypo/build/index'),
		scopeManager = require('./__archetypo/scope-manager');

	/**
	 * The archetypo object
	 *
	 *
	 */
	var archetypo = module.exports = subject({

		prefix: 'arch',

		/**
		 *
		 *
		 * Hash to hold all functions.
		 *
		 */
		fns: {

		},


		/**
		 * This method evaluates the value string
		 * It is called upon any value string.
		 *
		 * The default version returns the jq-object if value === 'this'
		 *
		 * @method evaluator
		 * @param value
		 */
		evaluator: function evaluate(value) {
			if (value === 'this') {
				return this;
			} else {
				return value;
			}
		},

		/**
		 * Hash holding processors to be called for evaluation
		 *
		 * Processors are 'argument-length-aware' functions.
		 * If the processor function takes ...
		 *     1 argument : [value]       (synchronous)
		 *     2 arguments: [value, done] (asynchronous)
		 *
		 * @property processors
		 * @type Object
		 */
		processors: {
			require: function archRequire(modulePath, done) {

				console.log('required ' + modulePath);

				require([modulePath], function (module) {
					done(module);
				});
			}
		},

		/**
		 * Hash holding the default processors for each archProperty.
		 *
		 * @property defaultProcessors
		 * @type Object
		 */
		defaultProcessors: {
			fn: 'require',
		},

		/**
		 * Hash holding the default properties
		 * and their values (pre-evaluated and pre-processed)
		 *
		 * @property defaultProperties
		 * @type Object
		 */
		defaultProperties: {
			el: {
				processor: void(0),
				value: 'this',
			},
		},

		/**
		 *
		 * @param el {jq-object}
		 * @param options
		 *     @param processors {Object}
		 *     @param defaultProcessors {Object}
		 */
		initialize: function initializeArchetypo(el, options) {

			options = options || {};

			// [0] el reference.
			// [0.1] save the archetypo object to the el
			el.data('archetypo', this);
			// [0.2] save reference to the el on archetypo object
			//////////////////////////////////////////////////////////////
			// OBS:  YES, circular reference... will this bring issues? //
			//////////////////////////////////////////////////////////////
			this.el = el;


			// [1] ancestor chain
			// [1.1] get closest ancestor that has data-archetypo
			var ancestorArchetypoEl = el.parent().closest('[data-archetypo]');

			// [1.2] get the archetypo object from ancestor and keep reference to it.
			/**
			 * Reference to the nearest archetypo ascendant.
			 *
			 * @property parent
			 * @type archetypo-object
			 */
			this.parent = ancestorArchetypoEl.data('archetypo');


			// [2] extend some options
			// [2.1] extensions
			_.each(
				_.pick(options, ['processors', 'defaultProcessors']),
				function (extensions, key) {
					_.extend(this[key], extensions);
				}, this);

			// [2.2] direct values
			this.evaluator = options.evaluator || this.evaluator;


			// [3] build a namespace manager
			this.scope = scopeManager({
				// parent refers not to the archetypo object parent
				// but to the scope manager of the parent
				parent: this.parent ? this.parent.scope : false
			});

			// [4] invoke build
			/**
			 * Promise to be resolved only when the view is ready.
			 *
			 * @property promise
			 * @type q-promise-object
			 */
			this.promise = build.call(this);

		},

		/**
		 * Retrieves a namespace object.
		 *
		 * @method namespace
		 * @param slug {String}
		 */
		namespace: function getNamespace(slug) {
			return this.namespaces[slug];
		},
	});




	// PLUGIN AREA //


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
