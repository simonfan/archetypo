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
