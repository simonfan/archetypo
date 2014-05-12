/**
 * @module archetypo
 * @submodule view
 */

define(function (require, exports, module) {
	'use strict';

	var _ = require('lodash'),
		$ = require('jquery'),
		q = require('q');

	/**
	 *
	 *
	 * STEPS TAKE NO ARGUMENTS
	 *
	 */
	module.exports = function buildSubs() {

		console.log('buildSubs invoked')

		var buildSubsDeferred = q.defer();

		// [1]
		// find all elements within this element
		// that have an 'data-archetypo' attribute defined.
		var subEls = this.el.find('[data-archetypo]');

		// [2]
		// Instantiate the sub-views
		var subArchetypoPromises = _.map(subEls, function (el) {

			el = $(el);

			var elArchetypo = el.data('archetypo');

			// [0] check if the element already has an archetypo
			//     and only build if it has NOT
			if (!_.isObject(elArchetypo)) {


				// constructor is a reference to the
				// archetypo constructor that is available through
				// subject extension module. :)
				var subArchetypo = this.constructor(el, this.options);

				// return the promise
				return subArchetypo.promise;
			} else {
				return elArchetypo.promise;
			}

		}, this);

		// [3] resolve the buildSubsDeferred object
		//     when all the subArchetypoPromises are done
		q.all(subArchetypoPromises)
			.done(function () {

				// resolve with 0 arguments.
				buildSubsDeferred.resolve();
			});

		// [4] return the promise
		return buildSubsDeferred.promise;
	};

});
