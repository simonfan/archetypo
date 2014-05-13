define(function (require, exports, module) {
	'use strict';

	var q  = require('q'),
		_q = require('_q'),
		$  = require('jquery');

	/**
	 * Checks whether there are sub archetypos to build.
	 * @return {[type]} [description]
	 */
	module.exports = function archSubs() {
		var deferred = q.defer();

		// [1]
		// find all elements within this element
		// that have an 'data-archetypo' attribute defined.
		var subEls = this.el.find('[data-archetypo]');

		// [2]
		// Instantiate the sub-views
		_q.map(subEls, function (el) {

			el = $(el);

			var elArchetypo = el.data('archetypo');

			// [0] check if the element already has an archetypo
			//     and only build if it has NOT
			if (!elArchetypo) {

				var subArchetypo = this.createSubArchetypo({ el: el });

				// return the promise
				return subArchetypo.done;
			} else {
				return elArchetypo.done;
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
