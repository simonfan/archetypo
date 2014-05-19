define(function (require, exports, module) {
	'use strict';

	var q  = require('q'),
		_q = require('_q'),
		$  = require('jquery');

	/**
	 * Checks whether there are sub archetypos to build.
	 * @return {q promise} [description]
	 */
	module.exports = function archSubs() {
		var deferred = q.defer();

		// [1]
		// find all elements within this element
		// that are selected by the archSelector defined on the scope
		var subEls = this.el.find(this.archSelector);

		// [2]
		// Instantiate the sub-views
		_q.map(subEls, function (subEl) {

			subEl = $(subEl);

			var elArchetypo = subEl.data('archetypo');

			// [0] check if the element already has an archetypo
			//     and only build if it has NOT
			if (!elArchetypo) {

				var subArchetypo = this.create({ el: subEl });

				// return the promise
				return subArchetypo.promise;
			} else {
				return elArchetypo.promise;
			}

		}, this)
			.done(function () {

				// resolve with 0 arguments.
				deferred.resolve();
			});

		// [4] return the promise
		return deferred.promise;
	};
});
