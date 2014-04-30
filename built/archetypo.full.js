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
		var subs = $el.find('[data-builder]');

		// [2]
		// Instantiate the sub-views
		var defers = _.map(subs, function (sub) {
			$(sub).archetypo(options);
		}, this);

		return q.all(defers);
	};

});

define('__archetypo/load',['require','exports','module','lodash','q'],function (require, exports, module) {
	

	var _ = require('lodash'),
		q = require('q');


	/**
	 * The real loader.
	 *
	 * @method load
	 * @private
	 * @param names {Array}
	 *      names of the modules
	 * @param paths {Array}
	 *      the path to the modules
	 * @returns { name: module }
	 */
	function load(names, paths) {
		var defer = q.defer();

		// require the paths
		require(paths, function () {

			// resolve the defer with an object
			// keyed by names and valued by the loaded modules.
			defer.resolve(_.zipObject(names, arguments));
		});

		return defer.promise;
	}



	/**
	 *
	 *
	 * @method load
	 * @param $el {jq Object}
	 * @param loadableProperties {Array}
	 */
	exports.modules = function modules($el, loadableProperties) {

		var data = $el.data();

		// filter valid names and paths
		var names = [],
			paths = [];

		_.each(loadableProperties, function (prop) {
			var location = data[prop];

			if (_.isString(location)) {
				names.push(prop);
				paths.push(location);
			}
		});

		return load(names, paths);
	};





	/**
	 * Converts a string into an array.
	 *
	 * @method tokenize
	 * @param str
	 */
	var whitespaces = /\s+/;
	function tokenize(str) {
		return _.isString(str) ? str.split(whitespaces) : [];
	}

	/**
	 * Loads the builders defined in $el.
	 *
	 * @method load.builders
	 *
	 */
	exports.builders = function loadBuilders($el) {
		// retrieve the builder definition strings
		// they are of the format: [builderName:]builderModulePath
		var builderStrings = tokenize($el.data('builder'));


		// retrieve names and paths
		var names = [],
			paths = [];

		_.each(builderStrings, function (str) {
			var split = str.split(':');

			if (split.length === 2) {
				names.push(split[0]);
				paths.push(split[1]);
			} else {
				names.push(str);
				paths.push(str);
			}
		});

		return load(names, paths);
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

define('__archetypo/build-el',['require','exports','module','lodash','jquery','q','./build-sub','./load'],function (require, exports, module) {
	

	var _ = require('lodash'),
		$ = require('jquery'),
		q = require('q');

	var buildSub = require('./build-sub'),
		load = require('./load');


	function buildView($el, builder, options) {
		// make sure options is an object
		options = options || {};

		// set el property on options
		options.el = $el;
	}


	/**
	 * Loads anything that's needed and calls the view builder
	 *
	 *
	 * @method buildEl
	 *
	 */
	module.exports = function buildEl($el, options) {

		var archetypoPromiseChain = $el.data('archetypo-promise');
			// if the element was already processed earlier,
			// return a resolved promise.

		if (!archetypoPromiseChain) {
			// otherwise ...



			// set a views data property on the $el
			$el.data('views', {});

			// load stuff
			var loading = [
				load.builders($el),
				load.modules($el, options.loadable)
			];

			// archetypoPromiseChain wquals t
			archetypoPromiseChain = q.spread(loading, function (builders, modules) {

				// create an object to be passed to
				// all builders
				var buildOptions = _.extend({ el: $el }, options, modules);

				var buildDefers = _.map(builders, function (builder, name) {

					// use q.when, so that the builder may return
					// a promise or directly the view
					return q.when(builder(buildOptions))
						// save the view
						.then(function (view) {
							// save the view
							$el.data('views')[name] = view;
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
			$el.data('archetypo-promise', archetypoPromiseChain);

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

	$.prototype.archetypo = function archetypo(options) {
		return buildEl(this, options);
	};

	$.prototype.view = function view(name) {
		return this.data('views')[name];
	};

	$.prototype.subviews = function subviews(selector, name) {
		var $subs = this.find(selector);

		// return wrapped object
		return _($subs).map(function (sub) {
			return $(sub).view(name);
		});
	};

});

