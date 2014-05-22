define(function (require, exports, module) {
	'use strict';

	var _ = require('lodash'),
		q = require('q');


		// invoke methods
	var archInvoke = require('./invoke');


	/**
	 * EVALUATION ORDER
	 * [1] NON-EVALUATED VALUES
	 *     Values not prefixed by "method:" are first evaluated,
	 *     thus they cannot reference values on the same scope,
	 *     only those on parent scopes (inherited)
	 *
	 * [2] PRIORITAIRE EVALUATED VALUES
	 *     Values that are evaluated (prefixed by "method:") and
	 *     prefixed by ! (or 0!, 1!, *!)
	 *
	 * [3] NON-PRIORITAIRE EVALUATED VALUES
	 *     Values that are evaluated (prefixed by "method:") and
	 *     not prefixed by !
	 */

	/**
	 *
	 * Evaluates the data parsed from the el into modules.
	 * Returns a promise for all properties evaluated.
	 *
	 * @method archEvaluate
	 * @private
	 */
	exports.archEvaluate = function archEvaluate(data) {

		var deferred = q.defer();

		// [2] set value data properties
		var values = _.reduce(data, function (res, d, key) {

			if (d.type === 'value') {
				// if the type of the value is 'value',
				// evaluate the value.
				res[key] = this.evaluate(d.value);
			}

			return res;

		}, {}, this);
		this.assign(values);

		// [3] invoke methods
		var invocations = _.pick(data, function (d) {
			return d.type === 'invocation';
		});

		var lalala = this;

		archInvoke.call(this, invocations)
			.done(function () {
				deferred.resolve(lalala);
			});

		// [4] return the promise
		return deferred.promise;
	};
});
