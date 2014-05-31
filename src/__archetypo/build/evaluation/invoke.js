define(function (require, exports, module) {
	'use strict';

	var q    = require('q'),
		deep = require('deep');

	var aux = require('../../auxiliary');

	/**
	 *
	 * Invokes a single method
	 *
	 * @method invoke
	 * @private
	 * @param invocation {Object} { value: v, method: m }
	 * @param prop {String}
	 */
	module.exports = function invoke(scope, invocation, prop) {

		// with evaluation
		// [2.1] execute evaluation
		var methodName = aux.camelCase(invocation.method),
		// [2.2] retrieve the function to be invoked by evaluation
		//       (instead of by object property lookup as scope.invoke does by default)
		//       That is done in order to be capable of getting deep methods. (scope.property.method)
			methodFn   = scope.evaluate('$' + methodName);

		console.log(methodName);
//		console.log(invocation);
//		console.log(methodFn);

		console.log(invocation.value);

		var res = scope.invoke(methodFn, invocation.value);

		// [2.2] make sure the response is ALWAYS A PROMISE
		return q.isPromise(res) ? res : q(res);
	}
});
