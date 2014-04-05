/**
 * @module archetypo
 * @submodule view
 */

define('__archetypo/build-sub',['require','exports','module','lodash','jquery','q'],function (require, exports, module) {
	

	var _ = require('lodash'),
		$ = require('jquery'),
		q = require('q');

	module.exports = function buildSub($el, options) {

		console.log('sub')

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
	 */
	function load(names, locations) {
		var defer = q.defer();

		// locations default to the names themselves.
		locations = locations || names;

		require(locations, function () {
			defer.resolve(_.zipObject(names, arguments));
		});

		return defer.promise;
	};



	/**
	 *
	 *
	 * @method load
	 * @param $el {jq Object}
	 * @param modules {Array}
	 */
	exports.modules = function modules($el, modules) {

		var data = $el.data();

		// filter valid names and locations
		var validNames = [],
			locations = [];

		_.each(modules, function (prop) {
			var location = data[prop];

			if (_.isString(location)) {
				validNames.push(prop);
				locations.push(location);
			}
		});

		return load(validNames, locations);
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
	};

	/**
	 * Loads the builders defined in $el.
	 *
	 * @method load.builders
	 *
	 */
	exports.builders = function loadBuilders($el) {
		// retrieve the builder names
		var builders = tokenize($el.data('builder'));

		return load(builders);
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

		var done = $el.data('archetypo-done');
			// if the element was already processed earlier,
			// return a resolved promise.

		if (!done) {
			// otherwise ...

			// set a views data property on the $el
			$el.data('views', {});

			// load stuff
			var loading = [
				load.builders($el),
				load.modules($el, options.modules)
			];

			return q.spread(loading, function (builders, modules) {

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

			// set the archetypo done.
			$el.data('archetypo-done', done);
		}

		// return a promise for whenever the archetypo call is done.
		return done;
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
		return _($subs, function (sub) {
			return $(sub).view(name)
		});
	};

});

