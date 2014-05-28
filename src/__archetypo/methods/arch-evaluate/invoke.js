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

		// with evaluation
		// [2.1] execute evaluation
		var method = helpers.camelCase(invocation.method);
		var res = this.invoke(method, invocation.value);


		// [2.2] make sure the response is ALWAYS A PROMISE
		res = q.isPromise(res) ? res : q(res);

		// [3] handle errors on the promise
		res.fail(this.error);

		return res;
	}
});
