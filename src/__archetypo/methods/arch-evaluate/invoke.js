define(function (require, exports, module) {
	'use strict';

	var q  = require('q');

	var helpers = require('../../helpers');

	/**
	 *
	 * Invokes a single method
	 *
	 * @method invoke
	 * @private
	 * @param invocation {Object} { value: v, method: m }
	 * @param prop {String}
	 */
	module.exports = function invoke(invocation, prop) {

		// [1] create a deferred object to be returned.
		var deferred = q.defer();

		// with evaluation
		// [2.1] execute evaluation
		var method = helpers.camelCase(invocation.method);
		var res = this.invoke(method, invocation.value);

		// [2.2] check evaluation returns
		if (q.isPromise(res)) {
			// [2.2.1] it is a promise, thus, ASYNCHRONOUS
			res.done(deferred.resolve);
		} else {
			// [2.2.2] it is not a prmoise, thus, SYNCHRONOUS
			deferred.resolve(res);
		}

		// return promise no matter what
		return deferred.promise;
	}
});
