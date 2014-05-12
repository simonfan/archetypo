define(function (require, exports, module) {
	'use strict';

	var q  = require('q'),
		_q = require('_q');

	/**
	 *
	 * Evaluates a single piece of data
	 *
	 * @method archEvaluate
	 * @private
	 * @param data {Object} { value: v, method: m }
	 * @param prop {String}
	 */
	function evaluateProp(data, prop) {

		// [1] create a deferred object to be returned.
		var deferred = q.defer();

		// [2] check if the evaluation method was defined
		if (data.evaluator) {
			// with evaluation
			// [2.1] get the evaluator function
			var evalFn = this[data.evaluator];

			// [2.2] check the arity of the evaluator
			if (evalFn.length === 1) {
				// [2.3] one argument. SYNCHRONOUS
				// args: [value]
				deferred.resolve(evalFn.call(this, data.value));

			} else if (evalFn.length === 2) {

				// [2.4] two arguments. ASYNCHRONOUS
				// args: [value, deferred.resolve]
				evalFn.call(this, data.value, deferred.resolve);
			}

		} else {
			// no evaluation
			// resolve deferred immediately. SYNCHRONOUS
			deferred.resolve(data.value);
		}

		// return promise no matter what
		return deferred.promise
	}

	/**
	 *
	 * Evaluates the data parsed from the el into modules.
	 * Returns a promise for all properties evaluated.
	 *
	 * @method archEvaluate
	 * @private
	 * @param data {Object} {key: { value: v, method: m }}
	 */
	module.exports = function archEvaluate(data) {
		return _q.mapValues(data, evaluateProp, this);
	};
});
