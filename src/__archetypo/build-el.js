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


				// join modules with options, so that
				// sub archetypos have access to ancestor loaded modules
				options = _.extend({}, options, modules);

				// create an object to be passed to
				// all viewBuilders
				var buildOptions = _.extend({ el: $el }, options);

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
