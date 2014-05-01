/**
 * @module archetypo
 * @submodule view
 */

define('__archetypo/build-sub',['require','exports','module','lodash','jquery','q'],function (require, exports, module) {
	

	var _ = require('lodash'),
		$ = require('jquery'),
		q = require('q');

	module.exports = function buildSub($el, options) {
		// [0] Sub-views
		// Look for child nodes that have an 'arch-view'
		// attribute defined and instantiate the corresponding view.

		// [1]
		// find all elements within this element
		// that have an 'arch-view' attribute defined.
		var $subs = $el.find('[data-' + options.viewPrefix + ']');

		// [2]
		// Instantiate the sub-views
		var defers = _.map($subs, function (sub) {
			return $(sub).archetypo(options);
		}, this);

		return q.all(defers);
	};

});

define('__archetypo/load',['require','exports','module','lodash','q'],function (require, exports, module) {
	

	var _ = require('lodash'),
		q = require('q');


	function validatePaths(modules) {

		_.each(modules, function (path, name) {

			if (!path) {
				throw new Error('Module \'' + name + '\' does not have a valid path.');
			}
		});

	}

	/**
	 * Loads a series of modules
	 *
	 * @method load
	 * @private
	 * @param modules {Object} { name: path }
	 * @returns {Object} { name: module }
	 */
	module.exports = function load(modules) {

		validatePaths(modules);

		var defer = q.defer();

		var names = _.keys(modules),
			paths = _.values(modules);

		// require the paths
		require(paths, function () {

			// resolve the defer with an object
			// keyed by names and valued by the loaded modules.
			defer.resolve(_.zipObject(names, arguments));
		});

		return defer.promise;
	};
});

define('__archetypo/parse-prefixed-data',['require','exports','module','lodash'],function (require, exports, module) {
	

	var _ = require('lodash');

	module.exports = function parsePrefixedData($el, prefix) {

		// [0] create the regexp
		var prefixRegExp = new RegExp('^' + prefix);

		// [1] get data from $el
		var data = $el.data(),
			// [2] create var for unprefixedData
			unprefixedData = {};

		// [3] loop through the data.
		_.each(data, function (value, key) {

			// if the key is a builder name,
			// AND the value is a valid module path,
			// add it.
			if (value && prefixRegExp.test(key)) {

				// remove prefix
				var unprefixedKey = key.replace(prefix, '');
				unprefixedKey = unprefixedKey.charAt(0).toLowerCase() + unprefixedKey.slice(1);

				// make sure unprefixedKey is not an empty string
				unprefixedKey = unprefixedKey ? unprefixedKey : 'main';

				// set value
				unprefixedData[unprefixedKey] = value;
			}
		});


		return unprefixedData;
	};

});

//     archetypo
//     (c) simonfan
//     archetypo is licensed under the MIT terms.

/**
 * AMD module.
 *
 * @module archetypo
 */

define('__archetypo/build-el',['require','exports','module','lodash','jquery','q','./build-sub','./load','./parse-prefixed-data'],function (require, exports, module) {
	

	var _ = require('lodash'),
		$ = require('jquery'),
		q = require('q');

	var buildSub = require('./build-sub'),
		load = require('./load'),
		parsePrefixedData = require('./parse-prefixed-data');


	function buildView($el, builder, options) {
		// make sure options is an object
		options = options || {};

		// set el property on options
		options.el = $el;
	}


	/**
	 * Loads anything that's needed and calls the view view
	 *
	 *
	 * @method buildEl
	 *
	 */
	module.exports = function buildEl($el, options) {

		var archetypoPromiseChain = $el.data('_arch-promise');
			// if the element was already processed earlier,
			// return the promise.

		if (!archetypoPromiseChain) {

			// set a _arch-views data property on the $el
			$el.data(options.storage, {});

			// get modules to be loaded
			var modules = parsePrefixedData($el, options.modulePrefix),
				views   = parsePrefixedData($el, options.viewPrefix);

			// load stuff
			var loading = [
				load(views),
				load(modules)
			];

			// archetypoPromiseChain wquals t
			archetypoPromiseChain = q.spread(loading, function (viewBuilders, modules) {

				// create an object to be passed to
				// all viewBuilders
				var buildOptions = _.extend({ el: $el }, options, modules);

				var buildDefers = _.map(viewBuilders, function (builder, name) {

					// use q.when, so that the builder may return
					// a promise or directly the view
					return q.when(builder(buildOptions))
						// save the view
						.then(function (view) {
							// save the view
							$el.data(options.storage)[name] = view;
						});

				});

				// return a promise for when all
				// the builders are ready
				return q.all(buildDefers);
			})
			.then(function () {

				// return the promise for the sub readiness
				return buildSub($el, options);
			})
			// finally return the $el on which archetypo was called
			.then(function () {
				return $el;
			});


			// set the archetypo archetypoPromiseChain.
			$el.data('_arch-promise', archetypoPromiseChain);

			// throw errors!!!!
			archetypoPromiseChain.done();
		}

		// return a promise for whenever the archetypo call is archetypoPromiseChain.
		return archetypoPromiseChain;
	};

});

//     archetypo
//     (c) simonfan
//     archetypo is licensed under the MIT terms.

/**
 * AMD module.
 *
 * @module archetypo
 */

define('archetypo',['require','exports','module','lodash','jquery','./__archetypo/build-el'],function (require, exports, module) {
	

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

