define(function (require, exports, module) {
	'use strict';

	var q              = require('q'),
		_q             = require('_q'),
		jqueryMetaData = require('jquery-meta-data');



		// parse the value string into { evaluator: 'evaluator', value: 'value'}
	var parseArchValue = require('../../parse/value'),


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
		if (data.type === 'evaluated') {
			// with evaluation
			// [2.1] get the evaluating function
			var evalFn = this[data.method];

			// [2.2] execute evaluation
			var res = evalFn.call(this, data.value);

			// [2.3] check evaluation returns
			if (q.isPromise(res)) {
				// [2.3.1] it is a promise, thus, ASYNCHRONOUS
				res.then(deferred.resolve);
			} else {
				// [2.3.2] it is not a prmoise, thus, SYNCHRONOUS
				deferred.resolve(res);
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
	 */
	module.exports = function archEvaluate() {

		var deferred = q.defer();

		// [3]  the arch-meta-data
		var data = el.metaData({
			prefix:  'arch',
			parse:   parseArchValue.single,
			replace: true,
		});

		_q.mapValues(data, evaluateProp, this)
			.done(function (evaluatedData) {

				// assign values
				this.assign(evaluatedData);

				// resolve with no args.
				deferred.resolve()
			});


		return deferred.promise;
	};
});
